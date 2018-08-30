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

var myAssets = new Vue({
  el: '#app',
  i18n: i18n,
  components: {
    oHeader: o_header,
    oGoogleAuth: o_my_googleAuth,
    row_my_assets,
    row_my_assets_with
  },
  data() {
    return {
      locale: 'ar',
      showGoogleAuth: false,
      balance: {
        BTC: {},
        ETH: {},
        USDT: {},
      },
      userInfo: JSON.parse(localStorage.getItem('user')),
      AssetFoldingBTC: 0,
      AssetFoldingBTCText: '',
      getBTCToSARLoding: false,
      orderWrapTable: '',
      columns1: [
        {
          title: '',
          key: 'createdAt',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('time'))
        },
        {
          title: '',
          key: 'currency',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('currency'))
        },
        {
          title: '',
          key: 'type',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('type')),
          render: (h,params) => h('span', this.switchRecentType(params.row.type,params.row.amount))
        },
        {
          title: '',
          key: 'amount',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('amount'))
        }
      ],
      columns2: [
        {
          title: '',
          key: 'createdAt',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('time'))
        },
        {
          title: '',
          key: 'symbol',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('currency'))
        },
        {
          title: '',
          key: 'type',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('type')),
          render: (h, params) => h('span', this.$t('deposit'))
        },
        {
          title: '',
          key: 'amount',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('amount'))
        },
        {
          title: '',
          key: 'status',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('status')),
          render: (h, params) => h('span', this.switchDepositStatus(params.row.status))
        },
        {
          title: '',
          type: 'expand',
          renderHeader: (h) => h('span', this.$t('operate')),
          render: (h, params) => {
            return h(row_my_assets, {
              props: {
                row: params.row,
              }
            })
          },
          align: 'center'
        },
      ],
      columns3: [
        {
          title: '',
          key: 'createdAt',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('time')),
        },
        {
          title: '',
          key: 'symbol',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('currency'))
        },
        {
          title: '',
          key: 'type',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('type')),
          render: (h, params) => h('span', this.$t('withdrawal')),
        },
        {
          title: '',
          key: 'amount',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('amount'))
        },
        {
          title: '',
          key: 'status',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('status')),
          render: (h, params) => h('span', this.switchWithdrawalStatus(params.row.status))
        },
        {
          title: '',
          type: 'expand',
          renderHeader: (h) => h('span', this.$t('operate')),
          render: (h, params) => {
            return h(row_my_assets_with, {
              props: {
                row: params.row,
              }
            })
          },
          align: 'center'
        },
      ],
      columns4: [
        {
          title: '',
          key: 'createdAt',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('time'))
        },
        {
          title: '',
          key: 'currency',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('currency'))
        },
        {
          title: '',
          key: 'type',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('type')),
          render: (h, params) => {
            return h('span', this.$t(params.row.type))
          }
        },
        {
          title: '',
          key: 'amount',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('amount'))
        },
      ],
      data1: [],
      data2: [],
      data3: [],
      data4: [],
      data1Page: 1,
      data2Page: 1,
      data3Page: 1,
      data4Page: 1,
      tableLoading1: true,
      tableLoading2: true,
      tableLoading3: true,
      tableLoading4: true,
      BTCToSAR: '',
      totalBalance: ''
    }
  },
  methods: {
    //最近记录表格_type
    switchRecentType(type, amount) {
      if (type === 'buy') {
        return this.$t('buyType');
      }
      if (type === 'trade') {
        return this.$t('tradeType');
      }
      if (type === 'sell') {
        return this.$t('sellType');
      }
      if (type === 'present_coin') {
        return this.$t('presentType')
      }
      if (type === 'deposit') {
        return this.$t('deposit')
      }
      if (type === 'withdraw_success' || type === 'withdraw') {
        return this.$t('withdrawal')
      }

      if (type === 'create_sell_ad') {
        return this.$t('createSellType');
      }
      if (type === 'otc_transfer_sellad') {
        return this.$t('transferSellType');
      }
      if (type === 'otc_transfer_buyad' && amount > 0) {
        return this.$t('transferBuyType');
      }

      if(type === 'otc_transfer_buyad' && amount < 0){
        return this.$t('transferSellType');
      }

      if (type === 'otc_advert_close') {
        return this.$t('closeType');
      }
      if (type === 'otc_sell_order') {
        return this.$t('sellOrderType');
      }
      if (type === 'transfer_common') {
        return this.$t('transferCommonType');
      }
    },
    //充币表格_status
    switchDepositStatus(status) {
      if (status === 0) {
        return this.$t('unConfirmStatus');
      }
      if (status === 1) {
        return this.$t('completeStatus');
      }
      if (status === 2) {
        return this.$t('errorStatus');
      }
    },
    //提币表格_status
    switchWithdrawalStatus(status) {
      if (status === 0) {
        return this.$t('unAuditStatus');
      }
      if (status === 1) {
        return this.$t('auditSuccessStatus')
      }
      if (status === 2) {
        return this.$t('auditFailStatus')
      }
      if (status === 3) {
        return this.$t('inPayStatus')
      }
      if (status === 4) {
        return this.$t('auditFailStatus')
      }
      if (status === 5) {
        return this.$t('completeStatus')
      }
      if (status === 6) {
        return this.$t('dismissStatus')
      }
    },
    //跳转With
    runWithdrawal(type) {
      if (this.userInfo.googleStatus !== 1) {
        this.showGoogleAuth = true;
        return;
      }
      window.location.href = "otc_my_assets_withdrawal.html";
      localStorage.setItem("asset_type", type);
    },

    runRecharge() {
      window.location.href = "otc_my_assets_recharge.html";
    },
    //获取头部数据
    getUserBalance() {
      post('api/finance/account_balance', {}, false).then((res) => {
        if (res) {
          this.totalBalance = res.totalBalance;
          for (const i in res.allCoinMap) {
            if (i === 'BTC') {
              this.$set(this.balance.BTC, 'total_balance', res.allCoinMap[i].total_balance)
              this.$set(this.balance.BTC, 'lock_balance', res.allCoinMap[i].lock_balance)
              this.$set(this.balance.BTC, 'normal_balance', res.allCoinMap[i].normal_balance)
            } else if (i === 'ETH') {
              this.$set(this.balance.ETH, 'total_balance', res.allCoinMap[i].total_balance)
              this.$set(this.balance.ETH, 'lock_balance', res.allCoinMap[i].lock_balance)
              this.$set(this.balance.ETH, 'normal_balance', res.allCoinMap[i].normal_balance)
            } else if (i === 'USDT') {
              this.$set(this.balance.USDT, 'total_balance', res.allCoinMap[i].total_balance)
              this.$set(this.balance.USDT, 'lock_balance', res.allCoinMap[i].lock_balance)
              this.$set(this.balance.USDT, 'normal_balance', res.allCoinMap[i].normal_balance)
            }
          }
          //获取btc--sar汇率
          post('api/common/rate', {}, false).then((res) => {
            this.getBTCToSARLoding = true;
            this.BTCToSAR = res.rate.BTC2SAR;
            this.AssetFoldingBTC = (this.totalBalance / res.rate.BTC2SAR).toFixed(2);
            this.AssetFoldingBTCText = this.totalBalance + 'BTC ≈ ' + this.AssetFoldingBTC + 'SAR';
          })
        }
      })
    },
    //全部
    getUserAllList(page) {
      var that = this;
      that.tableLoading1 = true;
      var data;
      data = {
        pageSize: 10,
        page: page || 1
      };
      post('api/record/record_list', JSON.stringify(data), false).then((res) => {
        that.tableLoading1 = false;
        that.data1 = res.financeList;
        that.data1Page = res.count;
      })
    },
    changePageAll(page) {
      this.getUserAllList(page)
    },
    //充币
    getUserDepositList(page) {
      var that = this;
      that.tableLoading2 = true;
      var data;
      data = {
        pageSize: 10,
        page: page || 1
      };
      post('api/record/deposit_list', JSON.stringify(data), false).then((res) => {
        that.tableLoading2 = false;
        that.data2 = res.financeList;
        that.data2Page = res.count;
      })
    },
    changePageDeposit(page) {
      this.getUserDepositList(page)
    },
    //提币
    getUserWithDrawList(page) {
      var that = this;
      that.tableLoading3 = true;
      var data;
      data = {
        pageSize: 10,
        page: page || 1
      };
      post('api/record/withdraw_list', JSON.stringify(data), false).then((res) => {
        that.data3 = res.financeList;
        that.tableLoading3 = false;
        that.data3Page = res.count;
      })
    },
    changeWithDraw(page) {
      this.getUserWithDrawList(page)
    },
    //其他
    getUserOtherTransferList(page) {
      var that = this;
      that.tableLoading4 = true;
      var data;
      data = {
        pageSize: 10,
        page: page || 1
      };
      post('api/record/other_transfer_list', JSON.stringify(data), false).then((res) => {
        that.data4 = res.financeList;
        that.tableLoading4 = false;
        that.data4Page = res.count;
      })
    },
    changeOtherTransfer(page) {
      this.getUserOtherTransferList(page)
    },
  },
  mounted() {
    var locale = localStorage.getItem('locale');
    if (locale) {
      this.locale = locale;
      this.$i18n.locale = locale;
    }
    this.$on('locale', function (i) {
      this.locale = i;
      this.$i18n.locale = i;
    });

    this.$on('cancelGoogleModal', function (i) {
      this.showGoogleAuth = false;
    });
    this.$on('toGoogleAuth', function (i) {
      this.showGoogleAuth = false;
      this.$refs.header.$data.isRegisterGoogleShow = true;
    });
    this.getUserBalance();
    this.getUserAllList();
    this.getUserDepositList();
    this.getUserWithDrawList();
    this.getUserOtherTransferList();
  },
  filters: {},
  watch: {
    locale: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$i18n.locale = newVal;
      }
    },
  },
});
