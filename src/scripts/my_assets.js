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
    row_my_assets
  },
  data: {
    tableLoading: true,
    balance: {
      BTC: {},
      ETH: {},
      USDT: {},
    },
    PageAll: 1,
    AssetFoldingBTC: '0.156346',
    orderWrapTable: '',
    columns1: [
      {
        title: 'Time',
        key: 'time',
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
    columns2: [
      {
        title: 'Time',
        key: 'time',
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
        key: 'time',
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
    columns4: [
      {
        title: 'Time',
        key: 'time',
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
    data1: [
      {
        time: 'John Brown',
        currency: 18,
        type: 'New York No. 1 Lake Park',
        amount: 'Data engineer',
        status: 'badminton',
        TXid: '12312312312312312312312313123',
      },
      {
        time: 'John Brown',
        currency: 13128,
        type: 'New York No. 1 Lake Park',
        amount: 'Data engineer',
        status: 'badminton',
        TXid: '12312312312312312312312313123',
      },
      {
        time: 'John Brown',
        currency: 11238,
        type: 'New York No. 1 Lake Park',
        amount: 'Data engineer',
        status: 'badminton',
        TXid: '12312312312312312312312313123',
      },
      {
        time: 'John Brown',
        currency: 11328,
        type: 'New York No. 1 Lake Park',
        amount: 'Data engineer',
        status: 'badminton',
        TXid: '12312312312312312312312313123',
      }
    ],
    data2: [],
    data3: [],
    data4: [],
  },
  methods: {
    getUserBalance() {
      var that = this;
      post('api/finance/account_balance', {}, false).then((res) => {
        if (res) {
          that.tableLoading = false;
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
        }
      })
    },
    //全部
    getUserAllList(page) {
      var that = this;
      that.tableLoading = true;
      var data;
      data = {
        pageSize: 10,
        page: page
      };
      post('api/record/deposit_list', JSON.stringify(data), false).then((res) => {
        that.tableLoading = false;
      })
    },
    changePageAll(page) {
      this.pageAll = page;
      this.getUserAllList(this.pageAll)
    },
    //充值
    getUserDepositList() {
      var that = this;
      post('api/record/deposit_list', {}, false).then((res) => {
        console.log(res)
      })
    },
    //提现
    getUserWithDrawList() {
      var that = this;
      post('api/record/withDraw_list', {}, false).then((res) => {
        console.log(res)
      })
    },
    //其他
    getUserOtherTransferList() {
      var that = this;
      post('api/record/other_transfer_list', {}, false).then((res) => {
        console.log(res)
      })
    },
  },
  mounted() {
    this.getUserBalance();
    this.getUserAllList()
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
