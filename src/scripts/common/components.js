/*******************************/
/**     common component    ****/
/** ************************** */

var Toast = {
  show: function (content, options) {
    var toastEl = document.getElementById('toast');
    if (toastEl) {
      document.body.removeChild(toastEl);
    }
    // icon => 图标类型，具体可对应Icon组件内的样式
    // duration => toast展示时间
    var icon = options.icon || '';
    var duration = options.duration || 2000;
    var callback = options.callback;
    if (content) {
      var htmlStr = '<div class="toast-content">';
      if (icon)
        htmlStr += '<div class="toast-content-image"><img src="../images/' + icon + '.png" /></div>';
      htmlStr += '<div class="toast-content-text">' + content + '</div></div>';
      var toast = document.createElement('div');
      toast.innerHTML = htmlStr;
      toast.id = 'toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    if (duration > 100) {
      var _this = this;
      var timer = setTimeout(function () {
        _this.hide();
        if (typeof callback === 'function') {
          callback();
        }
        clearTimeout(timer);
      }, duration);
    }
  },
  hide: function () {
    var toast = document.getElementById('toast');
    if (toast) {
      document.body.removeChild(toast);
    }
  },
};

Vue.use(VueI18n);

var i18nComponentsMessages = {
  bindGoogleAuthMsg: {
    zh: '为了您的账户安全，我们强烈推荐您进行谷歌验证',
    en: 'For your account security, we strongly recommend that you turn on second verification',
  },
  googleAuthBtn: {
    zh: '身份验证',
    en: 'Google Authenticator',
  },
  addContact: {
    zh: '添加社交账号',
    en: 'Add contact information',
  },
  addContactTips: {
    zh: '请留下您的联系方式以便通知支付信息',
    en: 'In order to contact you for payment, please leave your contact information.',
  },
  submit: {
    zh: '提交',
    en: 'submit',
  },
  account: {
    zh: '账号',
    en: 'account',
  },
  choseCard: {
    zh: '选择交易银行卡',
    en: 'Select trade card',
  },
  addCard: {
    zh: '添加银行卡',
    en: 'Add bank card',
  },
  openingBank: {
    zh: '开户行',
    en: 'opening bank',
  },
  accountName: {
    zh: '账户名',
    en: 'account name',
  },
  bankNumber: {
    zh: '银行卡号',
    en: 'Bank Number',
  },
  number: {
    zh: '账号',
    en: 'Number',
  },
  bind: {
    zh: '绑定',
    en: 'bind',
  },
  notEmpty: {
    zh: '不能为空',
    en: 'can not be empty',
  },
  received: {
    zh: '已到账',
    en: 'has been received',
  },
  viewAccount: {
    zh: '查看账户',
    en: 'view Account',
  },
  continueTrade: {
    zh: '继续交易',
    en: 'continue trade',
  },
};

var i18nComponents = new VueI18n({
  locale: 'zh', // set locale
  messages: utils.transform(i18nComponentsMessages),
});

// notice component
var om_notice = {
  template: `
    <div class="o-modal notice-modal" :class="show?'is-show':'is-not-show'"   >
      <div class="content">
        <div class="content-wrapper" style="background-color: #fff;width: 500px;height: 320x;border-radius: 5px;" >
          <Icon @click="close" type="close" class="close" style="position: absolute;right: 20px;"></Icon>
          <div class="header" style=" text-align: center;padding: 28px 0;">
            <img src="../images/arrive.png" alt="">
          </div>
          <div class="main-content" style=" text-align: center;margin-top: 33px;">
            <h3> {{amount}} USDT {{ $t('received') }}</h3>
          </div>
          <div class="foot" style="text-align: center;">
            <a
              class="view"
              @click="view"
              href="#"
              style="font-size: 14px;
              color: rgba(51, 51, 51, 1);
              margin-right: 20px;"
            >{{ $t('viewAccount') }}</a>
            <a
              class="current"
              @click="current"
              href="#"
              style="display: inline-block;
              width: 251px;
              height: 44px;
              line-height: 44px;
              text-align: center;
              background: rgba(255, 237, 0, 1);
              border-radius: 5px;
              font-size: 16px;
              color: rgba(51, 51, 51, 1);
              text-decoration: none;"
            >{{ $t('continueTrade') }}</a>
          </div>
        </div>
      </div>
    </div>
  `,
  i18n: i18nComponents,
  props: ['amount', 'show', 'locale'],
  methods: {
    close() {
      this.$parent.$emit('isNoticeShow', false);
    },
    view() {
      this.$parent.$emit('isNoticeShow', false);
    },
    current() {
      this.$parent.$emit('isNoticeShow', false);
    },
  },
  watch: {
    locale: function(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$i18n.locale = newVal;
      }
    }
  }
};

