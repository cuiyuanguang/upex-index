

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

//订单状态 待支付1 已支付2 交易成功3 取消4 申诉5  打币中6  异常订单7
var waitPay = new Vue({
  el: '#app',
  i18n: i18n,
  components: {
    oHeader: o_header,
  },
  data: function() {
    return {
      locale: '',
      isPayDialogShow: false,
      leftTime: '',
      payLimit: '',
      confirmLimit: '',
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
    };
  },
  computed: {
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
    confirmOrder: function() {
      var that = this;
      this.$Modal.confirm({
        title: that.$t('confirmReceive'),
        render: function(h) {
          return h('span', that.$t('receiveAll'));
        },
        onOk: function() {
          var data = {
            sequence: that.sequence,
          };
          post('api/confirmOrder', data).then(function(res) {
            if (res) {
              that.getOrderInfo(that.sequence);
            }
          });
        },
        onCancel: function() {
          that.$Modal.remove();
        },
      });
    },
    copy: function(e) {
      e.target.select();
      document.execCommand('copy');
      Toast.show(e.target.name + this.$t('copied'), { icon: 'ok', duration: 1500 });
    },
    getOrderInfo: function(sequence) {
      var that = this;
      var user = JSON.parse(localStorage.getItem('user'));
      get('api/orderDetail', { sequence: sequence }, ).then(function (res) {
        if (res) {
          if (res.sellerId != user.id) {
            location.href = 'otc_pay.html?sequence=' + sequence;
            return;
          }
          //to make sure the status of the order
          that.orderInfo = res;
          that.orderInfo.bankCardLastNum =
            res.description && JSON.parse(res.description).paymentBankCard;
          //to make sure the status of the order
          var whatsAppStr = res.seller.userExtView.watchapp;
          that.whatsAppLink = whatsAppStr.substr(whatsAppStr.indexOf('-') + 1).replace(/\s+/g, '');
          var expiredTime = res.countDownTime + Date.now();
          var timer = setInterval(function () {
            var now = Date.now();
            if ((expiredTime - now) <= 0) {
              that.leftTime = 0;
              clearInterval(timer);
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
        that.confirmLimit = res.trade_limit_time / 60;
      });
    },
  },
  mounted: function() {
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
