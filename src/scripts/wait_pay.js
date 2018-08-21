var i18n = new VueI18n({
  locale: 'zh', // set locale
  fallbackLocale: 'zh',
  messages: utils.transform(messages),
});

//订单状态 待支付1 已支付2 交易成功3 取消4 申诉5  打币中6  异常订单7
var waitPay = new Vue({
  el: '#app',
  i18n: i18n,
  components: {
    oHeader: o_header,
    om_notice: om_notice,
  },
  data: function() {
    return {
      locale: 'zh',
      //trigger of pay modal
      isPayDialogShow: false,
      //trigger of pay info modal
      //trigger of trade success
      //step of pay
      step: 1,
      //left time for pay
      leftTime: 0,
      //pay time
      payLimit: 0,
      confirmLimit: 0,
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
    };
  },
  methods: {
    confirmOrder: function() {
      var that = this;
      this.$Modal.confirm({
        title: that.$t('confirmReceive'),
        content: that.$t('receiveAll'),
        onOk: function() {
          var data = {
            sequence: that.sequence,
          };
          post('api/confirmOrder', data).then(function(res) {
            if (res) {
              that.step = 3;
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
    next: function() {
      this.step += 1;
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
          that.step = res.status;
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
        that.confirmLimit = res.trade_limit_time;
      });
    },
  },
  mounted: function() {
    var locale = localStorage.getItem('locale');
    if (locale) {
      this.$i18n.locale = locale;
    }
    var that = this;
    this.$on('locale', function(i) {
      that.locale = i;
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
