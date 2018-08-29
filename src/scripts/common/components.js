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
    var duration = options.duration || 1500;
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
      var that = this;
      var timer = setTimeout(function () {
        that.hide();
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

Vue.filter('date', function (utc) {
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
    ar: 'تسجيل الدخول',
  },
  loginout: {
    zh: '退出',
    en: 'Log Out',
    ar: 'تسجيل خروج',
  },
  register: {
    zh: '注册',
    en: 'Register',
    ar: 'تسجيل حساب',
  },
  homepage: {
    zh: '首页',
    en: 'Home',
    ar: 'الرئيسية',
  },
  platIntro: {
    zh: '平台介绍',
    en: 'Platform introduction',
    ar: 'مقدمة عن المنصة'
  },
  language: {
    zh: '语言',
    en: 'Language',
    ar: 'لغة',
  },
  arba: {
    zh: '阿拉伯语',
    en: 'Arabic',
    ar: 'العربية',
  },
  english: {
    zh: '英语',
    en: 'English',
    ar: 'الإنجليزية',
  },
  chinese: {
    zh: '简体中文',
    en: 'Chinese',
    ar: 'الصينية',
  },
  pendingOrder: {
    zh: '我的挂单',
    en: 'pending orders',
    ar: 'طلبات معلقة',
  },
  allOrder: {
    zh: '我的订单',
    en: 'my orders',
    ar: 'طلباتي',
  },
  myAccount: {
    zh: '个人中心',
    en: 'Personal center',
    ar: 'المركز الشخصي',
  },
  myAssets: {
    zh: '个人资产',
    en: 'Personal assets',
    ar: 'الأصول الشخصية',
  },
  buy: {
    zh: '买入',
    en: 'Buy',
    ar: 'شراء',
  },
  sell: {
    zh: '卖出',
    en: 'Sell',
    ar: 'بيع',
  },
  expired: {
    zh: '过期',
    en: 'Expired',
    ar: 'انتهت'
  },
  orderExpired: {
    zh: '订单过期',
    en: 'Order Expired',
    ar: 'انتهت صلاحية الطلب',
  },
  seekForCustomService: {
    zh: '客服介入，协助双方交易',
    en: 'Customer service has been involved to assist both parties in trading',
    ar: 'وقد شاركت خدمة العملاء لمساعدة الطرفين في التداول',
  },
  seeAllOrder: {
    zh: '查看所有订单',
    en: 'View all orders',
    ar: 'عرض كل الطلبات',
  },
  ongoingOrders: {
    zh: '进行中的订单',
    en: 'Ongoing orders',
    ar: 'طلبات في قيد التنفيذ',
  },
  noOrderForNow: {
    zh: '暂无进行中的订单',
    en: 'No orders in progress for now',
    ar: 'لا أوامر في التقدم في الوقت الحالي',
  },
  viewOrder: {
    zh: '查看',
    en: 'view',
    ar: 'عرض',
  },
  waitForSellerReceive: {
    zh: '等待卖家确认收款',
    en: 'Waiting for the seller to confirm the receipt',
    ar: 'في انتظار البائع لتأكيد الاستلام',
  },
  waitForBuyerPay: {
    zh: '等待买家支付',
    en: 'waiting for buyer payment',
    ar: 'في انتظار دفع المشتري',
  },
  buyerHasPaid: {
    zh: '买家已支付',
    en: 'buyer has paid',
    ar: 'تم دفع المشتري',
  },
  payInTime: {
    zh: '支付截止时间',
    en: 'Payment deadline',
    ar: 'الموعد النهائي للدفع',
  },
  waitForTime: {
    zh: '交易截止时间',
    en: 'Transaction deadline',
    ar: 'الموعد النهائي للصفقة',
  },
  cancel: {
    zh: '取消',
    en: 'cancel',
    ar: 'إلغاء',
  },
  confirm: {
    zh: '确定',
    en: 'Confirm',
    ar: 'تأكيد',
  },
  changeWhatsApp: {
    zh: '修改WhatsApp',
    en: 'Modify WhatsApp',
    ar: 'WhatsApp تعديل',
  },
  whatsAppHolder: {
    zh: '请输入WhatsApp号码',
    en: 'Please enter the WhatsApp number',
    ar: 'يرجى إدخال رقم WhatsApp',
  },
  numericOrLetter: {
    zh: '请输入数字或字母',
    en: 'Please enter numbers or letters',
    ar: 'يرجى إدخال أرقام أو حروف',
  },
  submit: {
    zh: '提交',
    en: 'submit',
    ar: 'تقديم',
  },
  account: {
    zh: '账号',
    en: 'account number',
    ar: 'رقم الحساب',
  },
  choseCard: {
    zh: '选择交易银行卡',
    en: 'Select transaction bank card',
    ar: 'اختر بطاقة بنكية للصفقات',
  },
  addCard: {
    zh: '添加银行卡',
    en: 'Add bank card',
    ar: 'أضف بطاقة بنكية',
  },
  openingBank: {
    zh: '开户行',
    en: 'Bank name',
    ar: 'إسم البنك',
  },
  accountName: {
    zh: '账户名',
    en: 'account name',
    ar: 'اسم الحساب',
  },
  bankNumber: {
    zh: '银行卡号',
    en: 'Bank card number',
    ar: 'رقم بطاقة البنك',
  },
  number: {
    zh: '账号',
    en: 'account number',
    ar: 'رقم الحساب',
  },
  backEdit: {
    zh: '返回修改',
    en: 'back to edit',
    ar: 'العودة إلى تعديل',
  },
  bind: {
    zh: '绑定',
    en: 'bind',
    ar: 'ربط',
  },
  canNotBeEmpty: {
    zh: '此处不能为空',
    en: 'This place can not be empty ',
    ar: 'هذا المكان لا يمكن أن يكون فارغاً',
  },
  received: {
    zh: '已到账',
    en: 'has been received',
    ar: 'تم الوصول إلى الحساب',
  },
  viewAccount: {
    zh: '查看账户',
    en: 'view Account',
    ar: 'عرض الحساب',
  },
  continueTrade: {
    zh: '继续交易',
    en: 'Continue the transaction',
    ar: 'مواصلة الصفقة',
  },
  copySuccess: {
    zh: '复制成功',
    en: 'Copied',
    ar: 'تم النسخ',
  },
  errorPhoneNum: {
    zh: '请输入有效的电话号码',
    en: 'Please enter the correct phone number',
    ar: 'يرجى إدخال رقم الهاتف الصحيح',
  },
  errorEmailNum: {
    zh: '请输入有效的邮件地址',
    en: 'Please enter the correct email address',
    ar: 'يرجى إدخال عنوان البريد الإلكتروني الصحيح',
  },
  errorNoSamePwd: {
    zh: '密码不一致',
    en: 'password does not match',
    ar: 'كلمة السر غير مطابقة',
  },
  errorPwdNum: {
    zh: '以字母开头，长度在8-64之间，只能包含字符、数字',
    en: 'password length is between 8 and 64, starts with a letter and contains only letters and numbers.',
    ar: ' طول كلمة السر ما بين 8 الى 64 ، تبدا بحرف و تحتوي  على حروف وأرقام فقط',
  },
  findPassword: {
    zh: '找回密码',
    en: 'Find my password',
    ar: 'استرجاع كلمة السر'
  },
  emailHolder: {
    zh: '输入邮箱地址',
    en: 'Enter email address',
    ar: 'أدخل عنوان البريد الالكتروني'
  },
  emailErrorEmpty: {
    zh: '邮箱地址不能为空',
    en: 'Email address can not be empty',
    ar: 'لا يمكن أن يكون عنوان البريد الإلكتروني فارغاً'
  },
  emailErrorFormat: {
    zh: '邮箱地址格式错误',
    en: 'Email address format error',
    ar: 'خطأ في تنسيق عنوان البريد الإلكتروني'
  },
  phoneHolder: {
    zh: '输入手机号码',
    en: 'Enter phone number ',
    ar: 'أدخل رقم الهاتف'
  },
  phoneErrorEmpty: {
    zh: '手机号码不能为空',
    en: 'Phone number can not be empty',
    ar: 'لا يمكن أن يكون رقم الهاتف فارغاً'
  },
  phoneErrorFormat: {
    zh: '手机号码格式错误',
    en: 'Phone number format error',
    ar: 'خطأ في تنسيق رقم الهاتف '
  },
  nextStep: {
    zh: '下一步',
    en: 'Next step',
    ar: 'الخطوة التالية'
  },
  newPassword: {
    zh: '新密码',
    en: 'New password',
    ar: 'كلمة السر الجديدة'
  },
  newPasswordHolder: {
    zh: '输入新密码',
    en: 'Enter the new password here',
    ar: 'أدخل كلمة السر الجديدة'
  },
  passwordErrorEmpty: {
    zh: '密码不能为空',
    en: 'Password can not be empty',
    ar: 'لا يمكن أن تكون كلمة السر فارغة'
  },
  passwordErrorFormat: {
    zh: '密码为6-64位字符',
    en: 'The password is from 6 to 64 characters',
    ar: 'كلمة السر هي من 6-64 حرفاً'
  },
  repeatPassword: {
    zh: '确认密码',
    en: 'confirm password',
    ar: 'تأكيد كلمة السر'
  },
  repeatPasswordHolder: {
    zh: '请再次输入密码',
    en: 'Please enter the password again',
    ar: 'يرجى إدخال كلمة السر مرة أخرى'
  },
  repeatPasswordError: {
    zh: '两次输入密码不一致',
    en: 'two passwords are not match',
    ar: 'كلمتا السر غير متطابقتين'
  },
  emailVerification: {
    zh: '邮箱验证',
    en: 'Email verification',
    ar: 'التحقق من البريد الالكتروني'
  },
  emailVerificationHolder: {
    zh: '输入验证码',
    en: 'Enter the verification code',
    ar: 'أدخل رمز التحقق'
  },
  phoneVerification: {
    zh: '短信验证',
    en: 'SMS verification',
    ar: 'التحقق من الرسالة'
  },
  phoneVerificationHolder: {
    zh: '输入验证码',
    en: 'Enter the verification code',
    ar: 'أدخل رمز التحقق'
  },
  googleVerification: {
    zh: '谷歌验证',
    en: 'Google verification',
    ar: 'التحقق من الجوجل'
  },
  googleVerificationHolder: {
    zh: '输入验证码',
    en: 'Enter the verification code',
    ar: 'أدخل رمز التحقق'
  },
  sendVerification: {
    zh: '发送验证码',
    en: 'Send verification code',
    ar: 'إرسال رمز التحقق'
  },
  sendVerificationAgain: {
    zh: '重新发送',
    en: 'Resend',
    ar: 'إعادة إرسال'
  },
  numericRequired: {
    zh: '必须输入数字',
    en: 'Must enter numbers',
    ar: 'يجب إدخال أرقام'
  },
};

var i18nLoginRegisterMsg = {
  loginTitle: {
    zh: '欢迎登录',
    en: 'Welcome to login',
    ar: 'مرحبا في تسجيل الدخول'
  },
  registerTitle: {
    zh: '欢迎注册',
    en: 'Welcome to register ',
    ar: 'مرحبا في تسجيل حساب'
  },
  email: {
    zh: '邮箱',
    en: 'E-mail',
    ar: 'البريد الالكتروني'
  },
  emailValidate: {
    zh:'邮箱验证码',
    en:'E-mail verification code',
    ar: 'رمز التحقق من البريد الإلكتروني'
  },
  phoneValidate: {
    zh:'手机验证码',
    en:'phone verification code',
    ar: 'رمز التحقق من الهاتف'
  },
  googleValidate: {
    zh: '谷歌验证码',
    en: 'google verification code',
    ar: 'رمز التحقق من جوجل'
  },
  getValidateCode: {
    zh:'获取验证码',
    en:'Get verification code',
    ar: 'الحصول على رمز التحقق'
  },
  phone: {
    zh: '手机',
    en: 'Phone',
    ar: 'الهاتف'
  },
  login: {
    zh: '登录',
    en: 'Log In',
    ar: 'تسجيل الدخول'
  },
  register: {
    zh: '注册',
    en: 'Register',
    ar: 'تسجيل حساب'
  },
  enterEmail: {
    zh: '请输入邮箱',
    en: 'Please enter email',
    ar: 'يرجى إدخال البريد الإلكتروني'
  },
  enterPhone: {
    zh: '请输入手机号',
    en: 'Please enter phone number',
    ar: 'يرجى إدخال رقم الهاتف'
  },
  enterPwd: {
    zh: '请输入密码',
    en: 'please enter password',
    ar: 'يرجى إدخال كلمة السر'
  },
  surePwd:{
    zh:'确认密码',
    en:'confirm password',
    ar: 'تأكيد كلمة السر'
  },
  forgetPwd: {
    zh: '忘记密码?',
    en: 'forgot password?',
    ar: 'نسيت كلمة السر؟'
  },
  noAccount: {
    zh: '没有账户',
    en: 'Do not have an account',
    ar: 'لا تملك حساب'
  },
  registerAccount: {
    zh: '注册',
    en: 'Register an account',
    ar: 'تسجيل حساب'
  },
  haveAccount: {
    zh: '我已经有账户了',
    en: 'I have an account',
    ar: 'لدي حساب'
  },
  enterGoogleRecieve: {
    zh: '请输入谷歌验证码',
    en: 'please enter Google verification code',
    ar: 'يرجى إدخال رمز تحقق الجوجل'
  },
  enterSMSRecieve: {
    zh: '请输入收到的短信验证码',
    en: 'Please enter the received SMS verification code ',
    ar: 'يرجى إدخال رمز تحقق الرسالة'
  },
  enterEmailRecieve: {
    zh: '请输入收到的邮箱验证码',
    en: 'Please enter the received email verification code',
    ar: 'يرجى إدخال رمز تحقق البريد الإلكتروني '
  },
  onlyNum: {
    zh: '验证码只包含数字',
    en: 'Verification code only contains numbers',
    ar: 'رمز التحقق فقط يحتوي على أرقام'
  },
  Reacquire: {
    zh: '再次获取',
    en: 'Reacquire',
    ar: 'أعد الطلب '
  },
  //校验
  sixInform: {
    zh: '验证码为6位数字',
    en: 'The verification code should be 6 digits',
    ar: 'رمز التحقق يكون من 6 ارقام '
  },
  errorPhoneNum: {
    zh: '请输入合法的电话号码',
    en: 'Please enter the correct phone number',
    ar: 'يرجى إدخال رقم الهاتف الصحيح'
  },
  errorEmailNum: {
    zh: '请输入合法的邮件地址',
    en: 'Please enter the correct email address',
    ar: 'يرجى إدخال عنوان البريد الإلكتروني الصحيح'
  },
  errorNoSamePwd: {
    zh: '密码不一致',
    en: 'password does not match',
    ar: 'كلمة السر غير مطابقة'
  },
  errorPwdNum: {
    zh: '长度在8-64之间，只能包含字符、数字',
    en: 'password length is between 8 to 64, and can only contains characters and numbers',
    ar: 'طول كلمة السر ما بين 8 الى 64 ، و تحتوي فقط على أحرف وأرقام'
  },
  canNotBeEmpty: {
    zh: '此处不能为空',
    en: 'This place can not be empty ',
    ar: 'هذا المكان لا يمكن أن يكون فارغاً',
  },
  submit: {
    zh: '提交',
    en: 'submit',
    ar: 'تقديم',
  },
};

var i18nGoogleAuthMsg = {
  bindGoogleAuthMsg: {
    zh: '为了您的账户安全，我们强烈推荐您进行谷歌验证',
    en: 'For your account security, we strongly recommend recommend you to verify Google',
    ar: 'من أجل ضمان أمن حسابك ، نوصيك بشدة على التحقق من جوجل',
  },
  googleAuthBtn: {
    zh: '身份验证',
    en: 'Identity verification',
    ar: 'التحقق من الهوية',
  },
  noEmpty: {
    zh: '此处不能为空',
    en: 'This place cannot be empty',
    ar: 'لا يمكن أن يكون هذا المكان فارغًا'
  },
  onlyNum: {
    zh: '验证码只包含数字',
    en: 'Verification code only contains numbers',
    ar: 'رمز التحقق  فقط  يحتوي على أرقام'
  },
  loginVerify: {
    zh: '登陆验证',
    en: 'Login verification',
    ar: 'التحقق من تسجيل الدخول'
  },
  copySuccess: {
    zh: '复制成功',
    en: 'Copied',
    ar: 'تم النسخ'
  },
  StrengthenTitle: {
    zh: '增强你的账户安全性',
    en: 'Strengthen your account security',
    ar: 'تعزيز أمن حسابك'
  },
  bindGoogle: {
    zh: '3步绑定谷歌认证',
    en: 'Step 3 bind google authentication',
    ar: 'الخطوة 3 ربط مصادقة جوجل'
  },
  downloadGoogle: {
    zh: '下载谷歌身份验证器',
    en: 'Download google authenticator',
    ar: 'تحميل مصادقة جوجل'
  },
  scanCode: {
    zh: '使用谷歌认证器扫描条形码',
    en: 'Use google authenticator to scan a barcode:',
    ar: 'استخدم أداة مصادقة جوجل لفحص الباركود'
  },
  enterKey: {
    zh: '输入提供的key',
    en: 'Enter the provided key',
    ar: 'أدخل المفتاح المقدم'
  },
  copy: {
    zh: '复制',
    en: 'copy',
    ar: 'نسخ'
  },
  completeBind: {
    zh: '完成绑定',
    en: 'Complete the binding',
    ar: 'استكمال الربط'
  },
  enterPwd: {
    zh: '请输入登录密码',
    en: 'Please enter the login password',
    ar: 'يرجى إدخال كلمة السر لتسجيل الدخول'
  },
  enterGoogleRecieved: {
    zh: '请输入谷歌验证码',
    en: 'please enter Google verification code',
    ar: 'يرجى إدخال رمز تحقق الجوجل'
  },
  sixInform: {
    zh: '验证码为6位数字',
    en: 'The verification code should be 6 digits',
    ar: 'رمز التحقق يكون من 6 ارقام '
  },
  or: {
    zh: '或者',
    en: 'or',
    ar: ' أو '
  },
  cancel: {
    zh: '取消',
    en: 'cancel',
    ar: 'إلغاء',
  },
  secureTitle:{
    zh: '安全提醒',
    en: 'Security reminder',
    ar: 'تذكير الأمان'
  },
  secureSure:{
    zh: '立即绑定',
    en: 'Bind now',
    ar: 'اربط الآن'
  }
};

var i18nComponentsMessagesTransformed = utils.transform(i18nComponentsMessages);
var i18nLoginRegisterMsgTransformed = utils.transform(i18nLoginRegisterMsg);
var i18nGoogleAuthMsgTransformed = utils.transform(i18nGoogleAuthMsg);
var i18nComponentsZh = Object.assign(i18nComponentsMessagesTransformed.zh, i18nLoginRegisterMsgTransformed.zh, i18nGoogleAuthMsgTransformed.zh);
var i18nComponentsEn = Object.assign(i18nComponentsMessagesTransformed.en, i18nLoginRegisterMsgTransformed.en, i18nGoogleAuthMsgTransformed.en);
var i18nComponentsAr = Object.assign(i18nComponentsMessagesTransformed.ar, i18nLoginRegisterMsgTransformed.ar, i18nGoogleAuthMsgTransformed.ar);
var i18nComponentsMessagesAll = {
  zh: Object.assign(i18nComponentsZh, iview.langs['zh']),
  en: Object.assign(i18nComponentsEn, iview.langs['en']),
  ar: Object.assign(i18nComponentsAr, iview.langs['ar']),
}
Vue.locale = () => {};
var i18nComponents = new VueI18n({
  locale: 'ar', // set locale
  fallbackLocale: 'ar',
  messages: i18nComponentsMessagesAll,
});
iview.i18n((key, value) => i18nComponents.t(key, value));


var o_my_login = {
  template: `
    <Modal
      v-model="login1"
      :mask-closable="false"
      :title="$t('loginTitle')"
      @on-cancel="asyncCancel"
      class="my-login"
      class-name="vertical-center-modal"
      width="500"
    >
      <vue-recaptcha
        ref="invisibleRecaptchaLogin"
        size="invisible"
        @expired="onExpired"
        @verify="onVerify"
        sitekey="6LeA22cUAAAAAAaJhwcX8hLgff2pa4vVERYPjwyi"
      >
      </vue-recaptcha>
      <Tabs v-model="loginWrap" @on-click="loginEmailChange" v-if="login1">
        <TabPane :label="this.$t('email')" name="loginEmail">
          <Input
            :class="loginEmailError?'is-red':'is-gray'"
            v-model="loginEmailVal"
            :placeholder="$t('enterEmail')"
            class="iview-input"
            @on-focus="loginEmailFocus"
            @on-enter="mySubmit"
          ></Input>
          <p class="my-login-error">{{loginEmailErrorText}}</p>
          <Input
            :class="loginEmailPasswordError?'is-red':'is-gray'"
            v-model="loginEmailPassword"
            type="password"
            :placeholder="$t('enterPwd')"
            class="iview-input"
            @on-enter="mySubmit"
            @on-focus="loginEmailPasswordFocus"
          >
            <span slot="append" class="my-slot-append" :class="highLightForget ? 'text-blue' : '' " @click="runForgetPassword">{{ $t('forgetPwd') }}</span>
          </Input>
          <p class="my-login-error">{{loginEmailPasswordErrorText}}</p>
        </TabPane>
        <TabPane :label="this.$t('phone')" name="loginPhone">
          <Input
            :class="loginPhoneError?'is-red':'is-gray'"
            v-model="loginPhoneVal"
            :placeholder="$t('enterPhone')"
            class="iview-input iview-input-countryPhone"
            @on-focus="loginPhoneFocus"
            @on-enter="mySubmit"
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
            :placeholder="$t('enterPwd')"
            class="iview-input"
            @on-focus="loginPhonePasswordFocus"
            @on-enter="mySubmit"
          >
            <span slot="append" class="my-slot-append" :class="highLightForget ? 'text-blue' : '' " @click="runForgetPassword">{{ $t('forgetPwd') }}</span>
          </Input>
            <p class="my-login-error">{{loginPhonePasswordErrorText}}</p>
        </TabPane>
      </Tabs>
      <div slot="footer">
        <Button type="primary" long :loading="modal_loading" @click="mySubmit">{{ $t('login') }}</Button>
        <div class="login-footer-wrap">
          <span class="black">{{ $t('noAccount') }}</span>
          <span class="blue" @click="runRegister">{{ $t('registerAccount') }}</span>
        </div>
      </div>
    </Modal>
  `,
  i18n: i18nComponents,
  data() {
    return {
      locale: 'zh',
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
      // countryArr: [],
      selectCountry: '+966',
      highLightForget: false,
      //password
      loginPhonePassword: '',
      loginPhonePasswordError: false,
      loginPhonePasswordErrorText: '',

      modal_loading: false,
      loading: true,
      login1: this.login,
      login: false,
      loginWrap: 'loginEmail',
      error: {
        phoneNum: '输入合法的电话号码',
        emailNum: '输入合法的邮箱地址',
      },
      countryArr: [],
    };
  },
  components: {VueRecaptcha},
  props: ['login','langStatus'],
  methods: {
    onExpired() {
      this.$refs.invisibleRecaptchaLogin.reset()
    },
    onVerify(res) {
      var that = this;
      var dataCaptcha = {
        'captcha': res
      };
      post('api/common/googleValidCode', JSON.stringify(dataCaptcha), false).then(function (res) {
        if (res) {
          var data;
          if (that.loginWrap === 'loginPhone') {
            data = {
              countryCode: that.selectCountry.slice(1),
              mobileNumber: that.loginPhoneVal,
              loginPword: that.loginPhonePassword,
            };
          } else {
            data = {
              mobileNumber: that.loginEmailVal,
              loginPword: that.loginEmailPassword,
            };
          }
          post('api/user/login_in', JSON.stringify(data), false).then(function (res) {
            if (res) {
              if(res.mobileAuthenticatorStatus === 1){
                that.$parent.$emit(
                  'isLoginNextPhone',
                  that.selectCountry + ' ' + that.loginPhoneVal
                );
              }
              if(res.emailAuthenticatorStatus === 1){
                  that.$parent.$emit(
                    'isLoginNextEmail',
                    that.loginPhoneVal
                  );
              }
              that.$parent.$emit('isLoginNextStatus',{
                mobileStatus: res.mobileAuthenticatorStatus,
                emailStatus: res.emailAuthenticatorStatus,
                googleStatus: res.googleAuthenticatorStatus
              });
              that.$parent.$emit('isLoginNext', true);
              that.$parent.$emit('isLoginNextCookie', res.token);
              that.$parent.$emit('islogin', false);
              that.clear()
            } else {
              that.$refs.invisibleRecaptchaLogin.reset()
              that.modal_loading = false;
            }
          });

        } else {
          that.$refs.invisibleRecaptchaLogin.reset()
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
    loginPasswordFocus() {
      this.loginPasswordError = false;
    },
    clear() {
      this.loginEmailVal = '';
      this.loginEmailError = false;
      this.loginEmailErrorText = '';
      this.loginEmailPassword = '';
      this.loginEmailPasswordError = false;
      this.loginEmailPasswordErrorText = '';
      this.loginPhoneVal = '';
      this.loginPhoneError = false;
      this.loginPhoneErrorText = '';
      this.loginPhonePassword = '';
      this.loginPhonePasswordError = false;
      this.loginPhonePasswordErrorText = '';
    },
    asyncCancel() {
      this.clear();
      this.$parent.$emit('islogin', false);
      this.modal_loading = false;
    },
    runForgetPassword() {
      this.asyncCancel();
      this.$parent.$emit('isretrievePwdShow', true);
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
            that.loginPhoneErrorText = this.$t('canNotBeEmpty');
          } else if (!that.phoneReg(that.loginPhoneVal)) {
            that.modal_loading = false;
            that.loginPhoneError = true;
            that.loginPhoneErrorText = this.$t('errorPhoneNum');
          } else if (that.loginPhonePassword === '') {
            that.modal_loading = false;
            that.loginPhonePasswordError = true;
            that.loginPhonePasswordErrorText = this.$t('canNotBeEmpty');
          } else {
            this.$refs.invisibleRecaptchaLogin.execute();
          }
        } else {
          //email
          if (that.loginEmailVal === '') {
            that.modal_loading = false;
            that.loginEmailError = true;
            that.loginEmailErrorText = this.$t('canNotBeEmpty');
          } else if (!that.emailReg(that.loginEmailVal)) {
            that.modal_loading = false;
            that.loginEmailError = true;
            that.loginEmailErrorText = this.$t('errorEmailNum');
          } else if (that.loginEmailPassword === '') {
            that.modal_loading = false;
            that.loginEmailPasswordError = true;
            that.loginEmailPasswordErrorText = this.$t('canNotBeEmpty');
          } else {
            this.$refs.invisibleRecaptchaLogin.execute();

          }
        }
      }
      //login
    },
    loginEmailChange(name) {
      this.loginWrap = name;
    },
  },
  mounted(){
    let locale = localStorage.getItem('locale');
    if (locale) {
      this.$i18n.locale = locale;
      this.selectCountry = locale === 'ar' ? '+966' : locale === 'en' ? '+1' : '+86'
    }
  },
  watch: {
    login: function (a, b) {
      this.login1 = a;
      if (a) {
        this.countryArr = JSON.parse(localStorage.getItem('country'));
      }
    },
    langStatus: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$i18n.locale = newVal;
        this.selectCountry = newVal === 'ar' ? '+966' : newVal === 'en' ? '+1' : '+86'
      }
    }
  },
};
var o_my_loginNext = {
  template: `
    <Modal
      v-model="loginNext"
      @on-ok="ok"
      :mask-closable="false"
      :title="$t('loginVerify')"
      class-name="vertical-center-modal"
      @on-cancel="asyncCancel" class="my-login my-loginNext"
    >
     <Tabs @on-click="nextTabChange" v-model="nextTabName">
        <TabPane label="Google" v-if="showGoogleTab" name="nextGoogle">     
         <div v-if="showGoogleTab">
          <Input
            v-model="loginNextGoogleCode"
            type="text"
            :maxlength="6"
            @on-change="checkNum"
            :placeholder="$t('phoneVerificationHolder')"
            @on-enter="loginNextSubmit"
            class="loginNext-input"  @on-focus="loginNextFocus" :class="loginNextGoogleErrorText?'loginNext-input-red':''">
          </Input>
           <p class="my-loginNext-error">{{loginNextGoogleErrorText}}</p>
          </div>
        </TabPane>
        <TabPane :label="$t('email')" v-if="showEmailTab" name="nextEmail">
          <div v-if="showEmailTab">        
           <Input
              v-model="loginNextEmailCode"
              type="text"
              @on-change="checkNum"
              :maxlength="6"
              :placeholder="$t('phoneVerificationHolder')"
              @on-enter="loginNextSubmit"
              class="loginNext-input loginNext-sms-input" @on-focus="loginNextFocus" :class="loginNextEmailErrorText?'loginNext-input-red':' '">
              <span slot="append"
                class="my-slot-append"
                @click="runSendSms('email')"
                :class="timers['email']?'my-slot-append-gary':'my-slot-append'"
              >
                {{sendSms['email']}}
              </span>
            </Input>
            <p class="my-loginNext-error">{{loginNextEmailErrorText}}</p>
          </div>
        </TabPane>
        <TabPane :label="$t('phone')" v-if="showMobileTab" name="nextPhone">
           <div v-if="showMobileTab">     
            <Input
              v-model="loginNextPhoneCode"
              type="text"
              @on-change="checkNum"
              :maxlength="6"
              :placeholder="$t('phoneVerificationHolder')"
              @on-enter="loginNextSubmit"
              class="loginNext-input loginNext-sms-input" @on-focus="loginNextFocus" :class="loginNextPhoneErrorText?'loginNext-input-red':' '">
              <span slot="append"
                class="my-slot-append"
                @click="runSendSms('phone')"
                :class="timers['phone']?'my-slot-append-gary':'my-slot-append'"
              >
                {{sendSms['phone']}}
              </span>
            </Input>
            <p class="my-loginNext-error">{{loginNextPhoneErrorText}}</p>
          </div>
        </TabPane>
     
      </Tabs>
      <div slot="footer">
        <Button
          type="primary"
          long
          :loading="modal_loading"
          @click="loginNextSubmit"
        >{{ $t('submit') }}</Button>
      </div>
    </Modal>
  `,
  i18n: i18nComponents,
  props: ['loginNext', 'isLoginNextCookie', 'isLoginNextPhone', 'isLoginNextEmail','langStatus','isLoginNextStatus'],
  data() {
    return {
      nextTabName: '',
      loginNextGoogleErrorText: '',
      loginNextEmailErrorText: '',
      loginNextPhoneErrorText: '',
      sendSms: {
        phone: this.$t('getValidateCode'),
        email: this.$t('getValidateCode')
      },
      loginNextGoogleCode: '',
      loginNextEmailCode: '',
      loginNextPhoneCode: '',
      modal_loading: false,
      isLoginNextCookieNum: '',
      isLoginNextPhoneNum: '',
      isLoginNextEmailNum: '',
      show: true,
      count: '',
      timers: {},
      isLogined: false,
      showGoogleTab: false,
      showEmailTab: false,
      showMobileTab: false,

    };
  },
  methods: {
    nextTabChange(name) {
      this.nextTabName = name;
    },
    loginNextFocus() {

    },
    checkNum() {
      switch (this.nextTabName){
        case 'nextGoogle':
          if(isNaN(this.loginNextGoogleCode)){
            this.loginNextGoogleErrorText = this.$t('onlyNum');
          }else{
            this.loginNextGoogleErrorText = '';
            if(this.loginNextGoogleCode.length === 6){
              this.loginNextSubmit();
            }
          }
          break;
        case 'nextEmail':
          if(isNaN(this.loginNextEmailCode)){
            this.loginNextEmailErrorText = this.$t('onlyNum');
          }else{
            this.loginNextEmailErrorText = '';
            if(this.loginNextEmailCode.length === 6){
              this.loginNextSubmit();
            }
          }
          break;
        case 'nextPhone':
          if(isNaN(this.loginNextPhoneCode)){
            this.loginNextPhoneErrorText = this.$t('onlyNum');
          }else{
            this.loginNextPhoneErrorText = '';
            if(this.loginNextPhoneCode.length === 6){
              this.loginNextSubmit();
            }
          }
          break;
      }
    },
    loginNextSubmit() {
      const data = {
        token: this.isLoginNextCookieNum,
      };
      switch (this.nextTabName){
        case 'nextGoogle':
          if(isNaN(this.loginNextGoogleCode) || this.loginNextGoogleCode.length !== 6){
            this.loginNextGoogleErrorText = this.$t('sixInform');
            return;
          }
          data.authCode = this.loginNextGoogleCode;
          data.checkType = "1";
          break;
        case 'nextEmail':
          if(isNaN(this.loginNextEmailCode) || this.loginNextEmailCode.length !== 6){
            this.loginNextEmailErrorText = this.$t('sixInform');
            return;
          }
          data.authCode = this.loginNextEmailCode;
          data.checkType = "3";
          break;
        case 'nextPhone':
          if(isNaN(this.loginNextPhoneCode) || this.loginNextPhoneCode.length !== 6){
            this.loginNextPhoneErrorText = this.$t('sixInform');
            return;
          }
          data.checkType = "2";
          data.authCode = this.loginNextPhoneCode;
          break;
      }
      var that = this;
      if (!this.modal_loading) {
        that.modal_loading = true;
        post('api/user/confirm_login', JSON.stringify(data)).then(function (res) {
          if (res) {
            that.modal_loading = false;
            that.$parent.$emit('isLoginNext', false);
            localStorage.setItem('token', that.isLoginNextCookieNum);
            post('api/common/user_info', '', false).then(function (res) {
              if (res) {
                that.isLogined = true;
                that.$parent.$emit('logined', that.isLogined);
                localStorage.setItem('user', JSON.stringify(res));
                location.reload();
              }
            });
          } else {
            that.modal_loading = false;
          }
        });
      }
    },
    runSendSms(type) {
      const TIME_COUNT = 90;
      if (!this.timers[type]) {
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
            if (res) {
              console.log(res);
            } else {
            }
          });
        } else if (type === 'email') {
          data = {
            // email: this.isLoginNextEmailNum,
            operationType: '23',
            token: this.isLoginNextCookieNum,
          };
          post('api/common/emailValidCode', JSON.stringify(data)).then(function (res) {
            if (res) {

            } else {

            }
          });
        }
        this.count = TIME_COUNT;
        this.sendSms[type] = this.count + 's';
        this.show = false;
        this.timers[type] = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
            this.sendSms[type] = this.count + ' s';
          } else {
            this.sendSms[type] = this.$t('Reacquire');
            clearInterval(this.timers[type]);
            this.timers[type] = null;
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
  mounted(){
    let locale = localStorage.getItem('locale');
    if (locale) {
      this.$i18n.locale = locale;
    }
  },
  watch: {
    langStatus: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$i18n.locale = newVal;
        this.sendSms = {
          phone: this.$t('getValidateCode'),
          email: this.$t('getValidateCode')
        }
      }
    },
    isLoginNextStatus: function (a) {
      this.showGoogleTab = a.googleStatus ? a.googleStatus === 1 :false;
      this.showEmailTab = a.emailStatus ? a.emailStatus === 1 : false;
      this.showMobileTab = a.mobileStatus ? a.mobileStatus === 1 : false;
      this.nextTabName = this.showGoogleTab ? 'nextGoogle' : this.showEmailTab ? 'nextEmail' : 'nextPhone';
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
      :mask-closable="false"
      class-name="vertical-center-modal"
      @on-cancel="asyncCancel" class="my-login my-register"
      width="500"
      :title="$t('registerTitle')"
      >
        <vue-recaptcha
          ref="invisibleRecaptchaRegister"
          size="invisible"
          @expired="onExpired"
          @verify="onVerify"
          sitekey="6LeA22cUAAAAAAaJhwcX8hLgff2pa4vVERYPjwyi">
        </vue-recaptcha>
      <Tabs v-model="registerWrap" @on-click="tabChange" v-if="register">
        <TabPane :label="$t('email')" name="tabEmail">
          <Input
            :class="emailValError?'is-red':'is-gray'"
            v-model="emailVal"
            :placeholder="$t('enterEmail')"
            class="iview-input"
            @on-focus="emailValFocus"
          ></Input>
          <p class="my-login-error">{{emailValErrorText}}</p>
          <Input
          v-model="emailSmsCode"
          type="text"
          maxlength="6"
          @on-change="checkNum"
          :placeholder="$t('emailValidate')"
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
            :placeholder="$t('enterPwd')"
            class="iview-input"
            @on-focus="emailPasswordFocus">
          </Input>
          <p class="my-login-error">{{emailPasswordErrorText}}</p>
           <Input
            :class="emailPasswordAgainError?'is-red':'is-gray'"
            v-model="emailPasswordAgain"
            type="password"
            :placeholder="$t('surePwd')"
            class="iview-input"
            @on-enter="mySubmit"
            @on-focus="emailPasswordAgainFocus">
          </Input>
          <p class="my-login-error">{{emailPasswordAgainErrorText}}</p>
        </TabPane>
        <TabPane :label="$t('phone')" name="registerPhone">
          <Input
            :class="phoneValError?'is-red':'is-gray'"
            v-model="phoneVal"
            :placeholder="$t('enterPhone')"
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
             <p class="my-login-error">{{phoneValErrorText}}</p>

          <Input
          v-model="phoneSmsCode"
          type="text"
          maxlength="6"
          @on-change="checkNum"
          :placeholder="$t('phoneValidate')"
          class="loginNext-input loginNext-sms-input" @on-focus="phoneSmsCodeFocus" :class="phoneSmsCodeError?'loginNext-input-red':' '">

          <span slot="append"
            class="my-slot-append"
            @click="runSendSms('phone')"
            :class="timerPhone?'my-slot-append-gary':'my-slot-append'"
          >
            {{sendSmsPhone}}
          </span>
        </Input>
        <p class="my-login-error">{{phoneSmsCodeErrorText}}</p>
          <Input
            :class="phonePasswordError?'is-red':'is-gray'"
            v-model="phonePassword"
            type="password"
            :placeholder="$t('enterPwd')"
            class="iview-input"
            @on-focus="phonePasswordFocus">
          </Input>
          <p class="my-login-error">{{phonePasswordErrorText}}</p>
           <Input
            :class="phonePasswordAgainError?'is-red':'is-gray'"
            v-model="phonePasswordAgain"
            type="password"
            :placeholder="$t('surePwd')"
            class="iview-input"
            @on-enter="mySubmit"
            @on-focus="phonePasswordAgainFocus">
          </Input>
          <p class="my-login-error">{{phonePasswordAgainErrorText}}</p>
        </TabPane>
      </Tabs>
      <div slot="footer">
        <Button type="primary" long :loading="modal_loading" @click="mySubmit" >{{ $t('register') }}</Button>
        <div class="login-footer-wrap">
          <span class="black">{{ $t('haveAccount') }}</span>
          <span class="blue" @click="runLogin">{{ $t('login') }}</span>
        </div>
      </div>
      </Modal>
    `,
  i18n: i18nComponents,
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
      selectCountry: '+966',
      // countryArr: [],
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
      sendSmsEmail: this.$t('getValidateCode'),
      sendSmsPhone: this.$t('getValidateCode'),
      showEmail: true,
      showPhone: true,
      countEmail: '',
      countPhone: '',
      timerEmail: null,
      timerPhone: null,
      isLogined: false
    };
  },
  computed: {
    countryArr: function () {
      return JSON.parse(localStorage.getItem('country'));
    },
  },
  mounted(){
    let locale = localStorage.getItem('locale');
    if (locale) {
      this.$i18n.locale = locale;
      this.selectCountry = locale === 'ar' ? '+966' : locale === 'en' ? '+1' : '+86'
    }
  },
  components: {VueRecaptcha},
  props: ['register', 'langStatus'],
  methods: {
    checkNum() {
      switch (this.registerWrap){
        case 'tabEmail':
          if(isNaN(this.emailSmsCode)){
            this.emailSmsCodeError = true;
            this.emailSmsCodeErrorText = this.$t('onlyNum');
          }else{
            this.emailSmsCodeError = false;
            this.emailSmsCodeErrorText = '';
          }
          break;
        case 'registerPhone':
          if(isNaN(this.phoneSmsCode)){
            this.phoneSmsCodeError = true;
            this.phoneSmsCodeErrorText = this.$t('onlyNum');
          }else{
            this.phoneSmsCodeError = false;
            this.phoneSmsCodeErrorText = '';
          }
          break;
      }
    },
    onExpired() {
      this.$refs.invisibleRecaptchaRegister.reset()
    },
    onVerify(res) {
      var that = this;
      var data;
      var dataCaptcha = {
        'captcha': res
      };
      post('api/common/googleValidCode', JSON.stringify(dataCaptcha), false).then(function (res) {
        if (res) {
          if (that.registerWrap === 'registerPhone') {
            const isLoginNextPhoneNumCountry = that.selectCountry.substring(1);
            data = {
              "smsAuthCode": that.phoneSmsCode,
              "countryCode": isLoginNextPhoneNumCountry,
              "mobileNumber": that.phoneVal,
              "loginPword": that.phonePasswordAgain,
            };
            post('api/user/reg_mobile', JSON.stringify(data), false).then(function (res) {
              that.modal_loading = false;
              if (res) {
                localStorage.setItem('token', res);
                that.$parent.$emit('isregisterCookie', res);
                that.$parent.$emit('isregister', false);
                that.$parent.$emit('isregisterGoogle', true);
                post('api/common/user_info', '', false).then(function (res) {
                  if (res) {
                    that.isLogined = true;
                    that.$parent.$emit('logined', that.isLogined);
                    localStorage.setItem('user', JSON.stringify(res));
                  }
                });
              } else {
                that.$refs.invisibleRecaptchaRegister.reset()
              }
            });

          } else if (that.registerWrap === 'tabEmail') {
            data = {
              "email": that.emailVal,
              "loginPword": that.emailPasswordAgain,
              "emailAuthCode": that.emailSmsCode
            };
            post('api/user/reg_email', JSON.stringify(data), false).then(function (res) {
              that.modal_loading = false;
              if (res) {
                localStorage.setItem('token', res);
                that.$parent.$emit('isregisterCookie', res);
                that.$parent.$emit('isregister', false);
                that.$parent.$emit('isregisterGoogle', true);
                post('api/common/user_info', '', false).then(function (res) {
                  if (res) {
                    that.isLogined = true;
                    that.$parent.$emit('logined', that.isLogined);
                    localStorage.setItem('user', JSON.stringify(res));
                  }
                });
              } else {
                that.$refs.invisibleRecaptchaRegister.reset()
              }
            });
          }
        } else {
          that.$refs.invisibleRecaptchaRegister.reset();
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
    //发送验证码
    runSendSms(type) {
      const TIME_COUNT = 90;
      var that = this;
      var data;
      if (type === 'phone') {
        if (!that.timerPhone) {
          if (that.phoneVal === '' || that.selectCountry === '') {
            that.modal_loading = false;
            that.phoneValError = true;
            that.phoneValErrorText = this.$t('canNotBeEmpty');
          } else if (!that.phoneReg(that.phoneVal)) {
            that.modal_loading = false;
            that.phoneValError = true;
            that.phoneValErrorText = this.$t('errorPhoneNum');
          } else {
            const isLoginNextPhoneNumCountry = that.selectCountry.substring(1);
            const isLoginNextPhoneNumPhone = that.phoneVal;
            data = {
              countryCode: isLoginNextPhoneNumCountry,
              mobile: isLoginNextPhoneNumPhone,
              operationType: '1',
            };
            that.countPhone = TIME_COUNT;
            that.sendSmsPhone = that.countPhone + 's';
            that.showPhone = false;
            that.timerPhone = setInterval(() => {
              if (that.countPhone > 0 && that.countPhone <= TIME_COUNT) {
                that.countPhone--;
                that.sendSmsPhone = that.countPhone + ' s';
              } else {
                that.sendSmsPhone = this.$t('Reacquire');
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
        }
      } else if (type === 'email') {
        if (!that.timerEmail) {
          if (that.emailVal === '') {
            that.modal_loading = false;
            that.emailValError = true;
            that.emailValErrorText = this.$t('canNotBeEmpty');
          } else if (!that.emailReg(that.emailVal)) {
            that.modal_loading = false;
            that.emailValError = true;
            that.emailValErrorText = this.$t('errorEmailNum');
          } else {
            data = {
              email: that.emailVal,
              operationType: '1',
            };
            that.countEmail = TIME_COUNT;
            that.sendSmsEmail = that.countEmail + 's';
            that.showEmail = false;
            that.timerEmail = setInterval(() => {
              if (that.countEmail > 0 && that.countEmail <= TIME_COUNT) {
                that.countEmail--;
                that.sendSmsEmail = that.countEmail + ' s';
              } else {
                that.sendSmsEmail = this.$t('Reacquire');
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
      }

    },
    tabChange(name) {
      this.registerWrap = name;
    },
    //密码正则
    passwordReg(passwordVal) {
      var pwdRegx = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,64}$/;
      return pwdRegx.test(passwordVal);
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
            that.phoneValErrorText = this.$t('canNotBeEmpty');
          } else if (!that.phoneReg(that.phoneVal)) {
            that.modal_loading = false;
            that.phoneValError = true;
            that.phoneValErrorText = this.$t('errorPhoneNum');
          } else if (that.phoneSmsCode.length !== 6 || isNaN(that.phoneSmsCode)) {
            that.modal_loading = false;
            that.phoneSmsCodeError = true;
            that.phoneSmsCodeErrorText = this.$t('sixInform');
          } else if (that.phonePassword === '') {
            that.modal_loading = false;
            that.phonePasswordError = true;
            that.phonePasswordErrorText = this.$t('canNotBeEmpty');
          } else if (!that.passwordReg(that.phonePassword)) {
            that.modal_loading = false;
            that.phonePasswordError = true;
            that.phonePasswordErrorText = this.$t('errorPwdNum');
          } else if (that.phonePasswordAgain === '') {
            that.modal_loading = false;
            that.phonePasswordAgainError = true;
            that.phonePasswordAgainErrorText = this.$t('canNotBeEmpty');
          } else if (that.phonePassword !== that.phonePasswordAgain) {
            that.modal_loading = false;
            that.phonePasswordAgainError = true;
            that.phonePasswordAgainErrorText = this.$t('errorNoSamePwd');
          } else {
            this.$refs.invisibleRecaptchaRegister.execute();
          }
        } else if (that.registerWrap === 'tabEmail') {
          if (that.emailVal === '') {
            that.modal_loading = false;
            that.emailValError = true;
            that.emailValErrorText = this.$t('canNotBeEmpty');
          } else if (!that.emailReg(that.emailVal)) {
            that.modal_loading = false;
            that.emailValError = true;
            that.emailValErrorText = this.$t('errorEmailNum');
          } else if (that.emailSmsCode.length !== 6 || isNaN(that.emailSmsCode)) {
            that.modal_loading = false;
            that.emailSmsCodeError = true;
            that.emailSmsCodeErrorText = this.$t('sixInform');
          } else if (that.emailPassword === '') {
            that.modal_loading = false;
            that.emailPasswordError = true;
            that.emailPasswordErrorText = this.$t('canNotBeEmpty');
          } else if (!that.passwordReg(that.emailPassword)) {
            that.modal_loading = false;
            that.emailPasswordError = true;
            that.emailPasswordErrorText = this.$t('errorPwdNum');
          } else if (that.emailPasswordAgain === '') {
            that.modal_loading = false;
            that.emailPasswordAgainError = true;
            that.emailPasswordAgainErrorText = this.$t('canNotBeEmpty');
          } else if (that.emailPassword !== that.emailPasswordAgain) {
            that.modal_loading = false;
            that.emailPasswordAgainError = true;
            that.emailPasswordAgainErrorText = this.$t('errorNoSamePwd');
          } else {
            this.$refs.invisibleRecaptchaRegister.execute();
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
  watch: {
    langStatus: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.sendSmsEmail = this.$t('getValidateCode');
        this.sendSmsPhone = this.$t('getValidateCode');
        this.$i18n.locale = newVal;
        this.selectCountry = newVal === 'ar' ? '+966' : newVal === 'en' ? '+1' : '+86'
      }
    }
  }
};

var o_my_registerGoogle = {
  template: `
    <Modal
      v-model="registerGoogle"
      class-name="vertical-center-modal"
      :mask-closable="false"
      @on-cancel="asyncCancel"
      class="my-login my-loginGoogle"
      width="672"
    >
      <div class="loginGoogle-title">
        <i class="loginGoogle-title-icon"></i>
        <div class="loginGoogle-title-right-wrap">
            <h1>{{ $t('StrengthenTitle') }}</h1>
            <h2>{{ $t('bindGoogle') }}</h2>
        </div>
      </div>
      <ul class="loginGoogle-ul">
        <li class="clear">
          <div class="li-title">
            <span class="list-num">1</span>
            <p>{{ $t('downloadGoogle') }}</p>
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
            <p style="width:158px">{{ $t('scanCode') }}:</p>
            <h6 style="color:#999;margin:26px 0 20px 50px">{{ $t('or') }}</h6>
            <p style="margin-left: 50px;">{{ $t('enterKey') }}:</p>
            <h6 style="color:#999;margin: 5px 0 0 50px">
             {{googleKey}}
              <span
                style="color:#3461A7;cursor:pointer;margin-left:10px;text-decoration: underline;" @click="doCopy">
                {{ $t('copy') }}
              </span>
            </h6>
          </div>
        </li>
        <li class="clear" style="margin-bottom: 0">
          <div class="li-title">
            <span class="list-num">3</span>
            <div class="tip-img tip-img2"></div>
            <p>{{ $t('completeBind') }}</p>
            <div class="input-wrap">
              <Input
                v-model="bindGooglePassword"
                type="password"
                :placeholder="$t('enterPwd')"
                class="bindGoogle-input"               
                :class="bindGooglePasswordErrorText !== ''?'is-red':'is-gray'"
                @on-focus="bindGooglePasswordFocus"
              >
              </Input>
              <div class="my-login-error" style="margin-left: 50px;">{{bindGooglePasswordErrorText}}</div>
              <Input
                v-model="bindGoogleCode"
                type="text"
                :placeholder="$t('enterGoogleRecieved')"
                class="bindGoogle-input" style="margin-top: 0"
                :maxlength="6"
                @on-change="checkNum"
                @on-enter="setGoogleInfo"
                :class="bindGoogleCodeErrorText !== ''?'is-red':'is-gray'"
                @on-focus="bindGoogleCodeFocus"
              >
              </Input>
              <div class="my-login-error" style="margin-left: 50px;">{{bindGoogleCodeErrorText}}</div>
            </div>
          </div>
        </li>
      </ul>
      <div slot="footer">
        <Button type="primary" size="large" long :loading="modal_loading" @click="setGoogleInfo">{{ $t('completeBind') }}</Button>
      </div>
    </Modal>
  `,
  data() {
    return {
      isregisterToken: '',
      bindGooglePassword: '',
      bindGoogleCode: '',
      modal_loading: false,
      googleKey: '',
      googleImg: '',
      bindGooglePasswordErrorText: '',
      bindGoogleCodeErrorText: '',
    };
  },
  i18n: i18nComponents,
  props: ['registerGoogle', 'registerCookie','langStatus'],
  methods: {
    doCopy: function () {
      var that = this;
      this.$copyText(this.googleKey).then(function (e) {
        Toast.show(that.$t('copySuccess'), { icon: 'ok' });
      });
    },
    checkNum(type) {
      if(isNaN(this.bindGoogleCode)){
        this.bindGoogleCodeErrorText = this.$t('onlyNum');
      }else{
        this.bindGoogleCodeErrorText = '';
      }
    },
    getToken() {
      this.isregisterToken = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    },
    getGoogleInfo() {
      var that = this;
      var data = {
        'exchange-token': that.isregisterToken
      };
      post('api/user/toopen_google_authenticator', JSON.stringify(data), false).then(function (res) {
        if (res) {
          that.googleKey = res.googleKey;
          that.googleImg = res.googleImg;
        }
      });
    },
    bindGooglePasswordFocus() {
      this.bindGooglePasswordErrorText = '';
    },
    bindGoogleCodeFocus() {
      this.bindGoogleCodeErrorText = '';
    },
    setGoogleInfo() {
      if (this.bindGooglePassword === '') {
        this.bindGooglePasswordErrorText = this.$t('canNotBeEmpty');
        return;
      }
      if(isNaN(this.bindGoogleCode) || this.bindGoogleCode.length !== 6){
        this.bindGoogleCodeErrorText = this.$t('sixInform');
        return;
      }
      var that = this;
      var data;
      if (!that.modal_loading) {
        that.modal_loading = true;
        data = {
          'googleKey': that.googleKey,
          'googleCode': that.bindGoogleCode,
          'loginPwd': that.bindGooglePassword,
        };
        post('api/user/google_verify', JSON.stringify(data)).then(function (res) {
          if (res) {
            that.asyncCancel();
            that.$parent.$emit('googleBound', true);
            post('api/common/user_info', '', false).then((result) => {
              localStorage.setItem('user', JSON.stringify(result));
            });
          }
          that.modal_loading = false;
        });
      }
    },
    asyncCancel() {
      this.$parent.$emit('isregisterGoogle', false);
      this.modal_loading = false;
    },
  },
  mounted(){
    let locale = localStorage.getItem('locale');
    if (locale) {
      this.$i18n.locale = locale;
    }
  },
  watch: {
    langStatus: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$i18n.locale = newVal;
      }
    },
    registerGoogle: function(newVal) {
      if (newVal) {
        this.getToken();
        this.getGoogleInfo()
      }
    },
    // registerCookie: function (a, b) {
    //   this.isregisterToken = a;
    //   this.getGoogleInfo();
    // },
  },
};
var o_my_googleAuth = {
  template: `<Modal class="googleAuth-modal" width="440" v-model="googleAuthShow" @on-cancel="cancelModal" footer-hide>
     <div class="content">
        <div class="content-wrapper">
          <div class="pay-modal-title">
            <h3>{{ $t('secureTitle') }}</h3>
            <p>{{ $t('bindGoogleAuthMsg') }}</p>
          </div>
          <Row class="pay-modal-content">
           
            <Button @click="toGoogleAuth" class="paid">
              {{ $t('secureSure') }}
            </Button>  
            <button class="cancel-btn" @click="cancelModal">{{ $t('cancel') }}</button>
          </Row>
        </div>
      </div>
    </Modal>`,
  i18n: i18nComponents,
  props: {
    googleAuthShow:{
      type: Boolean,
      default: false
    }
  },
  methods: {
    toGoogleAuth() {
      this.$parent.$emit('toGoogleAuth',true);
    },
    cancelModal() {
      this.$parent.$emit('cancelGoogleModal',false);
    }
  }
};

var o_find_password = {
  i18n: i18nComponents,
  template: `
    <Modal :title="$t('findPassword')" v-model="show" width="500" footer-hide>
      <div class="authority">
        <Form ref="formFind" :model="formFind" :rules="ruleFind" v-show="current === 0">
          <Tabs v-model="findType" :class="spread ? 'spreaded' : ''">
            <TabPane label="E-mail" name="email">
              <FormItem prop="email">
                <Input
                  type="text"
                  size="large"
                  :maxlength="30"
                  v-model="formFind.email"
                  :placeholder="$t('emailHolder')"
                >
                </Input>
              </FormItem>
            </TabPane>
            <TabPane label="Phone" name="phone">
              <FormItem prop="phone">
                <Input
                  type="text"
                  size="large"
                  number
                  :maxlength="16"
                  v-model="formFind.phone"
                  :placeholder="$t('phoneHolder')"
                >
                  <Select
                    slot="prepend"
                    class="country-select"
                    v-model="countryPrefix"
                    filterable
                    @on-open-change="changeSelect"
                  >
                    <Option
                      v-for="(item, index) in country"
                      :value="item.dialingCode"
                      :label="item.dialingCode"
                      :key="index"
                    >
                      <Row>
                        <Col span="12" class="text-left">{{item.dialingCode}}</Col>
                        <Col span="12" class="text-right">{{item.enName}}</Col>
                      </Row>
                    </Option>
                  </Select>
                </Input>
              </FormItem>
              </FormItem>
            </TabPane>
          </Tabs>
          <Button type="primary" size="large" long @click="handleSubmit('formFind')">{{ $t('nextStep') }}</Button>
        </Form>
        <Form ref="formReset" :model="formReset" :rules="ruleReset" v-show="current === 1">
          <FormItem :label="$t('newPassword')" prop="password">
            <Input
              type="password"
              size="large"
              v-model="formReset.password"
              :placeholder="$t('newPasswordHolder')"
            >
            </Input>
          </FormItem>
          <FormItem :label="$t('repeatPassword')" prop="passwordAgain">
            <Input
              type="password"
              size="large"
              v-model="formReset.passwordAgain"
              :placeholder="$t('repeatPasswordHolder')"
            >
            </Input>
          </FormItem>
          <FormItem :label="$t('emailVerification')" prop="verifyEmail" v-if="findType === 'email'">
            <Input
              type="text"
              size="large"
              number
              :maxlength="6"
              v-model="formReset.verifyEmail"
              :placeholder="$t('emailVerificationHolder')"
            >
              <Button slot="append" :disabled="sendDisabledEmail" @click="sendMessageSecurity('Email', 24)">
                {{ sendPlaceholderEmail }}
              </Button>
            </Input>
          </FormItem>
          <FormItem :label="$t('phoneVerification')" prop="verifyPhone" v-if="findType === 'phone'">
            <Input
              type="text"
              size="large"
              number
              :maxlength="6"
              v-model="formReset.verifyPhone"
              :placeholder="$t('phoneVerificationHolder')"
            >
              <Button slot="append" :disabled="sendDisabledPhone" @click="sendMessageSecurity('Phone', 24)">
                {{ sendPlaceholderPhone }}
              </Button>
            </Input>
          </FormItem>
          <FormItem :label="$t('googleVerification')" prop="verifyGoogle" v-if="googleAuthored">
            <Input
              type="text"
              size="large"
              number
              :maxlength="6"
              v-model="formReset.verifyGoogle"
              :placeholder="$t('googleVerificationHolder')"
            >
            </Input>
          </FormItem>
          <Button type="primary" size="large" long @click="handleSubmit('formReset')">{{ $t('submit') }}</Button>
        </Form>
      </div>
    </Modal>
  `,
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    locale: {
      type: String,
      default: 'ar',
    },
  },
  data() {
    const validateEmail = (rule, value, callback) => {
      // eslint-disable-next-line
      const reg = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
      if (this.formFind.phone === '') {
        if (value === '') {
          callback(new Error(this.$t('emailErrorEmpty')));
        } else if (!reg.test(value)) {
          callback(new Error(this.$t('emailErrorFormat')));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const validatePhone = (rule, value, callback) => {
      if (this.formFind.email === '') {
        if (value === '') {
          callback(new Error(this.$t('phoneErrorEmpty')));
        } else if (!/\d+$/g.test(value)) {
          callback(new Error(this.$t('phoneErrorFormat')));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('passwordErrorEmpty')));
      } else if (value.length > 18 || value.length < 6) {
        callback(new Error(this.$t('passwordErrorFormat')));
      } else {
        if (this.formReset.password !== '') {
          // 对第二个密码框单独验证
          this.$refs.formReset.validateField('passwordAgain');
        }
        callback();
      }
    };
    const validatePasswordAgain = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('repeatPasswordHolder')));
      } else if (value !== this.formReset.password) {
        callback(new Error(this.$t('repeatPasswordError')));
      } else {
        callback();
      }
    };
    const validateVerifyEmail = (rule, value, callback) => {
      if (this.findType === 'email' && value === '') {
        callback(new Error(this.$t('emailVerificationHolder')));
      } else {
        callback();
      }
    };
    const validateVerifyPhone = (rule, value, callback) => {
      if (this.findType === 'phone' && value === '') {
        callback(new Error(this.$t('phoneVerificationHolder')));
      } else {
        callback();
      }
    };
    const validateVerifyGoogle = (rule, value, callback) => {
      if (this.googleAuthored && value === '') {
        callback(new Error(this.$t('googleVerificationHolder')));
      } else {
        callback();
      }
    };
    return {
      current: 0,
      findType: 'email',
      countryPrefix: '+86',
      spread: false,
      googleAuthored: false,
      token: '',
      formFind: {
        email: '',
        phone: '',
      },
      ruleFind: {
        email: [{ validator: validateEmail, trigger: 'change' }],
        phone: [{ validator: validatePhone, trigger: 'change' }],
      },
      sendPlaceholderEmail: this.$t('sendVerification'),
      sendDisabledEmail: false,
      sendPlaceholderPhone: this.$t('sendVerification'),
      sendDisabledPhone: false,
      formReset: {
        password: '',
        passwordAgain: '',
        verifyEmail: '',
        verifyPhone: '',
        verifyGoogle: '',
      },
      ruleReset: {
        password: [{ validator: validatePassword, trigger: 'change' }],
        passwordAgain: [{ validator: validatePasswordAgain, trigger: 'change' }],
        verifyEmail: [
          { validator: validateVerifyEmail, trigger: 'change' },
          { type: 'number', message: this.$t('numericRequired'), trigger: 'change' },
        ],
        verifyPhone: [
          { validator: validateVerifyPhone, trigger: 'change' },
          { type: 'number', message: this.$t('numericRequired'), trigger: 'change' },
        ],
        verifyGoogle: [
          { validator: validateVerifyGoogle, trigger: 'change' },
          { type: 'number', message: this.$t('numericRequired'), trigger: 'change' },
        ],
      },
    };
  },
  computed: {
    country() {
      return JSON.parse(localStorage.getItem('country'));
    },
  },
  methods: {
    changeSelect(value) {
      this.spread = value;
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (name === 'formFind') {
            post('api/user/reset_password_step_one', {
              countryCode: this.countryPrefix,
              mobileNumber: this.formFind.phone || '',
              email: this.formFind.email || '',
            }, false).then(res => {
              if (res) {
                this.googleAuthored = res.isGoogleAuth == 1;
                this.token = res.token;
                this.current += 1;
              }
            });
          }
          if (name === 'formReset') {
            post('api/user/reset_password_step_two', {
              token: this.token,
              certificateNumber: '',
              googleCode: this.formReset.verifyGoogle || '',
              smsCode: this.formReset.verifyPhone || '',
              emailCode: this.formReset.verifyEmail || '',
            }, false).then(res => {
              if (res) {
                post('api/user/reset_password_step_three', {
                  token: this.token,
                  loginPword: this.formReset.password,
                }).then(data => {
                  if (data) {
                    this.$parent.$emit('isretrievePwdShow', false);
                    this.$parent.$emit('islogin', true);
                  }
                });
              }
            });
          }
        }
      });
    },
    sendMessageSecurity: function(name, type) {
      if (name === 'Email' && !this.formFind.email) return;
      if (name === 'Phone' && !this.formFind.phone) return;
      var that = this;
      that['sendDisabled' + name] = true;
      that['sendDisabledBind' + name] = true;
      var api = {
        Email: 'api/common/emailValidCode',
        Phone: 'api/common/smsValidCode',
      };
      post(
        api[name],
        {
          email: that.formFind.email || '',
          countryCode: that.countryPrefix || '',
          mobile: '',
          operationType: type,
          token: that.token,
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
      that['sendPlaceholderBind' + name] = counter + 's';
      var timer = setInterval(function() {
        counter -= 1;
        that['sendPlaceholder' + name] = counter + 's';
        that['sendPlaceholderBind' + name] = counter + 's';
        if (counter == 0) {
          that['sendDisabled' + name] = false;
          that['sendDisabledBind' + name] = false;
          that['sendPlaceholder' + name] = that.$t('sendVerificationAgain');
          that['sendPlaceholderBind' + name] = that.$t('sendVerificationAgain');
          clearInterval(timer);
        }
      }, 1000);
    },
  },
  watch: {
    show(newVal) {
      if (!newVal) {
        this.$refs['formFind'].resetFields();
        this.$refs['formReset'].resetFields();
        this.current = 0;
        this.$parent.$emit('isretrievePwdShow', false);
      }
    },
    locale(newVal) {
      this.$i18n.locale = newVal;
    }
  },
};

var pendingOrderItem = {
  template: `
    <Row v-if="data.buyer.id == id">
      <i-col span="3">
        <Avatar style="background:#FF2E2E;">{{ data.status < 7 ? $t('buy') : $t('expired') }}</Avatar>
      </i-col>
      <i-col span="18">
        <template v-if="timeStr != 0">
          <h4>
          {{ data.status == 1 ? $t('waitForBuyerPay') : '' }}
          {{ data.status == 2 ? $t('waitForSellerReceive') : '' }}
          {{data.totalPrice}}SAR
          </h4>
          <p>
            {{ $t('payInTime') }}
            <span class="text-error text-strong">{{ timeStr }}</span>
          </p>
        </template>
        <template v-else>
          <h4 class="text-error">{{ $t('orderExpired') }}</h4>
          <p>{{ $t('seekForCustomService') }}</p>
        </template>
      </i-col>
      <i-col span="3" class="text-right">
        <a class="order-dropdown-view" :href="'otc_pay.html?sequence='+data.sequence">{{ $t('viewOrder') }}</a>
      </i-col>
    </Row>
    <Row v-else>
      <i-col span="3">
        <Avatar style="background:#5C95EA;">{{ data.status < 7 ? $t('sell') : $t('expired') }}</Avatar>
      </i-col>
      <i-col span="18">
        <template v-if="timeStr != 0">
          <h4>
            {{ data.status == 1 ? $t('waitForBuyerPay') : '' }}
            {{ data.status == 2 ? $t('buyerHasPaid') : '' }}
            {{data.totalPrice}}SAR
          </h4>
          <p>
            {{ $t('waitForTime') }}
            <span class="text-primary text-strong">{{ timeStr }}</span>
          </p>
        </template>
        <template v-else>
          <h4 class="text-error">{{ $t('orderExpired') }}</h4>
          <p>{{ $t('seekForCustomService') }}</p>
        </template>
      </i-col>
      <i-col span="3" class="text-right">
        <a class="order-dropdown-view" :href="'otc_wait_pay.html?sequence='+data.sequence">{{ $t('viewOrder') }}</a>
      </i-col>
    </Row>
  `,
  i18n: i18nComponents,
  props: {
    id: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    locale: {
      type: String,
      default: 'ar',
    },
  },
  data: function() {
    return {
      timer: null,
      timeStr: '',
    };
  },
  watch: {
    locale(newVal) {
      this.$i18n.locale = newVal;
    }
  },
  mounted: function() {
    var expiredTime = this.data.status == 1 ? this.data.limitTime : this.data.confirmLimitTime;
    var that = this;
    that.timer = setInterval(function () {
      var now = Date.now();
      if ((expiredTime - now) <= 0) {
        that.timeStr = 0;
        clearInterval(that.timer);
      } else {
        that.timeStr = utils.MillisecondToDate(expiredTime - now);
      }
    }, 1000);
  },
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
            <li>
              <a href="otc_my_introduce.html" target="_blank">{{ $t('platIntro') }}</a>
            </li>
          </ul>
        </i-col>
        <i-col span="9" class="management">
          <ul class="text-right">
            <li class="items" v-if="logined">
              <Dropdown placement="bottom-end" class="order-dropdown">
                <Badge :count="orders.length">
                  <a href="otc_my_order.html">{{ $t('allOrder') }}</a>
                </Badge>
                <DropdownMenu slot="list" class="text-left" style="width:360px;">
                  <DropdownItem name="header">
                    <Row>
                      <i-col span="12">{{ $t('ongoingOrders') }}</i-col>
                      <i-col span="12" class="text-right">
                        <a href="otc_my_order.html">{{ $t('allOrder') }} <Icon type="ios-arrow-right"></Icon></a>
                      </i-col>
                    </Row>
                  </DropdownItem>
                  <DropdownItem class="order-dropdown-empty text-center" v-if="orders.length <= 0">
                    <img src="../images/no-pending-order.png" />
                    <p>{{ $t('noOrderForNow') }}</p>
                  </DropdownItem>
                  <DropdownItem v-for="item in orders" :key="item.sequence">
                    <pending-order-item :id="userInfo.id" :data="item" :locale="locale"></pending-order-item>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>
            <li class="items" v-if="logined">
              <a href="otc_my_advert.html">{{ $t('pendingOrder') }}</a>
            </li>
            <li class="items" v-if="logined">
              <Dropdown class="text-center">
                <a href="javascript:void(0)">
                  <span class="text-dir-ltr">{{ userInfo.nickName }}</span>
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem name="account">
                    <a href="otc_my_account.html">{{ $t('myAccount') }}</a>
                  </DropdownItem>
                  <DropdownItem name="account">
                    <a href="otc_my_assets.html">{{ $t('myAssets') }}</a>
                  </DropdownItem>
                   <DropdownItem name="logout">
                    <a @click="loginOut">{{ $t('loginout') }}</a>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>
            <li class="items" v-if="!logined">
              <a @click="showLogin()">{{ $t('login') }}</a>
            </li>
            <li class="items" v-if="!logined">
              <a @click="showRegister()">{{ $t('register') }}</a>
            </li>
            <li class="items">
              <Dropdown class="text-left" @on-click="toggleLanguage">
                <a href="javascript:void(0)">
                  {{ $t('language') }}
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem name="ar">العربية</DropdownItem>
                  <DropdownItem name="en">English</DropdownItem>
                  <DropdownItem name="zh">简体中文</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>
          </ul>
        </i-col>
      </Row>
      <mylogin :login="isLoginShow" :langStatus="$i18n.locale"></mylogin>
      <myloginnext
        :langStatus="$i18n.locale"
        :login-next="isLoginNextShow"
        :is-login-next-cookie="isLoginNextCookie"
        :is-login-next-phone="isLoginNextPhone"
        :is-login-next-email="isLoginNextEmail"
        :is-login-next-status="isLoginNextStatus"
      ></myloginnext>
      <myregister :register="isregister" :langStatus="$i18n.locale"></myregister>
      <myregistergoogle :register-google="isRegisterGoogleShow" :register-cookie="isregisterCookie" :langStatus="$i18n.locale"></myregistergoogle>
      <my-find-password :show="isretrievePwdShow" :locale="$i18n.locale"></my-find-password>
    </div>
  `,
  i18n: i18nComponents,
  components: {
    mylogin: o_my_login,
    myloginnext: o_my_loginNext,
    myregister: o_my_register,
    myregistergoogle: o_my_registerGoogle,
    myFindPassword: o_find_password,
    pendingOrderItem: pendingOrderItem,
  },
  data() {
    return {
      orders: [],
      locale: '',
      logined: false,
      isLoginShow: false,
      isregister: false,
      isLoginNextShow: false,
      isRegisterGoogleShow: false,
      isretrievePwdShow: false,
      isregisterCookie: '',
      isLoginNextCookie: '',
      isLoginNextPhone: '',
      isLoginNextEmail: '',
      isLoginNextStatus: ''
    };
  },
  computed: {
    userInfo: function() {
      return JSON.parse(localStorage.getItem('user')) || {};
    }
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
      document.documentElement.lang = name;
      document.body.dir = name === 'ar' ? 'rtl' : 'ltr';
      document.body.style.fontSize = name === 'ar' ? '12px' : '14px';
      localStorage.setItem('locale', name);
      this.$parent.$emit('locale', name);
    },
    loginOut() {
      var that = this;
      post('api/user/login_out').then(function (res) {
        if (res) {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          that.logined = false;
          if (location.pathname !== '/views/otc_adverts.html') {
            location.href = 'otc_adverts.html';
          }
        }
      });
    },
    getCountry() {
      get('api/country').then(function (res) {
        if (res) {
          localStorage.setItem('country', JSON.stringify(res));
        }
      });
    },
  },
  mounted() {
    if (!localStorage.getItem('country')) {
      this.getCountry();
    }
    var locale = localStorage.getItem('locale') || 'ar';
    this.locale = locale;
    this.$i18n.locale = locale;
    document.documentElement.lang = locale;
    document.body.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.body.style.fontSize = locale === 'ar' ? '12px' : '14px';
    localStorage.setItem('locale', locale);
    this.$parent.$emit('locale', locale);

    if (localStorage.getItem('token')) {
      this.logined = true;
      var that = this;
      get('api/personOrders/processing').then(function (result) {
        if (result) {
          if (result.rsts.length > 5) {
            that.orders = result.rsts.slice(0, 5);
            return;
          }
          that.orders = result.rsts;
        }
      });
    } else {
      this.logined = false;
    }
    this.logined = localStorage.getItem('user') !== null;
    this.$on('logined', function (i) {
      this.logined = i;
    });
    this.$on('islogin', function (i) {
      this.isLoginShow = i;
    });
    this.$on('googleBound', function(i) {
      if (i) {
        this.$parent.$emit('googleBound', true);
      }
    });
    this.$on("isregisterGoogle", function (i) {
      this.isRegisterGoogleShow = i;
    });
    this.$on("isLoginNext", function (i) {
      this.isLoginNextShow = i;
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
    this.$on("isretrievePwdShow", function (i) {
      this.isretrievePwdShow = i;
    });
    this.$on('isLoginNextStatus',function(i) {
      this.isLoginNextStatus = i;
    })
  },
};

var row_my_assets = {
  template: `
     <div>
        <Row>
            <Col >
                <span class="expand-key">TXid: </span>
                <span class="expand-value">{{ row.txid }}</span>
            </Col>
        </Row>
     </div>
  `,
  props: {
    row: Object
  }
};
var row_my_assets_with = {
  template: `
     <div>
        <Row class="expand-row">
            <Col >
                <span class="expand-key">{{ $t('withdrawAddress') }}: </span>
                <span class="expand-value">{{ row.addressTo }}</span>
            </Col>
        </Row>
         <Row class="expand-row">
            <Col >
                <span class="expand-key">{{ $t('fee') }} : </span>
                <span class="expand-value">{{ row.fee }}</span>
            </Col>
        </Row>
         <Row class="expand-row">
            <Col >
                <span class="expand-key">TXid: </span>
                <span class="expand-value">{{ row.txid }}</span>
            </Col>
        </Row>
     </div>
  `,
  props: {
    row: Object
  }
};
