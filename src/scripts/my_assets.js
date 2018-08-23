var i18n = new VueI18n({
  locale: 'zh', // set locale
  fallbackLocale: 'zh',
  messages: utils.transform(messages),
});

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
      locale: 'zh',
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
          renderHeader: (h) => h('span', this.$t('type'))
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
          renderHeader: (h) => h('span', this.$t('type'))
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
          renderHeader: (h) => h('span', this.$t('status'))
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
          renderHeader: (h) => h('span', this.$t('type'))
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
          renderHeader: (h) => h('span', this.$t('status'))
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
          renderHeader: (h) => h('span', this.$t('type'))
        },
        {
          title: '',
          key: 'amount',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('amount'))
        },
        // {
        //   title: 'Operating',
        //   type: 'expand',
        //   render: (h, params) => {
        //     return h(row_my_assets, {
        //       props: {
        //         row: params.row,
        //       }
        //     })
        //   },
        //   align: 'center'
        // },
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
      BTCToSAR: ''
    }
  },
  methods: {
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
      var that = this;
      post('api/finance/account_balance', {}, false).then((res) => {
        if (res) {
          for (const i in res.allCoinMap) {
            if (i === 'BTC') {
              that.$set(that.balance.BTC, 'total_balance', res.allCoinMap[i].total_balance)
              that.$set(that.balance.BTC, 'lock_balance', res.allCoinMap[i].lock_balance)
              that.$set(that.balance.BTC, 'normal_balance', res.allCoinMap[i].normal_balance)
            } else if (i === 'ETH') {
              that.$set(that.balance.ETH, 'total_balance', res.allCoinMap[i].total_balance)
              that.$set(that.balance.ETH, 'lock_balance', res.allCoinMap[i].lock_balance)
              that.$set(that.balance.ETH, 'normal_balance', res.allCoinMap[i].normal_balance)
            } else if (i === 'USDT') {
              that.$set(that.balance.USDT, 'total_balance', res.allCoinMap[i].total_balance)
              that.$set(that.balance.USDT, 'lock_balance', res.allCoinMap[i].lock_balance)
              that.$set(that.balance.USDT, 'normal_balance', res.allCoinMap[i].normal_balance)
            }
          }
          that.getBTCToSAR()
        }
      })
    },
    //获取btc--sar汇率
    getBTCToSAR() {
      var that = this;
      post('api/common/rate', {}, false).then((res) => {
        that.getBTCToSARLoding = true;
        that.BTCToSAR = res.rate.BTC2SAR;
        that.AssetFoldingBTC = (that.balance.BTC.total_balance / res.rate.BTC2SAR).toFixed(2);
        that.AssetFoldingBTCText = that.balance.BTC.total_balance + 'BTC ≈ ' + that.AssetFoldingBTC + 'SAR';
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
        for (let i = 0; i < res.financeList.length; i++) {
          switch (res.financeList[i].type) {
            case 'buy':
              that.$set(that.data1[i], 'type', that.$t('buyType'));
              break;
            case 'trade':
              that.$set(that.data1[i], 'type', that.$t('tradeType'));
              break;
            case 'sell':
              that.$set(that.data1[i], 'type', that.$t('sellType'));
              break;
            case 'present_coin':
              that.$set(that.data1[i], 'type', that.$t('presentType'));
              break;
            case 'deposit':
              that.$set(that.data1[i], 'type', that.$t('deposit'));
              break;
            case 'withdraw_success':
              that.$set(that.data1[i], 'type', that.$t('withdrawal'));
              break;

            case 'create_sell_ad':
              that.$set(that.data1[i], 'type', that.$t('createSellType'));
              break;
            case 'otc_transfer_sellad':
              that.$set(that.data1[i], 'type', that.$t('transferSellType'));
              break;
            case 'otc_transfer_buyad':
              that.$set(that.data1[i], 'type', that.$t('transferBuyType'));
              break;
            case 'otc_advert_close':
              that.$set(that.data1[i], 'type', that.$t('closeType'));
              break;
            case 'otc_sell_order':
              that.$set(that.data1[i], 'type', that.$t('sellOrderType'));
              break;
            case 'transfer_common':
              that.$set(that.data1[i], 'type', that.$t('transferCommonType'));
              break;
          }
        }
      })
    },
    changePageAll(page) {
      this.getUserAllList(page)
    },
    //充值
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
        for (var i = 0; i < res.financeList.length; i++) {
          if (res.financeList[i].status === 0) {
            that.$set(that.data2[i], 'status', that.$t('unConfirmStatus'))
          } else if (res.financeList[i].status === 1) {
            that.$set(that.data2[i], 'status', that.$t('completeStatus'))
          } else if (res.financeList[i].status === 2) {
            that.$set(that.data2[i], 'status', that.$t('errorStatus'))
          }
          that.$set(that.data2[i], 'type', that.$t('deposit'))
        }
      })
    },
    changePageDeposit(page) {
      this.getUserDepositList(page)
    },
    //提现
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
        for (var i = 0; i < res.financeList.length; i++) {
          if (res.financeList[i].status === 0) {
            that.$set(that.data3[i], 'status', that.$t('unAuditStatus'))
          } else if (res.financeList[i].status === 1) {
            that.$set(that.data3[i], 'status', that.$t('auditSuccessStatus'))
          } else if (res.financeList[i].status === 2) {
            that.$set(that.data3[i], 'status', that.$t('auditFailStatus'))
          } else if (res.financeList[i].status === 3) {
            that.$set(that.data3[i], 'status', that.$t('inPayStatus'))
          } else if (res.financeList[i].status === 4) {
            that.$set(that.data3[i], 'status', that.$t('auditFailStatus'))
          } else if (res.financeList[i].status === 5) {
            that.$set(that.data3[i], 'status', that.$t('completeStatus'))
          } else if (res.financeList[i].status === 6) {
            that.$set(that.data3[i], 'status', that.$t('dismissStatus'))
          }
          that.$set(that.data3[i], 'type', that.$t('withdrawal'))
        }
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
      document.body.dir = locale === 'zh' ? 'ltr' : 'rtl';
      this.$i18n.locale = locale;
    }
    var that = this;
    this.$on('locale', function (i) {
      that.locale = i;
    });

    this.$on('cancelGoogleModal', (i) => {
      this.showGoogleAuth = false;
    });
    this.$on('toGoogleAuth', (i) => {
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
