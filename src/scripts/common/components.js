/*******************************/
/**     common component    ****/
/** ************************** */

var Toast = {
  show: function(content, options) {
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
      var timer = setTimeout(function() {
        _this.hide();
        if (typeof callback === 'function') {
          callback();
        }
        clearTimeout(timer);
      }, duration);
    }
  },
  hide: function() {
    var toast = document.getElementById('toast');
    if (toast) {
      document.body.removeChild(toast);
    }
  },
};

//input
var o_input = {
  template: `
    <div>
      <input 
        :class="isError? 'error':'not-error'"
        :type="type"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      />
      <div v-show="isError" class="error" >{{errorMsg}}</div>
    </div>
  `,
  data() {
    return {
      isError: false,
      errorMsg: '',
    };
  },
  props: ['value', 'type', 'length', 'max', 'min'],
  methods: {
    isRealNum(val) {
      if (val === '' || val == null) {
        return false;
      }
      if (!isNaN(val)) {
        return true;
      } else {
        return false;
      }
    },
  },
  destoryed() {},
  watch: {
    value: function(n, o) {
      if (!this.type) {
        return;
      }

      if (this.type == 'number') {
        if (!this.isRealNum(parseInt(n))) {
          this.isError = true;
          this.errorMsg = 'not a number';
          console.log('');
          return;
        }
        if (String(n).length < this.length) {
          this.isError = true;
          this.errorMsg = 'require min' + this.length;
          return;
        }
        if (n > this.max) {
          this.isError = true;
          this.errorMsg = 'bigger than max';
          return;
        }
        if (n < this.min) {
          this.isError = true;
          this.errorMsg = 'little than min';
          return;
        }
        this.isError = false;
      }
      if (this.type == 'email') {
        var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        if (!re.test(n)) {
          this.errorMsg = 'not a mail';
          return;
        }
      }
      // if (this.type == "text" && this.length) {

      // }
    },
  },
  filters: {
    fixed(v, n) {
      return v.toFixed(n);
    },
  },
};

