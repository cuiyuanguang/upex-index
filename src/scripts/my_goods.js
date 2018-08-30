
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

var myGoods = new Vue({
  el: '#app',
  i18n: i18n,
  components: {
    oHeader: o_header,
  },
  data: function() {
    return {
      locale: '',
      current: 1,
      pageSize: 10,
      pendingOrdersColumn: [
        {
          align: 'center',
          renderHeader: (h) => h('span', this.$t('type')),
          render: (h, params) => h(
            'Avatar',
            {
              style: {
                backgroundColor: '#5C95EA',
              },
            },
            this.$t(params.row.side.toLowerCase())
          )
        },
        {
          align: 'center',
          minWidth: 80,
          renderHeader: (h) => h('span', this.$t('amount')),
          render: (h, params) => {
            var balance = (params.row.volume - params.row.sell).toFixed(4);
            if (params.row.sell == 0) {
              return h('span', params.row.volume + ' USDT');
            }
            return h('p', [
              h('span', params.row.volume),
              balance > this.digitalCurrencyMin ?
                h('span', { 'class': 'text-primary' }, ' / ' + balance + ' USDT') :
                h('span', { 'class': 'text-warning' }, [
                  h('span', ' / ' + balance + ' USDT'),
                  h(
                    'Tooltip',
                    {
                      props: { placement: 'top' },
                    },
                    [
                      h('p',
                      {
                        slot: 'content',
                        'class': 'text-warning',
                        },
                        this.$t('cancelToRelease'),
                      ),
                      h('Icon', { props: { type: 'information-circled', size: '16' }, 'class': 'ml-10' })
                    ]
                  )
                ]),
            ]);
          },
        },
        {
          key: 'price',
          align: 'center',
          renderHeader: (h) => h('span', this.$t('unitPrice')),
          render: (h, params) => h('span', params.row.price + ' SAR'),
        },
        {
          align: 'center',
          renderHeader: (h) => h('span', this.$t('limit')),
          render: (h, params) => h('span', params.row.minTrade + ' - ' + params.row.maxTrade + ' SAR'),
        },
        {
          align: 'center',
          renderHeader: (h) => h('span', this.$t('time')),
          render: (h, params) => h('span', utils.dateFormat(params.row.ctime)),
        },
        {
          align: 'center',
          renderHeader: (h) => h('span', this.$t('operation')),
          render: (h, params) => h('div', [
            h('Button',
              {
                props: {
                  type: 'link',
                  size: 'small',
                  disabled: params.row.status === 3 || params.row.status === 4 || params.row.status === 5,
                },
                on: {
                  'click': () => { this.pause(params.row) },
                },
              },
              params.row.status === 6 ? this.$t('start') : this.$t('pause'),
            ),
            h('Button',
              {
                props: {
                  type: 'link',
                  size: 'small',
                  disabled: params.row.status === 4 || params.row.status === 5,
                },
                on: {
                  'click': () => { this.cancel(params.row) },
                },
              },
              this.$t('cancel'),
            ),
          ])
        }
      ],
      pendingOrdersData: [],
      pendingOrdersDataLoading: false,
      pendingOrdersCount: 0,
      showModal: false,
      cancelable: false,
      pauseable: false,
      modalMsg: {
        title: '',
        desc: '',
        confirmText: '确认',
      },
      action: '',
      advertId: '',
      sequence: '',
    }
  },
  computed: {
    digitalCurrencyMin() {
      return JSON.parse(localStorage.getItem('market')).trade_min_volume;
    },
  },
  methods: {
    //get user advert
    getAdvert: function(page) {
      var that = this;
      var data = {
        pageNum: page || 1,
        pageSize: this.pageSize,
      };
      that.pendingOrdersDataLoading = true;
      get('api/personAdverts/processing', data).then(function(res) {
        that.pendingOrdersDataLoading = false;
        that.pendingOrdersData = res.rsts || [];
        that.pendingOrdersCount = res.count;
      });
    },
    pause: function(item) {
      this.action = item.status === 6 ? 'start' : 'pause';
      this.advertId = item.id;
      this.modalMsg = {
        title: item.status === 6 ? this.$t('start') : this.$t('pause'),
        desc: this.$t('confirm') + this.$t(this.action) + this.$t('thisOrder'),
        confirmText: this.$t('confirm'),
      };
      this.showModal = true;
    },
    cancel: function(item) {
      if (item.status === 5 || item.status === 6) {
        this.modalMsg = {
          title: this.$t('unremovable'),
          desc: this.$t('unremovableTips'),
          confirmText: this.$t('unremovableOperation'),
        };
      } else {
        this.modalMsg = {
          title: this.$t('removable'),
          desc: this.$t('removableTips'),
          confirmText: this.$t('confirm'),
        };
        this.cancelable = true;
        this.advertId = item.id;
        this.sequence = item.sequence;
      }
      this.showModal = true;
      this.action = 'cancel';
    },
    manualAction: function() {
      var that = this;
      var api = {
        pause: 'api/suspendAdvert',
        start: 'api/openAdvert',
        cancel: 'api/closeAdvert',
      };
      if (
        (that.cancelable && that.action === 'cancel') ||
        that.action === 'pause' ||
        that.action === 'start'
      ) {
        post(api[that.action], that.advertId).then(function(res) {
          if (res) {
            that.getAdvert();
          }
          that.showModal = false;
        });
      } else {
        location.href = 'otc_my_order.html';
      }
    },
  },
  mounted() {
    var locale = localStorage.getItem('locale');
    if (locale) {
      this.locale = locale;
      this.$i18n.locale = locale;
    }
    this.$on('locale', function(i) {
      this.locale = i;
      this.$i18n.locale = i;
    });
    this.getAdvert();
  },
  watch: {
    locale: function(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$i18n.locale = newVal;
      }
    },
  },
});
