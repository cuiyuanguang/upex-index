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
      isTradeSuccess: false,
      //step of pay
      step: 1,
      //left time for pay
      leftTime: 0,
      //pay time
      payTime: 0,
      //create time
      ctime: 0,
      //-----------order info-----------------//
      orderInfo: {
        totalPrice: 0,
        totalVolume: 0,
        orderId: 0,
        bankCard: [],
        phone: '',
        socialNumber: '',
      },
    };
  },
  computed: {
    arrivalTime: function() {
      var date = new Date(this.orderInfo.paymentTime);
      return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    },
    whatsAppLink: function() {
      var whatsAppStr = this.orderInfo.socialNumber;
      return whatsAppStr.substr(whatsAppStr.indexOf(',') + 1);
    },
  },
  methods: {
    confirmOrder: function() {
      var _this = this;
      this.$Modal.confirm({
        title: '确认收款',
        content: '是否已经收到货款？',
        onOk: function() {
          var data = {
            sequence: _this.sequence,
          };
          post('api/confirmOrder', data).then(function(res) {
            if (res.success) {
              _this.step = 3;
              _this.getOrderInfo(_this.sequence);
            }
          });
        },
        onCancel: function() {
          _this.$Modal.remove();
        },
      });
    },
    //------------end-----------------
    copy: function(e) {
      e.target.select();
      document.execCommand('copy');
      Toast.show(e.target.name + ' copied', { icon: 'ok', duration: 1500 });
    },
    //Countdown
    payCountdown: function(createTime, limitTime) {
      var that = this;
      setInterval(function() {
        var now = new Date().getTime();
        var expiredTime;
        // if time is seconds
        if (limitTime > 1000) {
          expiredTime = limitTime;
        } else {
          expiredTime = createTime + limitTime * 60 * 1000;
        }
        if (expiredTime - now <= 0) {
          that.leftTime = 0;
        } else {
          that.leftTime = utils.MillisecondToDate(expiredTime - now);
        }
      }, 1000);
    },
    //------------end-----------------
    //next step ----------------------
    next: function() {
      this.step += 1;
    },
    //-------------------------GET ORDER INFO-----------------------------------------------//
    getOrderInfo: function(sequence) {
      var that = this;
      var user = JSON.parse(sessionStorage.getItem('user'));
      get('api/orderDetail', { sequence: sequence }, ).then(function (res) {
        var data = res.data.data;
        if (data.sellerId != user.id) {
          location.href = 'otc_pay.html?sequence=' + sequence;
          return;
        }
        //to make sure the status of the order
        that.step = data.status;
        //if trade success ,show the notice of  usdt arrival
        if (data.status == 3) {
          that.isTradeSuccess = true;
        }
        //create time of the order
        //limit time of pay
        //if order  paid
        var payTime;
        if (data.status == 2) {
          payTime = data.limitTime;
        }
        //if order not paid
        else {
          payTime = data.advert.limitTime;
        }
        //start Countdown
        that.payCountdown(data.ctime, payTime);
        // set  orderInfo;
        that.orderInfo.totalPrice = data.totalPrice;
        that.orderInfo.totalVolume = data.volume;
        that.orderInfo.orderId = data.sequence;
        that.orderInfo.phone = data.buyer.hideMobileNumber;
        that.orderInfo.bankCard = data.paymentBanks;
        that.orderInfo.bankCardLastNum =
          data.description && JSON.parse(data.description).paymentBankCard;
        that.orderInfo.socialNumber = data.buyer.userExtView.watchapp;
        that.orderInfo.nickname = data.buyer.showNickName;
      });
    },
    //------------------------------GET ORDER INFO END---------------------------------------//
  },
  mounted: function() {
    var locale = localStorage.getItem('locale');
    if (locale) {
      document.body.dir = locale === 'zh' ? 'ltr' : 'rtl';
      this.$i18n.locale = locale;
    }
    var that = this;
    this.$on('locale', function(i) {
      that.locale = i;
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
  },
});
