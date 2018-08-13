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
    myregistergoogle: o_my_registerGoogle,
  },
  data() {
    // 自定义表单验证
    var validateEmailSecurity = (rule, value, callback) => {
      const valueTrim = value.trim();
      // eslint-disable-next-line
      const reg = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
      if (this.user.email) {
        if (valueTrim === '') {
          callback(new Error(this.$t('canNotBeEmpty')));
        } else if (!reg.test(valueTrim)) {
          callback(new Error('Email ' + this.$t('formatError')));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    var validateGoogleSecurity = (rule, value, callback) => {
      if (this.user.googleStatus && value === '') {
        callback(new Error(this.$t('canNotBeEmpty')));
      } else {
        callback();
      }
    };
    var validatePhoneSecurity = (rule, value, callback) => {
      if (this.user.mobileNumber) {
        if (value === '') {
          callback(new Error(this.$t('canNotBeEmpty')));
        } else if (!/\d+$/g.test(value)) {
          callback(new Error(this.$t('phone') + ' ' + this.$t('formatError')));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    var validateGoogleBank = (rule, value, callback) => {
      if (value === '' && this[rule.name].phone === '') {
        callback(new Error(this.$t('canNotBeEmpty')));
      } else {
        callback();
      }
    };
    var validatePhoneBank = (rule, value, callback) => {
      if (value === '' && this[rule.name].google === '') {
        callback(new Error(this.$t('canNotBeEmpty')));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      const valueTrim = value.trim();
      if (valueTrim === '') {
        callback(new Error(this.$t('canNotBeEmpty')));
      } else if (valueTrim.length > 18 || valueTrim.length < 6) {
        callback(new Error(this.$t('six2eighteen')));
      } else {
        if (this.formPassword.passwordNew !== '') {
          // 对第二个密码框单独验证
          this.$refs.formPassword.validateField('passwordReNew');
        }
        callback();
      }
    };
    var validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('canNotBeEmpty')));
      } else if (value !== this.formPassword.passwordNew) {
        callback(new Error(this.$t('notMatch')));
      } else {
        callback();
      }
    };
    return {
      locale: 'zh',
      user: {},
      googleStatus: '',
      sendPlaceholderPassword: this.$t('sendVerify'),
      sendDisabledPassword: false,
      sendPlaceholderGoogle: this.$t('sendVerify'),
      sendDisabledGoogle: false,
      sendPlaceholderOldEmail: this.$t('sendVerify'),
      sendDisabledOldEmail: false,
      sendPlaceholderEmail: this.$t('sendVerify'),
      sendDisabledEmail: false,
      sendPlaceholderOldPhone: this.$t('sendVerify'),
      sendDisabledOldPhone: false,
      sendPlaceholderNewPhone: this.$t('sendVerify'),
      sendDisabledNewPhone: false,
      sendPlaceholderBank: this.$t('sendVerify'),
      sendDisabledBank: false,
      // 修改WhatsApp
      modalWhatsApp: false,
      selectCountry: '+86',
      formWhatsApp: {
        number: '',
      },
      ruleWhatsApp: {
        number: [{ required: true, message: this.$t('canNotBeEmpty'), trigger: 'blur' }],
      },
      // 修改密码
      modalPassword: false,
      formPassword: {
        password: '',
        passwordNew: '',
        passwordReNew: '',
        email: '',
        google: '',
        phone: '',
      },
      rulePassword: {
        password: [{ required: true, message: this.$t('canNotBeEmpty'), trigger: 'blur' }],
        passwordNew: [{ required: true, validator: validatePass, trigger: 'blur' }],
        passwordReNew: [{ required: true, validator: validatePassCheck, trigger: 'blur' }],
        email: [{ validator: validateEmailSecurity, trigger: 'blur' }],
        google: [{ name: 'formPassword', validator: validateGoogleSecurity, trigger: 'blur' }],
        phone: [{ name: 'formPassword', validator: validatePhoneSecurity, trigger: 'blur' }],
      },
      // 绑定修改谷歌验证
      modalGoogle: false,
      formGoogle: {
        google: '',
        phone: '',
        password: '',
      },
      ruleGoogle: {
        google: [{ required: true, message: this.$t('canNotBeEmpty'), trigger: 'blur' }],
        phone: [{ required: true, message: this.$t('canNotBeEmpty'), trigger: 'blur' }],
        password: [{ required: true, message: this.$t('canNotBeEmpty'), trigger: 'blur' }],
      },
      // 绑定/修改邮箱
      modalEmail: false,
      formEmail: {
        oldEmail: '',
        email: '',
        verify: '',
        google: '',
        phone: '',
      },
      ruleEmail: {
        oldEmail: [{ name: 'formEmail', validator: validateEmailSecurity, trigger: 'blur' }],
        email: [{ required: true, message: this.$t('canNotBeEmpty'), trigger: 'blur' }],
        verify: [{ required: true, message: this.$t('canNotBeEmpty'), trigger: 'blur' }],
        google: [{ name: 'formEmail', validator: validateGoogleSecurity, trigger: 'blur' }],
        phone: [{ name: 'formEmail', validator: validatePhoneSecurity, trigger: 'blur' }],
      },
      // 绑定/修改手机号
      modalPhone: false,
      formPhone: {
        oldVerify: '',
        phone: '',
        verify: '',
        google: '',
      },
      rulePhone: {
        oldVerify: [{ validator: validatePhoneSecurity, trigger: 'blur' }],
        phone: [{ required: true, message: this.$t('canNotBeEmpty'), trigger: 'blur' }],
        verify: [{ required: true, message: this.$t('canNotBeEmpty'), trigger: 'blur' }],
        google: [{ required: true, message: this.$t('canNotBeEmpty'), trigger: 'blur' }],
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
        bankName: [{ required: true, message: this.$t('canNotBeEmpty'), trigger: 'blur' }],
        name: [{ required: true, message: this.$t('canNotBeEmpty'), trigger: 'blur' }],
        cardNo: [{ required: true, message: this.$t('canNotBeEmpty'), trigger: 'blur' }],
        ibanNo: [{ required: true, message: this.$t('canNotBeEmpty'), trigger: 'blur' }],
      },
      modalBankConfirm: false,
      tabVerifyActive: '1',
      formBankConfirm: {
        phone: '',
        google: '',
      },
      ruleBankConfirm: {
        phone: [{ name: 'formBankConfirm', validator: validatePhoneBank, trigger: 'blur' }],
        google: [{ name: 'formBankConfirm', validator: validateGoogleBank, trigger: 'blur' }],
      },
      // 银行表格
      bankColumn: [
        {
          title: this.$t('bankName'),
          key: 'bankName',
          align: 'center',
        },
        {
          title: this.$t('accountName'),
          key: 'name',
          align: 'center',
          minWidth: 150,
        },
        {
          title: this.$t('cardNo'),
          key: 'cardNo',
          align: 'center',
        },
        {
          title: this.$t('operation'),
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
              this.$t('修改')
            );
          },
        },
        {
          title: this.$t('enable'),
          key: 'switch',
          align: 'center',
          render: (h, params) => {
            return h('i-switch', {
              props: {
                controllable: true,
                size: 'large',
                value: params.row.status === 1,
              },
              on: {
                'on-change': () => {
                  this.modifyBankStatus(params.row);
                },
              },
            }, [
              h('span', { slot: 'open' }, 'YES'),
              h('span', { slot: 'close' }, 'NO'),
            ]);
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
          title: this.$t('loginTime'),
          key: 'formatLgInTime',
          align: 'center',
        },
        {
          title: this.$t('loginPlat'),
          key: 'lgPlatform',
          align: 'center',
        },
        {
          title: this.$t('ipAddress'),
          key: 'lgIp',
          align: 'center',
        },
        {
          title: this.$t('status'),
          key: 'lgStatus',
          align: 'center',
          render: (h, params) => {
            return h('span', params.row.lgStatus === 1 ? this.$t('success') : this.$t('fail'));
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
          title: this.$t('operationTime'),
          key: 'formatCtime',
          align: 'center',
        },
        {
          title: this.$t('operationPlat'),
          key: 'networkWhere',
          align: 'center',
        },
        {
          title: this.$t('ipAddress'),
          key: 'optIp',
          align: 'center',
        },
        {
          title: this.$t('operationName'),
          key: 'networkOperator',
          align: 'center',
        },
        {
          title: this.$t('status'),
          key: 'status',
          align: 'center',
          render: (h, params) => {
            return h('span', params.row.optType === 1 ? this.$t('success') : this.$t('fail'));
          },
        },
      ],
      securityData: [
        // {
        //   time: 1533549358281,
        //   platform: 'Web',
        //   ipAddress: '192.223.12.143',
        //   operation: '修改密码',
        //   status: 1,
        // },
        // {
        //   time: 1533106474000,
        //   platform: 'iOS',
        //   ipAddress: '82.231.112.134',
        //   operation: '绑定银行卡',
        //   status: 1,
        // },
        // {
        //   time: 1532593464005,
        //   platform: 'Android',
        //   ipAddress: '92.123.122.34',
        //   operation: '修改WahtsApp',
        //   status: 0,
        // },
      ],
      securityDataTotalCount: 0,
    };
  },
  computed: {
    countryArr() {
      return JSON.parse(localStorage.getItem('country'));
    },
    isregisterCookie() {
      return localStorage.getItem('token');
    },
  },
  methods: {
    getUserInfo() {
      var that = this;
      post('api/common/user_info', '', false).then(function(res) {
        that.user = res;
      });
    },
    loginOut() {
      this.$Modal.confirm({
        title: '',
        content: this.$t('confirmLogOut'),
        onOk() {
          post('api/user/login_out', '', false).then(function(res) {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            location.href = 'otc_adverts.html';
          });
        },
      });
    },
    modifyWhatsApp() {
      var whatsAppStr = this.user.watchapp;
      this.formWhatsApp.number = whatsAppStr.substr(whatsAppStr.indexOf('-') + 1);
      this.modalWhatsApp = true;
    },
    modifyGoogleStatus() {
      this.modalGoogle = true;
    },
    bindGoogle() {
      this.$refs.header.$data.isRegisterGoogleShow = true;
    },
    modifyEmail() {
      this.modalEmail = true;
    },
    modifyPhone() {
      this.modalPhone = true;
    },
    handleSubmit(name) {
      var that = this;
      this.$refs[name].validate(function(valid) {
        if (valid) {
          if (name === 'formWhatsApp') {
            post('api/watchapp', that.selectCountry + '-' + that.formWhatsApp.number)
              .then(function(res) {
                if (res) {
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
            if (that.formBankInfo.id) {
              put('api/bankCard', {
                id: that.formBankInfo.id,
                bankName: that.formBankInfo.bankName,
                name: that.formBankInfo.name,
                cardNo: that.formBankInfo.cardNo,
                ibanNo: that.formBankInfo.ibanNo,
                checkType: that.tabVerifyActive,
                checkValue:
                  that.tabVerifyActive == '1'
                    ? that.formBankConfirm.google
                    : that.formBankConfirm.phone,
              }).then(function(res) {
                that.modalBankConfirm = false;
                that.tabVerifyActive = 1;
                that.getAllCard();
              });
            }
            if (!that.formBankInfo.id) {
              post('api/bankCard', {
                id: that.formBankInfo.id,
                bankName: that.formBankInfo.bankName,
                name: that.formBankInfo.name,
                cardNo: that.formBankInfo.cardNo,
                ibanNo: that.formBankInfo.ibanNo,
                checkType: that.tabVerifyActive,
                checkValue:
                  that.tabVerifyActive == '1'
                    ? that.formBankConfirm.google
                    : that.formBankConfirm.phone,
              }).then(function(res) {
                that.modalBankConfirm = false;
                that.tabVerifyActive = 1;
                that.getAllCard();
              });
            }
          }
          if (name === 'formPassword') {
            post('api/user/password_update', {
              smsAuthCode: that.formPassword.phone,
              googleCode: that.formPassword.google,
              loginPword: that.formPassword.password,
              newLoginPword: that.formPassword.passwordReNew,
            }).then(function(res) {
              if (res) {
                that.tabVerifyActive = 1;
                that.modalPassword = false;
              }
            });
          }
          if (name === 'formGoogle') {
            post('api/user/close_google_verify', {
              googleCode: that.formGoogle.google,
              smsValidCode: that.formGoogle.phone,
              loginPwd: that.formGoogle.password,
            }).then(function(res) {
              if (res) {
                that.modalGoogle = false;
                that.getUserInfo();
              }
            });
          }
          if (name === 'formEmail') {
            var emailApi = that.user.email ? 'api/user/email_update' : 'api/user/email_bind_save';
            post(emailApi, {
              emailOldValidCode: that.formEmail.oldEmail,
              email: that.formEmail.email,
              emailNewValidCode: that.formEmail.verify,
              smsValidCode: that.formEmail.phone,
              googleCode: that.formEmail.google,
            }).then(function(res) {
              if (res) {
                that.modalEmail = false;
                that.getUserInfo();
              }
            });
          }
          if (name === 'formPhone') {
            var phoneApi = that.user.mobileNumber
              ? 'api/user/mobile_update'
              : 'api/user/mobile_bind_save';
            post(phoneApi, {
              authenticationCode: that.formPhone.oldVerify,
              countryCode: that.selectCountry,
              mobileNumber: that.formPhone.phone,
              smsAuthCode: that.formPhone.verify,
              googleCode: that.formPhone.google,
            }).then(function(res) {
              if (res) {
                that.modalPhone = false;
                that.getUserInfo();
              }
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
      get('api/allBankCard').then(function(res) {
        if (res.length > 0) {
          that.bankData = res;
        }
      });
    },
    modifyBankInfo(data) {
      if (data) {
        this.formBankInfo = JSON.parse(JSON.stringify(data));
      }
      this.modalBankInfo = true;
    },
    modifyBankStatus(data) {
      var that = this;
      post('api/switchBankCard', { id: data.id }, false).then(function(res) {
        if (res) {
          that.getAllCard();
        }
      });
    },
    getLoginData(page) {
      var that = this;
      post('api/security/login_history', { page: page, pageSize: 10 }, false)
        .then(function(res) {
          that.loginData = res.historyLoginList;
          that.loginDataTotalCount = res.count;
        });
    },
    loginPageChange(page) {
      this.getLoginData(page);
    },
    getSecurityData(page) {
      var that = this;
      post('api/security/setting_history', { page: page, pageSize: 10 }, false)
        .then(function(res) {
          that.securityData = res.historySettingList;
          that.securityDataTotalCount = res.count;
        });
    },
    securityPageChange(page) {
      this.getSecurityData(page);
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
    sendMessageSecurity: function(name, type) {
      if (name === 'Email' && !this.formEmail.email) return;
      if (name === 'NewPhone' && !this.formPhone.phone) return;
      var that = this;
      that['sendDisabled' + name] = true;
      var api = 'api/common/smsValidCode';
      if (name.indexOf('Email') !== -1) {
        api = 'api/common/emailValidCode';
      }
      post(
        api,
        {
          email: that.formEmail.email || '',
          countryCode: that.selectCountry || '',
          mobile: that.formPhone.phone || '',
          operationType: type,
        },
        false
      ).then(function(res) {
        if (res) {
          that.countDown(name);
        }
      });
    },
    countDown(name) {
      var that = this;
      var counter = 60;
      that['sendPlaceholder' + name] = counter + 's';
      var timer = setInterval(function() {
        counter -= 1;
        that['sendPlaceholder' + name] = counter + 's';
        if (counter == 0) {
          that['sendDisabled' + name] = false;
          that['sendPlaceholder' + name] = $t('sendAgain');
          clearInterval(timer);
        }
      }, 1000);
    },
  },
  mounted() {
    var locale = localStorage.getItem('locale');
    if (locale) {
      document.body.dir = locale === 'zh' ? 'ltr' : 'rtl';
      this.$i18n.locale = locale;
    }
    this.$on('locale', function(i) {
      this.locale = i;
    });
    this.getUserInfo();
    this.getAllCard();
    this.getLoginData(1);
    this.getSecurityData(1);
  },
  watch: {
    locale: function(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$i18n.locale = newVal;
      }
    },
  },
});
