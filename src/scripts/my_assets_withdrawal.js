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
    currencyListUSDT:[],
    currencyListBTC:[],
    currencyListETH:[],
    valueAmount: '',
    modelAddress: '',
    addressList: [

    ],
    addressModel:false,
    modal_loading: false,
    WithdrawalAddressError:false,
    WithdrawalAddress:'',
    WithdrawalAddressErrorText:'',
    AddressTagError:false,
    AddressTag:'',
    AddressTagErrorText:'',
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
    addressChange(val){
      if(this.addressList.length && val === 'Add address'){
        this.modelAddress = this.addressList[0].val
      }
    },
    //切换第一个select
    currencyChange(val){
      console.log(val)
      if(val === 'USDT'){
        this.addressList = this.currencyListUSDT
      }else if(val === 'BTC'){
        this.addressList = this.currencyListBTC
        console.log(this.addressList)
      }else if(val === 'ETH'){
        console.log(this.currencyListETH)
        this.addressList = this.currencyListETH
      }
    },
    //打开添加地址页面
    addressClick(){
      this.addressModel = true;
    },
    //获取地址
    getAddress(val){
      var data;
      var that = this;
      data={
        "coinSymbol":val
      };
      post('api/addr/address_list', JSON.stringify(data), false).then((res) => {
        if(val === 'USDT'){
          that.currencyListUSDT = res.addressList;
        }else if(val === 'BTC'){
          that.currencyListBTC = res.addressList;
          that.addressList = that.currencyListBTC
          console.log(that.addressList)
        }else if(val === 'ETH'){
          that.currencyListETH = res.addressList;
        }
      })
    },
    //删除地址
    delAddress(val) {
      var that = this;
      for (var i = 0; i < that.addressList.length; i++) {
        if(val === that.addressList[i].val){
          that.addressList.splice(i,1)
        }
      }
      that.modelAddress = ''
    },
    //model
    asyncCancel(){
      this.modal_loading = false;
      this.addressModel = false;
    },
    withdrawalAddressFocus(){
      this.WithdrawalAddressError=false
    },
    //添加地址
    addressFun(){
      var that =this;
      this.modal_loading = true;
      var data;
      data = {
        "coinSymbol" : that.modelCurrency,
        "address": that.WithdrawalAddress,
        "label":that.AddressTag
      };
      post('api/addr/add_withdraw_addr', JSON.stringify(data), false).then((res) => {
        if(res){
          that.asyncCancel();
          this.getAddress('USDT');
          this.getAddress('ETH');
          this.getAddress('BTC')
        }
      })
    },
    AddressTagFocus(){
      this.AddressTagError=false
    },
    AddressTagFun(){
      this.modal_loading = true;
    },
  },
  mounted() {
    this.getUserWithDrawList();
    this.getAddress('USDT')
    this.getAddress('ETH')
    this.getAddress('BTC')
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
