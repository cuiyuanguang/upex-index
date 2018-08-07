var i18n = new VueI18n({
  locale: 'zh', // set locale
  fallbackLocale: 'zh',
  messages: utils.transform(messages),
});

var myGoods = new Vue({
  el: '#app',
  i18n: i18n,
  components: {
    oHeader: o_header,
  },
  data: function() {
    return {
      locale: 'zh',
      current: 1,
      pageSize: 10,
      pendingOrdersList: [],
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
  methods: {
    //get user advert
    getAdvert: function(page) {
      var that = this;
      var data = {
        pageNum: page || 1,
        pageSize: this.pageSize,
      };
      get('api/personAdverts/processing', data).then(function(res) {
        that.pendingOrdersList = res.rsts || [];
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
      document.body.dir = locale === 'zh' ? 'ltr' : 'rtl';
      this.$i18n.locale = locale;
    }
    var that = this;
    this.$on('locale', function(i) {
      that.locale = i;
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
