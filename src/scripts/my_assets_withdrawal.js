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
    oGoogleAuth: o_my_googleAuth,
    row_my_assets_with
  },
  beforeCreate (){
    this.userInfo = JSON.parse(localStorage.getItem('user'));
  },
  data (){
    return{
      showGoogleAuth: false,
      locale: {},
      dailyRateStore: {},
      userInfo: JSON.parse(localStorage.getItem('user')),
      data3: [],
      columns3: [
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
      sendSmsEmail: this.$t('getValidateCode'),
      sendSmsPhone: this.$t('getValidateCode'),
      showEmail: true,
      showPhone: true,
      countEmail: '',
      countPhone: '',
      timerEmail: null,
      timerPhone: null,
      googleCode: '',
      googleCodeError: false,
      googleCodeErrorText: '',
      tabsName: this.userInfo.isOpenEmailCheck === 0 ? 'loginPhone' : 'loginEmail',
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
      disabledEmail: this.userInfo.isOpenEmailCheck === 0,
      disabledPhone: this.userInfo.isOpenMobileCheck === 0,
      dailyLimit: '',
      pricePlaceholder: this.$t('minWithdraw')
    }
  },
  methods: {
    checkNum(type) {
      switch (type){
        case 'email':
          if(isNaN(this.emailSmsCode)){
            this.emailSmsCodeError = true;
            this.emailSmsCodeErrorText = this.$t('onlyNum');
          }else{
            this.emailSmsCodeError = false;
            this.emailSmsCodeErrorText = '';
          }
          break;
        case 'phone':
          if(isNaN(this.phoneSmsCode)){
            this.phoneSmsCodeError = true;
            this.phoneSmsCodeErrorText = this.$t('onlyNum');
          }else{
            this.phoneSmsCodeError = false;
            this.phoneSmsCodeErrorText = '';
          }
          break;
        case 'google':
          if(isNaN(this.googleCode)){
            this.googleCodeError = true;
            this.googleCodeErrorText = this.$t('onlyNum');
          }else{
            this.googleCodeError = false;
            this.googleCodeErrorText = '';
          }
          break;
      }
    },
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
        this.addressList = this.currencyListUSDT;
        this.dailyLimit = this.dailyRateStore.open_coins_withdraw_one_day_max_usdt + ' USDT';
      } else if (val === 'BTC') {
        this.addressList = this.currencyListBTC;
        this.dailyLimit = this.dailyRateStore.open_coins_withdraw_one_day_max_btc + ' BTC';
      } else if (val === 'ETH') {
        this.addressList = this.currencyListETH;
        this.dailyLimit = this.dailyRateStore.open_coins_withdraw_one_day_max_eth + ' ETH';
      }
      this.changeCoin = val;
      this.balanceExtractable = this.balance[val].normal_balance + ' ' + val;
      let balanceLimit = this.balance[val].withdraw_min + ' ' + val;
      this.balanceDefaultFee = this.balance[val].defaultFee;

      this.pricePlaceholder = this.$t('minWithdraw') + balanceLimit;
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
        "label": that.AddressTag || that.WithdrawalAddress
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
      if(this.userInfo.googleStatus !== 1){
        this.showGoogleAuth = true;
        return;
      }
      if(!this.modelAddress){
        Toast.show(this.$t('chooseAddress'), { icon: 'warn' });
        return;
      }
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
      this.tabsName = name;
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
      let data = {
        symbol: this.changeCoin,
        addressId: this.addressListID,
        amount: this.valueAmount,
        fee: this.balanceDefaultFee,
        googleCode: this.googleCode,
      };
      let that = this;
      if(this.tabsName === 'loginEmail'){
        data.emailAuthCode = this.emailSmsCode;
        if(this.emailSmsCode.length !== 6){
          this.emailSmsCodeError = true;
          this.emailSmsCodeErrorText = this.$t('emailErrorCode');
          return;
        }
      } else{
        data.smsAuthCode = this.phoneSmsCode;
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
    getDailyRate(){
      get('api/rate').then((res) => {
        this.dailyRateStore = res;
        this.getAddress('USDT');
        this.getAddress('ETH');
        this.getAddress('BTC');
      })
    }
  },
  mounted() {
    var locale = localStorage.getItem('locale');
    if (locale) {
      document.body.dir = locale === 'zh' ? 'ltr' : 'rtl';
      this.$i18n.locale = locale;
    }
    var that = this;
    this.$on('locale', function(i) {
      that.locale = i;
    });
    this.$on('cancelGoogleModal', (i) => {
      this.showGoogleAuth = false;
    });
    this.$on('toGoogleAuth',(i) => {
      this.showGoogleAuth = false;
      this.$refs.header.$data.isRegisterGoogleShow = true;
    });
    this.getDailyRate();
    //判断跳转过来货币类型
    this.modelCurrency = localStorage.getItem('asset_type') ? localStorage.getItem('asset_type') : 'USDT';
    this.getUserWithDrawList();
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

