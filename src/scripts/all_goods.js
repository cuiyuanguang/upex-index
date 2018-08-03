var i18n = new VueI18n({
  locale: 'zh', // set locale
  fallbackLocale: 'zh',
  messages: utils.transform(messages),
});

var allGoods = new Vue({
  el: '#app',
  i18n: i18n,
  components: {
    oHeader: o_header,
    bindcard: o_bindcard,
    confirm: o_confirm,
    gauth: g_auth,
    acontact: addContact,
    selectcard: selectCard,
  },
  data: function() {
    return {
      locale: 'zh',
      //挂单相关数据
      showListTag: 'BUY',
      postOrderTag: 'BUY',
      postErroMsg: '',
      postData: {
        checkType: '1',
        checkValue: '',
        description: '',
        maxTrade: '',
        minTrade: '',
        price: '',
        volume: '',
        maxTradeBUY: '',
        minTradeBUY: '',
        priceBUY: '',
        volumeBUY: '',
        maxTradeSELL: '',
        minTradeSELL: '',
        priceSELL: '',
        volumeSELL: '',
        side: '',
      },
      sendText: '',
      sms: false,
      gCode: '',
      smsCode: '',
      marketPrice: {
        exchange_rate: '',
        exchange_buy_max: '',
        exchange_sell_min: '',
      },
      //END挂单相关数据
      //user info
      isGoogleBind: false,
      isCardBind: false,
      isWatchAppBind: false,
      //bank card status
      cardInfo: [],
      selectedCard: [],
      cardStatus: [],
      tradeCard: [],
      balance: 0,
      //END user info
      buyDisabled: false,
      sellDisabled: false,
      //triggers
      isMyordersShow: false,
      isBuyDialogShow: false,
      isPostDialogShow: false,
      isPricePromptShow: false,
      isPendModalShow: false,
      showMoreSettings: true,
      isBindCardShow: false,
      isConfirmBindShow: false,
      isGoogleAuthShow: false,
      isContactShow: false,
      isSelectCardShow: false,
      // all error msg
      error: {
        buyError: '',
        postError: '',
        postDataError: '',
      },
      buyData: {
        id: 0,
        amount: 0,
        price: 0,
        method: '测试',
        buyAmount: '',
        sum: 0,
        paymentBanks: [],
        min: 0,
        max: 0,
        buyTotal: '',
      },
      buyAmountAppendText: 'SAR',
      buyAmountErrorText: '',
      buyTotalAppendText: 'USDT',
      buyTotalErrorText: '',
      totalPage: 0,
      buyTotal: 0,
      sellTotal: 0,
      pageSize: 10,
      buyCurrentPage: 1,
      sellCurrentPage: 1,
      selllist: [],
      buylist: [],
    };
  },
  computed: {
    buyAmountMax: function() {
      var amount = Math.min(this.buyData.restAmount * this.buyData.price, this.buyData.max);
      return amount.toFixed(2);
    },
    buyTotalMin: function() {
      return (this.buyData.min / this.buyData.price).toFixed(4);
    },
    buyTotalMax: function() {
      var amount = Math.min(this.buyData.max / this.buyData.price, this.buyData.restAmount);
      return amount.toFixed(4);
    },
    postTotalPrice: function() {
      return (this.postData['volume' + this.postOrderTag] * this.postData['price' + this.postOrderTag]).toFixed(2);
    },
    postBuyMax: function() {
      return this.postTotalPrice > 0 ? Math.min(this.postTotalPrice, this.marketPrice.trade_max_price) : this.marketPrice.trade_max_price;
    },
    postSellMax: function() {
      return Math.min(this.postTotalPrice, this.marketPrice.trade_max_price);
    },
  },
  methods: {
    inputNumberBlur: function(val) {
      console.log(val);
    },
    getUserInfo: function() {
      var user = JSON.parse(localStorage.getItem('user'));
      this.whatsApp = user && user.userExtView.watchapp;
      this.balance = user && user.usdtAmount.balance;
      this.isGoogleBind = user && user.googleAuthenticatorStatus === 1;
      this.isWatchAppBind = user && user.userExtView.watchapp;
    },
    getBindedCard: function() {
      var that = this;
      get('api/bankCard').then(function(result) {
        if (result.data.data.length > 0) {
          that.isCardBind = true;
          that.cardInfo = result.data.data;
        }
      });
    },
    setCardStatus: function() {
      this.cardStatus = this.cardInfo.map(function(item) { return item !== null});
    },
    getSelectCards: function(s, c) {
      var that = this;
      for (var i = 0; i < s.length; i++) {
        if (s[i]) {
          that.selectedCard.push(c[i]);
        }
      }
    },
    changeAmount: function() {
      var value = this.buyData.buyAmount;
      if (value < this.buyData.min || value > this.buyData.max) {
        this.buyAmountErrorText =
          '请输入' + this.buyData.min + '到' + this.buyData.max + '之间的数字';
        return;
      } else {
        this.buyAmountErrorText = '';
        this.buyTotalErrorText = '';
        this.buyData.buyTotal = (value / this.buyData.price).toFixed(4);
      }
    },
    changeTotal: function() {
      var value = this.buyData.buyTotal;
      if (value < this.buyTotalMin || value > this.buyTotalMax) {
        this.buyTotalErrorText =
          '请输入' + this.buyTotalMin + '到' + this.buyTotalMax + '之间的数字';
        return;
      } else {
        this.buyTotalErrorText = '';
        this.buyAmountErrorText = '';
        this.buyData.buyAmount = (value * this.buyData.price).toFixed(2);
      }
    },
    tradeAll: function(type) {
      if (type === 'amount') {
        this.buyData.buyAmount = this.buyAmountMax;
        this.changeAmount();
      }
      if (type === 'total') {
        this.buyData.buyTotal = this.buyTotalMax;
        this.changeTotal();
      }
    },
    // sell USDT
    showSellUsdt: function(i) {
      // check if login
      if (!localStorage.getItem('user')) {
        this.$refs.header.showLogin();
        return;
      }
      //check if google authed
      if (!this.isGoogleBind) {
        this.isGoogleAuthShow = true;
        return;
      }
      //check if card binded
      if (!this.isCardBind) {
        this.isBindCardShow = true;
        return;
      }
      // check if contact binded
      if (!this.isWatchAppBind) {
        this.isContactShow = true;
        return;
      }
      //check if card selected
      // if(this.tradeCard.length<1){
      // 	this.isSelectCardShow=true;
      // 	return;
      // }
      this.isBuyDialogShow = true;
      this.buyData.id = i.id;
      this.buyData.price = i.price;
      this.buyData.method =
        i.paymentBanks &&
        i.paymentBanks
          .map(function(item) {
            return item.bankName;
          })
          .join('<br/>');
      this.buyData.restAmount = i.volume;
      this.buyData.paymentBanks = this.tradeCard;
      this.buyData.min = i.minTrade;
      this.buyData.max = i.maxTrade;
    },
    //buy USDT
    showBuyUsdt: function(i) {
      // check if login
      if (!localStorage.getItem('user')) {
        this.$refs.header.showLogin();
        return;
      }
      this.isBuyDialogShow = true;
      if (i) {
        this.buyData.id = i.id;
        this.buyData.price = i.price;
        this.buyData.method =
          i.paymentBanks &&
          i.paymentBanks
            .map(function(item) {
              return item.bankName + '<br>';
            })
            .join('');
        this.buyData.restAmount = i.volume;
        this.buyData.min = i.minTrade;
        this.buyData.max = i.maxTrade;
      }
    },
    //buy
    buy: function() {
      if (!localStorage.getItem('user')) {
        this.$refs.header.showLogin();
        return;
      }
      if (!this.buyData.buyTotal || !this.buyData.buyAmount) {
        this.buyAmountErrorText = '不能为空';
        this.buyTotalErrorText = '不能为空';
        return;
      }
      var that = this;
      var data = {
        advertId: this.buyData.id,
        volume: this.buyData.buyTotal,
        totalPrice: this.buyData.buyAmount,
      };
      post('api/buyOrder', data).then(function(res) {
        if (res.success) {
          var sequence = res.data.data.sequence;
          that.isBuyDialogShow = false;
          window.location.href = 'otc_pay.html?sequence=' + sequence;
        }
      });
    },
    //sell usdt
    sell: function() {
      if (!localStorage.getItem('user')) {
        this.$refs.header.showLogin();
        return;
      }
      if (!this.buyData.buyTotal || !this.buyData.buyAmount) {
        this.buyAmountErrorText = '不能为空';
        this.buyTotalErrorText = '不能为空';
        return;
      }
      var that = this;
      var data = {
        advertId: this.buyData.id,
        volume: this.buyData.buyTotal,
        totalPrice: this.buyData.buyAmount,
      };
      post('api/sellOrder', data).then(function(res) {
        if (res.success) {
          var sequence = res.data.data.sequence;
          that.isBuyDialogShow = false;
          window.location.href = 'otc_wait_pay.html?sequence=' + sequence;
        }
      });
    },
    showPostDialog: function() {
      // check if login
      var user = JSON.parse(localStorage.getItem('user'));
      this.whatsApp = user.userExtView.watchapp;
      this.balance = user.usdtAmount.balance;
      this.isGoogleBind = user.googleAuthenticatorStatus === 1;
      this.isWatchAppBind = user.userExtView.watchapp;
      if (!user.id) {
        this.$refs.header.showLogin();
        return;
      }
      //check if google authed
      if (!this.isGoogleBind) {
        this.isGoogleAuthShow = true;
        return;
      }
      //check if card binded
      if (!this.isCardBind) {
        this.isBindCardShow = true;
        return;
      }
      // check if contact binded
      if (!this.isWatchAppBind) {
        this.isContactShow = true;
        return;
      }
      var that = this;
      // 获取市场价格
      get('api/rate').then(function(res) {
        if (res.success) {
          that.marketPrice.exchange_rate = res.data.data.exchange_rate;
          that.marketPrice.exchange_buy_max = res.data.data.exchange_buy_max;
          that.marketPrice.exchange_sell_min = res.data.data.exchange_sell_min;
          that.marketPrice.trade_min_price = res.data.data.trade_min_price;
          that.marketPrice.trade_max_price = res.data.data.trade_max_price;
          that.postData.minTradeBUY = res.data.data.trade_min_price;
          that.postData.minTradeSELL = res.data.data.trade_min_price;
          that.postData.maxTradeBUY = res.data.data.trade_max_price;
          that.postData.maxTradeSELL = res.data.data.trade_max_price;
          // 获取用户余额
          get('api/finance/account_balance').then(function(res) {
            if (res.success) {
              that.balance = res.data.data.allCoinMap.USDT.normal_balance;
            }
          });
          // 获取发单数量及类型
          get('api/personAdverts/cnt').then(function(res) {
            var buyCount = res.data.data.BUY;
            var sellCount = res.data.data.SELL;
            if (buyCount >= 2 && sellCount >= 2) {
              Toast.show(that.$t('dealOrderBeforeRelease'), { icon: 'warning' });
            } else if (buyCount >= 2 && sellCount < 2) {
              Toast.show(that.$t('releaseSellOnly'), {
                icon: 'warning',
                duration: 1500,
                callback: function() {
                  that.buyDisabled = true;
                  that.postOrderTag = 'SELL';
                  that.isPostDialogShow = true;
                },
              });
            } else if (buyCount < 2 && sellCount >= 2) {
              Toast.show(that.$t('releaseBuyOnly'), {
                icon: 'warning',
                duration: 1500,
                callback: function() {
                  that.sellDisabled = true;
                  that.postOrderTag = 'BUY';
                  that.isPostDialogShow = true;
                },
              });
            } else {
              that.isPostDialogShow = true;
            }
          });
        }
      });
    },
    //post order
    postOrder: function() {
      var tag = this.postOrderTag;
      this.$refs['inputNumberPrice' + tag].focused = false;
      this.$refs['inputNumberVolume' + tag].focused = false;
      this.$refs['inputNumberPrice' + tag].currentValue = this.postData['price' + tag];
      this.$refs['inputNumberVolume' + tag].currentValue = this.postData['volume' + tag];
      if (
        !this.postData['price' + tag] ||
        !this.postData['volume' + tag] ||
        !this.postData['minTrade' + tag] ||
        !this.postData['maxTrade' + tag]
      ) {
        this.error.postDataError = '不能为空';
        return;
      } else {
        this.error.postDataError = '';
      }
      if (parseFloat(this.postData['maxTrade' + tag]) < parseFloat(this.postData['minTrade' + tag])) {
        this.error.postDataError = '最大限额不能小于最小限额';
        return;
      }
      if (
        parseFloat(this.postData['price' + tag]) * parseFloat(this.postData['volume' + tag]) <
        parseFloat(this.postData['maxTrade' + tag])
      ) {
        this.error.postDataError = '最大限额不能大于总价';
        return;
      }
      if (parseFloat(this.postData['price' + tag]) > this.marketPrice.exchange_rate * 1.5) {
        this.postErroMsg = this.$t('moreThan50Percent');
        this.isPricePromptShow = true;
        this.isPostDialogShow = false;
        return;
      }
      if (parseFloat(this.postData['price' + tag]) < this.marketPrice.exchange_rate * 0.5) {
        this.postErroMsg = this.$t('lessThan50Percent');
        this.isPricePromptShow = true;
        this.isPostDialogShow = false;
        return;
      }
      if (tag == 'BUY') {
        if (parseFloat(this.postData['price' + tag]) > this.marketPrice.exchange_sell_max) {
          this.postErroMsg = this.$t('lessThanHighestPurchase');
          this.isPricePromptShow = true;
          this.isPostDialogShow = false;
          return;
        }
      }
      if (tag == 'SELL') {
        if (parseFloat(this.postData['price' + tag]) > this.marketPrice.exchange_buy_min) {
          this.postErroMsg = this.$t('moreThanLowestPrice');
          this.isPricePromptShow = true;
          this.isPostDialogShow = false;
          return;
        }
      }
      this.postErroMsg = '请确认你的信息';
      this.isPostDialogShow = false;
      this.isPendModalShow = true;
    },
    // back to modify the post order price
    modifyPostOrder: function() {
      this.isPendModalShow = false;
      this.isConfirmBindShow = false;
      this.isPricePromptShow = false;
      this.isPostDialogShow = true;
    },
    //confirm post order
    confirmRelease: function() {
      this.setCardStatus();
      this.isPricePromptShow = false;
      this.isPendModalShow = true;
    },
    clearPostModal: function() {
      for (var key in this.postData) {
        if (this.postData.hasOwnProperty(key)) {
          if (key == 'checkType') {
            this.postData['checkType'] = '1';
          } else {
            this.postData[key] = '';
          }
        }
      }
      this.gCode = '';
      this.smsCode = '';
      this.error.postDataError = '';
    },
    // comfirm post order
    confirmPostOrder: function() {
      var that = this;
      var tag = this.postOrderTag;
      this.getSelectCards(this.cardStatus, this.cardInfo);
      this.postData.checkValue = this.postData.checkType == '1' ? this.gCode : this.smsCode;
      if (!this.postData.checkValue) {
        this.error.postError = '验证码不能为空!';
        return;
      }
      if (tag == 'SELL') {
        if (this.selectedCard.length < 1) {
          this.error.postError = '至少选择一张银行卡!';
          return;
        }
        this.postData.paymentBanks = this.selectedCard;
      }
      this.postData.side = tag;
      this.postData.price = this.postData['price' + tag];
      this.postData.volume = this.postData['volume' + tag];
      this.postData.minTrade = this.postData['minTrade' + tag];
      this.postData.maxTrade = this.postData['maxTrade' + tag];
      post('api/advert', this.postData).then(function(res) {
        if (res.success) {
          that.isPendModalShow = false;
          that.clearPostModal();
          if (that.postOrderTag === 'BUY') {
            that.toBuyPage(1);
          }
          if (that.postOrderTag === 'SELL') {
            that.toSellPage(1);
          }
        }
      });
    },
    sendMsg: function() {
      var that = this;
      get('api/verifycode_sms', {
        type: 8,
      }).then(function(res) {
        if (res.success) {
          that.sms = true;
          that.sendMsgCountDown();
        } else {
        }
      });
    },
    sendMsgCountDown: function() {
      var that = this;
      that.sendText = 300;
      var b = setInterval(function() {
        that.sendText--;
        if (that.sendText == 0) {
          that.sms = false;
          clearInterval(b);
        }
      }, 1000);
    },
    closeBuyDialog: function() {
      this.isBuyDialogShow = false;
      this.buyData.buyAmount = '';
      this.buyData.buyTotal = '';
      this.buyAmountErrorText = '';
      this.buyTotalErrorText = '';
    },
    closePostDialog: function() {
      this.clearPostModal();
      this.isPostDialogShow = false;
    },
    // sell page handle
    toSellPage: function(page) {
      var that = this;
      var data = {
        coin: 'USDT',
        page: page || 1,
        pageSize: that.pageSize,
        side: 'SELL',
      };
      get('api/adverts', data).then(function(res) {
        if (res.success) {
          that.totalPage = Math.round(res.data.data.count / that.pageSize);
          that.buylist = res.data.data.rsts;
          that.buyCurrentPage = page;
          that.buyTotal = res.data.data.count;
        }
      });
    },
    // buy page handle
    toBuyPage: function(page) {
      var that = this;
      var data = {
        coin: 'USDT',
        page: page || 1,
        pageSize: that.pageSize,
        side: 'BUY',
      };
      get('api/adverts', data).then(function(res) {
        if (res.success) {
          that.totalPage = Math.round(res.data.data.count / that.pageSize);
          that.selllist = res.data.data.rsts;
          that.sellCurrentPage = page;
          that.sellTotal = res.data.data.count;
        }
      });
    },
  },
  mounted: function() {
    var that = this;
    var locale = localStorage.getItem('locale');
    if (locale) {
      document.body.dir = locale === 'zh' ? 'ltr' : 'rtl';
      this.$i18n.locale = locale;
    }
    this.$on('locale', function(i) {
      that.locale = i;
    });
    this.$on('isBindShow', function(i) {
      that.isBindCardShow = i;
    });
    this.$on('isConfirmShow', function(i) {
      that.isConfirmBindShow = i;
    });
    this.$on('isGoogleAuthShow', function(i) {
      that.isGoogleAuthShow = i;
    });
    this.$on('isContactShow', function(i) {
      that.isContactShow = i;
    });
    this.$on('isCardBinded', function(i) {
      that.isCardBind = i;
      if (i) {
        that.getBindedCard();
      }
    });
    this.$on('isAddContactShow', function(i) {
      that.isContactShow = i;
    });
    this.$on('tradeCards', function(i) {
      that.tradeCard = i;
    });
    this.$on('isSelectCardShow', function(i) {
      that.isSelectCardShow = i;
    });
    if (utils.getCookie('token')) {
      this.getUserInfo();
      this.getBindedCard();
    }
    this.toBuyPage();
    this.toSellPage();
  },
  watch: {
    locale: function(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$i18n.locale = newVal;
      }
    },
    gCode: function(n, o) {
      if (null != n) {
        this.error.postError = '';
      }
    },
    postTotalPrice: function(newVal, oldVal) {
      if (newVal > this.marketPrice.trade_max_price) {
        this.postData['maxTrade' + this.postOrderTag] = this.marketPrice.trade_max_price;
      } else if (newVal > 0 && newVal < this.marketPrice.trade_max_price) {
        this.postData['maxTrade' + this.postOrderTag] = newVal;
      } else {
        this.postData['maxTrade' + this.postOrderTag] = this.marketPrice.trade_max_price;
      }
    },
  },
});
