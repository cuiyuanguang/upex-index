var i18n = new VueI18n({
  locale: 'zh', // set locale
  fallbackLocale: 'zh',
  messages: utils.transform(messages),
});

var pay = new Vue({
  el: "#app",
  i18n: i18n,
  components: {
    oHeader: o_header,
    om_notice: om_notice,
  },
  data: function () {
    return {
      locale: 'zh',
      sequence: '',
      //trigger of pay modal
      isPayDialogShow: false,
      //trigger of pay info modal
      isPayInfoDialogShow: false,
      //step of pay
      step: 1,
      //left time for pay
      leftTime: 0,
      //create time
      payLimit: 0,
      confirmLimit: 0,
      card: '',
      cardErrorTips: '',
      recard: '',
      recardErrorTips: '',
      infoError: "",
      //-----------order info-----------------//
      orderInfo: {
        advert: {},
        buyer: {
          userExtView: {},
        },
        seller: {
          userExtView: {},
        },
        user: {},
      },
      whatsAppLink: '',
    }
  },
  computed: {
    arrivalTime: function() {
      var date = new Date(this.orderInfo.paymentTime);
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    },
    limitTime: function() {
      if (this.orderInfo) {
        return Math.ceil(this.orderInfo.countDownTime / 1000 / 60 / 60);
      }
    },
  },
  methods: {
    //pay modal methods-------------
    toPay() {
      this.isPayDialogShow = true;
    },
    cancelPay() {
      var that = this;
      this.$Modal.confirm({
        title: that.$t('cancelOrder'),
        content: '<p><span class="error">' + that.$t('paidAndNoCancel') + '</span><br>' + that.$t('helpTipsFourth') + '</p>',
        onOk: function () {
          post('api/cancelOrder', that.sequence).then(function (res) {
            location.reload();
          });
        },
        onCancel: function () {
          that.$Modal.remove();
        },
      });
    },
    paid() {
      this.isPayDialogShow = false;
      this.isPayInfoDialogShow = true;
    },
    close: function () {
      this.isPayInfoDialogShow = false;
    },
    confirm: function () {
      if (!this.card) {
        this.cardErrorTips = this.$t('noEmpty');
        return;
      }
      if (!this.recard) {
        this.recardErrorTips = this.$t('noEmpty');
        return;
      }
      if (this.cardErrorTips || this.recardErrorTips) {
        return;
      }
      var data = {
        card: this.card,
        sequence: this.sequence,
      }
      var that = this;
      post("api/orderPayed", data).then(function (res) {
        if (res) {
          that.isPayInfoDialogShow = false;
          that.getOrderInfo(that.sequence);
        }
      });
    },
    copy: function (e) {
      e.target.select();
      document.execCommand('copy');
      Toast.show(e.target.name + this.$t('copied'), { icon: 'ok', duration: 1500 });
    },
    next() {
      this.step += 1;
    },
    getOrderInfo: function (sequence) {
      var that = this;
      var user = JSON.parse(localStorage.getItem('user'));
      get('api/orderDetail', { sequence: sequence })
        .then(function (res) {
          var data = res;
          if (data.buyerId != user.id) {
            location.href = 'otc_wait_pay.html?sequence=' + sequence;
            return;
          }
          //to make sure the status of the order
          that.step = data.status;
          that.orderInfo = data;
          var whatsAppStr = data.seller.userExtView.watchapp;
          that.whatsAppLink = whatsAppStr.substr(whatsAppStr.indexOf('-') + 1).replace(/\s+/g, '');
          var expiredTime = data.countDownTime + Date.now();
          var timer = setInterval(function () {
            var now = Date.now();
            if ((expiredTime - now) <= 0) {
              that.leftTime = 0;
              clearInterval(timer);
            } else {
              that.leftTime = utils.MillisecondToDate(expiredTime - now);
            }
          }, 1000);
        });
    },
    getTimeLimit: function() {
      var that = this;
      get('/api/rate').then(function(res) {
        that.payLimit = res.data.data.payment_limit_time;
        that.confirmLimit = res.data.data.trade_limit_time;
      });
    },
  },
  mounted: function () {
    var locale = localStorage.getItem('locale');
    if (locale) {
      document.body.dir = locale === 'zh' ? 'ltr' : 'rtl';
      this.$i18n.locale = locale;
    }
    this.$on('locale', function(i) {
      this.locale = i;
    });
    var sequence = utils.getParam('sequence');
    this.sequence = sequence;
    this.getOrderInfo(sequence);
    this.getTimeLimit();
  },
  watch: {
    locale: function(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$i18n.locale = newVal;
      }
    },
    card: function (n, o) {
      if (!n) {
        this.cardErrorTips = this.$t('noEmpty');
      } else if (!/(\d|\w)+$/.test(n)) {
        this.cardErrorTips = this.$t('numericOrLetter');
      } else if (n.length !== 4) {
        this.cardErrorTips = this.$t('lengthshouldBe4');
      } else {
        this.cardErrorTips = '';
      }
    },
    recard: function (n, o) {
      if (!n) {
        this.recardErrorTips = this.$t('noEmpty');
      } else if (!/(\d|\w)+$/.test(n)) {
        this.recardErrorTips = this.$t('numericOrLetter');
      } else if (n != this.card) {
        this.recardErrorTips = this.$t('twiceNotEqual');
      } else if (n.length !== 4) {
        this.recardErrorTips = this.$t('lengthshouldBe4');
      } else {
        this.recardErrorTips = '';
      }
    }
  },
});