/** **********************bind card component********************* */
var o_bindcard = {
  template: `
    <div class="o-modal add-bankcard-modal" :class="show ?'is-show':'is-not-show'">
      <div class="content">
        <div class="content-wrapper">
          <div class="o-header">
            <span>{{ $t('addCard') }}</span>
            <Icon @click="close" type="close" class="close"></Icon>
          </div>
          <div class="o-content">
            <ul>
              <li><p>{{ $t('openingBank') }}</p><input v-model="cardInfo.bankName" type="text"></li>
              <li><p>{{ $t('accountName') }}</p><input v-model="cardInfo.name" type="text"></li>
              <li><p>{{ $t('bankNumber') }}</p><input v-model="cardInfo.cardNo"  type="text"></li>
              <li><p>Iban {{ $t('number') }}</p><input v-model="cardInfo.ibanNo"  type="text"></li>
              <li><button @click="binding">{{ $t('bind') }}</button></li>
            </ul>
            <div class="foot" style="color: #ff3300;" v-show="errorMsg">{{ errorMsg }}</div>
          </div>
        </div>
      </div>
    </div>
  `,
  i18n: i18nComponents,
  data() {
    return {
      // show trigger;
      cardInfo: {
        bankName: '',
        name: '',
        cardNo: '',
        ibanNo: '',
        bankNo: 0,
      },
      errorMsg: '',
    };
  },
  props: ['show', 'locale'],
  methods: {
    close() {
      this.$parent.$emit('isBindShow', false);
    },
    binding() {
      if (
        !this.cardInfo.bankName ||
        !this.cardInfo.name ||
        !this.cardInfo.cardNo ||
        !this.cardInfo.ibanNo
      ) {
        this.errorMsg = this.$t('notEmpty');
      } else {
        this.errorMsg = '';
        //hide bind dialog
        this.$parent.$emit('isBindShow', false);
        //transfer the cardInfo
        this.$parent.$emit('cardInfo', this.cardInfo);
        //show confirm bind dialog
        this.$parent.$emit('isConfirmShow', true);
      }
    },
  },
  watch: {
    locale: function(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$i18n.locale = newVal;
      }
    }
  }
};

/** **********************confirm bind card component********************* */

