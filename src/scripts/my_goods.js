
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
          renderHeader: (h) => h('span', this.$t('amount') + ' / ' + this.$t('balance')),
          render: (h, params) => {
            var balance = (params.row.volume - params.row.sell).toFixed(4);
            if (params.row.sell == 0) {
              return h('span', params.row.volume + ' USDT');
            }
            return h('p', [
              h('span', params.row.volume),
              (balance * params.row.price).toFixed(2) >= params.row.minTrade ?
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
          render: (h, params) => {
            var startOrPause = h('Button',
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
            );
            var cancel = h('Button',
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
            );
            var balance = (params.row.volume - params.row.sell).toFixed(4);
            return h('div', (balance * params.row.price).toFixed(2) >= params.row.minTrade ?
              [startOrPause, cancel] :
              [cancel]
            );
          }
        }
      ],
      pendingOrdersData: [],
      pendingOrdersDataLoading: false,
      pendingOrdersCount: 0,
      modalAction: false,
      modalActionLoading: false,
      side: '',
      cancelable: false,
      actionNo: '',
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
        desc: this.$t('confirm') + this.$t(this.action),
        confirmText: this.$t('confirm'),
      };
      this.modalAction = true;
    },
    cancel: function(item) {
      var that = this;
      that.advertId = item.id;
      that.sequence = item.sequence;
      that.side = item.side;
      get('api/otc/bot/adv/orders/online?advertId=' + item.id)
        .then(function(res) {
          if (res.length) {
            that.modalMsg = {
              title: that.$t('unremovable'),
              desc: that.$t('unremovableTips'),
              confirmText: that.$t('unremovableOperation'),
            };
            that.cancelable = false;
            that.actionNo = res[0].sequence;
          } else {
            that.modalMsg = {
              title: that.$t('removable'),
              desc: that.$t('removableTips'),
              confirmText: that.$t('confirm'),
            };
            that.cancelable = true;
          }
          that.modalAction = true;
          that.action = 'cancel';
        });
    },
    manualAction: function() {
      this.modalActionLoading = true;
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
          that.modalActionLoading = false;
          if (res) {
            that.getAdvert();
          }
          that.modalAction = false;
        });
      } else {
        that.modalAction = false;
        var path = that.side === 'BUY' ? 'otc_pay' : 'otc_wait_pay';
        location.href = path + '.html?sequence=' + that.actionNo;
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
