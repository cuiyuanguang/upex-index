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

Vue.filter('date', function(utc) {
  var date = new Date(utc);
  var format = 'yyyy-MM-dd hh:mm:ss';
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return format;
});

var i18nComponentsMessages = {
  login: {
    zh: '登录',
    en: 'Log In',
  },
  loginout: {
    zh: '注销',
    en: 'Log Out',
  },
  register: {
    zh: '注册',
    en: 'Register',
  },
  homepage: {
    zh: '首页',
    en: 'Home',
  },
  pendingOrder: {
    zh: '我的挂单',
    en: 'pending orders',
  },
  allOrder: {
    zh: '我的订单',
    en: 'my orders',
  },
  buy: {
    zh: '买入',
    en: 'Buy',
  },
  sell: {
    zh: '卖出',
    en: 'Sell',
  },
  seeAllOrder: {
    zh: '查看所有订单',
    en: 'view all my orders',
  },
  ongoingOrders: {
    zh: '进行中的订单',
    en: 'Ongoing orders',
  },
  viewOrder: {
    zh: '查看',
    en: 'view',
  },
  paidToSeller: {
    zh: '已向卖家支付',
    en: 'already paid to seller',
  },
  waitForBuyerPay: {
    zh: '等待买家支付',
    en: 'wait for buyer to pay',
  },
  waitForSellerConfirm: {
    zh: '等待卖家确认收款',
    en: 'wait for seller to confirm',
  },
  payInTime: {
    zh: '支付截止时间',
    en: 'Complete the payment in',
  },
  waitForTime: {
    zh: '交易截止时间',
    en: 'Waiting for the buyer to pay',
  },
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
  numericOrLetter: {
    zh: '请输入数字或字母',
    en: 'type numeric or letter here please',
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
  backEdit: {
    zh: '返回修改',
    en: 'back to edit',
  },
  bind: {
    zh: '绑定',
    en: 'bind',
  },
  noEmpty: {
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
  fallbackLocale: 'zh',
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
    locale: function (newVal, oldVal) {
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
              <li>
                <p>{{ $t('openingBank') }}</p>
                <input v-model="cardInfo.bankName" maxlength="30">
                <span class="error" v-if="bankNameError">{{ bankNameError }}</span>
              </li>
              <li>
                <p>{{ $t('accountName') }}</p>
                <input v-model="cardInfo.name" maxlength="30">
                <span class="error" v-if="nameError">{{ nameError }}</span>
              </li>
              <li>
                <p>{{ $t('bankNumber') }}</p>
                <input v-model="cardInfo.cardNo" maxlength="30">
                <span class="error" v-if="cardNoError">{{ cardNoError }}</span>
              </li>
              <li>
                <p>Iban {{ $t('number') }}</p>
                <input v-model="cardInfo.ibanNo" maxlength="30">
                <span class="error" v-if="ibanNoError">{{ ibanNoError }}</span>
              </li>
              <li><button @click="binding">{{ $t('bind') }}</button></li>
            </ul>
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
      },
      bankNameError: '',
      nameError: '',
      cardNoError: '',
      ibanNoError: '',
    };
  },
  props: ['show', 'locale'],
  methods: {
    close() {
      for (var key in this.cardInfo) {
        this.cardInfo[key] = '';
      }
      this.$parent.$emit('isBindShow', false);
    },
    invalidCheck(target) {
      return /(\d|\w)+$/.test(target);
    },
    binding() {
      if (!this.cardInfo.bankName) {
        this.bankNameError = this.$t('noEmpty');
      } else if (!this.cardInfo.name) {
        this.nameError = this.$t('noEmpty');
      } else if (!this.cardInfo.cardNo) {
        this.cardNoError = this.$t('noEmpty');
      } else if (!this.cardInfo.ibanNo) {
        this.ibanNoError = this.$t('noEmpty');
      } else {
        this.bankNameError = '';
        this.nameError = '';
        this.cardNoError = '';
        this.ibanNoError = '';
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
    locale: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$i18n.locale = newVal;
      }
    },
    'cardInfo.bankName': function(val) {
      if (val && !this.invalidCheck(val)) {
        this.bankNameError = this.$t('numericOrLetter');
      } else {
        this.bankNameError = '';
      }
    },
    'cardInfo.name': function(val) {
      if (val && !this.invalidCheck(val)) {
        this.nameError = this.$t('numericOrLetter');
      } else {
        this.nameError = '';
      }
    },
    'cardInfo.cardNo': function(val) {
      if (val && !this.invalidCheck(val)) {
        this.cardNoError = this.$t('numericOrLetter');
      } else {
        this.cardNoError = '';
      }
    },
    'cardInfo.ibanNo': function(val) {
      if (val && !this.invalidCheck(val)) {
        this.ibanNoError = this.$t('numericOrLetter');
      } else {
        this.ibanNoError = '';
      }
    },
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
                <Tab-Pane name="1" label="Google verification code"  icon="social-google" >
                  <div class="g-code">
                    <input v-model="gcode" placeholder="please enter verification code" type="text">
                  </div>
                </Tab-Pane>
                <Tab-Pane  name="2" label="SMS verification" icon="android-textsms">
                  <div class="g-code">
                    <input v-model="ecode" type="text">
                    <span v-show="sms" class="sendMsg">{{sendText}}s</span>
                    <span v-show="!sms" @click="sendMsg" class="sendMsg">sms</span>
                  </div>
                </Tab-Pane>
              </Tabs>
            </div>
            <div class="foot">
              <a href="#" class="return" @click="backToEdit"><u>{{ $t('backEdit') }}</u></a>
              <button @click="bind" class="binding">{{ $t('bind') }}</button>
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
      sms: false,
      sendText: 'send'
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
    sendMsg: function () {
      var that = this;
      get('api/verifycode_sms', {
        type: 8,
      }).then(function (res) {
        if (res.success) {
          that.sms = true;
          that.sendMsgCountDown();
        }
      });
    },
    sendMsgCountDown: function () {
      var that = this;
      that.sendText = 300;
      var b = setInterval(function () {
        that.sendText--;
        if (that.sendText == 0) {
          that.sms = false;
          clearInterval(b);
        }
      }, 1000);
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
    locale: function (newVal, oldVal) {
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
    locale: function (newVal, oldVal) {
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
          <div class="o-body">
            <div class="tp">
              <div><img src="../images/whatup.png" /></div>
              <p>{{ $t('addContactTips') }}</p>
            </div>
            <ul class="bt">
              <li>
                <p>WhatsApp {{ $t('account') }}</p>
                <Input
                  v-model="wahtsApp"
                  maxlength="30"
                  placeholder="Enter your WhatsApp number"
                >
                  <Select v-model="selectCountry" slot="prepend" filterable style="width:86px;">
                    <Option
                      v-for="(country, index) in countryArr"
                      :key="index"
                      :value="country.dialingCode"
                      :label="country.dialingCode"
                      style="width:100%;"
                    >
                      <span class="float-left">{{country.dialingCode}}</span>
                      <span class="float-right" style="color:#aaaaaa;">{{country.enName}}</span>
                    </Option>
                  </Select>
                </Input>
                <span class="error" v-if="accountErrorTips">{{ accountErrorTips }}</spam>
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
      wahtsApp: '',
      countryArr: [],
      selectCountry: '+86',
      accountErrorTips: '',
    };
  },
  props: ['show', 'locale'],
  methods: {
    close() {
      this.$parent.$emit('isContactShow', false);
    },
    getCountry() {
      var that = this;
      get('api/country').then(function (res) {
        if (res.success) {
          that.countryArr = res.data.data;
        }
      });
    },
    bind() {
      if (!this.wahtsApp) {
        this.accountErrorTips = 'whatsApp' + this.$t('noEmpty');
      } else if (!/(\d|\w)+$/.test(this.wahtsApp)) {
        this.accountErrorTips = this.$t('numericOrLetter');
      } else {
        this.accountErrorTips = '';
        var that = this;
        post('api/watchapp', this.selectCountry + '-' + this.wahtsApp).then(function (res) {
          if (res.success) {
            get('api/userInfo').then(function(res) {
              var data = res.data.data;
              that.wahtsApp = '';
              localStorage.setItem('user', JSON.stringify(data));
              that.$parent.$emit('isAddContactShow', false);
            });
          }
        });
      }
    },
  },
  mounted: function () {
    this.getCountry();
  },
  watch: {
    locale: function (newVal, oldVal) {
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
    locale: function (newVal, oldVal) {
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
      title="Welcome Login"
      @on-cancel="asyncCancel"
      class="my-login"
      class-name="vertical-center-modal"
      width="500"
    >
      <vue-recaptcha
        ref="invisibleRecaptcha"
        size="invisible"
        @expired="onExpired"
        @verify="onVerify"
        sitekey="6LeA22cUAAAAAAaJhwcX8hLgff2pa4vVERYPjwyi"
      >
      </vue-recaptcha>
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
            <Select v-model="selectCountry" @on-change="loginPhoneFocus" slot="prepend" filterable style="width:86px">
              <Option
                v-for="(country, index) in countryArr"
                :value="country.dialingCode"
                :label="country.dialingCode"
                :key="index"
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
  components: {VueRecaptcha},
  props: ['login'],
  computed: {},
  methods: {
    onExpired() {
      this.$refs.invisibleRecaptcha.reset()
    },
    onVerify(res) {
      console.log(res)
      var that = this;
      var dataCaptcha = {
        'captcha': res
      };
      post('api/common/googleValidCode', JSON.stringify(dataCaptcha),false).then(function (res) {
        if (res.success) {
          var data;
          if (that.loginWrap === 'loginPhone') {
            data = {
              countryCode: that.selectCountry.slice(1),
              mobileNumber: that.loginPhoneVal,
              loginPword: that.loginPhonePassword,
            };
            post('api/user/login_in', JSON.stringify(data),false).then(function (res) {
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
                that.clear()
              } else {
                that.$refs.invisibleRecaptcha.reset()
                that.modal_loading = false;
              }
            });

          } else {
            data = {
              mobileNumber: that.loginEmailVal,
              loginPword: that.loginEmailPassword,
            };
            post('api/user/login_in', JSON.stringify(data),false).then(function (res) {
              if (res.success) {
                if (res.data.data.type === '3') {
                  that.$parent.$emit(
                    'isLoginNextEmail',
                    that.loginPhoneVal
                  );
                }
                that.$parent.$emit('isLoginNext', true);
                that.$parent.$emit('isLoginNextType', res.data.data.type);
                that.$parent.$emit('isLoginNextCookie', res.data.data.token);
                that.$parent.$emit('islogin', false);
                that.clear()
              } else {
                that.$refs.invisibleRecaptcha.reset()
                that.modal_loading = false;
              }
            });
          }
        } else {
          that.$refs.invisibleRecaptcha.reset()
          that.modal_loading = false;
        }
      });
    },
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
    clear() {

      this.loginEmailVal='';
        this.loginEmailError=false;
        this.loginEmailErrorText='';
        this.loginEmailPassword='';
        this.loginEmailPasswordError=false;
        this.loginEmailPasswordErrorText='';
        this.loginPhoneVal='';
        this.loginPhoneError=false;
        this.loginPhoneErrorText='';
        this.loginPhonePassword='';
        this.loginPhonePasswordError=false;
        this.loginPhonePasswordErrorText='';
    },
    asyncCancel() {
      this.clear();
      this.$parent.$emit('islogin', false);
      this.modal_loading = false;
    },
    runForgetPassword() {
      alert(1);
    },
    runRegister() {
      this.clear();
      this.$parent.$emit('islogin', false);
      this.$parent.$emit('isregister', true);
      this.modal_loading = false;
    },
    mySubmit() {
      var that = this;

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
            this.$refs.invisibleRecaptcha.execute();
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
            this.$refs.invisibleRecaptcha.execute();

          }
        }
      }
      //login
    },
    getCountry() {
      var that = this;
      get('api/country').then(function (res) {
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
          placeholder="please enter verification code"
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
          placeholder="please enter verification code"
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
  props: ['loginNext', 'isLoginNextType', 'isLoginNextCookie', 'isLoginNextPhone', 'isLoginNextEmail'],
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
      isLogined: false,
    };
  },
  methods: {
    loginNextFocus() {
      this.loginNextError = false;
      this.loginNextErrorText = ''
    },
    loginNextSubmit() {
      var that = this;
      if (!this.modal_loading) {
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
              that.$parent.$emit('isLoginNext', false);
              sessionStorage.setItem('token', that.isLoginNextCookieNum);
              get('api/userInfo').then(function(res) {
                that.isLogined = res.data.code === 0;
                var data = res.data.data;
                if (that.isLogined) {
                  that.$parent.$emit('logined', that.isLogined);
                  localStorage.setItem('user', JSON.stringify(data));
                }
              });
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
        if (type === 'phone') {
          data = {
            countryCode: isLoginNextPhoneNumCountry,
            mobile: isLoginNextPhoneNumPhone,
            operationType: '23',
            token: this.isLoginNextCookieNum,
          };
          post('api/common/smsValidCode', JSON.stringify(data), false).then(function (res) {
            if (res.success) {
            } else {
            }
          });
        } else if (type === 'email') {
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
var o_my_register = {
  template: `
      <Modal
      v-model="register"
      class-name="vertical-center-modal"
      @on-cancel="asyncCancel" class="my-login my-register"
      width="500"
      title="Welcome Register"
      >
                  <vue-recaptcha ref="invisibleRecaptcha" size="invisible"
 @expired="onExpired" @verify="onVerify" sitekey="6LeA22cUAAAAAAaJhwcX8hLgff2pa4vVERYPjwyi">
            </vue-recaptcha>
      <Tabs v-model="registerWrap" @on-click="tabChange">
        <TabPane label="E-mail" name="tabEmail">
          <Input
            :class="emailValError?'is-red':'is-gray'"
            v-model="emailVal"
            placeholder="Enter your email"
            class="iview-input"
            @on-focus="emailValFocus"
          ></Input>
          <p class="my-login-error">{{emailValErrorText}}</p>
          <Input
          v-model="emailSmsCode"
          type="text"
          placeholder="E-mail verification code"
          class="loginNext-input loginNext-sms-input" @on-focus="emailSmsCodeFocus" :class="emailSmsCodeError?'loginNext-input-red':' '">
          <span slot="append"
            class="my-slot-append"
             @click="runSendSms('email')"
            :class="timerEmail?'my-slot-append-gary':'my-slot-append'"
          >
            {{sendSmsEmail}}
          </span>
        </Input>
        <p class="my-loginNext-error">{{emailSmsCodeErrorText}}</p>
          <Input
            :class="emailPasswordError?'is-red':'is-gray'"
            v-model="emailPassword"
            type="password"
            placeholder="Enter your password"
            class="iview-input"
            @on-focus="emailPasswordFocus">
          </Input>
          <p class="my-login-error">{{emailPasswordErrorText}}</p>
           <Input
            :class="emailPasswordAgainError?'is-red':'is-gray'"
            v-model="emailPasswordAgain"
            type="password"
            placeholder="Enter your password again"
            class="iview-input"
            @on-focus="emailPasswordAgainFocus">
          </Input>
          <p class="my-login-error">{{emailPasswordAgainErrorText}}</p>
        </TabPane>
        <TabPane label="Phone" name="registerPhone">
          <Input
            :class="phoneValError?'is-red':'is-gray'"
            v-model="phoneVal"
            placeholder="Enter your Phone number"
            class="iview-input iview-input-countryPhone"
            @on-focus="phoneValFocus"
           >
            <Select v-model="selectCountry" @on-change="phoneValFocus" filterable slot="prepend" style="width:86px">
              <Option
                v-for="(country, index) in countryArr"
                :value="country.dialingCode"
                :label="country.dialingCode"
                :key="index"
              >
                <span class="">{{country.dialingCode}}</span>
                <span class="iview-input-countryPhone-span">{{country.enName}}</span>
              </Option>
            </Select>
            </Input>
             <p class="my-loginNext-error">{{phoneValErrorText}}</p>
               
          <Input
          v-model="phoneSmsCode"
          type="text"
          placeholder="E-mail verification code"
          class="loginNext-input loginNext-sms-input" @on-focus="phoneSmsCodeFocus" :class="phoneSmsCodeError?'loginNext-input-red':' '">
       
          <span slot="append"
            class="my-slot-append"
            @click="runSendSms('phone')"
            :class="timerPhone?'my-slot-append-gary':'my-slot-append'"
          >
            {{sendSmsPhone}}
          </span>
        </Input>
        <p class="my-loginNext-error">{{phoneSmsCodeErrorText}}</p>
          <Input
            :class="phonePasswordError?'is-red':'is-gray'"
            v-model="phonePassword"
            type="password"
            placeholder="Enter your password"
            class="iview-input"
            @on-focus="phonePasswordFocus">
          </Input>
          <p class="my-login-error">{{phonePasswordErrorText}}</p>
           <Input
            :class="phonePasswordAgainError?'is-red':'is-gray'"
            v-model="phonePasswordAgain"
            type="password"
            placeholder="Enter your password again"
            class="iview-input"
            @on-focus="phonePasswordAgainFocus">
          </Input>
          <p class="my-login-error">{{phonePasswordAgainErrorText}}</p>
        </TabPane>
      </Tabs>
      <div slot="footer">
        <Button type="primary" size="large" long :loading="modal_loading" @click="mySubmit" >Register</Button>
        <div class="login-footer-wrap">
          <span class="black">I have an account</span>
          <span class="blue" @click="runLogin">log in</span>
        </div>
      </div>
      </Modal>  
    `,
  data() {
    return {
      //email
      emailVal: '',
      emailValError: false,
      emailValErrorText: '',
      emailSmsCode: '',
      emailSmsCodeError: false,
      emailSmsCodeErrorText: '',
      emailPassword: '',
      emailPasswordError: false,
      emailPasswordErrorText: '',
      emailPasswordAgain: '',
      emailPasswordAgainError: false,
      emailPasswordAgainErrorText: '',
      //phone
      phoneVal: '',
      phoneValError: false,
      phoneValErrorText: '',
      selectCountry: '+86',
      countryArr: [],
      phoneSmsCode: '',
      phoneSmsCodeError: false,
      phoneSmsCodeErrorText: '',
      phonePassword: '',
      phonePasswordError: false,
      phonePasswordErrorText: '',
      phonePasswordAgain: '',
      phonePasswordAgainError: false,
      phonePasswordAgainErrorText: '',
      register: '',
      registerWrap: 'tabEmail',
      modal_loading: false,
      error: {
        null: '不能为空',
        phoneNum: '输入合法的电话号码',
        emailNum: '输入合法的邮箱地址',
        noSame: '两次密码不一样',
        password: '以字母开头，长度在8-64之间，只能包含字符、数字',
      },
      sendSmsEmail: 'get verification code',
      sendSmsPhone: 'get verification code',
      showEmail: true,
      showPhone: true,
      countEmail: '',
      countPhone: '',
      timerEmail: null,
      timerPhone: null,
      isLogined:false
    };
  },
  components: {VueRecaptcha},
  props: ['register'],
  methods: {

    onExpired() {
      this.$refs.invisibleRecaptcha.reset()
    },
    onVerify(res) {
      console.log(res)
      var that = this;
      var data;
      var dataUserInfo;
      var dataCaptcha = {
        'captcha': res
      };
      post('api/common/googleValidCode', JSON.stringify(dataCaptcha),false).then(function (res) {
        if (res.success) {
          if (that.registerWrap === 'registerPhone') {
            const isLoginNextPhoneNumCountry = that.selectCountry.substring(1);
            data = {
              "smsAuthCode": that.phoneSmsCode,
              "countryCode": isLoginNextPhoneNumCountry,
              "mobileNumber": that.phoneVal,
              "loginPword": that.phonePasswordAgain,
            };
            post('api/user/reg_mobile', JSON.stringify(data),false).then(function (res) {
              that.modal_loading = false;
              if (res.success) {
                sessionStorage.setItem('token', res.data.data);
                that.$parent.$emit('isregisterCookie', res.data.data);
                that.$parent.$emit('isregister', false);
                that.$parent.$emit('isregisterGoogle', true);
                get('api/userInfo').then(function(res) {
                  that.isLogined = res.data.code === 0;
                  dataUserInfo = res.data.data;
                  if (that.isLogined) {
                    that.$parent.$emit('logined', that.isLogined);
                    localStorage.setItem('user', JSON.stringify(dataUserInfo));
                  }
                });
              } else {
                that.$refs.invisibleRecaptcha.reset()
              }
            });

          } else if (that.registerWrap === 'tabEmail') {
            data = {
              "email": that.emailVal,
              "loginPword": that.emailPasswordAgain,
              "emailAuthCode": that.emailSmsCode
            };
            post('api/user/reg_email', JSON.stringify(data),false).then(function (res) {
              that.modal_loading = false;
              if (res.success) {
                sessionStorage.setItem('token', res.data.data);
                that.$parent.$emit('isregisterCookie', res.data.data);
                that.$parent.$emit('isregister', false);
                that.$parent.$emit('isregisterGoogle', true);
                get('api/userInfo').then(function(res) {
                  that.isLogined = res.data.code === '0';
                  dataUserInfo = res.data.data;
                  if (that.isLogined) {
                    that.$parent.$emit('logined', that.isLogined);
                    localStorage.setItem('user', JSON.stringify(dataUserInfo));
                  }
                });
              } else {
                that.$refs.invisibleRecaptcha.reset()
              }
            });
          }
        } else {
          that.$refs.invisibleRecaptcha.reset();
          that.modal_loading = false;
        }
      });
    },
    //email
    emailValFocus() {
      this.emailValError = false;
      this.emailValErrorText = '';
    },
    emailSmsCodeFocus() {
      this.emailSmsCodeError = false;
      this.emailSmsCodeErrorText = ''
    },
    emailPasswordFocus() {
      this.emailPasswordError = false;
      this.emailPasswordErrorText = '';
      this.emailPasswordAgainError = false;
      this.emailPasswordAgainErrorText = ''
    },
    emailPasswordAgainFocus() {
      this.emailPasswordAgainError = false;
      this.emailPasswordAgainErrorText = ''
    },
    //phone
    phoneValFocus() {
      this.phoneValError = false;
      this.phoneValErrorText = '';
    },
    phoneSmsCodeFocus() {
      this.phoneSmsCodeError = false;
      this.phoneSmsCodeErrorText = ''
    },
    phonePasswordFocus() {
      this.phonePasswordError = false;
      this.phonePasswordErrorText = '';
      this.phonePasswordAgainError = false;
      this.phonePasswordAgainErrorText = ''
    },
    phonePasswordAgainFocus() {
      this.phonePasswordAgainError = false;
      this.phonePasswordAgainErrorText = ''
    },
    getCountry() {
      var that = this;
      get('api/country').then(function (res) {
        if (res.success) {
          that.countryArr = res.data.data;
        } else {
        }
      });
    },
    //发送验证码
    runSendSms(type) {
      const TIME_COUNT = 10;
      var that = this;
      that.$parent.$emit('isregister', false);
      that.$parent.$emit('isregisterGoogle', true);
      var data;
      if (type === 'phone') {
        if (!that.timerPhone) {
          if (that.phoneVal === '' || that.selectCountry === '') {
            that.modal_loading = false;
            that.phoneValError = true;
            that.phoneValErrorText = that.error.null;
          } else if (!that.phoneReg(that.phoneVal)) {
            that.modal_loading = false;
            that.phoneValError = true;
            that.phoneValErrorText = that.error.phoneNum;
          } else {
            const isLoginNextPhoneNumCountry = that.selectCountry.substring(1);
            const isLoginNextPhoneNumPhone = that.phoneVal;
            data = {
              countryCode: isLoginNextPhoneNumCountry,
              mobile: isLoginNextPhoneNumPhone,
              operationType: '1',
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
              if (res.success) {

              } else {

              }
            });
          }
        }
      } else if (type === 'email') {
        if (!that.timerEmail) {
          if (that.emailVal === '') {
            that.modal_loading = false;
            that.emailValError = true;
            that.emailValErrorText = that.error.null;
          } else if (!that.emailReg(that.emailVal)) {
            that.modal_loading = false;
            that.emailValError = true;
            that.emailValErrorText = that.error.emailNum;
          } else {
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
              if (res.success) {

              } else {

              }
            });
          }
        }
      }

    },
    tabChange(name) {
      this.registerWrap = name;
    },
    //密码正则
    passwordReg(passwordVal) {
      var reg1 = /(.+)?\d(.+)?/;
      var reg2 = /.*[a-zA-Z]+.*/;
      return !(passwordVal.length < 8 || passwordVal.length > 64 || !reg1.test(passwordVal) || !reg2.test(passwordVal))
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
    asyncCancel() {
      this.$parent.$emit('isregister', false);
      this.clear();
      this.modal_loading = false;
    },
    mySubmit() {
      var that = this;
      var data;
      if (!that.modal_loading) {
        that.modal_loading = true;
        if (that.registerWrap === 'registerPhone') {
          if (that.phoneVal === '' || that.selectCountry === '') {
            that.modal_loading = false;
            that.phoneValError = true;
            that.phoneValErrorText = that.error.null;
          } else if (!that.phoneReg(that.phoneVal)) {
            that.modal_loading = false;
            that.phoneValError = true;
            that.phoneValErrorText = that.error.phoneNum;
          } else if (that.phoneSmsCode === '') {
            that.modal_loading = false;
            that.phoneSmsCodeError = true;
            that.phoneSmsCodeErrorText = that.error.null;
          } else if (that.phonePassword === '') {
            that.modal_loading = false;
            that.phonePasswordError = true;
            that.phonePasswordErrorText = that.error.null;
          } else if (!that.passwordReg(that.phonePassword)) {
            that.modal_loading = false;
            that.phonePasswordError = true;
            that.phonePasswordErrorText = that.error.password;
          } else if (that.phonePasswordAgain === '') {
            that.modal_loading = false;
            that.phonePasswordAgainError = true;
            that.phonePasswordAgainErrorText = that.error.null;
          } else if (that.phonePassword !== that.phonePasswordAgain) {
            that.modal_loading = false;
            that.phonePasswordAgainError = true;
            that.phonePasswordAgainErrorText = that.error.noSame;
          } else {
            this.$refs.invisibleRecaptcha.execute();
          }
        } else if (that.registerWrap === 'tabEmail') {
          if (that.emailVal === '') {
            that.modal_loading = false;
            that.emailValError = true;
            that.emailValErrorText = that.error.null;
          } else if (!that.emailReg(that.emailVal)) {
            that.modal_loading = false;
            that.emailValError = true;
            that.emailValErrorText = that.error.emailNum;
          } else if (that.emailSmsCode === '') {
            that.modal_loading = false;
            that.emailSmsCodeError = true;
            that.emailSmsCodeErrorText = that.error.null;
          } else if (that.emailPassword === '') {
            that.modal_loading = false;
            that.emailPasswordError = true;
            that.emailPasswordErrorText = that.error.null;
          } else if (!that.passwordReg(that.emailPassword)) {
            that.modal_loading = false;
            that.emailPasswordError = true;
            that.emailPasswordErrorText = that.error.password;
          } else if (that.emailPasswordAgain === '') {
            that.modal_loading = false;
            that.emailPasswordAgainError = true;
            that.emailPasswordAgainErrorText = that.error.null;
          } else if (that.emailPassword !== that.emailPasswordAgain) {
            that.modal_loading = false;
            that.emailPasswordAgainError = true;
            that.emailPasswordAgainErrorText = that.error.noSame;
          } else {
            this.$refs.invisibleRecaptcha.execute();
          }
        }
      }
    },
    clear() {
      this.emailVal = '';
      this.emailValError = false;
      this.emailValErrorText = '';
      this.emailSmsCode = '';
      this.emailSmsCodeError = false;
      this.emailSmsCodeErrorText = '';
      this.emailPassword = '';
      this.emailPasswordError = false;
      this.emailPasswordErrorText = '';
      this.emailPasswordAgain = '';
      this.emailPasswordAgainError = false;
      this.emailPasswordAgainErrorText = '';
      this.phoneVal = '';
      this.phoneValError = false;
      this.phoneValErrorText = '';
      this.phoneSmsCode = '';
      this.phoneSmsCodeError = false;
      this.phoneSmsCodeErrorText = '';
      this.phonePassword = '';
      this.phonePasswordError = false;
      this.phonePasswordErrorText = '';
      this.phonePasswordAgain = '';
      this.phonePasswordAgainError = false;
      this.phonePasswordAgainErrorText = '';
    },
    runLogin() {
      this.$parent.$emit('islogin', true);
      this.asyncCancel()
    }
  },
  mounted: function () {
    this.getCountry();
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
            <div class="qr">
            <img :src="googleImg" alt="">
</div>
            <div class="tip-img tip-img1"></div>
            <span class="list-num">2</span>
            <p style="width:158px">Use google authenticator to scan a barcode:</p>
            <h6 style="color:#999;margin:26px 0 20px 50px">or</h6>
            <p style="margin-left: 50px;">Enter Provided key:</p>
            <h6 style="color:#999;margin: 5px 0 0 50px">
             {{googleKey}}
              <span
                style="color:#3461A7;cursor:pointer;margin-left:10px;text-decoration: underline;" @click="doCopy">
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
                :class="bindGooglePasswordErrorText !== ''?'is-red':'is-gray'"
              >
              </Input>
              <p class="my-login-error">{{bindGooglePasswordErrorText}}</p>
              <Input
                v-model="bindGoogleCode"
                type="text"
                placeholder="Please input the google code."
                class="bindGooglePasswordErrorText !== ''?'is-red':'is-gray'"
              >
              </Input>
              <p class="my-login-error">{{bindGoogleCodeErrorText}}</p>
            </div>
          </div>
        </li>
      </ul>
      <div slot="footer">
        <Button type="primary" size="large" long :loading="modal_loading" @click="setGoogleInfo">Complete binding</Button>
      </div>
    </Modal>
  `,
  data() {
    return {
      isregisterToken:'',
      bindGooglePassword: '',
      bindGoogleCode: '',
      modal_loading: false,
      googleKey: '',
      googleImg: '',
      bindGooglePasswordErrorText:'',
      bindGoogleCodeErrorText:'',
      error: {
        null: '不能为空',
      },
    };
  },
  props: ['registerGoogle','registerCookie'],
  methods: {
    doCopy: function () {
      this.$copyText(this.googleKey).then(function (e) {
        alert('复制成功')
      })
    },
    getToken(){
      var that=this
      that.isregisterToken = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '';
    },
    getGoogleInfo() {
      var that = this;
      var data = {
        'exchange-token': that.isregisterToken
      };
      post('api/user/toopen_google_authenticator', JSON.stringify(data)).then(function (res) {
        console.log(res);
        if (res.success) {
          that.googleKey = res.data.data.googleKey;
          that.googleImg = res.data.data.googleImg;
        } else {

        }
      });
    },
    setGoogleInfo(){
      var that = this;
      var data;
      if(that.bindGooglePassword === ''){
        that.bindGooglePasswordErrorText = that.error.null
      }else if(that.bindGoogleCode === ''){
        that.bindGoogleCodeErrorText = that.error.null
      }else{
        if(!that.modal_loading){
          that.modal_loading = true;
          data = {
            'googleKey': that.googleKey,
            'googleCode': that.bindGoogleCode,
            'loginPwd': that.bindGooglePassword,
          };
          post('api/user/google_verify', JSON.stringify(data)).then(function (res) {
            if (res.success) {
              that.asyncCancel()
            } else {

            }
            that.modal_loading = false;
          });
        }
      }
    },
    asyncCancel() {
      this.$parent.$emit('isregisterGoogle', false);
      this.modal_loading = false;
    },
    ok() {
      this.$Message.info('Clicked ok');
    },
  }
  ,
  watch: {
    registerCookie: function (a, b) {
      this.isregisterToken = a;
      this.getGoogleInfo();
    },
  },
  mounted(){
    if(sessionStorage.getItem('token')){
      this.getToken();
      this.getGoogleInfo()
    }
  }
};

// header

var o_header = {
  template: `
    <div id="header" class="om-header">
      <Row class="om-header-row">
        <i-col class="logo-wrapper" span="3">
          <a href="otc_adverts.html">
            <img src="../images/Header-Logo-en.png" width="138px" height="21px" alt="">
          </a>
        </i-col>
        <i-col span="12" class="om-market">
          <ul>
            <li>
              <a href="otc_adverts.html">{{ $t('homepage') }}</a>
            </li>
          </ul>
        </i-col>
        <i-col span="9" class="management">
          <ul class="text-right">
            <li class="items my-orders" v-if="logined">
              <Badge :count="orders.length">
                <a href="otc_my_order.html" class="demo-badge" @click="isMyordersShow=!isMyordersShow">{{ $t('allOrder') }}</a>
              </Badge>
              <div class="order-card" style="display:none;">
                <div class="arrow"></div>
                <div class="card-header">
                  <span class="float-left">{{ $t('ongoingOrders') }}</span>
                  <a href="otc_my_order.html">{{ $t('allOrder') }} > </a>
                </div>
                <ul>
                  <li v-for="item in orders" :key="item.sequence">
                    <Row>
                      <i-col span="2" class="text-left">
                        <div class="buyType" v-if="item.buyer.id==userInfo.id">{{ $t('buy') }}</div>
                        <div class="sellType" v-else>{{ $t('sell') }}</div>
                      </i-col>
                      <i-col span="18" class="text-left" style="padding-left:6px;">
                        <div v-if="item.buyer.id==userInfo.id" class="tip">
                          {{ item.status == 1 ? $t('waitForBuyerPay') : '' }}
                          {{ item.status == 2 ? $t('paidToSeller') : '' }}
                          {{item.totalPrice}}SAR
                        </div>
                        <div v-else class="tip">
                          {{ item.status == 1 ? $t('waitForBuyerPay') : '' }}
                          {{ item.status == 2 ? $t('waitForSellConfirm') : '' }}
                          {{item.totalPrice}}SAR
                        </div>
                        <span v-if="item.buyer.id==userInfo.id">{{ $t('payInTime') }} {{item.ctime | date }}</span>
                        <span v-else>{{ $t('waitForTime') }} {{item.ctime | date }}</span>
                      </i-col>
                      <i-col span="4" class="text-right">
                        <a v-if="item.buyer.id==userInfo.id" class="view" :href="'otc_pay.html?sequence='+item.sequence">{{ $t('viewOrder') }}</a>
                        <a v-else class="view" :href="'otc_wait_pay.html?sequence='+item.sequence">{{ $t('viewOrder') }}</a>
                      </i-col>
                    </Row>
                  </li>
                </ul>
                <div class="card-footer">
                  <a href="otc_my_order.html">{{ $t('seeAllOrder') }}</a>
                </div>
              </div>
            </li>
            <li class="items" v-if="logined">
              <a href="otc_my_advert.html">{{ $t('pendingOrder') }}</a>
            </li>
            <li class="items" v-if="logined">
              <a type="primary" @click="loginOut">{{ $t('loginout') }}</a>
            </li>
            <li class="items" v-if="!logined">
              <a type="primary" @click="showLogin()">{{ $t('login') }}</a>
            </li>
            <li class="items" v-if="!logined">
              <a type="primary" @click="showRegister()">{{ $t('register') }}</a>
            </li>
            <li class="items">
              <Dropdown @on-click="toggleLanguage">
                <a href="javascript:void(0)">
                  Language
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem name="zh">ZH</DropdownItem>
                  <DropdownItem name="en">EN</DropdownItem>
                  <DropdownItem name="sa">SA</DropdownItem>
                </DropdownMenu>
              </Dropdown>
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
      <myregister :register="isregister"></myregister>
      <myregistergoogle :register-google="isRegisterGoogleShow" :register-cookie="isregisterCookie"></myregistergoogle>
    </div>
  `,
  i18n: i18nComponents,
  data() {
    return {
      orders: [],
      ws: null,
      userInfo: {},
      logined: false,
      isLoginShow: false,
      isregister: false,
      isLoginNextShow: false,
      isRegisterGoogleShow: false,
      isregisterCookie: '',
      isLoginNextType: '',
      isLoginNextCookie: '',
      isLoginNextPhone: '',
      isLoginNextEmail: '',
    };
  },
  computed: {
    uid: function () {
      return localStorage.getItem('uid');
    },
  },
  methods: {
    //login
    showLogin() {
      this.isLoginShow = true;
    },
    showRegister() {
      this.isregister = true;
    },
    toggleLanguage(name) {
      this.$i18n.locale = name;
      document.body.dir = name === 'zh' ? 'ltr' : 'rtl';
      localStorage.setItem('locale', name);
      this.$parent.$emit('locale', name);
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
    loginOut() {
      var that = this;
      post('api/user/login_out').then(function (res) {
        if (res.success) {
          localStorage.clear();
          that.logined = false;
          if (location.pathname !== '/views/otc_adverts.html') {
            location.href = 'otc_adverts.html';
          }
        }
      });
    },
  },
  components: {
    mylogin: o_my_login,
    myloginnext: o_my_loginNext,
    myregister: o_my_register,
    myregistergoogle: o_my_registerGoogle,
  },
  mounted() {
    // if (utils.getParam('auth') == 1) {
    //   this.isLoginShow = true;
    //   return;
    // }
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    var locale = localStorage.getItem('locale');
    if (locale) {
      document.body.dir = locale === 'zh' ? 'ltr' : 'rtl';
      this.$i18n.locale = locale;
    }

    if (sessionStorage.getItem('token')) {
      var that = this;
      get('api/personOrders/processing').then(function (result) {
        if (result.success && result.data.data.rsts) {
          if (result.data.data.rsts.length > 5) {
            that.orders = result.data.data.rsts.slice(0, 5);
            return;
          }
          that.orders = result.data.data.rsts;
        }
      });
    }
    this.$on('logined', function (i) {
      this.logined = i;
    });
    this.logined = localStorage.getItem('user') !== null;
    this.$on('islogin', function (i) {
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
    this.$on("isregister", function (i) {
      this.isregister = i;
    });
    this.$on("isregisterCookie", function (i) {
      this.isregisterCookie = i;
    });
  },
};
