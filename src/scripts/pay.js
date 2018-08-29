

var messagesTransformed = utils.transform(messages);
var messagesAll = {
  zh: Object.assign(messagesTransformed.zh, iview.langs['zh']),
  en: Object.assign(messagesTransformed.en, iview.langs['en']),
  ar: Object.assign(messagesTransformed.ar, iview.langs['ar']),
};

var i18n = new VueI18n({
  locale: 'ar', // set locale
  fallbackLocale: 'ar',
  messages: messagesAll,
});

iview.i18n((key, value) => i18n.t(key, value));

var pay = new Vue({
  el: "#app",
  i18n: i18n,
  components: {
    oHeader: o_header,
  },
  data: function () {
    var validateEmpty = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('canNotBeEmpty')));
      } else {
        callback();
      }
    };
    var validateCard = (rule, value, callback) => {
      var reg = /\w{4}$/g;
      if (value === '') {
        callback(new Error(this.$t('canNotBeEmpty')));
      } else if (!reg.test(value)) {
        callback(new Error(this.$t('lengthshouldBe4')));
      } else {
        if (this.formTransferInfo.recard !== '') {
          // 对第二个密码框单独验证
          this.$refs.formTransferInfo.validateField('recard');
        }
        callback();
      }
    };
    var validateCardCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('canNotBeEmpty')));
      } else if (value !== this.formTransferInfo.card) {
        callback(new Error(this.$t('twiceNotEqual')));
      } else {
        callback();
      }
    };
    return {
      locale: '',
      sequence: '',
      modalPaid: false,
      modalTransferInfo: false,
      modalTransferInfoLoading: false,
      formTransferInfo: {
        name: '',
        card: '',
        recard: '',
      },
      ruleTransferInfo: {
        name: [{ validator: validateEmpty, trigger: 'change' }],
        card: [{ validator: validateCard, trigger: 'change' }],
        recard: [{ validator: validateCardCheck, trigger: 'change' }],
      },
      step: 1,
      timer: null,
      leftTime: 0,
      payLimit: 0,
      confirmLimit: 0,
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
    limitTime: function() {
      if (this.orderInfo) {
        return Math.ceil(this.orderInfo.countDownTime / 1000 / 60 / 60);
      }
    },
    payStatus: function() {
      var statusText = '';
      if (this.orderInfo.status == 4) {
        statusText = 'orderCanceled';
      }
      if (this.orderInfo.status == 7 && !this.orderInfo.paymentTime) {
        statusText = 'outOfTimeToPay';
      }
      return statusText;
    },
    confirmStatus: function() {
      var statusText = '';
      if (this.orderInfo.status == 2 && !this.leftTime) {
        statusText = 'outOfTimeToConfirm';
      }
      if (this.orderInfo.status == 7 && this.orderInfo.paymentTime) {
        statusText = 'outOfTimeToConfirm';
      }
      return statusText;
    },
    currentStep: function() {
      var step = this.orderInfo.status;
      if (this.payStatus !== '') {
        step = 1;
      }
      if (this.confirmStatus !== '') {
        step = 2;
      }
      return step;
    }
  },
  methods: {
    cancelPay() {
      var that = this;
      that.$Modal.confirm({
        title: that.$t('cancelOrder'),
        render: function(h) {
          return h('p', {}, [
            h('span', that.$t('paidAndNoCancel')),
            h('br'),
            h('span', that.$t('helpTipsFourth')),
          ]);
        },
        onOk: function () {
          post('api/cancelOrder', that.sequence).then(function (res) {
            if (res) {
              location.href = 'otc_adverts.html';
            }
          });
        },
        onCancel: function () {
          that.$Modal.remove();
        },
      });
    },
    paid() {
      this.modalPaid = false;
      this.modalTransferInfo = true;
    },
    handleSubmit: function (name) {
      var that = this;
      this.$refs[name].validate(function(valid) {
        if (valid) {
          that.modalTransferInfoLoading = true;
          var data = {
            name: that.formTransferInfo.name,
            card: that.formTransferInfo.card,
            sequence: that.sequence,
          };
          post('api/orderPayed', data).then(function(res) {
            if (res) {
              clearInterval(that.timer);
              that.modalTransferInfo = false;
              that.modalTransferInfoLoading = false;
              that.getOrderInfo(that.sequence);
            }
          });
        }
      });
    },
    handleReset: function(name) {
      this.$refs[name].resetFields();
      this.modalTransferInfo = false;
    },
    copy: function (e) {
      e.target.select();
      document.execCommand('copy');
      Toast.show(e.target.name + this.$t('copied'), { icon: 'ok', duration: 1500 });
    },
    getOrderInfo: function (sequence) {
      var that = this;
      var user = JSON.parse(localStorage.getItem('user'));
      get('api/orderDetail', { sequence: sequence })
        .then(function (res) {
          if (res) {
            if (res.buyerId != user.id) {
              location.href = 'otc_wait_pay.html?sequence=' + sequence;
              return;
            }
            that.orderInfo = res;
            var whatsAppStr = res.seller.userExtView.watchapp;
            that.whatsAppLink = whatsAppStr.substr(whatsAppStr.indexOf('-') + 1).replace(/\s+/g, '');
            var expiredTime = res.countDownTime + Date.now();
            that.timer = setInterval(function () {
              var now = Date.now();
              if ((expiredTime - now) <= 0) {
                that.leftTime = 0;
                clearInterval(that.timer);
              } else {
                that.leftTime = utils.MillisecondToDate(expiredTime - now);
              }
            }, 1000);
          } else {
            location.href = '404.html';
          }
        });
    },
    getTimeLimit: function() {
      var that = this;
      get('/api/rate').then(function(res) {
        that.payLimit = res.payment_limit_time;
        that.confirmLimit = res.trade_limit_time;
      });
    },
  },
  mounted: function () {
    this.timer = null;
    var locale = localStorage.getItem('locale');
    if (locale) {
      this.locale = locale;
      this.$i18n.locale = locale;
    }
    this.$on('locale', function(i) {
      this.locale = i;
      this.$i18n.locale = i;
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
  },
});
