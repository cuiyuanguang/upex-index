var i18n = new VueI18n({
  locale: 'zh', // set locale
  fallbackLocale: 'zh',
  messages: utils.transform(messages),
});

var account = new Vue({
  el: '#account',
  i18n: i18n,
  components: {
    oHeader: o_header,
  },
  data() {
    // 自定义表单验证
    var validateGoogle = (rule, value, callback) => {
      if (value === '' && this.formBankConfirm.phone === '') {
        callback(new Error('Please enter your email'));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if (value === '' && this.formBankConfirm.google === '') {
        callback(new Error('Please enter your phone'));
      } else {
        callback();
      }
    };
    return {
      user: {
        usdtAmount: {},
        userExtView: {},
      },
      sendPlaceholder: '发送验证码',
      sendDisabled: false,
      // 修改WhatsApp
      modalWhatsApp: false,
      selectCountry: '+86',
      formWhatsApp: {
        number: '',
      },
      ruleWhatsApp: {
        number: [{ required: true, message: 'The number cannot be empty', trigger: 'blur' }],
      },
      // 修改密码
      modalPassword: false,
      formPassword: {
        passwd: '',
        passwdNew: '',
        passwdReNew: '',
        verify: '',
      },
      rulePassword: {
        passwd: [{ required: true, message: 'The name cannot be empty', trigger: 'blur' }],
        passwdNew: [{ required: true, message: 'The name cannot be empty', trigger: 'blur' }],
        passwdReNew: [{ required: true, message: 'The name cannot be empty', trigger: 'blur' }],
        verify: [{ required: true, message: 'The name cannot be empty', trigger: 'blur' }],
      },
      // 绑定/修改邮箱
      modalEmail: false,
      formEmail: {
        email: '',
        verify: '',
      },
      ruleEmail: {
        email: [{ required: true, message: 'The email cannot be empty', trigger: 'blur' }],
        verify: [{ required: true, message: 'The verify cannot be empty', trigger: 'blur' }],
      },
      // 绑定/修改手机号
      modalPhone: false,
      formPhone: {
        phone: '',
        verify: '',
      },
      rulePhone: {
        phone: [{ required: true, message: 'The phone cannot be empty', trigger: 'blur' }],
        verify: [{ required: true, message: 'The verify cannot be empty', trigger: 'blur' }],
      },
      // 添加/修改银行卡
      modalBankInfo: false,
      formBankInfo: {
        bankName: '',
        name: '',
        cardNo: '',
        ibanNo: '',
      },
      ruleBankInfo: {
        bankName: [{ required: true, message: 'The phone cannot be empty', trigger: 'blur' }],
        name: [{ required: true, message: 'The verify cannot be empty', trigger: 'blur' }],
        cardNo: [{ required: true, message: 'The verify cannot be empty', trigger: 'blur' }],
        ibanNo: [{ required: true, message: 'The verify cannot be empty', trigger: 'blur' }],
      },
      modalBankConfirm: false,
      tabVerifyActive: '1',
      formBankConfirm: {
        phone: '',
        google: '',
      },
      ruleBankConfirm: {
        phone: [{ validator: validatePhone, trigger: 'blur' }],
        google: [{ validator: validateGoogle, trigger: 'blur' }],
      },
      // 银行表格
      bankColumn: [
        {
          title: '银行名称',
          key: 'bankName',
          align: 'center',
        },
        {
          title: '账户名称',
          key: 'name',
          align: 'center',
          minWidth: 150,
        },
        {
          title: '卡号',
          key: 'cardNo',
          align: 'center',
        },
        {
          title: '操作',
          key: 'operation',
          align: 'center',
          render: (h, params) => {
            return h(
              'Button',
              {
                props: {
                  type: 'text',
                  size: 'small',
                },
                on: {
                  click: () => {
                    this.modifyBankInfo(params.row);
                  },
                },
              },
              '修改'
            );
          },
        },
        {
          title: '启用',
          key: 'switch',
          align: 'center',
          render: (h, params) => {
            return h('i-switch', {
              props: {
                value: params.row.status === 1,
              },
              on: {
                'on-change': value => {
                  this.modifyBankStatus(params.row, value);
                },
              },
            });
          },
        },
      ],
      bankData: [
        // {
        //   bankName: '中国工商银行',
        //   name: 'AFHKFHWIEHRIEWNFLKFL',
        //   cardNo: '6217993989993322',
        //   ibanNo: '12312332432',
        //   enabled: true,
        // },
        // {
        //   bankName: '中国建设银行',
        //   name: 'KSAKKSAIUEIHROQASDHK',
        //   cardNo: '6219993989993322',
        //   ibanNo: '12312332432',
        //   enabled: false,
        // },
        // {
        //   bankName: '中国招商银行',
        //   name: 'RUIWROERIOREIURIOREID',
        //   cardNo: '6117993989993322',
        //   ibanNo: '12312332432',
        //   enabled: true,
        // },
      ],
      // tab激活项
      tabLogActive: 'loginHistory',
      // 登录历史表格
      loginColumn: [
        {
          title: '登录时间',
          key: 'formatLgInTime',
          align: 'center',
        },
        {
          title: '登录平台',
          key: 'lgPlatform',
          align: 'center',
        },
        {
          title: 'IP地址',
          key: 'lgIp',
          align: 'center',
        },
        {
          title: '登录状态',
          key: 'lgStatus',
          align: 'center',
          render: (h, params) => {
            return h('span', params.row.lgStatus === 1 ? '成功' : '失败');
          },
        },
      ],
      loginData: [
        // {
        //   time: 1533549358281,
        //   platform: 'Web',
        //   ipAddress: '192.223.12.143',
        //   status: 1,
        // },
        // {
        //   time: 1533106474000,
        //   platform: 'iOS',
        //   ipAddress: '82.231.112.134',
        //   status: 1,
        // },
        // {
        //   time: 1532593464005,
        //   platform: 'Android',
        //   ipAddress: '92.123.122.34',
        //   status: 0,
        // },
      ],
      loginDataTotalCount: 0,
      // 操作记录表格
      securityColumn: [
        {
          title: '操作时间',
          key: 'time',
          align: 'center',
          render: (h, params) => {
            return h('span', utils.dateFormat(params.row.time));
          },
        },
        {
          title: '操作平台',
          key: 'platform',
          align: 'center',
        },
        {
          title: 'IP地址',
          key: 'ipAddress',
          align: 'center',
        },
        {
          title: '操作名称',
          key: 'operation',
          align: 'center',
        },
        {
          title: '操作状态',
          key: 'status',
          align: 'center',
          render: (h, params) => {
            return h('span', params.row.status === 1 ? '成功' : '失败');
          },
        },
      ],
      securityData: [
        {
          time: 1533549358281,
          platform: 'Web',
          ipAddress: '192.223.12.143',
          operation: '修改密码',
          status: 1,
        },
        {
          time: 1533106474000,
          platform: 'iOS',
          ipAddress: '82.231.112.134',
          operation: '绑定银行卡',
          status: 1,
        },
        {
          time: 1532593464005,
          platform: 'Android',
          ipAddress: '92.123.122.34',
          operation: '修改WahtsApp',
          status: 0,
        },
      ],
      securityDataTotalCount: 0,
    };
  },
  computed: {
    countryArr() {
      return JSON.parse(localStorage.getItem('country'));
    },
  },
  methods: {
    getUserInfo() {
      var that = this;
      get('api/userInfo').then(function(res) {
        var data = res.data.data;
        that.user = data;
      });
    },
    loginOut() {
      this.$Modal.confirm({
        title: '',
        content: '您确认要退出登录吗？',
        onOk() {
          post('api/user/login_out').then(function(res) {
            localStorage.removeItem('user');
            sessionStorage.clear();
            location.href = 'otc_adverts.html';
          });
        },
      });
    },
    modifyWhatsApp() {
      var whatsAppStr = this.user.userExtView.watchapp;
      this.formWhatsApp.number = whatsAppStr.substr(whatsAppStr.indexOf('-') + 1);
      this.modalWhatsApp = true;
    },
    modifyGoogleStatus(value) {
      console.log(this.user.id, value);
    },
    modifyEmail() {
      if (this.user.email) {
        this.formEmail.email = data;
      }
      this.modalEmail = true;
    },
    handleSubmit(name) {
      var that = this;
      this.$refs[name].validate(function(valid) {
        if (valid) {
          if (name === 'formWhatsApp') {
            post('api/watchapp', that.selectCountry + '-' + that.formWhatsApp.number).then(function (res) {
              if (res.success) {
                that.modalWhatsApp = false;
                that.getUserInfo();
              }
            });
          }
          if (name === 'formBankInfo') {
            that.modalBankInfo = false;
            that.modalBankConfirm = true;
          }
          if (name === 'formBankConfirm') {
            post('api/bankCard', {
              bankName: that.formBankInfo.bankName,
              name: that.formBankInfo.name,
              cardNo: that.formBankInfo.cardNo,
              ibanNo: that.formBankInfo.ibanNo,
              checkType: that.tabVerifyActive,
              checkValue: that.tabVerifyActive == '1' ? that.formBankConfirm.google : that.formBankConfirm.phone,
            }).then(function (res) {
              console.log(res);
              that.modalBankConfirm = false;
              that.getAllCard();
            });
          }
        } else {
          this.$Message.error('Fail!');
        }
      });
    },
    handleReset(name) {
      var sufix = name.substr(4);
      this.$refs[name].resetFields();
      this['modal' + sufix] = false;
    },
    getAllCard: function() {
      var that = this;
      get('api/allBankCard').then(function(result) {
        if (result.data.data.length > 0) {
          that.bankData = result.data.data;
        }
      });
    },
    modifyBankInfo(data) {
      if (data) {
        this.formBankInfo = data;
      }
      this.modalBankInfo = true;
    },
    modifyBankStatus(data, value) {
      console.log(data, value);
      post('api/switchBankCard', { id: data.id }).then(function(res){

      });
    },
    getLoginData(page) {
      var that = this;
      post('api/security/login_history', { pageNum: page, pageSize: 10 }, false).then(function(res) {
        that.loginData = res.data.data.historyLoginList;
        that.loginDataTotalCount = res.data.data.count;
      });
    },
    loginPageChange(page) {
      this.getLoginData(page);
    },
    getSecurityData(page) {
      var that = this;
      post('api/security/setting_history', { pageNum: page, pageSize: 10 }, false).then(function(res) {
        that.securityData = res.data.data.historySettingList;
        that.securityDataTotalCount = res.data.data.count;
      });
    },
    securityPageChange(page) {
      this.getSecurityData(page);
    },
    sendMessage: function () {
      var that = this;
      that.sendDisabled = true;
      get('api/verifycode_sms', { type: 8 }).then(function (res) {
        if (res.success) {
          that.countDown();
        }
      });
    },
    countDown: function () {
      var that = this;
      var counter = 10;
      that.sendPlaceholder = counter + 's';
      var timer = setInterval(function () {
        counter -= 1;
        that.sendPlaceholder = counter + 's';
        if (that.sendPlaceholder == 0) {
          that.sendDisabled = false;
          clearInterval(timer);
        }
      }, 1000);
    },
  },
  mounted() {
    this.getUserInfo();
    this.getAllCard();
    this.getLoginData(1);
    this.getSecurityData(1);
  },
});
