

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

var account = new Vue({
  el: '#account',
  i18n: i18n,
  components: {
    oHeader: o_header,
    myregistergoogle: o_my_registerGoogle,
  },
  data() {
    // 自定义表单验证
    var validateOldEmailVerify = (rule, value, callback) => {
      if (this.user.isOpenEmailCheck) {
        if (value === '') {
          callback(new Error(this.$t('canNotBeEmpty')));
        } else if (!/\d+$/g.test(value)) {
          callback(new Error(this.$t('numericRequired')));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    var validateEmailFormat = (rule, value, callback) => {
      var reg = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
      if (value === '') {
        callback(new Error(this.$t('canNotBeEmpty')));
      } else if (!reg.test(value)) {
        callback(new Error('Email ' + this.$t('formatError')));
      } else {
        callback();
      }
    };
    var validateGoogleSecurity = (rule, value, callback) => {
      if (this.user.googleStatus) {
        if (value === '') {
          callback(new Error(this.$t('canNotBeEmpty')));
        } else if (!/\d+$/g.test(value)) {
          callback(new Error(this.$t('numericRequired')));
        } else {
          callback();
        }
      }
    };
    var validatePhoneSecurity = (rule, value, callback) => {
      if (this.user.mobileNumber) {
        if (value === '') {
          callback(new Error(this.$t('canNotBeEmpty')));
        } else if (!/\d+$/g.test(value)) {
          callback(new Error(this.$t('numericRequired')));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    var validateGoogleBank = (rule, value, callback) => {
      if (this[rule.name].phone === '') {
        if (value === '') {
          callback(new Error(this.$t('canNotBeEmpty')));
        } else if (!/\d+$/g.test(value)) {
          callback(new Error(this.$t('numericRequired')));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    var validatePhoneBank = (rule, value, callback) => {
      if (this[rule.name].google === '') {
        if (value === '') {
          callback(new Error(this.$t('canNotBeEmpty')));
        } else if (!/\d+$/g.test(value)) {
          callback(new Error(this.$t('numericRequired')));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('canNotBeEmpty')));
      } else if (value.length < 8 || value.length > 64) {
        callback(new Error(this.$t('eight2SixtyFour')));
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
    var validateEmpty = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('canNotBeEmpty')));
      } else {
        callback();
      }
    };
    var validateNumeric = (rule, value, callback) => {
      if (!/\d+$/g.test(value)) {
        callback(new Error(this.$t('numericRequired')));
      } else {
        callback();
      }
    };
    var validateFormat = (rule, value, callback) => {
      if (value.length < 8 || value.length > 64) {
        callback(new Error(this.$t('eight2SixtyFour')));
      } else {
        callback();
      }
    };
    return {
      locale: '',
      user: {},
      googleStatus: '',
      sendPlaceholderPassword: '',
      sendDisabledPassword: false,
      sendPlaceholderGoogle: '',
      sendDisabledGoogle: false,
      sendPlaceholderOldEmail: '',
      sendDisabledOldEmail: false,
      sendPlaceholderEmail: '',
      sendDisabledEmail: false,
      sendPlaceholderOldPhone: '',
      sendDisabledOldPhone: false,
      sendPlaceholderNewPhone: '',
      sendDisabledNewPhone: false,
      sendPlaceholderBank: '',
      sendDisabledBank: false,
      timers: {},
      // 修改WhatsApp
      modalWhatsApp: false,
      selectCountry: '+86',
      formWhatsApp: {
        number: '',
      },
      ruleWhatsApp: {
        number: [{ validator: validateNumeric, trigger: 'change' }],
      },
      formWhatsAppLoading: false,
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
        password: [{ validator: validateFormat, trigger: 'change' }],
        passwordNew: [{ validator: validatePass, trigger: 'change' }],
        passwordReNew: [{ validator: validatePassCheck, trigger: 'change' }],
        email: [{ validator: validateNumeric, trigger: 'change' }],
        google: [{ name: 'formPassword', validator: validateGoogleSecurity, trigger: 'change' }],
        phone: [{ name: 'formPassword', validator: validatePhoneSecurity, trigger: 'change' }],
      },
      formPasswordLoading: false,
      // 绑定修改谷歌验证
      modalGoogle: false,
      formGoogle: {
        google: '',
        phone: '',
        password: '',
      },
      ruleGoogle: {
        google: [{ validator: validateNumeric, trigger: 'change' }],
        phone: [{ validator: validateNumeric, trigger: 'change' }],
        password: [{ validator: validateEmpty, trigger: 'change' }],
      },
      formGoogleLoading: false,
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
        oldEmail: [{ validator: validateOldEmailVerify, trigger: 'change' }],
        email: [{ validator: validateEmailFormat, trigger: 'change' }],
        verify: [{ validator: validateNumeric, trigger: 'change' }],
        google: [{ name: 'formEmail', validator: validateGoogleSecurity, trigger: 'change' }],
        phone: [{ name: 'formEmail', validator: validatePhoneSecurity, trigger: 'change' }],
      },
      formEmailLoading: false,
      // 绑定/修改手机号
      modalPhone: false,
      formPhone: {
        oldVerify: '',
        phone: '',
        verify: '',
        email: '',
        google: '',
      },
      rulePhone: {
        oldVerify: [{ validator: validatePhoneSecurity, trigger: 'change' }],
        phone: [{ validator: validateNumeric, trigger: 'change' }],
        verify: [{ validator: validateNumeric, trigger: 'change' }],
        email: [{ validator: validateNumeric, trigger: 'change' }],
        google: [{ validator: validateNumeric, trigger: 'change' }],
      },
      formPhoneLoading: false,
      // 添加/修改银行卡
      modalBankInfo: false,
      formBankInfo: {
        bankName: '',
        name: '',
        cardNo: '',
        ibanNo: '',
      },
      ruleBankInfo: {
        bankName: [{ validator: validateEmpty, trigger: 'change' }],
        name: [{ validator: validateEmpty, trigger: 'change' }],
        cardNo: [{ validator: validateEmpty, trigger: 'change' }],
        ibanNo: [{ validator: validateEmpty, trigger: 'change' }],
      },
      modalBankConfirmTitle: '',
      modalBankConfirmCancel: '',
      modalBankConfirm: false,
      tabVerifyActive: 1,
      formBankConfirm: {
        phone: '',
        google: '',
      },
      ruleBankConfirm: {
        phone: [{ name: 'formBankConfirm', validator: validatePhoneBank, trigger: 'change' }],
        google: [{ name: 'formBankConfirm', validator: validateGoogleBank, trigger: 'change' }],
      },
      formBankConfirmLoading: false,
      // 银行表格
      bankColumn: [
        {
          key: 'bankName',
          align: 'center',
          minWidth: 120,
          renderHeader: (h) => h('span', this.$t('bankName')),
          render: (h, params) => h('span', this.$t(params.row.bankName.replace(/\s/g, ''))),
        },
        {
          key: 'name',
          align: 'center',
          minWidth: 120,
          renderHeader: (h) => h('span', this.$t('accountName')),
        },
        {
          key: 'cardNo',
          align: 'center',
          minWidth: 120,
          renderHeader: (h) => h('span', this.$t('cardNo')),
          render: (h, params) => h(
            'span',
            params.row.cardNo.replace(/s/g, '').replace(/(.{4})/g, "$1 "),
          ),
        },
        {
          key: 'operation',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('operation')),
          render: (h, params) => {
            return h(
              'Button',
              {
                props: {
                  type: 'link',
                  size: 'small',
                },
                on: {
                  click: () => {
                    this.modifyBankInfo(params.row);
                  },
                },
              },
              this.$t('delete')
            );
          },
        },
        {
          key: 'switch',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('enable')),
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
      bankData: [],
      bankDataLoading: false,
      // tab激活项
      tabLogActive: 'loginHistory',
      // 登录历史表格
      loginColumn: [
        {
          key: 'formatLgInTime',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('loginTime')),
        },
        {
          key: 'lgPlatform',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('loginPlat')),
        },
        {
          key: 'lgIp',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('ipAddress')),
        },
        {
          key: 'lgStatus',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('status')),
          render: (h, params) => {
            return h('span', params.row.lgStatus === 1 ? this.$t('success') : this.$t('fail'));
          },
        },
      ],
      loginData: [],
      loginDataLoading: false,
      loginDataTotalCount: 0,
      // 操作记录表格
      securityColumn: [
        {
          key: 'formatCtime',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('operationTime')),
        },
        {
          key: 'networkWhere',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('operationPlat')),
        },
        {
          key: 'optIp',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('ipAddress')),
        },
        {
          key: 'networkOperator',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('operationName')),
        },
        {
          key: 'status',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('status')),
          render: (h, params) => {
            return h('span', params.row.optType === 1 ? this.$t('success') : this.$t('fail'));
          },
        },
      ],
      securityData: [],
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
        if (!res.googleStatus && res.isOpenMobileCheck) {
          that.tabVerifyActive = 2;
        }
        that.user = res;
        localStorage.setItem('user', JSON.stringify(res));
        if (!res.googleStatus || !res.isOpenEmailCheck || !res.isOpenMobileCheck) {
          that.$Modal.info({
            title: that.$t('securityWarning'),
            render: function(h) {
              return h('p', [
                h('span', that.$t('yourSecurityLevel')),
                h('strong', { 'class': 'text-error' }, that.$t('dangerous')),
                h('span', that.$t('upgradeLevel')),
              ]);
            }
          })
        }
      });
    },
    loginOut() {
      var that = this;
      this.$Modal.confirm({
        title: this.$t('loginOut'),
        render(h) {
          return h('span', that.$t('confirmLogOut'));
        },
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
      this.formWhatsApp.number = Number(whatsAppStr.substr(whatsAppStr.indexOf('-') + 1));
      this.modalWhatsApp = true;
    },
    modifyGoogleStatus() {
      this.modalGoogle = true;
    },
    bindGoogle() {
      this.$refs.header.$data.isRegisterGoogleShow = true;
    },
    modifyEmail() {
      if (!this.user.mobileNumber && !this.user.googleStatus) {
        Toast.show(this.$t('bindPhoneOrGoogleFirst'), { icon: 'error' });
        return;
      }
      this.modalEmail = true;
    },
    modifyPhone() {
      if (!this.user.isOpenEmailCheck && !this.user.googleStatus) {
        Toast.show(this.$t('bindPhoneOrGoogleFirst'), { icon: 'error' });
        return;
      }
      this.modalPhone = true;
    },
    handleSubmit(name) {
      var that = this;
      this.$refs[name].validate(function(valid) {
        if (valid) {
          if (name === 'formWhatsApp') {
            that.formWhatsAppLoading = true;
            post('api/watchapp', that.selectCountry + '-' + that.formWhatsApp.number)
              .then(function(res) {
                that.formWhatsAppLoading = false;
                if (res) {
                  that.$refs[name].resetFields();
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
            var api = that.formBankInfo.id ? 'api/deleteBankCard' : 'api/bankCard';
            var checkType;
            if (that.user.mobileNumber && that.user.googleStatus) {
              checkType = that.tabVerifyActive;
            } else if (that.user.mobileNumber && !that.user.googleStatus) {
              checkType = 2;
            } else {
              checkType = 1;
            }
            that.formBankConfirmLoading = true;
            post(api, {
              id: that.formBankInfo.id,
              bankName: that.formBankInfo.bankName,
              name: that.formBankInfo.name,
              cardNo: that.formBankInfo.cardNo,
              ibanNo: that.formBankInfo.ibanNo,
              checkType: checkType,
              checkValue:
                checkType == 1
                  ? that.formBankConfirm.google
                  : that.formBankConfirm.phone,
            }).then(function(res) {
              that.formBankConfirmLoading = false;
              if (res) {
                that.clearTimers();
                that.$refs[name].resetFields();
                that.modalBankConfirm = false;
                that.getAllCard();
              }
            });
          }
          if (name === 'formPassword') {
            that.formPasswordLoading = true;
            post('api/user/password_update', {
              smsAuthCode: that.formPassword.phone,
              googleCode: that.formPassword.google,
              loginPword: that.formPassword.password,
              newLoginPword: that.formPassword.passwordReNew,
            }).then(function(res) {
              that.formPasswordLoading = false;
              if (res) {
                that.clearTimers();
                that.$refs[name].resetFields();
                that.modalPassword = false;
              }
            });
          }
          if (name === 'formGoogle') {
            that.formGoogleLoading = true;
            post('api/user/close_google_verify', {
              googleCode: that.formGoogle.google,
              smsValidCode: that.formGoogle.phone,
              loginPwd: that.formGoogle.password,
            }).then(function(res) {
              that.formGoogleLoading = false;
              if (res) {
                that.modalGoogle = false;
                that.clearTimers();
                that.$refs[name].resetFields();
                that.getUserInfo();
              }
            });
          }
          if (name === 'formEmail') {
            that.formEmailLoading = true;
            var emailApi = that.user.isOpenEmailCheck ? 'api/user/email_update' : 'api/user/email_bind_save';
            post(emailApi, {
              emailOldValidCode: that.formEmail.oldEmail,
              email: that.formEmail.email,
              emailNewValidCode: that.formEmail.verify,
              smsValidCode: that.formEmail.phone || '',
              googleCode: that.formEmail.google || '',
            }).then(function(res) {
              that.formEmailLoading = false;
              if (res) {
                that.modalEmail = false;
                that.clearTimers();
                that.$refs[name].resetFields();
                that.getUserInfo();
              }
            });
          }
          if (name === 'formPhone') {
            that.formPhoneLoading = true;
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
              that.formPhoneLoading = false;
              if (res) {
                that.modalPhone = false;
                that.clearTimers();
                that.$refs[name].resetFields();
                that.getUserInfo();
              }
            });
          }
        }
      });
    },
    autoSubmit(e, name) {
      if (e.target.value.length === 6) {
        this.handleSubmit(name);
      }
    },
    handleReset(name) {
      if (name === 'formBankConfirm' && !this.formBankInfo.id) {
        this.modalBankConfirm = false;
        this.modalBankInfo = true;
      } else {
        var sufix = name.substr(4);
        this['modal' + sufix] = false;
      }
      this.sendPlaceholderPassword = this.$t('sendVerify');
      this.sendDisabledPassword = false;
      this.sendPlaceholderGoogle = this.$t('sendVerify');
      this.sendDisabledGoogle = false;
      this.sendPlaceholderOldEmail = this.$t('sendVerify');
      this.sendDisabledOldEmail = false;
      this.sendPlaceholderEmail = this.$t('sendVerify');
      this.sendDisabledEmail = false;
      this.sendPlaceholderOldPhone = this.$t('sendVerify');
      this.sendDisabledOldPhone = false;
      this.sendPlaceholderNewPhone = this.$t('sendVerify');
      this.sendDisabledNewPhone = false;
      this.sendPlaceholderBank = this.$t('sendVerify');
      this.sendDisabledBank = false;
      this.clearTimers();
      this.$refs[name].resetFields();
    },
    clearTimers: function(){
      for (var key in this.timers) {
        clearInterval(this.timers[key]);
        delete this.timers[key];
      }
    },
    getAllCard: function() {
      var that = this;
      that.bankDataLoading = true;
      get('api/allBankCard').then(function(res) {
        that.bankDataLoading = false;
        if (res) {
          that.bankData = res;
        }
      });
    },
    modifyBankInfo(data) {
      if (!this.user.mobileNumber && !this.user.googleStatus) {
        Toast.show(this.$t('bindPhoneOrGoogleFirst'), { icon: 'error' });
        return;
      }
      if (!data && this.bankData.length >= 5) {
        Toast.show(this.$t('atMostFiveCards'), { icon: 'error' });
        return;
      }
      this.modalBankConfirmTitle = data ? this.$t('delete') + this.$t('bankCard') : this.$t('confirm') + this.$t('bind');
      this.modalBankConfirmCancel = data ? this.$t('cancel') : this.$t('change');
      if (!this.user.googleStatus && this.user.isOpenMobileCheck) {
        this.tabVerifyActive = 2;
      } else {
        this.tabVerifyActive = 1;
      }
      if (data) {
        this.formBankInfo = JSON.parse(JSON.stringify(data));
        this.modalBankConfirm = true;
      } else {
        this.$refs['formBankInfo'].resetFields();
        for (var key in this.formBankInfo) {
          this.formBankInfo[key] = '';
        }
        this.modalBankInfo = true;
      }
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
      that.loginDataLoading = true;
      post('api/security/login_history', { page: page, pageSize: 10 }, false)
        .then(function(res) {
          that.loginDataLoading = false;
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
      var counter = 90;
      that['sendPlaceholder' + name] = counter + 's';
      that.timers[name] = setInterval(function() {
        counter -= 1;
        that['sendPlaceholder' + name] = counter + 's';
        if (counter <= 0) {
          that['sendDisabled' + name] = false;
          that['sendPlaceholder' + name] = that.$t('sendAgain');
          clearInterval(that.timers[name]);
        }
      }, 1000);
    },
  },
  mounted() {
    var locale = localStorage.getItem('locale');
    if (locale) {
      this.locale = locale;
      this.$i18n.locale = locale;
      var sendVerify = this.$t('sendVerify');
      this.sendPlaceholderPassword = sendVerify;
      this.sendPlaceholderGoogle = sendVerify;
      this.sendPlaceholderOldEmail = sendVerify;
      this.sendPlaceholderEmail = sendVerify;
      this.sendPlaceholderOldPhone = sendVerify;
      this.sendPlaceholderNewPhone = sendVerify;
      this.sendPlaceholderBank = sendVerify;
    }
    this.$on('locale', function(i) {
      this.locale = i;
      this.$i18n.locale = i;
    });
    this.$on('googleBound', function(i) {
      if (i) {
        this.getUserInfo();
      }
    });
    this.getUserInfo();
    this.getAllCard();
    this.getLoginData(1);
    // this.getSecurityData(1);
  },
  watch: {
    locale(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$i18n.locale = newVal;
        var sendVerify = this.$t('sendVerify');
        this.sendPlaceholderPassword = sendVerify;
        this.sendPlaceholderGoogle = sendVerify;
        this.sendPlaceholderOldEmail = sendVerify;
        this.sendPlaceholderEmail = sendVerify;
        this.sendPlaceholderOldPhone = sendVerify;
        this.sendPlaceholderNewPhone = sendVerify;
        this.sendPlaceholderBank = sendVerify;
      }
    },
  },
  filters: {
    card: function(no) {
      return no.replace(/s/g, '').replace(/(.{4})/g, "$1 ");
    },
  },
});
