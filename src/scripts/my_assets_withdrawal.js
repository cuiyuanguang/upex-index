var i18n = new VueI18n({
  locale: 'zh', // set locale
  fallbackLocale: 'zh',
  messages: utils.transform(messages),
});

var myAssetsWithdrawal = new Vue({
  el: '#app',
  i18n: i18n,
  components: {
    oHeader: o_header,
    row_my_assets_with
  },
  data: {
    data3: [],
    columns3: [
      {
        title: 'Time',
        key: 'createdAt',
        align: 'center'
      },
      {
        title: 'Currency',
        key: 'symbol',
        align: 'center'
      },
      {
        title: 'Type',
        key: 'type',
        align: 'center'
      },
      {
        title: 'Amount',
        key: 'amount',
        align: 'center'
      },
      {
        title: 'Status',
        key: 'status',
        align: 'center'
      },
      {
        title: 'Operating',
        type: 'expand',
        render: (h, params) => {
          return h(row_my_assets_with, {
            props: {
              row: params.row,
            }
          })
        },
        align: 'center'
      },
    ],
    data3Page: 1,
    tableLoading3: true,
  },
  methods:{
    //提现
    getUserWithDrawList(page) {
      var that = this;
      that.tableLoading3 = true;
      var data;
      data = {
        pageSize: 10,
        page: page || 1
      };
      post('api/record/withdraw_list', JSON.stringify(data), false).then((res) => {
        that.data3 = res.financeList;
        that.tableLoading3 = false;
        that.data3Page = res.count;
        for (var i = 0; i < res.financeList.length; i++) {
          if(res.financeList[i].status === 0){
            that.$set(that.data3[i], 'status', '未审核')
          }else if(res.financeList[i].status === 1){
            that.$set(that.data3[i], 'status', '审核通过')
          }else if(res.financeList[i].status === 2){
            that.$set(that.data3[i], 'status', '审核拒绝')
          }else if(res.financeList[i].status === 3){
            that.$set(that.data3[i], 'status', '支付中已经打币')
          }else if(res.financeList[i].status === 4){
            that.$set(that.data3[i], 'status', '支付失败')
          }else if(res.financeList[i].status === 5){
            that.$set(that.data3[i], 'status', '已完成')
          }else if(res.financeList[i].status === 6){
            that.$set(that.data3[i], 'status', '已撤销')
          }
          that.$set(that.data3[i], 'type', 'Withdrawal')
        }
      })
    },
    changeWithDraw(page) {
      this.getUserWithDrawList(page)
    },
  },
  mounted(){
    this.getUserWithDrawList();
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
