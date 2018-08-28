

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

var myOrder = new Vue({
  el: '#app',
  i18n: i18n,
  components: {
    oHeader: o_header,
  },
  data() {
    return {
      locale: 'ar',
      pageSize: 10,
      current: 1,
      userInfo: {},
      orderColumn: [
        {
          key: 'sequence',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('orderNo')),
        },
        {
          key: 'type',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('tradingType')),
          render: (h, params) => h('span', this.userInfo.id === params.row.buyerId ? this.$t('buy') : this.$t('sell')),
        },
        {
          key: 'volume',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('tradingAmount')),
        },
        {
          key: 'price',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('unitPrice')),
        },
        {
          key: 'totalPrice',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('totalPrice')),
        },
        {
          key: 'time',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('time')),
          render: (h, params) => h('span', utils.dateFormat(params.row.ctime)),
        },
        {
          align: 'center',
          renderHeader: (h) => h('span', this.$t('tradingObject')),
          render: (h, params) => h('span', this.userInfo.id == params.row.buyerId ? params.row.seller.showNickName : params.row.buyer.showNickName),
        },
        {
          align: 'center',
          renderHeader: (h) => h('span', this.$t('status')),
          render: (h, params) => h(
            'span',
            {
              'class': params.row.status == 3 ? 'text-primary' : 'text-error',
            },
            this.convertStatus(params.row.status),
          ),
        },
        {
          align: 'center',
          renderHeader: (h) => h('span', ''),
          render: (h, params) => h(
            'a',
            {
              attrs: {
                href: this.userInfo.id == params.row.buyerId ? 'otc_pay.html?sequence=' + params.row.sequence : 'otc_wait_pay.html?sequence=' + params.row.sequence,
              },
              'class': 'view',
            },
            this.$t('view'),
          ),
        },
      ],
      orderData: [],
      orderDataLoading: false,
      total: 0,
    }
  },
  methods: {
    getMyOrder: function(page) {
      var that = this;
      var data = {
        pageSize: this.pageSize,
        pageNum: page || 1,
      };
      that.orderDataLoading = true;
      get('api/personOrders', data).then(function(res) {
        that.orderDataLoading = false;
        if (res) {
          that.orderData = res.rsts || [];
          that.current = page;
          that.total = res.count;
        }
      });
    },
    convertStatus: function(status) {
      // 订单状态 待支付1 已支付2 交易成功3 取消4 申诉5 打币中6 异常订单7
      if (status == 1) {
        return this.$t('toBePaid');
      }
      if (status == 2) {
        return this.$t('alreadyPaid');
      }
      if (status == 3) {
        return this.$t('orderDone');
      }
      if (status == 4) {
        return this.$t('orderCanceled');
      }
      if (status == 5) {
        return this.$t('appeal');
      }
      if (status == 6) {
        return this.$t('transfering');
      }
      if (status == 7) {
        return this.$t('orderExpired');
      }
    },
  },
  mounted() {
    var locale = localStorage.getItem('locale');
    if (locale) {
      this.locale = locale;
      this.$i18n.locale = locale;
    }
    this.userInfo = JSON.parse(localStorage.getItem('user'));
    this.$on('locale', function(i) {
      this.locale = i;
      this.$i18n.locale = i;
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
