Vue.use(VueI18n);

var i18n = new VueI18n({
  locale: 'zh', // set locale
  messages: utils.transform(messages),
});

var pay = new Vue({
  el: "#app",
  i18n: i18n,
  components: {
    oHeader: o_header,
    om_notice: om_notice,
    oinput: o_input,
  },
  data: function () {
    return {
      locale: 'zh',
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
    }
  },
  methods: {
    //pay modal methods-------------
    toPay() {
      this.isPayDialogShow = true;
    },
    cancelPay() {
      var _this = this;
      this.$Modal.confirm({
        title: '取消订单',
        content: '<p><span class="error">如您已向卖家付款，请千万不要取消订单</span><br>当日累计3次取消，会限制当日购买功能</p>',
        onOk: function () {
          post('api/cancelOrder', '${sequence}').then(function (res) {
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
        if (time > 1000) {
          expiredTime = limitTime;
        }
        //if time is million seconds
        else {
          expiredTime = createTime + limitTime * 60 * 1000;
        }
        if ((expiredTime - now) < 0) {
          that.leftTime = "order expired!"
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
        this.cardErrorTips = "不能为空";
        return;
      } else {
        this.cardErrorTips = "";
      }
      if (!this.recard) {
        this.recardErrorTips = "不能为空";
        return;
      } else {
        this.recardErrorTips = "";
      }
      if (this.cardErrorTips || this.recardErrorTips) {
        return;
      }
      var that = this;
      var data = {
        card: this.card,
        sequence: '${sequence}'
      }
      post("api/orderPayed", data).then(function (res) {
        if (res.success) {
          that.isPayInfoDialogShow = false;
          that.getOrderInfo();
        }
      })
    },
    //------------end-----------------
    copy: function (e) {
      e.target.select();
      document.execCommand("copy");
      Toast.show(e.target.name + ' copied', { icon: 'ok', duration: 1500 });
    },
    //next step ----------------------
    next() {
      this.step += 1;
    },
    //-------------------------GET ORDER INFO-----------------------------------------------//
    getOrderInfo: function () {
      var that = this
      get('api/orderDetail', { 'sequence': '${sequence}' }, )
        .then(function (res) {
          var data = res.data.data;
          //to make sure the status of the order
          that.step = data.status;
          //create time of the order
          //limit time of pay
          //if order  paid
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
        });
    }
    //------------------------------GET ORDER INFO END---------------------------------------//	
  },
  mounted: function () {
    this.getOrderInfo();
  },
  watch: {
    locale: function(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$i18n.locale = newVal;
      }
    },
    card: function (n, o) {
      if (n.length > 4) {
        this.card = o;
      }
    },
    recard: function (n, o) {
      if (n.length > 4) {
        this.recard = o;
      }
      if (n != this.card) {
        this.recardErrorTips = "两次输入的信息不一致";
      } else {
        this.recardErrorTips = "";
      }
    }
  },
});