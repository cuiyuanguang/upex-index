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
    row_my_assets,
    row_my_assets_with
  },
  data: {
    balance: {
      BTC: {},
      ETH: {},
      USDT: {},
    },
    AssetFoldingBTC: 0,
    AssetFoldingBTCText:'',
    getBTCToSARLoding:false,
    orderWrapTable: '',
    columns1: [
      {
        title: 'Time',
        key: 'createdAt',
        align: 'center'
      },
      {
        title: 'Currency',
        key: 'currency',
        align: 'center'
      },
      {
        title: 'Type',
        key: 'type',
        align: 'center'
      },
      {
        title: 'Amount',
        key: 'amount',
        align: 'center'
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
    columns2: [
      {
        title: 'Time',
        key: 'createdAt',
        align: 'center'
      },
      {
        title: 'Currency',
        key: 'symbol',
        align: 'center'
      },
      {
        title: 'Type',
        key: 'type',
        align: 'center'
      },
      {
        title: 'Amount',
        key: 'amount',
        align: 'center'
      },
      {
        title: 'Status',
        key: 'status',
        align: 'center'
      },
      {
        title: 'Operating',
        type: 'expand',
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
        title: 'Time',
        key: 'createdAt',
        align: 'center'
      },
      {
        title: 'Currency',
        key: 'symbol',
        align: 'center'
      },
      {
        title: 'Type',
        key: 'type',
        align: 'center'
      },
      {
        title: 'Amount',
        key: 'amount',
        align: 'center'
      },
      {
        title: 'Status',
        key: 'status',
        align: 'center'
      },
      {
        title: 'Operating',
        type: 'expand',
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
        title: 'Time',
        key: 'createdAt',
        align: 'center'
      },
      {
        title: 'Currency',
        key: 'currency',
        align: 'center'
      },
      {
        title: 'Type',
        key: 'type',
        align: 'center'
      },
      {
        title: 'Amount',
        key: 'amount',
        align: 'center'
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
    BTCToSAR:''
  },
  methods: {
    //跳转With
    runWithdrawal(type){
      window.location.href= "otc_my_assets_withdrawal.html";
      localStorage.setItem("asset_type", type);
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
    getBTCToSAR(){
      var that = this;
      post('api/common/rate', {}, false).then((res) => {
        that.getBTCToSARLoding = true;
        that.BTCToSAR = res.rate.BTC2SAR;
        that.AssetFoldingBTC =(that.balance.BTC.total_balance / res.rate.BTC2SAR).toFixed(2);
        that.AssetFoldingBTCText = that.balance.BTC.total_balance+ 'BTC ≈ '+that.AssetFoldingBTC+'SAR';
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
          if(res.financeList[i].status === 0){
            that.$set(that.data2[i], 'status', '未确认')
          }else if(res.financeList[i].status === 1){
            that.$set(that.data2[i], 'status', '已完成')
          }else if(res.financeList[i].status === 2){
            that.$set(that.data2[i], 'status', '异常')
          }
          that.$set(that.data2[i], 'type', 'deposit')
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
          if(res.financeList[i].status === 0){
            that.$set(that.data3[i], 'status', '未审核')
          }else if(res.financeList[i].status === 1){
            that.$set(that.data3[i], 'status', '审核通过')
          }else if(res.financeList[i].status === 2){
            that.$set(that.data3[i], 'status', '审核拒绝')
          }else if(res.financeList[i].status === 3){
            that.$set(that.data3[i], 'status', '支付中已经打币')
          }else if(res.financeList[i].status === 4){
            that.$set(that.data3[i], 'status', '支付失败')
          }else if(res.financeList[i].status === 5){
            that.$set(that.data3[i], 'status', '已完成')
          }else if(res.financeList[i].status === 6){
            that.$set(that.data3[i], 'status', '已撤销')
          }
          that.$set(that.data3[i], 'type', 'Withdrawal')
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
