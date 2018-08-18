var i18n = new VueI18n({
  locale: 'zh', // set locale
  fallbackLocale: 'zh',
  messages: utils.transform(messages),
});

var myOrder = new Vue({
  el: '#app',
  i18n: i18n,
  components: {
    oHeader: o_header,
  },
  data: {
    locale: 'zh',
    pageSize: 10,
    current: 1,
    userInfo: {},
    list: [],
    total: 0,
  },
  methods: {
    getMyOrder: function(page) {
      var that = this;
      var data = {
        pageSize: this.pageSize,
        pageNum: page || 1,
      };
      get('api/personOrders', data).then(function(res) {
        if (res) {
          that.list = res.rsts || [];
          that.current = page;
          that.total = res.count;
        }
      });
    },
    statusSemantics: function(v) {
      // 订单状态 待支付1 已支付2 交易成功3 取消4 申诉5  打币中6  异常订单7
      if (v == '1') {
        return this.$t('toBePaid');
      }
      if (v == '2') {
        return this.$t('alreadyPaid');
      }
      if (v == '3') {
        return this.$t('orderDone');
      }
      if (v == '4') {
        return this.$t('orderCanceled');
      }
      if (v == '5') {
        return this.$t('appeal');
      }
      if (v == '6') {
        return this.$t('transfering');
      }
      if (v == '7') {
        return this.$t('orderExpired');
      }
    },
  },
  mounted() {
    var locale = localStorage.getItem('locale');
    if (locale) {
      this.$i18n.locale = locale;
    }
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    var that = this;
    this.$on('locale', function(i) {
      that.locale = i;
    });
    this.getMyOrder();
  },
  filters: {
    getDateFromMillionSeconds: function(v) {
      var date = new Date(v);
      return date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate();
    },
  },
  watch: {
    locale: function(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$i18n.locale = newVal;
      }
    },
  },
});
