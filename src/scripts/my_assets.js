var i18n = new VueI18n({
  locale: 'zh', // set locale
  fallbackLocale: 'zh',
  messages: utils.transform(messages),
});

var myAssets = new Vue({
  el: '#app',
  i18n: i18n,
  components: {
    oHeader: o_header,
    row_my_assets
  },
  data: {
    AssetFoldingBTC: '0.156346',
    orderWrapTable: '',
    columns1: [

      {
        title: 'Time',
        key: 'time',
        align:'center'
      },
      {
        title: 'Currency',
        key: 'currency',
        align:'center'
      },
      {
        title: 'Type',
        key: 'type',
        align:'center'
      },
      {
        title: 'Amount',
        key: 'amount',
        align:'center'
      },
      {
        title: 'Status',
        key: 'status',
        align:'center'
      },
      {
        title: 'Operating',
        type: 'expand',
        render: (h, params) => {
          return h(row_my_assets, {
            props: {
              row: params.row,
            }
          })
        },
        align:'center'
      },
    ],
    data1: [
      {
        time: 'John Brown',
        currency: 18,
        type: 'New York No. 1 Lake Park',
        amount: 'Data engineer',
        status: 'badminton',
        TXid: '12312312312312312312312313123',
      },
      {
        time: 'John Brown',
        currency: 13128,
        type: 'New York No. 1 Lake Park',
        amount: 'Data engineer',
        status: 'badminton',
        TXid: '12312312312312312312312313123',
      },
      {
        time: 'John Brown',
        currency: 11238,
        type: 'New York No. 1 Lake Park',
        amount: 'Data engineer',
        status: 'badminton',
        TXid: '12312312312312312312312313123',
      },
      {
        time: 'John Brown',
        currency: 11328,
        type: 'New York No. 1 Lake Park',
        amount: 'Data engineer',
        status: 'badminton',
        TXid: '12312312312312312312312313123',
      }
    ]
  },
  methods: {
    getUserBalance(){

      post('api/finance/account_balance',{}, false).then(function(res){
        if(res){

        }
      })
    },
  },
  mounted() {
    this.getUserBalance()
  },
  filters: {},
  watch: {
    locale: function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$i18n.locale = newVal;
      }
    },
  },
});
