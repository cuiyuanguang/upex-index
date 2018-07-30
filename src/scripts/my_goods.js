Vue.use(VueI18n);

var i18n = new VueI18n({
  locale: 'zh', // set locale
  messages: utils.transform(messages),
});

var myGoods = new Vue({
  el: '#app',
  i18n: i18n,
  components: {
    oHeader: o_header,
  },
  data: {
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
      confirmText: 'Confirm',
    },
  },
  methods: {
    //get user advert
    getAdvert: function (page) {
      var that = this;
      var data = {
        pageNum: page || 1,
        pageSize: this.pageSize,
      };
      get('api/personAdverts/processing', data).then(function (res) {
        that.pendingOrdersList = res.data.data.rsts;
        that.pendingOrdersCount = res.data.data.count;
      });
    },
    pause: function (item) {
      this.action = item.status === 6 ? 'enable' : 'pause';
      this.advertId = item.id;
      this.modalMsg = {
        title: item.status === 6 ? 'Enable order' : 'Pause order',
        desc: 'Confirm ' + this.action + ' this order？',
        confirmText: 'Confirm',
      };
      this.showModal = true;
    },
    cancel: function (item) {
      if (item.status === 5 || item.status === 6) {
        this.modalMsg = {
          title: 'Temporarily unable to remove',
          desc: 'Pending orders, after processing, you can go offline',
          confirmText: 'Immediate treatment',
        };
      } else {
        this.modalMsg = {
          title: 'Remove order',
          desc: 'Confirm remove this order？',
          confirmText: 'Confirm',
        };
        this.cancelable = true;
        this.advertId = item.id;
      }
      this.showModal = true;
      this.action = 'cancel';
    },
    manualAction: function () {
      var that = this;
      var api = {
        'pause': 'api/suspendAdvert',
        'enable': 'api/openAdvert',
        'cancel': 'api/closeAdvert'
      }
      if ((that.cancelable && that.action === 'cancel') || that.action === 'pause' || that.action ===
        'enable') {
        post(api[that.action], that.advertId).then(function (res) {
          if (res.success) {
            that.showModal = false;
            that.getAdvert();
          }
        });
      } else {
        location.href = './otc_adverts.html';
      }


      // var that = this;
      // if (that.action === 'pause') {
      //   post('api/suspendAdvert', that.advertId, that.token).then(function (res) {
      //     if (res.success) {
      //       that.showModal = false;
      //       that.showTips = true;
      //       that.getAdvert();
      //       setTimeout(function () {
      //         that.showTips = false;
      //       }, 2000);
      //     } else {
      //       that.errorText = res.data;
      //     }
      //   });
      // }
      // if (that.action === 'enable') {
      //   post('api/openAdvert', that.advertId, that.token).then(function (res) {
      //     if (res.success) {
      //       that.showModal = false;
      //       that.showTips = true;
      //       that.getAdvert();
      //       setTimeout(function () {
      //         that.showTips = false;
      //       }, 2000);
      //     } else {
      //       that.errorText = res.data;
      //     }
      //   });
      // }
      // if (that.action === 'cancel') {
      //   if (that.cancelable) {
      //     post('api/closeAdvert', that.advertId, that.token).then(function (res) {
      //       if (res.success) {
      //         that.showModal = false;
      //         that.showTips = true;
      //         that.getAdvert();
      //         setTimeout(function () {
      //           that.showTips = false;
      //         }, 2000);
      //       } else {
      //         that.errorText = res.data;
      //       }
      //     });
      //   } else {
      //     location.href = './otc_adverts.html';
      //   }
      // }

    },
  },
  filters: {
    time: function (stamp) {
      var date = new Date(stamp);
      var month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
      var day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
      var hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
      var minute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
      return month + '-' + day + ' ' + hour + ':' + minute;
    },
  },
  created: function () {
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