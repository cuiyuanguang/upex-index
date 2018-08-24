Vue.locale = () => {};
var messagesTransformed = utils.transform(messages);
var messagesAll = {
  zh: Object.assign(messagesTransformed.zh, iview.langs['zh']),
  en: Object.assign(messagesTransformed.en, iview.langs['en']),
  ar: Object.assign(messagesTransformed.ar, iview.langs['ar']),
};

var i18n = new VueI18n({
  locale: 'zh', // set locale
  fallbackLocale: 'zh',
  messages: messagesAll,
});

iview.i18n((key, value) => i18n.t(key, value));

var recharge = new Vue({
  el: '#recharge',
  i18n: i18n,
  components: {
    oHeader: o_header,
  },
  data() {
    return {
      locale: '',
      rechargeAddressQR: '',
      rechargeAddressString: '',
      rechargeColumn: [
        {
          title: 'time',
          renderHeader: (h) => h('span', this.$t('time')),
          key: 'time',
          align: 'center',
        },
        {
          title: 'currency',
          renderHeader: (h) => h('span', this.$t('currency')),
          key: 'currency',
          align: 'center',
        },
        {
          title: 'type',
          renderHeader: (h) => h('span', this.$t('type')),
          key: 'type',
          align: 'center',
          render: (h, params) =>
           h('span', params.row.type === 1 ? this.$t('recharge') : this.$t('deposit')),
        },
        {
          title: 'amount',
          renderHeader: (h) => h('span', this.$t('amount')),
          key: 'amount',
          align: 'center',
        },
        {
          title: 'status',
          renderHeader: (h) => h('span', this.$t('status')),
          key: 'status',
          align: 'center',
          render: (h, params) =>
            h('span', params.row.status === 1 ? this.$t('success') : this.$t('fail')),
        },
        {
          title: 'operation',
          renderHeader: (h) => h('span', this.$t('operation')),
          type: 'expand',
          render: (h, params) => {
            return h('p', [
              h('strong', { style: { paddingRight: '10px' } }, 'TXid:'),
              h('span', params.row.TXid),
            ]);
          },
          align: 'center',
        },
      ],
      rechargeData: [
        {
          time: '2018-08-05 12:32:43',
          currency: 'USDT',
          type: 2,
          amount: '213.2344',
          status: 1,
          TXid: '12312312312312312312312313123',
        },
        {
          time: '2018-08-04 11:32:43',
          currency: 'USDT',
          type: 1,
          amount: '23.2344',
          status: 1,
          TXid: '12312312312312312312312313123',
        },
        {
          time: '2018-08-03 12:32:43',
          currency: 'USDT',
          type: 1,
          amount: '2123.4433',
          status: 2,
          TXid: '12312312312312312312312313123',
        },
        {
          time: '2018-08-02 12:32:43',
          currency: 'USDT',
          type: 2,
          amount: '213.2344',
          status: 1,
          TXid: '12312312312312312312312313123',
        },
      ],
      rechargeTotalCount: '',
    };
  },
  methods: {
    copyAddress() {
      var that = this;
      this.$copyText(this.rechargeAddressString).then(function (e) {
        Toast.show(that.$t('copySucceed'), { icon: 'ok' });
      }, function (e) {
        Toast.show(that.$t('copyFailed'), { icon: 'error' });
      });
    },
    getRechargeInfo() {
      var that = this;
      post('api/finance/get_charge_address', { symbol: 'USDT' }, false).then(function(res) {
        if (res) {
          that.rechargeAddressQR = res.addressQRCode;
          that.rechargeAddressString = res.addressStr;
        }
      });
    },
    getRechargeData(page) {
      var that = this;
      post('api/record/deposit_list',{
        pageNum: page,
        coinSymbol: 'USDT',
      }, false).then(function(res) {
        if (res) {
          that.rechargeData = res.financeList;
          that.rechargeTotalCount = res.count;
        }
      });
    },
    rechargePageChange(page) {
      this.getRechargeData(page);
    },
  },
  mounted() {
    this.$on('locale', function(i) {
      this.locale = i;
      this.$i18n.locale = i;
    });
    var locale = localStorage.getItem('locale');
    if (locale) {
      this.locale = locale;
      this.$i18n.locale = locale;
    }
    this.getRechargeInfo();
    this.getRechargeData(1);
  },
  watch: {
    locale: {
      handler: function(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.$i18n.locale = newVal;
        }
      },
      immediate: true
    },
  }
});