var o_confirm = {
  template: `
    <div class="o-modal confirm-bankcard-modal" :class="show?'is-show':'is-not-show'">
      <div class="content">
        <div class="content-wrapper">
          <div class="o-header">
            <span>{{ $t('addCard') }}</span>
            <Icon @click="close" type="close" class="close"></Icon>
          </div>
          <div class="o-content">
            <div class="info">
              <ul>
                <li>
                  <Row>
                    <i-col span="10">{{ $t('openingBank') }}</i-col>
                    <i-col span="8">{{cardInfo.bankName}}</i-col>
                  </Row>
                </li>
                <li>
                  <Row>
                    <i-col span="10">{{ $t('accountName') }}</i-col>
                    <i-col span="8">{{cardInfo.name}}</i-col>
                  </Row>
                </li>
                <li>
                  <Row>
                    <i-col span="10">{{ $t('bankNumber') }}</i-col>
                    <i-col span="8">{{cardInfo.cardNo}}</i-col>
                  </Row>
                </li>
                <li>
                  <Row>
                    <i-col span="10">Iban {{ $t('number') }}</i-col>
                    <i-col span="8">{{cardInfo.ibanNo}}</i-col>
                  </Row>
                </li>
              </ul>
            </div>
            <div class="verify">
              <Tabs v-model="tab">
                <Tab-Pane name="1" class="robin" label="Google verification code"  icon="social-google" >
                  <input v-model="gcode" placeholder="please enter verification code" class="g-code" type="text">
                </Tab-Pane>
                <Tab-Pane  name="2" label="SMS verification" icon="android-textsms">
                  <input v-model="ecode" placeholder="please enter verification code" class="g-code" type="text">
                </Tab-Pane>
              </Tabs>
            </div>
            <div class="foot">
              <a href="#" class="return" @click="backToEdit"><u>Return to edit</u></a>
              <button @click="bind" class="binding">Binding</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  i18n: i18nComponents,
  data() {
    return {
      cardInfo: {},
      gcode: '',
      ecode: '',
      tab: '1',
    };
  },
  methods: {
    close() {
      this.$parent.$emit('isConfirmShow', false);
    },
    backToEdit() {
      this.$parent.$emit('isConfirmShow', false);
      this.$parent.$emit('isBindShow', true);
    },
    bind() {
      var that = this;
      post('api/bankCard', {
        bankName: this.cardInfo.bankName,
        name: this.cardInfo.name,
        cardNo: this.cardInfo.cardNo,
        ibanNo: this.cardInfo.ibanNo,
        checkType: this.tab,
        checkValue: this.tab == '1' ? this.gcode : this.ecode,
      }).then(function (res) {
        if (res.data.message == 'otc.result.success') {
          that.$parent.$emit('isConfirmShow', false);
          that.$parent.$emit('isCardBinded', true);
          //if no watchup bind ,show bind watchup dialog
          if (!that.isWatchupBind) {
            that.$parent.$emit('isContactShow', true);
          }
        }
      });
    },
    //--------------END OF BINDING CARD--------------------------------------
  },
  props: ['show', 'isWatchupBind', 'locale'],
  mounted() {
    var that = this;
    // to recieve the trigger of the confirm
    this.$parent.$on('isConfirmShow', function (i) {
      that.show = i;
    });
    //to recieve the car info
    this.$parent.$on('cardInfo', function (i) {
      that.cardInfo = i;
    });
  },
  watch: {
    locale: function(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$i18n.locale = newVal;
      }
    }
  }
};
//---------------------------------END-----------------------------------------------------

//--------------------------------select card---------------------------------------------
var selectCard = {
  template: `
    <div class="o-modal select-card-modal" :class="show?'is-show':'is-not-show'">
      <div class="content">
        <div class="content-wrapper">
          <div class="s-header">
            {{ $t('choseCard') }}
            <Icon @click="close" type="close" class="close"></Icon>
          </div>
          <div class="s-body">
            <ul>
              <li v-for="(item , index) in cards">
                <Row>
                  <i-col span="18">
                    <h3>{{item.bankName}}</h3>
                    <p>{{item.cardNo}}</p>
                  </i-col>
                  <i-col span="6">
                    <i-switch v-model="status[index]"></i-switch>
                  </i-col>
                </Row>
              </li>
            </ul>
          </div>
          <div class="s-foot">
            <button @click="submit">{{ $t('submit') }}</button>
          </div>
        </div>
      </div>
    </div>
  `,
  i18n: i18nComponents,
  data() {
    return {
      selectedCards: [],
      status: [],
    };
  },
  props: ['show', 'cards', 'locale'],
  methods: {
    getStatus: function () {
      var arr = [];
      this.cards.forEach(function (i) {
        arr.push(false);
      });
      return arr;
    },
    close() {
      this.$parent.$emit('isSelectCardShow', false);
    },
    getSelectCards(s, c) {
      var that = this;
      for (var i = 0; i < s.length; i++) {
        if (s[i]) {
          that.selectedCards.push(c[i]);
        }
      }
    },
    submit() {
      this.getSelectCards(this.status, this.cards);
      this.$parent.$emit('tradeCards', this.selectedCards);
      Toast.show('success', {
        icon: 'ok',
        callback: function () {
          that.$parent.$emit('isSelectCardShow', false);
          that.selectedCards = [];
        },
      });
    },
  },
  mounted() {
    this.status = this.getStatus();
  },
  watch: {
    locale: function(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$i18n.locale = newVal;
      }
    }
  }
};
//----------------------------------END-------------------------------------------------

//------------------------add contact----------------------------------------------------
var addContact = {
  template: `
    <div class="o-modal add-contact-modal" :class="show?'is-show':'is-not-show'">
      <div class="content">
        <div class="content-wrapper">
          <div class="o-header">
            {{ $t('addContact') }}
            <Icon @click="close" type="close" class="close"></Icon>
          </div>
          <div class="o-content">
            <div class="tp">
              <div><img src="../images/whatup.png" /></div>
              <p>{{ $t('addContactTips') }}</p>
            </div>
            <ul class="bt">
              <li>
                <p>WhatsApp {{ $t('account') }}</p>
                <i-input v-model="wapp">
                  <i-select slot="prepend" style="width: 80px">
                    <Option value="http">+ 186</Option>
                    <Option value="https">+ 2300</Option>
                  </i-select>
                </i-input>
              </li>
              <li>
                <button @click="bind">{{ $t('submit') }}</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  i18n: i18nComponents,
  data() {
    return {
      wapp: '',
    };
  },
  props: ['show', 'locale'],
  methods: {
    close() {
      this.$parent.$emit('isContactShow', false);
    },
    bind() {
      var that = this;
      post('api/watchapp', this.wapp).then(function (res) {
        if (res.data.message == 'otc.result.success') {
          that.$parent.$emit('isAddContactShow', false);
        }
      });
    },
  },
  watch: {
    locale: function(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$i18n.locale = newVal;
      }
    }
  }
};
//-----------------END----------------------------------------------------------

