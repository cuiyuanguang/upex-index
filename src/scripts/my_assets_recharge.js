

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
          key: 'createdAt',
          align: 'center',
        },
        {
          title: 'currency',
          renderHeader: (h) => h('span', this.$t('currency')),
          key: 'symbol',
          align: 'center',
        },
        {
          title: 'type',
          renderHeader: (h) => h('span', this.$t('type')),
          key: 'type',
          align: 'center',
          render: (h) => h('span', this.$t('recharge')),
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
          render: (h, params) => h('span', this.switchDepositStatus(params.row.status))
        },
        {
          title: 'operation',
          renderHeader: (h) => h('span', this.$t('operation')),
          type: 'expand',
          render: (h, params) => {
            return h('p', [
              h('strong', { style: { paddingRight: '10px' } }, 'TXid:'),
              h('span', params.row.txid),
            ]);
          },
          align: 'center',
        },
      ],
      rechargeData: [],
      rechargeDataLoading: false,
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
      that.rechargeDataLoading = true;
      post('api/record/deposit_list',{
        pageNum: page,
        coinSymbol: 'USDT',
      }, false).then(function(res) {
        that.rechargeDataLoading = false;
        if (res) {
          that.rechargeData = res.financeList;
          that.rechargeTotalCount = res.count;
        }
      });
    },
    switchDepositStatus(status) {
      var statusText;
      if (status === 0) {
        statusText = this.$t('unConfirmStatus');
      }
      if (status === 1) {
        statusText = this.$t('completeStatus');
      }
      if (status === 2) {
        statusText = this.$t('errorStatus');
      }
      return statusText;
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
