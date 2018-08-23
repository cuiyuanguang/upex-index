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
    acontact: addContact,
  },
  data: function() {
    var validateGoogle = (rule, value, callback) => {
      if (!this[rule.name].phone) {
        if (!/\d+$/g.test(value)) {
          callback(new Error(this.$t('sixLengthNumericRequired')));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if (!this[rule.name].google) {
        if (!/\d+$/g.test(value)) {
          callback(new Error(this.$t('sixLengthNumericRequired')));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    var validateEmpty = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('canNotBeEmpty')));
      } else {
        callback();
      }
    };
    var validateFormat = (rule, value, callback) => {
      var reg = /\w{8,64}/g;
      if (!reg.test(value)) {
        callback(new Error(this.$t('eight2SixtyFour')));
      } else {
        callback();
      }
    };
    var validatePrice = (rule, value, callback) => {
      value = Number(value);
      if (!value) {
        callback(new Error(this.$t('noZeroNumericRequired')));
      } else {
        callback();
      }
    };
    var validateVolume = (rule, value, callback) => {
      value = Number(value);
      if (!value) {
        callback(new Error(this.$t('noZeroNumericRequired')));
      } else if (value < this.marketPrice.trade_min_volume || value > this.marketPrice.trade_max_volume) {
        callback(new Error(this.$t('sysLimitIs') + this.marketPrice.trade_min_volume + '--' + this.marketPrice.trade_max_volume));
      } else if (value > this.balance) {
        callback(new Error(this.$t('balanceNotEnough')));
      } else {
        callback();
      }
    };
    var validateMinTrade = (rule, value, callback) => {
      value = Number(value);
      if (!value) {
        callback(new Error(this.$t('noZeroNumericRequired')));
      } else if (value < this.marketPrice.trade_min_price) {
        callback(new Error(this.$t('minNoLessThanSysMin')));
      } else {
        callback();
      }
    };
    var validateMaxTrade = (rule, value, callback) => {
      value = Number(value);
      if (!value) {
        callback(new Error(this.$t('noZeroNumericRequired')));
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
      marketPrice: '',
      //END挂单相关数据
      //bank card status
      cardList: [],
      balance: 0,
      //END user info
      //triggers
      modalOrder: false,
      selectedAdvert: {},
      legalCurrency: 0,
      legalCurrencyAll: false,
      legalCurrencyError: false,
      digitalCurrency: 0,
      digitalCurrencyAll: false,
      digitalCurrencyError: false,
      modalGoogle: false,
      modalWhatsApp: false,
      // 广告列表
      totalPage: 0,
      buyTotal: 0,
      sellTotal: 0,
      buyCurrentPage: 1,
      sellCurrentPage: 1,
      selllist: [],
      buylist: [],
      // 暂停/取消接单
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
      userInfo: '',
      sendPlaceholderBank: '',
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
        bankName: [{ validator: validateEmpty, trigger: 'change' }],
        name: [{ validator: validateFormat, trigger: 'change' }],
        cardNo: [{ validator: validateFormat, trigger: 'change' }],
        ibanNo: [{ validator: validateFormat, trigger: 'change' }],
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
      modalReleaseLoading: false,
      modalRelease: false,
      buyDisabled: false,
      sellDisabled: false,
      formRelease: {
        side: 'BUY',
        price: '',
        volume: '',
        minTrade: '',
        maxTrade: '',
      },
      ruleRelease: {
        side: [{ name: 'formRelease', validator: validateEmpty, trigger: 'change' }],
        price: [{ name: 'formRelease', validator: validatePrice, trigger: 'change' }],
        volume: [{ name: 'formRelease', validator: validateVolume, trigger: 'change' }],
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
      timers: {},
    };
  },
  computed: {
    selectedAdvertBanks() {
      var that = this;
      var banks;
      if (this.selectedAdvert.paymentBanks) {
        banks = this.selectedAdvert.paymentBanks.map(function(item) {
          return that.$t(item.bankName.replace(/\s+/g, '')) + '\r';
        });
        return banks.join();
      }
    },
    legalCurrencyMin() {
      var amount = Math.max(this.marketPrice.trade_min_price, this.selectedAdvert.minTrade);
      return amount.toFixed(2);
    },
    legalCurrencyMax() {
      var amount = Math.min(this.marketPrice.trade_max_price, this.selectedAdvert.maxTrade);
      return amount.toFixed(2);
    },
    legalCurrencyTips() {
      return `${this.$t('limit')}: ${this.selectedAdvert.minTrade} - ${this.selectedAdvert.maxTrade} ${this.selectedAdvert.paycoin}`;
    },
    digitalCurrencyAvailable() {
      return (this.selectedAdvert.volume - this.selectedAdvert.sell).toFixed(4);
    },
    digitalCurrencyMin() {
      return Number((this.selectedAdvert.minTrade / this.selectedAdvert.price).toFixed(4));
    },
    digitalCurrencyMax() {
      const amount = (this.selectedAdvert.maxTrade / this.selectedAdvert.price).toFixed(4);
      return Math.min(amount, this.digitalCurrencyAvailable);
    },
    digitalCurrencyTips() {
      return `
        ${this.$t('limit')}: ${this.digitalCurrencyMin} -
        ${this.digitalCurrencyMax}
        ${this.selectedAdvert.coin}
      `;
    },
    releaseTotalPrice: function() {
      return (this.formRelease.price * this.formRelease.volume).toFixed(2);
    },
  },
  methods: {
    getUserInfo: function() {
      this.userInfo = JSON.parse(localStorage.getItem('user')) || {};
    },
    // 获取用户余额
    getBalance: function() {
      var that = this;
      get('api/finance/account_balance').then(function(res) {
        if (res) {
          that.balance = res.allCoinMap.USDT.normal_balance;
        }
      });
    },
    // 获取市场价格
    getMarketPrice: function() {
      var that = this;
      get('api/rate').then(function(res) {
        if (res) {
          that.marketPrice = res;
          that.formRelease.minTrade = res.trade_min_price;
          that.formRelease.maxTrade = res.trade_max_price;
        }
      });
    },
    getAdvertList: function(type, page) {
      var that = this;
      var data = {
        coin: 'USDT',
        side: type,
        page: page || 1,
        pageSize: 10,
      };
      get('api/adverts', data).then(function(res) {
        if (res) {
          that.totalPage = Math.round(res.count / 10);
          if (type === 'SELL') {
            that.buylist = res.rsts || [];
            that.buyCurrentPage = page;
            that.buyTotal = res.count;
          } else {
            that.selllist = res.rsts || [];
            that.sellCurrentPage = page;
            that.sellTotal = res.count;
          }
        }
      });
    },
    pause: function(item) {
      this.action = item.status === 6 ? 'start' : 'pause';
      this.advertId = item.id;
      this.modalMsg = {
        title: item.status === 6 ? this.$t('start') : this.$t('pause'),
        desc: this.$t('confirm') + ' ' + this.$t(this.action),
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
            that.showListTag === 'BUY' ? that.getAdvertList('SELL', 1) : that.getAdvertList('BUY', 1);
          }
          that.modalOperationOrder = false;
        });
      }
    },
    getAvailableCardList: function() {
      var that = this;
      get('api/bankCard').then(function(result) {
        if (result.length > 0) {
          that.cardList = result;
          that.selectedCardIds = result.map(function(item) { return item.id });
        }
      });
    },
    changeLegalCurrency() {
      const digitalCurrencyCalc =
        Number((this.legalCurrency / this.selectedAdvert.price).toFixed(4));
      this.digitalCurrency = Math.min(digitalCurrencyCalc, this.digitalCurrencyMax);
      if (digitalCurrencyCalc > this.digitalCurrencyMax) {
        this.legalCurrency =
          Number((this.digitalCurrencyMax * this.selectedAdvert.price).toFixed(2));
      }
    },
    changeDigitalCurrency() {
      this.legalCurrency = Number((this.digitalCurrency * this.selectedAdvert.price).toFixed(2));
    },
    tradeAll(type) {
      if (type === 'legalCurrency') {
        this.legalCurrency = this.selectedAdvert.maxTrade;
        this.changeLegalCurrency();
      }
      if (type === 'digitalCurrency') {
        this.digitalCurrency = this.digitalCurrencyMax;
        this.changeDigitalCurrency();
      }
    },
    showModalOrder: function(item, type) {
      if (!localStorage.getItem('user')) {
        this.$refs.header.showLogin();
        return;
      }
      if (type === 'SELL') {
        if (!this.userInfo.googleStatus) {
          this.modalGoogle = true;
          return;
        }
        if (!this.cardList.length) {
          if (!this.userInfo.googleStatus && this.userInfo.isOpenMobileCheck) {
            that.tabVerifyActive = 2;
          }
          this.modalBankInfo = true;
          return;
        }
        if (!this.userInfo.watchapp) {
          this.modalWhatsApp = true;
          return;
        }
        this.getBalance();
      }
      this.selectedAdvert = item;
      this.modalOrder = true;
    },
    confirmOrder: function(type) {
      if (!localStorage.getItem('user')) {
        this.$refs.header.showLogin();
        return;
      }
      if (!this.legalCurrency) {
        this.legalCurrencyError = true;
        return;
      }
      if (!this.digitalCurrency) {
        this.digitalCurrencyError = true;
        return;
      }
      var data = {
        advertId: this.selectedAdvert.id,
        volume: Number(this.digitalCurrency),
        totalPrice: this.legalCurrency,
      };
      var that = this;
      var api = 'api/buyOrder';
      var payUrl = 'otc_pay.html?sequence=';
      if (type === 'SELL') {
        api = 'api/sellOrder';
        payUrl = 'otc_wait_pay.html?sequence=';
      }
      post(api, data).then(function(res) {
        if (res) {
          that.modalOrder = false;
          window.location.href = payUrl + res.sequence;
        }
      });
    },
    showModalRelease: function() {
      // check if login
      var that = this;
      var user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.id) {
        that.$refs.header.showLogin();
        return;
      }
      that.modalReleaseLoading = true;
      post('api/common/user_info', '', false).then(function (result) {
        if (!result) {
          that.modalReleaseLoading = false;
          return;
        }
        localStorage.setItem('user', JSON.stringify(result));
        that.userInfo = result;
        //check if google authed
        if (!result.googleStatus) {
          that.modalReleaseLoading = false;
          that.modalGoogle = true;
          return;
        }
        //check if card binded
        if (!that.cardList.length) {
          that.modalReleaseLoading = false;
          that.modalBankInfo = true;
          return;
        }
        // check if contact binded
        if (!result.watchapp) {
          that.modalReleaseLoading = false;
          that.modalWhatsApp = true;
          return;
        }
        that.getBalance();
        // 获取发单数量及类型
        get('api/personAdverts/cnt').then(function(obj) {
          that.modalReleaseLoading = false;
          var buyCount = obj.BUY;
          var sellCount = obj.SELL;
          if (buyCount >= 2 && sellCount >= 2) {
            Toast.show(that.$t('dealOrderBeforeRelease'), { icon: 'error' });
          } else if (buyCount >= 2 && sellCount < 2) {
            Toast.show(that.$t('releaseSellOnly'), {
              icon: 'error',
              callback: function() {
                that.buyDisabled = true;
                that.formRelease.side = 'SELL';
                that.modalRelease = true;
              },
            });
          } else if (buyCount < 2 && sellCount >= 2) {
            Toast.show(that.$t('releaseBuyOnly'), {
              icon: 'error',
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
      });
    },
    toGoogeAuth: function() {
      this.modalGoogle = false;
      this.$refs.header.$data.isRegisterGoogleShow = true;
    },
    closeBuyDialog: function() {
      this.modalOrder = false;
      this.buyData.buyAmount = '';
      this.buyData.buyTotal = '';
      this.buyAmountErrorText = '';
      this.buyTotalErrorText = '';
    },
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
                that.getAvailableCardList();
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
            if (that.formRelease.side === 'SELL') {
              if (!that.selectedCardIds.length) {
                Toast.show(that.$t('atLeastOneBank'), { icon: 'error' });
                return;
              }
              that.formRelease.paymentBanks = that.selectedCardIds.map(function(item) { return { id: item } });
            }
            that.formRelease.checkType = that.tabVerifyActive;
            that.formRelease.checkValue = that.tabVerifyActive == 1
            ? that.formReleaseConfirm.google
            : that.formReleaseConfirm.phone;
            post('api/advert', that.formRelease).then(function(res) {
              if (res) {
                that.handleReset('formRelease');
                that.handleReset('formReleaseConfirm');
                that.modalReleaseWarning = false;
                that.modalReleaseConfirm = false;
                that.showListTag = that.formRelease.side === 'SELL' ? 'BUY' : 'SELL';
                that.getAdvertList(that.formRelease.side, 1);
              }
            });
          }
        }
      });
    },
    autoSubmit(e, name) {
      if (e.target.value.length === 6) {
        this.handleSubmit(name);
      }
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
      this.sendPlaceholderBank = this.$t('sendVerify');
    }
    this.$on('locale', function(i) {
      this.locale = i;
      this.$i18n.locale = locale;
      this.sendPlaceholderBank = this.$t('sendVerify');
    });
    this.$on('isContactShow', function(i) {
      that.modalWhatsApp = i;
    });
    if (localStorage.getItem('token')) {
      this.getUserInfo();
      this.getAvailableCardList();
    }
    this.getAdvertList('SELL', 1);
    this.getAdvertList('BUY', 1);
    this.getMarketPrice();
  },
  watch: {
    locale(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$i18n.locale = newVal;
        this.sendPlaceholderBank = this.$t('sendVerify');
      }
    },
    legalCurrency(newVal) {
      this.legalCurrencyError = !newVal === true;
    },
    digitalCurrency(newVal) {
      this.digitalCurrencyError = !newVal === true;
    },
    releaseTotalPrice: function(newVal, oldVal) {
      var value = Number(newVal);
      if (value > this.marketPrice.trade_max_price) {
        this.formRelease.maxTrade = this.marketPrice.trade_max_price;
      } else if (value > 0 && value < this.marketPrice.trade_max_price) {
        this.formRelease.maxTrade = value;
      } else {
        this.formRelease.maxTrade = this.marketPrice.trade_max_price;
      }
    },
  },
  filters: {
    card: function(no) {
      return no.replace(/s/g, '').replace(/(.{4})/g, "$1 ");
    },
  },
});
