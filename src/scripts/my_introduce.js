const messagesTransformed = utils.transform(messages);
const messagesAll = {
  zh: Object.assign(messagesTransformed.zh, iview.langs['zh']),
  en: Object.assign(messagesTransformed.en, iview.langs['en']),
  ar: Object.assign(messagesTransformed.ar, iview.langs['ar']),
};
iview.i18n((key, value) => i18n.t(key, value));

const i18n = new VueI18n({
  locale: 'ar',
  fallbackLocale: 'ar',
  messages: messagesAll
});
const myIntroduce = new Vue({
  el: '#intro',
  i18n: i18n,
  components: {
    oHeader: o_header,
  },
  data(){
    return{
      showDetail: false
    }
  },
  methods: {
    indexJump(){
      window.open('otc_adverts.html');
    },
    safeJump(){
      window.open('https://etherscan.io/address/0x1E11294Fb95a135adC553A0B6f6c421a3C03705e');
    }
  },
  mounted() {
    const locale = localStorage.getItem('locale');
    if (locale) {
      this.locale = locale;
      this.$i18n.locale = locale;
    }
    this.$on('locale', function (i) {
      this.locale = i;
      this.$i18n.locale = i;
    });
  },
  watch: {
    locale: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$i18n.locale = newVal;
      }
    },
  },
});