/***************************** google authenticate*********************************/
var g_auth = {
  template: `
    <div class="o-modal google-modal" :class="show?'is-show':'is-not-show'">
      <div class="content">
        <div class="content-wrapper" style="padding:0;width:570px;height:314px">
          <div class="g-header">
            <Icon @click="close" type="close" class="close"></Icon>
          </div>
          <div class="g-body">
            <div><img src="../images/warn.png"/></div>
            <span style="font-size:16px;color: #333333;">
              {{ $t('bindGoogleAuthMsg') }}
            </span>
            <a @click="toGoogeAuth"   target="blank" class="key">
              {{ $t('googleAuthBtn') }} <img src="../images/gauth.png" />
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  i18n: i18nComponents,
  props: ['show', 'locale'],
  methods: {
    close() {
      this.$parent.$emit('isGoogleAuthShow', false);
    },
    toGoogeAuth() {
      var host = utils.getHost();
      window.location.href = host + '/exchange-web/toopen_google_authenticator.html';
    },
  },
  watch: {
    locale: function(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$i18n.locale = newVal;
      }
    }
  }
};


var o_my_login = {
  template: `
    <Modal
      v-model="login1"
      title="Welcome to UpEx.io"
      @on-cancel="asyncCancel"
      class="my-login"
      class-name="vertical-center-modal"
      width="500"
    >
      <Tabs v-model="loginWrap" @on-click="loginEmailChange">
        <TabPane label="E-mail" name="loginEmail">
          <Input
            :class="loginEmailError?'is-red':'is-gray'"
            v-model="loginEmailVal"
            placeholder="Enter your email"
            class="iview-input"
            @on-focus="loginEmailFocus"
          ></Input>
          <p class="my-login-error">{{loginEmailErrorText}}</p>
          <Input
            :class="loginEmailPasswordError?'is-red':'is-gray'"
            v-model="loginEmailPassword"
            type="password"
            placeholder="Enter your password"
            class="iview-input"
            @on-focus="loginEmailPasswordFocus"
          >
            <span slot="append" class="my-slot-append" @click="runForgetPassword">forget password?</span>
          </Input>
          <p class="my-login-error">{{loginEmailPasswordErrorText}}</p>
        </TabPane>
        <TabPane label="Phone" name="loginPhone">
          <Input
            :class="loginPhoneError?'is-red':'is-gray'"
            v-model="loginPhoneVal"
            placeholder="Enter your Phone number"
            class="iview-input iview-input-countryPhone"
            @on-focus="loginPhoneFocus"
          >
            <Select v-model="selectCountry" slot="prepend" filterable style="width:86px">
              <Option
                v-if="countryArr.length > 0"
                v-for="country in countryArr"
                :value="country.dialingCode"
                :label="country.dialingCode"
              >
                <span class="">{{country.dialingCode}}</span>
                <span class="iview-input-countryPhone-span">{{country.enName}}</span>
              </Option>
            </Select>
          </Input>
          <p class="my-login-error">{{loginPhoneErrorText}}</p>
          <Input
            :class="loginPhonePasswordError?'is-red':'is-gray'"
            v-model="loginPhonePassword"
            type="password"
            placeholder="Enter your password"
            class="iview-input"
            @on-focus="loginPhonePasswordFocus"
          >
            <span slot="append" class="my-slot-append" @click="runForgetPassword">forget password?</span>
          </Input>
            <p class="my-login-error">{{loginPhonePasswordErrorText}}</p>
        </TabPane>
      </Tabs>
      <div slot="footer">
        <Button type="primary" size="large" long :loading="modal_loading" @click="mySubmit">Log in</Button>
        <div class="login-footer-wrap">
          <span class="black">No account</span>
          <span class="blue" @click="runRegister">Register an account</span>
        </div>
      </div>
    </Modal>
  `,
  data() {
    return {
      //Email
      loginEmailVal: '',
      loginEmailError: false,
      loginEmailErrorText: '',
      //password
      loginEmailPassword: '',
      loginEmailPasswordError: false,
      loginEmailPasswordErrorText: '',
      //phone
      loginPhoneVal: '',
      loginPhoneError: false,
      loginPhoneErrorText: '',
      //country
      countryArr: [],
      selectCountry: '+86',
      //password
      loginPhonePassword: '',
      loginPhonePasswordError: false,
      loginPhonePasswordErrorText: '',

      modal_loading: false,
      loading: true,
      login1: this.login,
      login: false,
      loginWrap: '',
      error: {
        null: '不能为空',
        phoneNum: '输入合法的电话号码',
        emailNum: '输入合法的邮箱地址',
      },
    };
  },
  props: ['login'],
  computed: {},
  methods: {
    //email
    loginEmailFocus() {
      this.loginEmailError = false;
      this.loginEmailErrorText = '';
    },
    loginEmailPasswordFocus() {
      this.loginEmailPasswordError = false;
      this.loginEmailPasswordErrorText = '';
    },
    //phone
    loginPhoneFocus() {
      this.loginPhoneError = false;
      this.loginPhoneErrorText = '';
    },
    loginPhonePasswordFocus() {
      this.loginPhonePasswordError = false;
      this.loginPhonePasswordErrorText = '';
    },
    //phone正则
    phoneReg(phoneval) {
      var mobileRegx = /^\d{1,}$/;
      return mobileRegx.test(phoneval);
    },
    //email正则
    emailReg(emailval) {
      var emailRegx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return emailRegx.test(emailval);
    },
    tabLogin(key) {
      alert(key);
    },
    loginPasswordFocus() {
      this.loginPasswordError = false;
    },
    asyncCancel() {
      this.$parent.$emit('islogin', false);
      this.modal_loading = false;
    },
    runForgetPassword() {
      alert(1);
    },
    runRegister() {
      alert(2);
    },
    mySubmit() {
      var that = this;
      var data;
      if (!that.modal_loading) {
        that.modal_loading = true;
        if (that.loginWrap === 'loginPhone') {
          //phone
          if (that.loginPhoneVal === '' || that.selectCountry === '') {
            that.modal_loading = false;
            that.loginPhoneError = true;
            that.loginPhoneErrorText = that.error.null;
          } else if (!that.phoneReg(that.loginPhoneVal)) {
            that.modal_loading = false;
            that.loginPhoneError = true;
            that.loginPhoneErrorText = that.error.phoneNum;
          } else if (that.loginPhonePassword === '') {
            that.modal_loading = false;
            that.loginPhonePasswordError = true;
            that.loginPhonePasswordErrorText = that.error.null;
          } else {
            data = {
              countryCode: that.selectCountry.slice(1),
              mobileNumber: that.loginPhoneVal,
              loginPword: that.loginPhonePassword,
            };
            post('api/user/login_in', JSON.stringify(data)).then(function (res) {
              console.log(res);
              if (res.success) {
                if (res.data.data.type === '2') {
                  that.$parent.$emit(
                    'isLoginNextPhone',
                    that.selectCountry + ' ' + that.loginPhoneVal
                  );
                }
                that.$parent.$emit('isLoginNext', true);
                that.$parent.$emit('isLoginNextType', res.data.data.type);
                that.$parent.$emit('isLoginNextCookie', res.data.data.token);
                that.$parent.$emit('islogin', false);
                that.modal_loading = false;
              } else {
                that.modal_loading = false;
              }
            });
          }
        } else {
          //email
          if (that.loginEmailVal === '') {
            that.modal_loading = false;
            that.loginEmailError = true;
            that.loginEmailErrorText = that.error.null;
          } else if (!that.emailReg(that.loginEmailVal)) {
            that.modal_loading = false;
            that.loginEmailError = true;
            that.loginEmailErrorText = that.error.emailNum;
          } else if (that.loginEmailPassword === '') {
            that.modal_loading = false;
            that.loginEmailPasswordError = true;
            that.loginEmailPasswordErrorText = that.error.null;
          } else {
            data = {
              mobileNumber: that.loginEmailVal,
              loginPword: that.loginEmailPassword,
            };
            post('api/user/login_in', JSON.stringify(data)).then(function (res) {
              if (res.success) {
               if(res.data.data.type === '3'){
                  that.$parent.$emit(
                    'isLoginNextEmail',
                    that.loginPhoneVal
                  );
                }
                that.$parent.$emit('isLoginNext', true);
                that.$parent.$emit('isLoginNextType', res.data.data.type);
                that.$parent.$emit('isLoginNextCookie', res.data.data.token);
                that.$parent.$emit('islogin', false);
              } else {
                that.modal_loading = false;
              }
            });
          }
        }
      }
      //login
    },
    getCountry() {
      var that = this;
      get('api/country', {}, this.token).then(function (res) {
        if (res.success) {
          that.countryArr = res.data.data;
        } else {
        }
      });
    },
    loginEmailChange(name) {
      this.loginWrap = name;
    },
  },
  mounted: function () {
    this.getCountry();
  },
  watch: {
    login: function (a, b) {
      this.login1 = a;
    },
  },
};
var o_my_loginNext = {
  template: `
    <Modal
      v-model="loginNext"
      @on-ok="ok"
      class-name="vertical-center-modal"
      @on-cancel="asyncCancel" class="my-login my-loginNext"
      width="500"
    >
      <div class="loginNext-title" v-if="isLoginNextTypeNum === '1'">Google verification code</div>
      <div class="loginNext-title" v-if="isLoginNextTypeNum === '2'">SMS verification</div>
      <div class="loginNext-title" v-if="isLoginNextTypeNum === '3'">E-mail verification</div>
      <div v-if="isLoginNextTypeNum === '1'">
      <Input
        v-model="loginNextSmsCode"
        type="text"
        placeholder="please enter Google verification code"
        class="loginNext-input"  @on-focus="loginNextFocus" :class="loginNextError?'loginNext-input-red':''">
      </Input>
       <p class="my-loginNext-error">{{loginNextErrorText}}</p>
      </div>
      <div v-if="isLoginNextTypeNum === '2'">
        <p class="loginNextSmsText">
          Please enter the verification code received by
            <span>{{isLoginNextPhoneNum}}</span>
        </p>
        <Input
          v-model="loginNextSmsCode"
          type="text"
          placeholder="please enter Google verification code"
          class="loginNext-input loginNext-sms-input" @on-focus="loginNextFocus" :class="loginNextError?'loginNext-input-red':' '">
          <span slot="append"
            class="my-slot-append"
            @click="runSendSms('phone')"
            :class="timer?'my-slot-append-gary':'my-slot-append'"
          >
            {{sendSms}}
          </span>
        </Input>
        <p class="my-loginNext-error" style="margin-bottom: 38px">{{loginNextErrorText}}</p>
      </div>
         <div v-if="isLoginNextTypeNum === '3'">
        <p class="loginNextSmsText">
          Please enter the verification code received by
            <span>{{isLoginNextEmailNum}}</span>
        </p>
        <Input
          v-model="loginNextSmsCode"
          type="text"
          placeholder="please enter Google verification code"
          class="loginNext-input loginNext-sms-input" @on-focus="loginNextFocus" :class="loginNextError?'loginNext-input-red':' '">
          <span slot="append"
            class="my-slot-append"
            @click="runSendSms('email')"
            :class="timer?'my-slot-append-gary':'my-slot-append'"
          >
            {{sendSms}}
          </span>
        </Input>
        <p class="my-loginNext-error" style="margin-bottom: 38px">{{loginNextErrorText}}</p>
      </div>
      <div slot="footer">
        <Button
          type="primary"
          size="large"
          long
          :loading="modal_loading"
          @click="loginNextSubmit"
        >submit</Button>
      </div>
    </Modal>
  `,
  props: ['loginNext', 'isLoginNextType', 'isLoginNextCookie', 'isLoginNextPhone','isLoginNextEmail'],
  data() {
    return {
      loginNextError: false,
      loginNextErrorText: '',
      sendSms: 'get verification code',
      loginNextGoogleCode: '',
      loginNextSmsCode: '',
      modal_loading: false,
      isLoginNextTypeNum: '',
      isLoginNextCookieNum: '',
      isLoginNextPhoneNum: '',
      isLoginNextEmailNum: '',
      show: true,
      count: '',
      timer: null,
    };
  },
  methods: {
    loginNextFocus(){
      this.loginNextError = false;
      this.loginNextErrorText = ''
    },
    loginNextSubmit() {
      var that = this;
      if(!this.modal_loading){
        that.modal_loading = true;
        const data = {
          authCode: this.loginNextSmsCode,
          token: this.isLoginNextCookieNum,
        };
        if (this.loginNextSmsCode.length === 0) {
          this.loginNextError = true;
          that.modal_loading = false;
          this.loginNextErrorText = '不能为空'
        } else {
          post('api/user/confirm_login', JSON.stringify(data)).then(function (res) {
            if (res.success) {
              that.modal_loading = false;
              that.loginNext = false;
              utils.setCookie('token', that.isLoginNextCookieNum);
              window.location.reload();
            } else {
              that.modal_loading = false;
            }
          });
        }
      }

    },
    runSendSms(type) {
      const TIME_COUNT = 90;
      if (!this.timer) {
        const isLoginNextPhoneNumArr = this.isLoginNextPhoneNum.split(' ');
        const isLoginNextPhoneNumCountry = isLoginNextPhoneNumArr[0].substring(1);
        const isLoginNextPhoneNumPhone = isLoginNextPhoneNumArr[1];
        var data;
        if(type === 'phone'){
          data = {
            countryCode: isLoginNextPhoneNumCountry,
            mobile: isLoginNextPhoneNumPhone,
            operationType: '23',
            token: this.isLoginNextCookieNum,
          };
          post('api/common/smsValidCode', JSON.stringify(data)).then(function (res) {
            if (res.success) {
            } else {
            }
          });
        }else if(type === 'email'){
          data = {
            email: this.isLoginNextEmailNum,
            operationType: '4',
            token: this.isLoginNextCookieNum,
          };
          post('api/common/emailValidCode', JSON.stringify(data)).then(function (res) {
            if (res.success) {

            } else {

            }
          });
        }
        this.count = TIME_COUNT;
        this.sendSms = 'Resend after ' + this.count + 's';
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
            this.sendSms = 'Resend after ' + this.count + ' s';
          } else {
            this.sendSms = 'Reacquire';
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    asyncCancel() {
      this.$parent.$emit('isLoginNext', false);
      this.modal_loading = false;
    },
    ok() {
      this.$Message.info('Clicked ok');
    },
  },
  watch: {
    isLoginNextType: function (a, b) {
      this.isLoginNextTypeNum = a;
    },
    isLoginNextCookie: function (a, b) {
      this.isLoginNextCookieNum = a;
    },
    isLoginNextPhone: function (a, b) {
      this.isLoginNextPhoneNum = a;
    },
    isLoginNextEmail: function (a, b) {
      this.isLoginNextEmailNum = a;
    },
  },
};
var o_my_registerGoogle = {
  template: `
    <Modal
      v-model="registerGoogle"
      @on-ok="ok"
      class-name="vertical-center-modal"
      @on-cancel="asyncCancel" class="my-login my-loginGoogle"
      width="672"
    >
      <div class="loginGoogle-title">
        <i class="loginGoogle-title-icon"></i>
        <div class="loginGoogle-title-right-wrap">
            <h1>Strengthen your account security</h1>
            <h2>3 steps to bind Google authenticator</h2>
        </div>
      </div>
      <ul class="loginGoogle-ul">
        <li class="clear">
          <div class="li-title">
            <span class="list-num">1</span>
            <p>Download google authenticator</p>
            <div class="loginGoogle-ul-download-wrap">
              <div class="loginGoogle-ul-download-google"></div>
              <div class="loginGoogle-ul-download-ios"></div>
            </div>
          </div>
        </li>
        <li class="clear">
          <div class="li-title">
            <div class="qr"></div>
            <div class="tip-img tip-img1"></div>
            <span class="list-num">2</span>
            <p style="width:158px">Use google authenticator to scan a barcode:</p>
            <h6 style="color:#999;margin:26px 0 20px 50px">or</h6>
            <p style="margin-left: 50px;">Enter Provided key:</p>
            <h6 style="color:#999;margin: 5px 0 0 50px">
              FZ3JXT6BF3QJOYI2
              <span
                style="color:#3461A7;cursor:pointer;margin-left:10px;text-decoration: underline;">
                Copy
              </span>
            </h6>
          </div>
        </li>
        <li class="clear" style="margin-bottom: 20px">
          <div class="li-title">
            <span class="list-num">3</span>
            <div class="tip-img tip-img2"></div>
            <p>Completion of binding</p>
            <div class="input-wrap">
              <Input
                v-model="bindGooglePassword"
                type="password"
                placeholder="Please enter log in password"
                class="bindGoogle-input"
              >
              </Input>
              <Input
                v-model="bindGooglePassword"
                type="text"
                placeholder="Please input the google code."
                class="bindGoogle-input"
              >
              </Input>
            </div>
          </div>
        </li>
      </ul>
      <div slot="footer">
        <Button type="primary" size="large" long :loading="modal_loading">Complete binding</Button>
      </div>
    </Modal>
  `,
  data() {
    return {
      bindGooglePassword: '',
      modal_loading: false,
    };
  },
  props: ['registerGoogle'],
  methods: {
    asyncCancel() {
      this.$parent.$emit('isregisterGoogle', false);
      this.modal_loading = false;
    },
    ok() {
      this.$Message.info('Clicked ok');
    },
  },
};

// header

var o_header = {
  template: `
    <div id="header" class="om-header">
      <Row class="flex-wrapper">
        <i-col class="logo-wrapper" span="4">
          <a href="otc_adverts.html">
            <img src="../images/Header-Logo-en.png" width="138px" height="21px" alt="">
          </a>
        </i-col>
        <i-col span="10" class="om-market">
          <ul>
            <li>
              <a href="otc_adverts.html">{{name}}</a>
            </li>
          </ul>
        </i-col>
        <i-col span="10" class="management">
          <ul>
            <li class="items" @click="toggleLanguage">
              <a href="javascript:;">
                <svg t="1530500732088" style="height: 14px;width: 14px;" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="773" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200">
                  <defs>
                    <style type="text/css"></style>
                  </defs>
                  <path d="M512 0a512 512 0 1 0 0 1024A512 512 0 0 0 512 0z m0 99.181714c33.060571 0 98.304 86.747429 136.192 214.674286H375.808C413.696 185.782857 478.939429 99.181714 512 99.181714z m-400.896 512a413.549714 413.549714 0 0 1 0-198.217143H253.805714a808.96 808.96 0 0 0 0 198.217143H111.030857z m38.619429 99.035429h122.733714c17.554286 68.900571 43.300571 130.194286 73.216 179.858286a414.500571 414.500571 0 0 1-196.022857-179.931429z m122.733714-396.434286H149.723429a414.573714 414.573714 0 0 1 196.096-179.858286 675.620571 675.620571 0 0 0-73.362286 179.931429zM512 924.964571c-33.645714 0-98.669714-86.747429-136.338286-214.674285h272.676572C610.669714 838.217143 545.572571 924.891429 512 924.891429z m157.988571-313.782857H354.011429a688.859429 688.859429 0 0 1 0-198.217143H669.988571a687.542857 687.542857 0 0 1 0 198.217143z m204.288-297.252571h-122.733714a675.181714 675.181714 0 0 0-73.362286-179.931429 414.500571 414.500571 0 0 1 196.096 179.931429z m-196.022857 576.146286a675.108571 675.108571 0 0 0 73.289143-179.785143h122.733714a414.427429 414.427429 0 0 1-196.022857 179.785143z m91.940572-278.893715a809.033143 809.033143 0 0 0 0-198.217143h142.774857a413.988571 413.988571 0 0 1 0 198.217143H770.194286z"
                      fill="#ADADAD" p-id="774">
                  </path>
                </svg>
                <span>{{ language }}</span>
              </a>
            </li>
            <li class="items">
              <a type="primary" @click="showLogin()">登录</a>
            </li>
            <li class="items">
              <a href="otc_my_advert.html">我的挂单</a>
            </li>
            <li class="items my-orders">
              <Badge :count="orders.length">
                <a href="otc_my_order.html" class="demo-badge" @click="isMyordersShow=!isMyordersShow">我的订单</a>
              </Badge>
              <div class="order-card" style="display:none;">
                <div class="arrow"></div>
                <div class="card-header">
                  <span>Onging order</span>
                  <a href="otc_my_order.html">All orders > </a>
                </div>
                <ul>
                  <li v-for="item in orders" :key="item.sequence">
                    <Row>
                      <i-col span="4">
                        <div class="buyType" v-if="item.buyer.id==uid">buy</div>
                        <div class="sellType" v-else>sell</div>
                      </i-col>
                      <i-col span="16">
                        <div v-if="item.buyer.id==uid" class="tip"> Payment to the seller {{item.totalPrice}}SAR</div>
                        <div v-else class="tip"> Waiting for buyers payment{{item.totalPrice}}SAR</div>
                        <span v-if="item.buyer.id==uid">Complete the payment in {{item.ctime | toHours }}</span>
                        <span v-else>Waiting for the buyer to pay {{item.ctime | toHours }}</span>
                      </i-col>
                      <i-col span="4">
                        <a v-if="item.buyer.id==uid" class="view" :href="'otc_pay.html?sequence='+item.sequence">view</a>
                        <a v-else class="view" :href="'otc_wait_pay.html?sequence='+item.sequence">view</a>
                      </i-col>
                    </Row>
                  </li>
                </ul>
                <div class="card-footer">
                  <a href="#">查看所有订单</a>
                </div>
              </div>
            </li>
          </ul>
        </i-col>
      </Row>
      <mylogin :login="isLoginShow"></mylogin>
      <myloginnext
        :login-next="isLoginNextShow"
        :is-login-next-type="isLoginNextType"
        :is-login-next-cookie="isLoginNextCookie"
        :is-login-next-phone="isLoginNextPhone"
        :is-login-next-email="isLoginNextEmail"
      ></myloginnext>
      <myregistergoogle :register-google="isRegisterGoogleShow"></myregistergoogle>
    </div>
  `,
  data() {
    return {
      name: '首页',
      language: '中文',
      orders: [],
      ws: null,
      uid: 0,
      isLoginShow: false,
      isLoginNextShow: false,
      isRegisterGoogleShow: false,
      isLoginNextType: '',
      isLoginNextCookie: '',
      isLoginNextPhone: '',
      isLoginNextEmail: '',
    };
  },
  methods: {
    //login
    showLogin() {
      this.isLoginShow = true;
    },
    toggleLanguage() {
      if (this.language === '中文') {
        this.language = 'English';
      } else {
        this.language = '中文';
      }
      var languageCode = this.language === '中文' ? 'zh' : 'en';
      // document.body.style.direction = languageCode === 'zh' ? 'ltr' : 'rtl';
      document.body.dir = languageCode === 'zh' ? 'ltr' : 'rtl';
      localStorage.setItem('locale', languageCode);
      this.$parent.$emit('locale', languageCode);
    },
    getMyOrder() {
      var data = {
        pageSize: 5,
        pageNum: 1,
      };
      return get('api/personOrders/processing', data);
    },
    threadPoxi() {
      var agentData = 'mymessage';
      var that = this;
      if (that.websock.readyState === that.websock.OPEN) {
        that.websocketsend(agentData);
      } else if (that.websock.readyState === that.websock.CONNECTING) {
        setTimeout(function () {
          that.websocketsend(agentData);
        }, 300);
      } else {
        that.initWebSocket();
        setTimeout(function () {
          that.websocketsend(agentData);
        }, 500);
      }
    },
    initWebSocket() {
      // var  wsuri ="ws:"+utils.getHost()+"/websocket/socketServer";
      var wsuri = 'ws://localhost:8080/otc-web/api/websocket/socketServer.do';
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onclose = this.websocketclose;
    },
    websocketonmessage(e) {
      var redata = JSON.parse(e.data);
      console.log(redata.value);
    },
    websocketsend(agentData) {
      this.websock.send(agentData);
    },
    websocketclose(e) {
      console.log('connection closed (' + e.code + ')');
    },
  },
  components: {
    mylogin: o_my_login,
    myloginnext: o_my_loginNext,
    myregistergoogle: o_my_registerGoogle,
  },
  created: function () {
    if (utils.getCookie('token')) {
      var that = this;
      get('api/userInfo').then(function (res) {
        if (res.success) {
          that.uid = res.data.data.userExtView.uid;
          window.localStorage.setItem('uid', that.uid);
        }
      });
    }
    // this.initWebSocket();
    // this.threadPoxi();
  },
  mounted() {
    this.$on('islogin', function (i) {
      console.log(i);
      this.isLoginShow = i;
    });
    this.$on("isregisterGoogle", function (i) {
      this.isRegisterGoogleShow = i;
    });
    this.$on("isLoginNext", function (i) {
      this.isLoginNextShow = i;
    });
    this.$on("isLoginNextType", function (i) {
      this.isLoginNextType = i;
    });
    this.$on("isLoginNextCookie", function (i) {
      this.isLoginNextCookie = i;
    });
    this.$on("isLoginNextPhone", function (i) {
      this.isLoginNextPhone = i;
    });
    this.$on("isLoginNextEmail", function (i) {
      this.isLoginNextEmail = i;
    });
    if (utils.getCookie('token')) {
      var that = this;
      this.getMyOrder().then(function (res) {
        if (res.success) {
          if (res.data.data.rsts.length > 5) {
            that.orders = res.data.data.rsts.slice(0, 5);
            return;
          }
          that.orders = res.data.data.rsts;
        }
      });
    }
  },
  filters: {
    toHours: function (time) {
      return new Date(time).toLocaleTimeString();
    },
  },
};