var om_warn = {
  template: `
    <div class="o-modal google-modal" :class="show?'is-show':'is-not-show'">
      <div class="content">
        <div class="content-wrapper" style="padding:0;width:420px;height:343px">
          <div class="g-header">
            <Icon @click="close" type="close" class="close"></Icon>
          </div>
          <div class="g-body">
            this is a test o !
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {};
  },
  props: ['show'],
  methods: {
    close() {
      this.$parent.$emit('isGoogleAuthShow', false);
    },
    toGoogeAuth() {
      var host = utils.getHost();
      window.location.href = host + '/exchange-web/toopen_google_authenticator.html';
    },
  },
};

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
            <h3> {{amount}} USDT has been successfully received</h3>
          </div>
          <div class="foot" style="text-align: center;">
            <a
              class="view"
              @click="view"
              href="#"
              style="font-size: 14px;
              color: rgba(51, 51, 51, 1);
              margin-right: 20px;"
            >View account</a>
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
            >Currency trading</a>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {};
  },
  props: ['amount', 'show'],
  computed: {},
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
};

/** **********************bind card component********************* */
var o_bindcard = {
  template: `
    <div class="o-modal add-bankcard-modal" :class="show ?'is-show':'is-not-show'">
      <div class="content">
        <div class="content-wrapper">
          <div class="o-header">
            <span>Add bank card</span>
            <Icon @click="close" type="close" class="close"></Icon>
          </div>
          <div class="o-content">
            <ul>
              <li><p>Account bank</p><input v-model="cardInfo.bankName" type="text"></li>
              <li><p>Account name</p><input v-model="cardInfo.name" type="text"></li>
              <li><p>Bank card number</p><input v-model="cardInfo.cardNo"  type="text"></li>
              <li><p>Iban Number</p><input v-model="cardInfo.ibanNo"  type="text"></li>
              <li><button @click="binding">Binding</button></li>
            </ul>
            <div class="foot" style="color: #ff3300;" v-show="errorMsg">{{ errorMsg }}</div>
          </div>
        </div>
      </div>
    </div>
  `,
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
  props: ['show'],
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
        this.errorMsg = '不能为空';
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
};

/** **********************confirm bind card component********************* */

var o_confirm = {
  template: `
    <div class="o-modal confirm-bankcard-modal" :class="show?'is-show':'is-not-show'">
      <div class="content">
        <div class="content-wrapper">
          <div class="o-header">
            <span>Add bank card</span>
            <Icon @click="close" type="close" class="close"></Icon>
          </div>
          <div class="o-content">
            <div class="info">
              <ul>
                <li>
                  <Row>
                    <i-col span="10">Accunt bank</i-col>
                    <i-col span="8">{{cardInfo.bankName}}</i-col>
                  </Row>
                </li>
                <li>
                  <Row>
                    <i-col span="10">Accunt Name</i-col>
                    <i-col span="8">{{cardInfo.name}}</i-col>
                  </Row>
                </li>
                <li>
                  <Row>
                    <i-col span="10">Bank card number</i-col>
                    <i-col span="8">{{cardInfo.cardNo}}</i-col>
                  </Row>
                </li>
                <li>
                  <Row>
                    <i-col span="10">Iban Number</i-col>
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
      }).then(function(res) {
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
  props: ['show', 'isWatchupBind'],
  mounted() {
    var that = this;
    // to recieve the trigger of the confirm
    this.$parent.$on('isConfirmShow', function(i) {
      that.show = i;
    });
    //to recieve the car info
    this.$parent.$on('cardInfo', function(i) {
      that.cardInfo = i;
    });
  },
};
//---------------------------------END-----------------------------------------------------

//--------------------------------select card---------------------------------------------
var selectCard = {
  template: `
    <div class="o-modal select-card-modal" :class="show?'is-show':'is-not-show'">
      <div class="content">
        <div class="content-wrapper">
          <div class="s-header">
            Select trade card
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
            <button @click="submit">submit</button>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      selectedCards: [],
      status: [],
    };
  },
  props: ['show', 'cards'],
  methods: {
    getStatus: function() {
      var arr = [];
      this.cards.forEach(function(i) {
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
        callback: function() {
          that.$parent.$emit('isSelectCardShow', false);
          that.selectedCards = [];
        },
      });
    },
  },
  mounted() {
    this.status = this.getStatus();
  },
};
//----------------------------------END-------------------------------------------------

//------------------------add contact----------------------------------------------------
var addContact = {
  template: `
    <div class="o-modal add-contact-modal" :class="show?'is-show':'is-not-show'">
      <div class="content">
        <div class="content-wrapper">
          <div class="o-header">
            Add contact information
            <Icon @click="close" type="close" class="close"></Icon>
          </div>
          <div class="o-content">
            <div class="tp">
              <div><img src="../images/whatup.png" /></div>
              <p>In order to contact you for payment, please leave your contact information.</p>
            </div>
            <ul class="bt">
              <li>
                <p>WhatsApp account</p>
                <i-input v-model="wapp">
                  <i-select slot="prepend" style="width: 80px">
                    <Option value="http">+ 186</Option>
                    <Option value="https">+ 2300</Option>
                  </i-select>
                </i-input>
              </li>
              <li>
                <button @click="bind">submit</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      wapp: '',
    };
  },
  props: ['show'],
  methods: {
    close() {
      this.$parent.$emit('isContactShow', false);
    },
    bind() {
      var that = this;
      post('api/watchapp', this.wapp).then(function(res) {
        if (res.data.message == 'otc.result.success') {
          that.$parent.$emit('isAddContactShow', false);
        }
      });
    },
  },
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
              For your account security, we strongly recommend that you turn <br/>
              on second verification
            </span>
            <a @click="toGoogeAuth"   target="blank" class="key">
              Google Authenticator <img src="../images/gauth.png" />
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {};
  },
  props: ['show'],
  methods: {
    close() {
      this.$parent.$emit('isGoogleAuthShow', false);
    },
    toGoogeAuth() {
      var host = utils.getHost();
      window.location.href = host + '/exchange-web/toopen_google_authenticator.html';
    },
  },
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
      loginGoogle: true,
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
            post('api/user/login_in', JSON.stringify(data)).then(function(res) {
              if (res.success) {
                that.modal_loading = false;
                that.$parent.$emit('islogin', false);
                that.$parent.$emit('isloginGoogle', true);
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
            post('api/user/login_in', JSON.stringify(data)).then(function(res) {
              if (res.success) {
                that.modal_loading = false;
                that.$parent.$emit('islogin', false);
                that.loginGoogle = true;
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
      get('api/country').then(function(res) {
        if (res.success) {
          that.countryArr = res.data.data;
        } else {
        }
      });
    },
    loginEmailChange(name) {
      this.loginWrap = name;
      console.log(this.loginWrap);
    },
  },
  mounted: function() {
    this.getCountry();
  },
  watch: {
    login: function(a, b) {
      this.login1 = a;
    },
  },
};
var o_my_loginGoogle = {
  template: `
    <Modal
        v-model="loginGoogle"
        title="Common Modal dialog box title"
        @on-ok="ok"
        @on-cancel="asyncCancel"
      >
      <p>{{loginGoogle}}</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
    </Modal>
  `,
  data() {
    return {};
  },
  props: ['loginGoogle'],
  methods: {
    asyncCancel() {
      this.$parent.$emit('isloginGoogle', false);
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
              <a href="">{{name}}</a>
            </li>
            <li>
              <a href="otc_adverts.html">场外交易</a>
            </li>
            <li>
              <a href="otc_adverts_trade.html">币币交易</a>
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
              <a href="#">资金管理</a>
            </li>
            <li class="items">
              <!--<a href="otc_my_advert.html">我的挂单</a>-->
              <a type="primary" @click="showLogin()">我的挂单</a>
            </li>
            <li class="items my-orders">
              <Badge count="3">
                <a href="otc_my_order.html" class="demo-badge" @click="isMyordersShow=!isMyordersShow">my order</a>
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
      <mylogingoogle :login-google="isLoginGoogleShow"></mylogingoogle>
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
      isLoginGoogleShow: false,
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
      this.$parent.$emit('locale', this.language === '中文' ? 'zh' : 'en');
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
        setTimeout(function() {
          that.websocketsend(agentData);
        }, 300);
      } else {
        that.initWebSocket();
        setTimeout(function() {
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
    mylogingoogle: o_my_loginGoogle,
  },
  created: function() {
    if (utils.getCookie('token')) {
      var that = this;
      get('api/userInfo').then(function(res) {
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
    this.$on('islogin', function(i) {
      this.isLoginShow = i;
    });
    this.$on('isloginGoogle', function(i) {
      this.isLoginGoogleShow = i;
    });
    if (utils.getCookie('token')) {
      var that = this;
      this.getMyOrder().then(function(res) {
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
    toHours: function(time) {
      return new Date(time).toLocaleTimeString();
    },
  },
};
