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
      ctime: 0,
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
      var _this = this;
      this.$Modal.confirm({
        title: _this.$t('cancelOrder'),
        content: '<p><span class="error">' + _this.$t('paidAndNoCancel') + '</span><br>' + _this.$t('helpTipsFourth') + '</p>',
        onOk: function () {
          post('api/cancelOrder', _this.sequence).then(function (res) {
            location.reload();
          });
        },
        onCancel: function () {
          _this.$Modal.remove();
        },
      });
    },
    paid() {
      this.isPayDialogShow = false;
      this.isPayInfoDialogShow = true;
    },
    //------------end-----------------
    //Countdown
    payCountdown: function (createTime, limitTime) {
      var that = this
      setInterval(function () {
        var now = new Date().getTime();
        var expiredTime;
        // if time is seconds 
        if (limitTime > 1000) {
          expiredTime = limitTime;
        }
        //if time is million seconds
        else {
          expiredTime = createTime + limitTime * 60 * 1000;
        }
        if ((expiredTime - now) < 0) {
          that.leftTime = that.$t('orderExpired');
        } else {
          that.leftTime = utils.MillisecondToDate(expiredTime - now);
        }
      }, 1000)
    },

    //pay info modal methods----------
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
        if (res.success) {
          that.isPayInfoDialogShow = false;
          that.getOrderInfo(that.sequence);
        }
      });
    },
    //------------end-----------------
    copy: function (e) {
      e.target.select();
      document.execCommand('copy');
      Toast.show(e.target.name + this.$t('copied'), { icon: 'ok', duration: 1500 });
    },
    //next step ----------------------
    next() {
      this.step += 1;
    },
    //-------------------------GET ORDER INFO-----------------------------------------------//
    getOrderInfo: function (sequence) {
      var that = this;
      var user = JSON.parse(localStorage.getItem('user'));
      get('api/orderDetail', { sequence: sequence }, )
        .then(function (res) {
          var data = res.data.data;
          if (data.buyerId != user.id) {
            location.href = 'otc_wait_pay.html?sequence=' + sequence;
            return;
          }
          //to make sure the status of the order
          that.step = data.status;
          //create time of the order
          var payTime;
          if (data.status == 2) {
            payTime = data.limitTime;
          } else {
            payTime = data.advert.limitTime;
          }
          //start Countdown 
          that.payCountdown(data.ctime, payTime);
          // set  orderInfo;
          that.orderInfo = data;
          var whatsAppStr = data.seller.userExtView.watchapp;
          that.whatsAppLink = whatsAppStr.substr(whatsAppStr.indexOf(',') + 1);
        });
    }
    //------------------------------GET ORDER INFO END---------------------------------------//	
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