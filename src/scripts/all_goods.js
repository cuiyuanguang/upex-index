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
    // bindcard: o_bindcard,
    // confirm: o_confirm,
    acontact: addContact,
    selectcard: selectCard,
  },
  data: function() {
    var validateGoogle = (rule, value, callback) => {
      if (value === '' && this[rule.name].phone === '') {
        callback(new Error(this.$t('canNotBeEmpty')));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if (value === '' && this[rule.name].google === '') {
        callback(new Error(this.$t('canNotBeEmpty')));
      } else {
        callback();
      }
    };
    var validateMinTrade = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('canNotBeEmpty')));
      } else if (value < this.marketPrice.trade_min_price) {
        callback(new Error(this.$t('minNoLessThanSysMin')));
      } else {
        callback();
      }
    };
    var validateMaxTrade = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('canNotBeEmpty')));
      } else if (value < this.formRelease.minTrade) {
        callback(new Error(this.$t('maxNoLessThanMin')));
      } else if (this.releaseTotalPrice > 0 && value > this.releaseTotalPrice) {
        callback(new Error(this.$t('maxNoMoreThanTotal')))
      } else if (value > this.marketPrice.trade_max_price) {
        callback(new Error(this.$t('maxNoMoreThanSysMax')));
      } else {
        callback();
      }
    };
    return {
      locale: 'zh',
      //挂单相关数据
      showListTag: 'BUY',
      postOrderTag: 'BUY',
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
      userId: '',
      isGoogleBind: false,
      isCardBind: false,
      isWatchAppBind: false,
      //bank card status
      cardList: [],
      cardStatus: [],
      tradeCard: [],
      balance: 0,
      //END user info
      //triggers
      isMyordersShow: false,
      isBuyDialogShow: false,
      isPostDialogShow: true,
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
      modalOperationOrder: false,
      cancelable: false,
      pauseable: false,
      modalMsg: {
        title: '',
        desc: '',
        confirmText: '确认',
      },
      action: '',
      advertId: '',
      sequence: '',
      whatsApp: '',
      // 新添加的绑定银行卡代码
      sendPlaceholderBank: this.$t('sendVerify'),
      sendDisabledBank: false,
      // 添加/修改银行卡
      modalBankInfo: false,
      formBankInfo: {
        bankName: '',
        name: '',
        cardNo: '',
        ibanNo: '',
      },
      ruleBankInfo: {
        bankName: [{ required: true, message: this.$t('canNotBeEmpty'), trigger: 'change' }],
        name: [{ required: true, message: this.$t('canNotBeEmpty'), trigger: 'change' }],
        cardNo: [{ required: true, message: this.$t('canNotBeEmpty'), trigger: 'change' }],
        ibanNo: [{ required: true, message: this.$t('canNotBeEmpty'), trigger: 'change' }],
      },
      modalBankConfirmTitle: '',
      modalBankConfirmCancel: '',
      modalBankConfirm: false,
      tabVerifyActive: 1,
      formBankConfirm: {
        phone: '',
        google: '',
      },
      ruleBankConfirm: {
        phone: [{ name: 'formBankConfirm', validator: validatePhone, trigger: 'change' }],
        google: [{ name: 'formBankConfirm', validator: validateGoogle, trigger: 'change' }],
      },
      // 发布挂单
      modalRelease: false,
      buyDisabled: false,
      sellDisabled: false,
      releaseMaxPrice: '',
      formRelease: {
        side: 'BUY',
        price: '',
        volume: '',
        minTrade: '',
        maxTrade: '',
      },
      ruleRelease: {
        side: [{ name: 'formRelease', required: true, message: this.$t('canNotBeEmpty'), trigger: 'change' }],
        price: [{ required: true, type: 'number', message: this.$t('numericRequired'), trigger: 'change' }],
        volume: [{ required: true, type: 'number', message: this.$t('numericRequired'), trigger: 'change' }],
        minTrade: [{ name: 'formRelease', validator: validateMinTrade, trigger: 'change' }],
        maxTrade: [{ name: 'formRelease', validator: validateMaxTrade, trigger: 'change' }],
      },
      modalReleaseWarning: false,
      releaseWarning: '',
      selectedCardIds: [],
      modalReleaseConfirm: false,
      formReleaseConfirm: {
        phone: '',
        google: '',
      },
      ruleReleaseConfirm: {
        phone: [{ name: 'formReleaseConfirm', validator: validatePhone, trigger: 'change' }],
        google: [{ name: 'formReleaseConfirm', validator: validateGoogle, trigger: 'change' }],
      },
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
    releaseTotalPrice: function() {
      return (this.formRelease.price * this.formRelease.volume).toFixed(2);
    },
    postBuyMax: function() {
      return this.releaseTotalPrice > 0 ? Math.min(this.releaseTotalPrice, this.marketPrice.trade_max_price) : this.marketPrice.trade_max_price;
    },
    postSellMax: function() {
      return Math.min(this.releaseTotalPrice, this.marketPrice.trade_max_price);
    },
  },
  methods: {
    getUserInfo: function() {
      var user = JSON.parse(localStorage.getItem('user'));
      this.userId = user && user.id;
      this.whatsApp = user && user.userExtView.watchapp;
      this.balance = user && user.usdtAmount.balance;
      this.isGoogleBind = user && user.googleAuthenticatorStatus === 1;
      this.isWatchAppBind = user && user.userExtView.watchapp;
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
        if (res) {
          that.totalPage = Math.round(res.count / that.pageSize);
          that.buylist = res.rsts || [];
          that.buyCurrentPage = page;
          that.buyTotal = res.count;
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
        if (res) {
          that.totalPage = Math.round(res.count / that.pageSize);
          that.selllist = res.rsts || [];
          that.sellCurrentPage = page;
          that.sellTotal = res.count;
        }
      });
    },
    pause: function(item) {
      this.action = item.status === 6 ? 'start' : 'pause';
      this.advertId = item.id;
      this.modalMsg = {
        title: item.status === 6 ? this.$t('start') : this.$t('pause'),
        desc: this.$t('confirm') + this.$t(this.action) + this.$t('thisOrder'),
        confirmText: this.$t('confirm'),
      };
      this.modalOperationOrder = true;
    },
    cancel: function(item) {
      if (item.status === 5 || item.status === 6) {
        this.modalMsg = {
          title: this.$t('unremovable'),
          desc: this.$t('unremovableTips'),
          confirmText: this.$t('unremovableOperation'),
        };
      } else {
        this.modalMsg = {
          title: this.$t('removable'),
          desc: this.$t('removableTips'),
          confirmText: this.$t('confirm'),
        };
        this.cancelable = true;
        this.advertId = item.id;
        this.sequence = item.sequence;
      }
      this.modalOperationOrder = true;
      this.action = 'cancel';
    },
    manualAction: function() {
      var that = this;
      var api = {
        pause: 'api/suspendAdvert',
        start: 'api/openAdvert',
        cancel: 'api/closeAdvert',
      };
      if (
        (that.cancelable && that.action === 'cancel') ||
        that.action === 'pause' ||
        that.action === 'start'
      ) {
        post(api[that.action], that.advertId).then(function(res) {
          if (res) {
            that.showListTag === 'BUY' ? that.toBuyPage(1) : that.toSellPage(1);
          }
          that.modalOperationOrder = false;
        });
      }
    },
    getBindedCard: function() {
      var that = this;
      get('api/bankCard').then(function(result) {
        if (result.length > 0) {
          that.isCardBind = true;
          that.cardList = result;
          that.selectedCardIds = result.map(function(item) { return item.id });
        }
      });
    },
    changeAmount: function() {
      var value = this.buyData.buyAmount;
      if (value < this.buyData.min || value > this.buyData.max) {
        this.buyAmountErrorText =
          this.$t('buyInputLimit') + this.buyData.min + '-' + this.buyData.max;
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
          this.$t('buyInputLimit') + this.buyTotalMin + '-' + this.buyTotalMax;
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
    showSellUsdt: function(item) {
      // check if login
      // this.getUserInfo();
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
      this.isBuyDialogShow = true;
      this.buyData.id = item.id;
      this.buyData.price = item.price;
      this.buyData.method =
        item.paymentBanks &&
        item.paymentBanks
          .map(function(item) {
            return item.bankName;
          })
          .join('<br/>');
      this.buyData.restAmount = (item.volume - item.sell).toFixed(4);
      this.buyData.paymentBanks = this.tradeCard;
      this.buyData.min = item.minTrade;
      this.buyData.max = item.maxTrade;
    },
    //buy USDT
    showBuyUsdt: function(item) {
      // check if login
      // this.getUserInfo();
      if (!localStorage.getItem('user')) {
        this.$refs.header.showLogin();
        return;
      }
      this.isBuyDialogShow = true;
      if (item) {
        this.buyData.id = item.id;
        this.buyData.price = item.price;
        this.buyData.method =
          item.paymentBanks &&
          item.paymentBanks
            .map(function(item) {
              return item.bankName + '<br>';
            })
            .join('');
        this.buyData.restAmount = (item.volume - item.sell).toFixed(4);
        this.buyData.min = item.minTrade;
        this.buyData.max = item.maxTrade;
      }
    },
    //buy
    buy: function() {
      if (this.buyAmountErrorText) return;
      if (!localStorage.getItem('user')) {
        this.$refs.header.showLogin();
        return;
      }
      if (!this.buyData.buyTotal || !this.buyData.buyAmount) {
        this.buyAmountErrorText = this.$t('canNotBeEmpty');
        this.buyTotalErrorText = this.$t('canNotBeEmpty');
        return;
      }
      var that = this;
      var data = {
        advertId: this.buyData.id,
        volume: this.buyData.buyTotal,
        totalPrice: this.buyData.buyAmount,
      };
      post('api/buyOrder', data).then(function(res) {
        if (res) {
          that.isBuyDialogShow = false;
          window.location.href = 'otc_pay.html?sequence=' + res.sequence;
        }
      });
    },
    //sell usdt
    sell: function() {
      if (this.buyAmountErrorText) return;
      if (!localStorage.getItem('user')) {
        this.$refs.header.showLogin();
        return;
      }
      if (!this.buyData.buyTotal || !this.buyData.buyAmount) {
        this.buyAmountErrorText = this.$t('canNotBeEmpty');
        this.buyTotalErrorText = this.$t('canNotBeEmpty');
        return;
      }
      var that = this;
      var data = {
        advertId: this.buyData.id,
        volume: this.buyData.buyTotal,
        totalPrice: this.buyData.buyAmount,
      };
      post('api/sellOrder', data).then(function(res) {
        if (res) {
          var sequence = res.sequence;
          that.isBuyDialogShow = false;
          window.location.href = 'otc_wait_pay.html?sequence=' + sequence;
        }
      });
    },
    showPostDialog: function() {
      // check if login
      var that = this;
      var user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.id) {
        that.$refs.header.showLogin();
        return;
      }
      get('api/userInfo').then(function (result) {
        localStorage.setItem('user', JSON.stringify(result));
        var user = result;
        that.whatsApp = user && user.userExtView.watchapp;
        that.balance = user && user.usdtAmount.balance;
        that.isGoogleBind = user && user.googleAuthenticatorStatus === 1;
        that.isWatchAppBind = user && user.userExtView.watchapp;
        //check if google authed
        if (!that.isGoogleBind) {
          that.isGoogleAuthShow = true;
          return;
        }
        //check if card binded
        if (!that.isCardBind) {
          that.isBindCardShow = true;
          return;
        }
        // check if contact binded
        if (!that.isWatchAppBind) {
          that.isContactShow = true;
          return;
        }
        // 获取市场价格
        get('api/rate').then(function(res) {
          if (res) {
            that.marketPrice.exchange_rate = res.exchange_rate;
            that.marketPrice.exchange_buy_max = res.exchange_buy_max;
            that.marketPrice.exchange_sell_min = res.exchange_sell_min;
            that.marketPrice.trade_min_price = res.trade_min_price;
            that.marketPrice.trade_max_price = res.trade_max_price;
            that.formRelease.minTrade = res.trade_min_price;
            that.formRelease.maxTrade = res.trade_max_price;
            // 获取用户余额
            get('api/finance/account_balance').then(function(res) {
              if (res) {
                that.balance = res.allCoinMap.USDT.normal_balance;
              }
            });
            // 获取发单数量及类型
            get('api/personAdverts/cnt').then(function(res) {
              var buyCount = res.BUY;
              var sellCount = res.SELL;
              if (buyCount >= 2 && sellCount >= 2) {
                Toast.show(that.$t('dealOrderBeforeRelease'), { icon: 'warning' });
              } else if (buyCount >= 2 && sellCount < 2) {
                Toast.show(that.$t('releaseSellOnly'), {
                  icon: 'warning',
                  duration: 1500,
                  callback: function() {
                    that.buyDisabled = true;
                    that.formRelease.side = 'SELL';
                    that.modalRelease = true;
                  },
                });
              } else if (buyCount < 2 && sellCount >= 2) {
                Toast.show(that.$t('releaseBuyOnly'), {
                  icon: 'warning',
                  duration: 1500,
                  callback: function() {
                    that.sellDisabled = true;
                    that.formRelease.side = 'BUY';
                    that.modalRelease = true;
                  },
                });
              } else {
                that.modalRelease = true;
              }
            });
          }
        });
      });
    },
    toGoogeAuth: function() {
      this.isGoogleAuthShow = false;
      this.$refs.header.$data.isRegisterGoogleShow = true;
    },
    //post order
    /* postOrder: function() {
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
        this.error.postDataError = this.$t('canNotBeEmpty');
        return;
      } else {
        this.error.postDataError = '';
      }
      if (parseFloat(this.postData['maxTrade' + tag]) < parseFloat(this.postData['minTrade' + tag])) {
        this.error.postDataError = this.$t('maxNoLessThanMin');
        return;
      }
      if (
        parseFloat(this.postData['price' + tag]) * parseFloat(this.postData['volume' + tag]) <
        parseFloat(this.postData['maxTrade' + tag])
      ) {
        this.error.postDataError = this.$t('maxNoMoreThanTotal');
        return;
      }
      if (parseFloat(this.postData['price' + tag]) > this.marketPrice.exchange_rate * 1.5) {
        this.releaseWarning = this.$t('moreThan50Percent');
        this.isPricePromptShow = true;
        this.isPostDialogShow = false;
        return;
      }
      if (parseFloat(this.postData['price' + tag]) < this.marketPrice.exchange_rate * 0.5) {
        this.releaseWarning = this.$t('lessThan50Percent');
        this.isPricePromptShow = true;
        this.isPostDialogShow = false;
        return;
      }
      if (tag == 'BUY') {
        if (parseFloat(this.postData['price' + tag]) > this.marketPrice.exchange_sell_max) {
          this.releaseWarning = this.$t('lessThanHighestPurchase');
          this.isPricePromptShow = true;
          this.isPostDialogShow = false;
          return;
        }
      }
      if (tag == 'SELL') {
        if (parseFloat(this.postData['price' + tag]) > this.marketPrice.exchange_buy_min) {
          this.releaseWarning = this.$t('moreThanLowestPrice');
          this.isPricePromptShow = true;
          this.isPostDialogShow = false;
          return;
        }
      }
      this.isPostDialogShow = false;
      this.isPendModalShow = true;
    }, */
    /* // back to modify the post order price
    modifyPostOrder: function() {
      this.isPendModalShow = false;
      this.isConfirmBindShow = false;
      this.isPricePromptShow = false;
      this.isPostDialogShow = true;
    },
    //confirm post order
    continueRelease: function() {
      this.setCardStatus();
      this.isPricePromptShow = false;
      this.isPendModalShow = true;
    }, */
    /* clearPostModal: function() {
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
    }, */
    // comfirm post order
    /* confirmPostOrder: function() {
      var that = this;
      var tag = this.postOrderTag;
      this.getSelectCards(this.cardStatus, this.cardList);
      this.postData.checkValue = this.postData.checkType == '1' ? this.gCode : this.smsCode;
      if (!this.postData.checkValue) {
        this.error.postError = this.$t('verifyNoEmpty');
        return;
      } else {
        this.error.postError = '';
      }
      if (tag == 'SELL') {
        if (this.selectedCardIds.length < 1) {
          this.error.postError = this.$t('atLeastOneBank');
          return;
        }
        this.postData.paymentBanks = this.selectedCardIds;
      }
      this.postData.side = tag;
      this.postData.price = this.postData['price' + tag];
      this.postData.volume = this.postData['volume' + tag];
      this.postData.minTrade = this.postData['minTrade' + tag];
      this.postData.maxTrade = this.postData['maxTrade' + tag];
      post('api/advert', this.postData).then(function(res) {
        if (res) {
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
    }, */
    /* sendMsg: function() {
      var that = this;
      get('api/verifycode_sms', {
        type: 8,
      }).then(function(res) {
        if (res) {
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
    }, */
    closeBuyDialog: function() {
      this.isBuyDialogShow = false;
      this.buyData.buyAmount = '';
      this.buyData.buyTotal = '';
      this.buyAmountErrorText = '';
      this.buyTotalErrorText = '';
    },
    /* closePostDialog: function() {
      this.clearPostModal();
      this.isPostDialogShow = false;
    }, */
    // 新添加的绑定银行卡代码
    handleSubmit(name) {
      var that = this;
      this.$refs[name].validate(function(valid) {
        if (valid) {
          if (name === 'formBankInfo') {
            that.modalBankInfo = false;
            that.modalBankConfirm = true;
          }
          if (name === 'formBankConfirm') {
            var checkType = that.tabVerifyActive;
            /* var checkType;
            if (that.user.mobileNumber && that.user.googleStatus) {
              checkType = that.tabVerifyActive;
            } else if (that.user.mobileNumber && !that.user.googleStatus) {
              checkType = 2;
            } else {
              checkType = 1;
            } */
            post('api/bankCard', {
              id: that.formBankInfo.id,
              bankName: that.formBankInfo.bankName,
              name: that.formBankInfo.name,
              cardNo: that.formBankInfo.cardNo,
              ibanNo: that.formBankInfo.ibanNo,
              checkType: checkType,
              checkValue:
                checkType == 1
                  ? that.formBankConfirm.google
                  : that.formBankConfirm.phone,
            }).then(function(res) {
              if (res) {
                that.clearTimers();
                that.$refs.formBankInfo.resetFields();
                that.$refs[name].resetFields();
                that.tabVerifyActive = 1;
                that.modalBankConfirm = false;
                that.getAllCard();
              }
            });
          }
          if (name === 'formRelease') {
            if (parseFloat(that.formRelease.price) > that.marketPrice.exchange_rate * 1.5) {
              that.modalRelease = false;
              that.releaseWarning = that.$t('moreThan50Percent');
              that.modalReleaseWarning = true;
              return;
            }
            if (parseFloat(that.formRelease.price) < that.marketPrice.exchange_rate * 0.5) {
              that.modalRelease = false;
              that.releaseWarning = that.$t('lessThan50Percent');
              that.modalReleaseWarning = true;
              return;
            }
            if (that.formRelease.side == 'BUY') {
              if (parseFloat(that.formRelease.price) > that.marketPrice.exchange_sell_max) {
                that.modalRelease = false;
                that.releaseWarning = that.$t('lessThanHighestPurchase');
                that.modalReleaseWarning = true;
                return;
              }
            }
            if (that.formRelease.side == 'SELL') {
              if (parseFloat(that.formRelease.price) > that.marketPrice.exchange_buy_min) {
                that.modalRelease = false;
                that.releaseWarning = that.$t('moreThanLowestPrice');
                that.modalReleaseWarning = true;
                return;
              }
            }
            that.modalRelease = false;
            that.modalReleaseConfirm = true;
          }
          if (name === 'formReleaseConfirm') {
            // if (that.formRelease.side === 'SELL') {
            //   that.formRelease.paymentBanks = that.selectedCardIds;
            // }
            that.formRelease.checkType = that.tabVerifyActive;
            that.formRelease.checkValue = that.tabVerifyActive == 1
            ? that.formReleaseConfirm.google
            : that.formReleaseConfirm.phone;
            post('api/advert', that.formRelease).then(function(res) {
              if (res) {
                that.handleReset(name);
                that.modalReleaseWarning = false;
                if (that.formRelease.side === 'BUY') {
                  that.toBuyPage(1);
                }
                if (that.formRelease.side === 'SELL') {
                  that.toSellPage(1);
                }
              }
            });
          }
        }
      });
    },
    changeCardStatus(value, data) {
      if (value) {
        this.selectedCardIds.push(data.id);
      } else {
        this.selectedCardIds.splice(this.selectedCardIds[data.id], 1);
      }
    },
    modifyRelease: function() {
      this.modalReleaseConfirm = false;
      this.modalReleaseWarning = false;
      this.modalRelease = true;
    },
    continueRelease: function() {
      // this.setCardStatus();
      this.modalReleaseWarning = false;
      this.modalReleaseConfirm = true;
    },
    handleReset(name, action) {
      if (name === 'formBankConfirm' && action === 'modify') {
        this.modalBankConfirm = false;
        this.modalBankInfo = true;
        return;
      } else {
        this.$refs.formBankInfo.resetFields();
      }
      if (name === 'formReleaseConfirm' && action === 'modify') {
        this.modalReleaseConfirm = false;
        this.modalRelease = true;
        return;
      }
      var sufix = name.substr(4);
      this['modal' + sufix] = false;
      this.sendPlaceholderBank = this.$t('sendVerify');
      this.sendDisabledBank = false;
      this.clearTimers();
      this.$refs[name].resetFields();
    },
    clearTimers: function(){
      for (var key in this.timers) {
        clearInterval(this.timers[key]);
        delete this.timers[key];
      }
    },
    sendMessage: function(name, type) {
      var that = this;
      that['sendDisabled' + name] = true;
      get('api/verifycode_sms', { type: type }).then(function(res) {
        if (res) {
          that.countDown(name);
        } else {
          that['sendDisabled' + name] = false;
        }
      });
    },
    countDown(name) {
      var that = this;
      var counter = 90;
      that['sendPlaceholder' + name] = counter + 's';
      that.timers[name] = setInterval(function() {
        counter -= 1;
        that['sendPlaceholder' + name] = counter + 's';
        if (counter <= 0) {
          that['sendDisabled' + name] = false;
          that['sendPlaceholder' + name] = that.$t('sendAgain');
          clearInterval(that.timers[name]);
        }
      }, 1000);
    },
  },
  mounted: function() {
    var that = this;
    var locale = localStorage.getItem('locale');
    if (locale) {
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
    if (localStorage.getItem('token')) {
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
    releaseMaxPrice: function(newVal, oldVal) {
      if (newVal > this.marketPrice.trade_max_price) {
        this.formRelease.maxTrade = this.marketPrice.trade_max_price;
      } else if (newVal > 0 && newVal < this.marketPrice.trade_max_price) {
        this.formRelease.maxTrade = newVal;
      } else {
        this.formRelease.maxTrade = this.marketPrice.trade_max_price;
      }
    },
  },
});
