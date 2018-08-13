var i18n = new VueI18n({
  locale: 'zh', // set locale
  fallbackLocale: 'zh',
  messages: utils.transform(messages),
});

var myAssetsWithdrawal = new Vue({
  el: '#app',
  i18n: i18n,
  components: {
    oHeader: o_header,
    row_my_assets_with
  },
  data: {
    data3: [],
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
    data3Page: 1,
    tableLoading3: true,
    modelCurrency: 'USDT',
    currencyList: [
      {
        value: 'USDT'
      },
      {
        value: 'BTC'
      },
      {
        value: 'ETH'
      },
    ],
    currencyListUSDT: [],
    currencyListBTC: [],
    currencyListETH: [],
    valueAmount: '',
    modelAddress: '',
    addressList: [],
    delStatus: true,
    addressModel: false,
    modal_loading: false,
    WithdrawalAddressError: false,
    WithdrawalAddress: '',
    WithdrawalAddressErrorText: '',
    AddressTagError: false,
    AddressTag: '',
    AddressTagErrorText: '',
    withdrawalErrorText: '',
    balance:{},
    balanceExtractable:'',
    balanceLimit:'',
    loading:false,
  },
  methods: {
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
            that.$set(that.data3[i], 'status', '未审核')
          } else if (res.financeList[i].status === 1) {
            that.$set(that.data3[i], 'status', '审核通过')
          } else if (res.financeList[i].status === 2) {
            that.$set(that.data3[i], 'status', '审核拒绝')
          } else if (res.financeList[i].status === 3) {
            that.$set(that.data3[i], 'status', '支付中已经打币')
          } else if (res.financeList[i].status === 4) {
            that.$set(that.data3[i], 'status', '支付失败')
          } else if (res.financeList[i].status === 5) {
            that.$set(that.data3[i], 'status', '已完成')
          } else if (res.financeList[i].status === 6) {
            that.$set(that.data3[i], 'status', '已撤销')
          }
          that.$set(that.data3[i], 'type', 'Withdrawal')
        }
      })
    },
    changeWithDraw(page) {
      this.getUserWithDrawList(page)
    },
    //添加地址
    addressChange(val) {
      if (this.addressList.length && val === 'Add address') {
        this.modelAddress = this.addressList[0].val
      }
    },
    //切换第一个select
    currencyChange(val) {
      this.valueAmount = '';
      if (val === 'USDT') {
        this.addressList = this.currencyListUSDT
      } else if (val === 'BTC') {
        this.addressList = this.currencyListBTC
      } else if (val === 'ETH') {
        this.addressList = this.currencyListETH
      }
      this.balanceExtractable = this.balance[val].normal_balance + ' ' + val
      this.balanceLimit = this.balance[val].withdraw_min + ' ' + val
    },
    //打开添加地址页面
    addressClick() {
      this.addressModel = true;
    },
    //获取地址
    getAddress(val) {
      var data;
      var that = this;
      data = {
        "coinSymbol": val
      };
      post('api/addr/address_list', JSON.stringify(data), false).then((res) => {
        if (res) {
          if (val === 'USDT') {
            that.currencyListUSDT = res.addressList;
          } else if (val === 'BTC') {
            that.currencyListBTC = res.addressList;
          } else if (val === 'ETH') {
            that.currencyListETH = res.addressList;
          }
          that.getUserBalance()
        }
      })
    },
    //删除地址
    delAddress(val) {
      var that = this;
      var data;
      if (that.delStatus) {
        that.delStatus = false;
        for (var i = 0; i < that.addressList.length; i++) {
          if (val === that.addressList[i].address) {
            data = {
              ids: [that.addressList[i].id]
            };
            post('api/addr/delete_withdraw_addr', JSON.stringify(data), false).then((res) => {
              if (res) {
                that.addressList.splice(i - 1, 1);
                that.modelAddress = ''
              }
              that.delStatus = true;
            })
          }
        }
      }

    },
    //model
    asyncCancel() {
      this.modal_loading = false;
      this.addressModel = false;
      this.clear()
    },
    //clear
    clear() {
      this.WithdrawalAddress = '';
      this.AddressTag = '';
    },
    withdrawalAddressFocus() {
      this.WithdrawalAddressError = false
    },
    //添加地址
    addressFun() {
      var that = this;
      this.modal_loading = true;
      var data;
      data = {
        "coinSymbol": that.modelCurrency,
        "address": that.WithdrawalAddress,
        "label": that.AddressTag
      };
      post('api/addr/add_withdraw_addr', JSON.stringify(data), false).then((res) => {
        if (res) {
          that.asyncCancel();
          this.getAddress(that.modelCurrency);
        } else {
          this.modal_loading = false;
        }
      })
    },
    AddressTagFocus() {
      this.AddressTagError = false
    },
    AddressTagFun() {
      this.modal_loading = true;
    },
    withdrawal() {
      if(this.loading){
        if(this.valueAmount === ''|| this.valueAmount === null){
          this.withdrawalErrorText = '不能为空'
        }else if(isNaN(this.valueAmount) || Number(this.valueAmount) < Number(this.balance[this.modelCurrency].withdraw_min) || Number(this.valueAmount) > Number(this.balance[this.modelCurrency].normal_balance)){
          this.withdrawalErrorText = '请输入合法的区间范围'
        }else{

        }
      }
    },
    //获取用户数据
    getUserBalance() {
      var that = this;
      post('api/finance/account_balance', {}, false).then((res) => {
        if (res) {
          that.loading = true;
          that.balance = res.allCoinMap
          that.currencyChange(that.modelCurrency)
        }
      })
    },
  },
  mounted() {
    this.getUserWithDrawList();
    this.getAddress('USDT');
    this.getAddress('ETH');
    this.getAddress('BTC');
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
