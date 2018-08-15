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
    userInfo: {},
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
    modelCurrency: '',
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
    balance: {},
    balanceExtractable: '',
    balanceLimit: '',
    loading: false,
    withdrawalModel: false,
    phoneSmsCode: '',
    phoneSmsCodeError: false,
    phoneSmsCodeErrorText: '',
    emailSmsCode: '',
    emailSmsCodeError: false,
    emailSmsCodeErrorText: '',
    sendSmsEmail: 'get verification code',
    sendSmsPhone: 'get verification code',
    showEmail: true,
    showPhone: true,
    countEmail: '',
    countPhone: '',
    timerEmail: null,
    timerPhone: null,
    googleCode: '',
    googleCodeError: false,
    googleCodeErrorText: '',
    tabsName: 'loginEmail',
    changeCoin: '',
    balanceDefaultFee: '',
    balanceDefaultFeeCalc: '',
    valueAmountCalc: '',
    addressListID: '',
    withdrawalLoading:false,
    withdrawalModelTrue:false,
    withdrawalLoadingTrue:false,
    withdrawalTime:'',
    withdrawalAddress:'',
    disabledEmail: false,
    disabledPhone: false,
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
        this.modelAddress = this.addressList[0].address
      }
      for(var i=0;i<this.addressList.length;i++){
        if(val === this.addressList[i].address){
          this.addressListID = this.addressList[i].id
        }
      }
      console.log(this.addressListID);
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
      this.changeCoin = val;
      this.balanceExtractable = this.balance[val].normal_balance + ' ' + val;
      this.balanceLimit = this.balance[val].withdraw_min + ' ' + val;
      this.balanceDefaultFee = this.balance[val].defaultFee;
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
          that.delStatus = true;
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
                that.getAddress(that.modelCurrency);
                that.modelAddress = ''
              }else{
                that.delStatus = true;
              }

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
      if (this.loading) {
        if (this.valueAmount === '' || this.valueAmount === null) {
          this.withdrawalErrorText = '不能为空'
        } else if (isNaN(this.valueAmount) || Number(this.valueAmount) < Number(this.balance[this.modelCurrency].withdraw_min) || Number(this.valueAmount) > Number(this.balance[this.modelCurrency].normal_balance)) {
          this.withdrawalErrorText = '请输入合法的区间范围'
        } else  {
          this.withdrawalModel = true;
          this.valueAmount = this.returnFloat(Number(this.valueAmount));
          this.valueAmountCalc = this.returnFloat(Number(this.valueAmount) - Number(this.balanceDefaultFee))
        }
      }
    },
    //保留2位小数
    returnFloat(value) {
      var value = Math.round(parseFloat(value) * 100000000) / 100000000;
      var xsd = value.toString().split(".");
      if (xsd.length == 1) {
        value = value.toString() + ".00";
        return value;
      }
      if (xsd.length > 1) {
        if (xsd[1].length < 2) {
          value = value.toString() + "0";
        }
        return value;
      }
    },
    //获取用户数据
    getUserBalance() {
      var that = this;
      post('api/finance/account_balance', {}, false).then((res) => {
        if (res) {
          that.loading = true;
          that.balance = res.allCoinMap;
          that.currencyChange(that.modelCurrency)
        }
      })
    },
    //添加地址弹框
    //取消
    withdrawalCancel() {
      this.modal_loading = false;
      this.clearAdd();
    },
    clearAdd() {

    },
    //发送验证码
    runSendSms(type) {
      const TIME_COUNT = 90;
      var that = this;
      var data;
      if (type === 'phone') {
        if (!that.timerPhone) {
          data = {
            operationType: '13',
          };
          that.countPhone = TIME_COUNT;
          that.sendSmsPhone = 'Resend after ' + that.countPhone + 's';
          that.showPhone = false;
          that.timerPhone = setInterval(() => {
            if (that.countPhone > 0 && that.countPhone <= TIME_COUNT) {
              that.countPhone--;
              that.sendSmsPhone = 'Resend after ' + that.countPhone + ' s';
            } else {
              that.sendSmsPhone = 'Reacquire';
              that.showPhone = true;
              clearInterval(that.timerPhone);
              that.timerPhone = null;
            }
          }, 1000);
          post('api/common/smsValidCode', JSON.stringify(data), false).then(function (res) {
            if (res) {

            } else {

            }
          });
        }
      } else if (type === 'email') {
        if (!that.timerEmail) {
          data = {
            email: that.emailVal,
            operationType: '1',
          };
          that.countEmail = TIME_COUNT;
          that.sendSmsEmail = 'Resend after ' + that.countEmail + 's';
          that.showEmail = false;
          that.timerEmail = setInterval(() => {
            if (that.countEmail > 0 && that.countEmail <= TIME_COUNT) {
              that.countEmail--;
              that.sendSmsEmail = 'Resend after ' + that.countEmail + ' s';
            } else {
              that.sendSmsEmail = 'Reacquire';
              that.showEmail = true;
              clearInterval(that.timerEmail);
              that.timerEmail = null;
            }
          }, 1000);
          post('api/common/emailValidCode', JSON.stringify(data)).then(function (res) {
            if (res) {

            } else {
            }
          });
        }
      }

    },
    //email
    emailSmsCodeFocus() {
      this.emailSmsCodeError = false;
      this.emailSmsCodeErrorText = ''
    },
    //phone
    phoneSmsCodeFocus() {
      this.phoneSmsCodeError = false;
      this.phoneSmsCodeErrorText = ''
    },
    //google
    googleCodeFocus() {
      this.googleCodeError = false;
      this.googleCodeErrorText = '';
    },
    tabChange(name) {
      if(name === 'loginPhone'){
        this.emailSmsCode = '';
        this.emailSmsCodeError = false;
        this.emailSmsCodeErrorText = '';
      } else{
        this.phoneSmsCode = '';
        this.phoneSmsCodeError = false;
        this.phoneSmsCodeErrorText = '';
      }
    },
    okWithdrawal() {
      var data;
      var that = this;
      if(this.tabsName === 'loginEmail'){
        if(this.emailSmsCode.length !== 6){
          this.emailSmsCodeError = true;
          this.emailSmsCodeErrorText = this.$t('emailErrorCode');
          return;
        }
      } else{
        if(this.phoneSmsCode.length !== 6){
          this.phoneSmsCodeError = true;
          this.phoneSmsCodeErrorText = this.$t('phoneErrorCode');
          return;
        }
      }

      if(this.googleCode.length !== 6){
        this.googleCodeError = true;
        this.googleCodeErrorText = this.$t('googleErrorCode');
        return;
      }
      data = {
        symbol: this.changeCoin,
        addressId: this.addressListID,
        amount: this.valueAmount,
        fee: this.balanceDefaultFee,
        smsAuthCode: this.phoneSmsCode,
        googleCode: this.googleCode,
        emailCode: this.emailSmsCode
      };
      that.withdrawalLoading = true;
      post('api/finance/do_withdraw', JSON.stringify(data)).then((res) => {
        that.withdrawalLoading = false;
        if(res){
          that.withdrawalModelTrue = true;
          that.withdrawalModel = false;
          that.withdrawalTime = res.applyTime;
          that.withdrawalAddress = res.address
        }
      })
    },
    //提现确认框
    withdrawalCancelTrue(){
      this.withdrawalModelTrue= false;
    },
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    //判断email和 phone Tab显示隐藏
    this.disabledEmail = this.userInfo.emailAuthenticatorStatus === 0;
    this.disabledPhone = this.userInfo.mobileAuthenticatorStatus === 0;
    //判断跳转过来货币类型
    this.modelCurrency = localStorage.getItem('asset_type') ? localStorage.getItem('asset_type') : 'USDT';
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
  destroyed(){
    localStorage.removeItem("asset_type");
  }
});
