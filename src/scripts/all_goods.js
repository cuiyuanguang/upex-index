

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

var allGoods = new Vue({
  el: '#app',
  i18n: i18n,
  components: {
    oHeader: o_header,
  },
  data: function() {
    var buyColumn = [
      {
        key: 'user',
        align: 'center',
        minWidth: 100,
        renderHeader: (h) => h('span', this.showListTag === 'BUY' ? this.$t('seller') : this.$t('buyer')),
        render: (h, params) => h(
          'div',
          [
            h('div',
              {
                'class': this.userInfo.id === params.row.userId ? 'avatar mr-10 mine' : 'avatar mr-10',
              },
              this.userInfo.id == params.row.userId ? this.$t('mine') : (this.showListTag === 'BUY' ? this.$t('seller') : this.$t('buyer')),
            ),
            h('div',
              { 'class': 'user-brief' },
              [
                h('p', this.$t('saUser')),
                h('p',
                  {
                    'class': 'user-brief-guarante',
                    on: { 'click': () => { this.modalGuarante = true } },
                  },
                  [
                    h('img', { 'class': 'mr-4', attrs: { src: '../images/guarante.png' } }),
                    h('span', this.$t('platGuarante')),
                  ],
                ),
              ],
            ),
          ],
        ),
      },
      {
        key: 'amount',
        align: 'center',
        minWidth: 60,
        renderHeader: (h) => h('span', this.$t('amount')),
        render: (h, params) => h('span', (params.row.volume - params.row.sell).toFixed(4) + ' USDT'),
      },
      {
        key: 'limit',
        align: 'center',
        minWidth: 60,
        renderHeader: (h) => h(
          'p',
          [
            h('span', this.$t('limit')),
            h('br'),
            h('span', { 'class': 'limit-tips' }, this.$t('min2maxPurchase')),
          ]
        ),
        render: (h, params) => h('span', params.row.minTrade + ' - ' + params.row.maxTrade + ' SAR'),
      },
      {
        key: 'price',
        align: 'center',
        renderHeader: (h) => h('span', this.$t('unitPrice')),
        render: (h, params) => h('span', { 'class': 'text-primary' }, params.row.price + ' SAR'),
      },
      {
        key: 'payment',
        align: 'center',
        minWidth: 90,
        renderHeader: (h) => h('span', this.$t('payment')),
        render: (h, params) => h('div',
          [
            h('span', params.row.paymentBanks && this.$t(params.row.paymentBanks[0].bankName)),
            params.row.paymentBanks && params.row.paymentBanks.length > 1 ?
            h(
              'Poptip',
              {
                props: {
                  trigger: 'hover',
                  placement: 'bottom',
                  title: '',
                },
                'class': 'ml-10',
              },
              [
                h('p', { slot: 'content', 'class': 'text-left', style: { 'overflow': 'hidden' } }, params.row.paymentBanks.map(item => h('p', this.$t(item.bankName)))),
                h('img', { attrs: { src: '../images/bank_more.png' } })
              ],
            ) : ''
          ]
        ),
      },
      {
        key: 'operation',
        align: 'center',
        minWidth: 80,
        renderHeader: (h) => h('span', this.$t('operation')),
        render: (h, params) => h(
          'div',
          this.userInfo.id === params.row.userId ?
          [
            h('Button',
              {
                'class': 'mr-10',
                props: {
                  type: 'link',
                  size: 'small',
                  disabled: params.row.status === 3 || params.row.status === 4 || params.row.status === 5,
                },
                on: {
                  'click': () => { this.pause(params.row) },
                },
              },
              params.row.status === 6 ? this.$t('start') : this.$t('pause'),
            ),
            h('Button',
              {
                props: {
                  type: 'link',
                  size: 'small',
                  disabled: params.row.status === 4 || params.row.status === 5,
                },
                on: {
                  'click': () => { this.cancel(params.row) },
                },
              },
              this.$t('cancel'),
            ),
          ]
          :
          [
            h(
              'Button',
              {
                props: {
                  type: 'primary',
                  size: 'small',
                },
                on: {
                  click: () => {
                    this.showModalOrder(params.row, this.showListTag);
                  },
                },
              },
              this.$t(this.showListTag.toLowerCase()) + ' USDT',
            ),
          ]
        ),
      },
    ];
    var sellColumn = buyColumn.filter(item => item.key !== 'payment');
    var validateLegalCurrency = (rule, value, callback) => {
      var valueString = String(value);
      var index = valueString.indexOf('.');
      var length = index === -1 ? index : valueString.substr(index).length;
      if (length > 3 || /(^0\d+)|(\.$)|(\.0{1,}$)/.test(value)) {
        this.legalCurrencyFormat = true;
        callback(new Error());
      } else if (value < Number(this.legalCurrencyMin) || value > Number(this.legalCurrencyMax)) {
        this.legalCurrencyError = true;
        callback(new Error());
      } else {
        this.legalCurrencyFormat = false;
        this.legalCurrencyError = false;
        callback();
      }
    };
    var validateDigitalCurrency = (rule, value, callback) => {
      var valueString = String(value);
      var index = valueString.indexOf('.');
      var length = index === -1 ? index : valueString.substr(index).length;
      if (length > 5 || /(^0\d+)|(\.$)|(\.0{1,}$)/.test(value)) {
        this.digitalCurrencyFormat = true;
        callback(new Error());
      } else {
        this.digitalCurrencyFormat = false;
        callback();
      }
    };
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
    var validateNumeric = (rule, value, callback) => {
      if (!/\d+$/g.test(value)) {
        callback(new Error(this.$t('numericRequired')));
      } else {
        callback();
      }
    };
    var validatePrice = (rule, value, callback) => {
      var valueString = String(value);
      var index = valueString.indexOf('.');
      var length = index === -1 ? index : valueString.substr(index).length;
      if (!value) {
        callback(new Error(this.$t('noZeroNumericRequired')));
      } else if (length > 3 || /(^0\d+)|(\.$)|(\.0{1,}$)/.test(value)) {
        callback(new Error(this.$t('atMost2Dot')));
      } else {
        callback();
      }
    };
    var validateVolume = (rule, value, callback) => {
      var valueString = String(value);
      var index = valueString.indexOf('.');
      var length = index === -1 ? index : valueString.substr(index).length;
      if (!value) {
        callback(new Error(this.$t('noZeroNumericRequired')));
      } else if (length > 5 || /(^0\d+)|(\.$)|(\.0{1,}$)/.test(value)) {
        callback(new Error(this.$t('atMost4Dot')));
      } else if (value < Number(this.marketPrice.trade_min_volume) || value > Number(this.marketPrice.trade_max_volume)) {
        callback(new Error(this.$t('sysLimitIs') + this.marketPrice.trade_min_volume + '--' + this.marketPrice.trade_max_volume));
      } else if (this.formRelease.side === 'SELL' && value > Number(this.balance)) {
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
      locale: '',
      carouselActive: 0,
      showListTag: 'BUY',
      marketPrice: '',
      cardList: [],
      balance: 0,
      modalGuarante: false,
      // 下单
      modalOrder: false,
      formOrderLoading: false,
      selectedAdvert: {},
      formOrder: {
        legalCurrency: '',
        digitalCurrency: '',
      },
      ruleOrder: {
        legalCurrency: [{ validator: validateLegalCurrency, trigger: 'change' }],
        digitalCurrency: [{ validator: validateDigitalCurrency, trigger: 'change' }]
      },
      legalCurrencyAll: false,
      legalCurrencyError: false,
      legalCurrencyFormat: false,
      digitalCurrencyAll: false,
      digitalCurrencyError: false,
      digitalCurrencyFormat: false,
      modalGoogle: false,
      modalWhatsApp: false,
      selectCountry: '+996',
      formWhatsApp: {
        number: '',
      },
      ruleWhatsApp: {
        number: [
          { validator: validateNumeric, trigger: 'change' },
        ],
      },
      formWhatsAppLoading: false,
      // 广告列表
      totalPage: 0,
      buyTotal: 0,
      sellTotal: 0,
      buyCurrentPage: 1,
      sellCurrentPage: 1,
      buyColumn: buyColumn,
      buylist: [],
      buylistLoading: false,
      sellColumn: sellColumn,
      selllist: [],
      selllistLoading: false,
      // 暂停/取消接单
      modalAction: false,
      modalActionLoading: false,
      cancelable: false,
      pauseable: false,
      modalMsg: {
        title: '',
        desc: '',
        confirmText: '',
      },
      action: '',
      advertId: '',
      sequence: '',
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
        name: [{ validator: validateEmpty, trigger: 'change' }],
        cardNo: [{ validator: validateEmpty, trigger: 'change' }],
        ibanNo: [{ validator: validateEmpty, trigger: 'change' }],
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
      formBankConfirmLoading: false,
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
      formReleaseConfirmLoading: false,
      timers: {},
    };
  },
  computed: {
    countryArr: function() {
      return JSON.parse(localStorage.getItem('country'));
    },
    selectedAdvertBanks() {
      var that = this;
      var banks;
      if (this.selectedAdvert.paymentBanks) {
        banks = this.selectedAdvert.paymentBanks.map(function(item) {
          return that.$t(item.bankName.replace(/\s+/g, ''));
        });
        return banks.join('<br>');
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
      var amount = Number((this.selectedAdvert.minTrade / this.selectedAdvert.price).toFixed(4));
      return amount;
    },
    digitalCurrencyMax() {
      var amount = (this.selectedAdvert.maxTrade / this.selectedAdvert.price).toFixed(4);
      return amount;
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
          localStorage.setItem('market', JSON.stringify(res));
          that.formRelease.minTrade = Number(res.trade_min_price);
          that.formRelease.maxTrade = Number(res.trade_max_price);
        }
      });
    },
    changeCarousel(oldVal, newVal) {
      this.carouselActive = newVal;
      console.log(this.carouselActive);
    },
    getAdvertList: function(type, page) {
      var that = this;
      var data = {
        coin: 'USDT',
        side: type,
        page: page || 1,
        pageSize: 10,
      };
      that[type.toLowerCase() + 'listLoading'] = true;
      get('api/adverts', data).then(function(res) {
        that[type.toLowerCase() + 'listLoading'] = false;
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
      this.modalAction = true;
    },
    cancel: function(item) {
      if (item.status === 5 || item.status === 6) {
        this.modalMsg = {
          title: this.$t('unremovable'),
          desc: this.$t('unremovableTips'),
          confirmText: this.$t('unremovableOperation'),
        };
        this.cancelable = false;
      } else {
        this.modalMsg = {
          title: this.$t('removable'),
          desc: this.$t('removableTips'),
          confirmText: this.$t('confirm'),
        };
        this.cancelable = true;
      }
      this.advertId = item.id;
      this.sequence = item.sequence;
      this.side = item.side;
      this.modalAction = true;
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
            that.showListTag === 'BUY' ? that.getAdvertList('SELL') : that.getAdvertList('BUY');
          }
          that.modalAction = false;
        });
      } else {
        get('api/otc/bot/adverts/orders/online?advertId=' + this.advertId)
          .then(function(res) {
            that.modalActionLoading = false;
            if (res) {
              that.modalAction = false;
              var path = that.side === 'BUY' ? 'otc_pay' : 'otc_wait_pay';
              location.href = path + '.html?sequence=' + res[0].sequence;
            }
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
      if (!this.formOrder.legalCurrency || /(^0\d+)|(\.$)|(\.0{1,}$)/.test(this.formOrder.legalCurrency)) return;
      this.formOrder.digitalCurrency = Number((this.formOrder.legalCurrency / this.selectedAdvert.price).toFixed(4));
    },
    changeDigitalCurrency() {
      if (!this.formOrder.digitalCurrency || /(^0\d+)|(\.$)|(\.0{1,}$)/.test(this.formOrder.digitalCurrency)) return;
      this.formOrder.legalCurrency = Number((this.formOrder.digitalCurrency * this.selectedAdvert.price).toFixed(2));
    },
    tradeAll(type) {
      if (type === 'legalCurrency') {
        this.formOrder.legalCurrency = this.selectedAdvert.maxTrade;
        this.changeLegalCurrency();
      }
      if (type === 'digitalCurrency') {
        this.formOrder.digitalCurrency = this.digitalCurrencyMax;
        this.changeDigitalCurrency();
      }
    },
    showModalOrder: function(item, type) {
      if (!localStorage.getItem('user')) {
        this.$refs.header.showLogin();
        return;
      }
      if (type === 'BUY') {
        if (!this.userInfo.watchapp) {
          this.modalWhatsApp = true;
          return;
        }
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
        that.getMarketPrice();
        // 获取发单数量及类型
        get('api/personAdverts/cnt').then(function(obj) {
          that.modalReleaseLoading = false;
          var buyCount = obj.BUY;
          var sellCount = obj.SELL;
          if (buyCount >= 2 && sellCount >= 2) {
            Toast.show(that.$t('dealOrderBeforeRelease'), { icon: 'error' });
            return;
          }
          that.formRelease.minTrade = that.marketPrice.trade_min_price;
          that.formRelease.maxTrade = that.marketPrice.trade_max_price;
          if (buyCount >= 2 && sellCount < 2) {
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
    releaseSideChange: function(value) {
      this.$refs.formRelease.resetFields();
      this.formRelease.side = value;
      this.formRelease.minTrade = this.marketPrice.trade_min_price;
      this.formRelease.maxTrade = this.marketPrice.trade_max_price;
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
      if (!localStorage.getItem('user')) {
        this.$refs.header.showLogin();
        return;
      }
      var that = this;
      that.$refs[name].validate(function(valid) {
        if (valid) {
          if (name === 'formOrder') {
            if (that.showListTag === 'SELL' && that.balance < that.digitalCurrencyMin) {
              Toast.show(that.$t('balanceNotEnough'), { icon: 'error' });
              return;
            }
            that.formOrderLoading = true;
            var data = {
              advertId: that.selectedAdvert.id,
              volume: Number(that.formOrder.digitalCurrency),
              totalPrice: that.formOrder.legalCurrency,
            };
            var api = 'api/buyOrder';
            var payUrl = 'otc_pay.html?sequence=';
            if (that.showListTag === 'SELL') {
              api = 'api/sellOrder';
              payUrl = 'otc_wait_pay.html?sequence=';
            }
            post(api, data).then(function(res) {
              that.formOrderLoading = false;
              if (res) {
                that.handleReset(name);
                that.modalOrder = false;
                window.location.href = payUrl + res.sequence;
              } else {
                that.formOrderLoading = false;
              }
            });
          }
          if (name === 'formBankInfo') {
            that.modalBankInfo = false;
            that.modalBankConfirm = true;
          }
          if (name === 'formBankConfirm') {
            that.formBankConfirmLoading = true;
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
              that.formBankConfirmLoading = false;
              if (res) {
                that.clearTimers();
                that.$refs.formBankInfo.resetFields();
                that.$refs[name].resetFields();
                that.tabVerifyActive = 1;
                that.modalBankConfirm = false;
                that.getAvailableCardList();
                if (!that.userInfo.watchapp) {
                  that.modalWhatsApp = true;
                }
              }
            });
          }
          if (name === 'formWhatsApp') {
            that.formWhatsAppLoading = true;
            post('api/watchapp', that.selectCountry + '-' + that.formWhatsApp.number).then(function (res) {
              that.formWhatsAppLoading = false;
              that.handleReset(name);
              if (res) {
                post('api/common/user_info', '', false).then(function (result) {
                  that.userInfo = result;
                  localStorage.setItem('user', JSON.stringify(result));
                });
              }
            });
          }
          if (name === 'formRelease') {
            var more = that.marketPrice.exchange_buy_max ?
              Math.max(that.marketPrice.exchange_rate, that.marketPrice.exchange_buy_max) :
              that.marketPrice.exchange_rate;
            if (parseFloat(that.formRelease.price) > more * 1.5) {
              that.modalRelease = false;
              that.releaseWarning = that.$t('moreThan50Percent');
              that.modalReleaseWarning = true;
              return;
            }
            var less = that.marketPrice.exchange_sell_min ?
              Math.min(that.marketPrice.exchange_rate, that.marketPrice.exchange_sell_min) :
              that.marketPrice.exchange_rate;
            if (parseFloat(that.formRelease.price) < less * 0.5) {
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
            that.formReleaseConfirmLoading = true;
            post('api/advert', that.formRelease).then(function(res) {
              that.formReleaseConfirmLoading = false;
              if (res) {
                var side = that.formRelease.side;
                that.handleReset('formRelease');
                that.handleReset('formReleaseConfirm');
                that.modalReleaseWarning = false;
                that.modalReleaseConfirm = false;
                that.showListTag = side == 'SELL' ? 'BUY' : 'SELL';
                that.getAdvertList(side);
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
      if (name === 'formReleaseConfirm') {
        this.modalReleaseConfirm = false;
        if (action === 'modify') {
          this.modalRelease = true;
        } else {
          this.$refs.formRelease.resetFields();
        }
      }
      if (this[name + 'Loading']) {
        this[name + 'Loading'] = false;
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
    var locale = localStorage.getItem('locale');
    if (locale) {
      this.locale = locale;
      this.$i18n.locale = locale;
      this.selectCountry = locale === 'ar' ? '+966' : (locale === 'en' ? '+1' : '+86');
      this.sendPlaceholderBank = this.$t('sendVerify');
    }
    this.$on('locale', function(value) {
      this.locale = value;
      this.$i18n.locale = value;
      this.selectCountry = value === 'ar' ? '+966' : (value === 'en' ? '+1' : '+86');
      this.sendPlaceholderBank = this.$t('sendVerify');
    });
    this.$on('googleBound', function(i) {
      if (i) {
        this.getUserInfo();
        if (!this.cardList.length) {
          if (!this.userInfo.googleStatus && this.userInfo.isOpenMobileCheck) {
            that.tabVerifyActive = 2;
          }
          this.modalBankInfo = true;
          return;
        }
      }
    });
    if (localStorage.getItem('token')) {
      this.getUserInfo();
      this.getAvailableCardList();
    }
  },
  created() {
    this.getAdvertList('SELL');
    this.getAdvertList('BUY');
    this.getMarketPrice();
  },
  watch: {
    locale(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$i18n.locale = newVal;
        this.sendPlaceholderBank = this.$t('sendVerify');
      }
    },
    legalCurrency(newVal, oldVal) {
      this.legalCurrencyError = !newVal === true;
      this.legalCurrency = newVal ? Number(newVal).toFixed(2) : oldVal;
    },
    digitalCurrency(newVal, oldVal) {
      this.digitalCurrencyError = !newVal === true;
      this.digitalCurrency = newVal ? Number(newVal).toFixed(4) : oldVal;
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
      return no.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
    },
  },
});
