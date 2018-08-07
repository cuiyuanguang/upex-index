var i18n = new VueI18n({
  locale: 'zh', // set locale
  fallbackLocale: 'zh',
  messages: utils.transform(messages),
});

var account = new Vue({
  el: '#account',
  i18n: i18n,
  components: {
    oHeader: o_header,
  },
  data() {
    return {
      modalPassword: true,
      formPassword: {
        passwd: '',
        passwdNew: '',
        passwdReNew: '',
      },
      rulePassword: {
        passwd: [{ required: true, message: 'The name cannot be empty', trigger: 'blur' }],
        passwdNew: [{ required: true, message: 'The name cannot be empty', trigger: 'blur' }],
        passwdReNew: [{ required: true, message: 'The name cannot be empty', trigger: 'blur' }],
      },
      bankColumn: [
        {
          title: '银行名称',
          key: 'name',
          align: 'center',
        },
        {
          title: '账户名称',
          key: 'account',
          align: 'center',
          minWidth: 150,
        },
        {
          title: '卡号',
          key: 'number',
          align: 'center',
        },
        {
          title: '操作',
          key: 'operation',
          align: 'center',
          render: (h, params) => {
            return h(
              'Button',
              {
                props: {
                  type: 'text',
                  size: 'small',
                },
                on: {
                  click: () => {
                    console.log(params.row.name);
                  },
                },
              },
              '修改'
            );
          },
        },
        {
          title: '启用',
          key: 'switch',
          align: 'center',
          render: (h, params) => {
            return h('i-switch', {
              props: {
                value: params.row.enabled,
              },
              on: {
                'on-change': value => {
                  console.log(value);
                },
              },
            });
          },
        },
      ],
      bankData: [
        {
          name: '中国工商银行',
          account: 'AFHKFHWIEHRIEWNFLKFL',
          number: '6217993989993322',
          enabled: true,
        },
        {
          name: '中国建设银行',
          account: 'KSAKKSAIUEIHROQASDHK',
          number: '6219993989993322',
          enabled: false,
        },
        {
          name: '中国招商银行',
          account: 'RUIWROERIOREIURIOREID',
          number: '6117993989993322',
          enabled: true,
        },
      ],
      loginColumn: [
        {
          title: '登录时间',
          key: 'time',
          align: 'center',
          render: (h, params) => {
            return h('span', utils.dateFormat(params.row.time));
          },
        },
        {
          title: '登录平台',
          key: 'platform',
          align: 'center',
        },
        {
          title: 'IP地址',
          key: 'ipAddress',
          align: 'center',
        },
        {
          title: '登录状态',
          key: 'status',
          align: 'center',
          render: (h, params) => {
            return h('span', params.row.status === 1 ? '成功' : '失败');
          },
        },
      ],
      loginData: [
        {
          time: 1533549358281,
          platform: 'Web',
          ipAddress: '192.223.12.143',
          status: 1,
        },
        {
          time: 1533106474000,
          platform: 'iOS',
          ipAddress: '82.231.112.134',
          status: 1,
        },
        {
          time: 1532593464005,
          platform: 'Android',
          ipAddress: '92.123.122.34',
          status: 0,
        },
      ],
      securityColumn: [
        {
          title: '操作时间',
          key: 'time',
          align: 'center',
          render: (h, params) => {
            return h('span', utils.dateFormat(params.row.time));
          },
        },
        {
          title: '操作平台',
          key: 'platform',
          align: 'center',
        },
        {
          title: 'IP地址',
          key: 'ipAddress',
          align: 'center',
        },
        {
          title: '操作名称',
          key: 'operation',
          align: 'center',
        },
        {
          title: '操作状态',
          key: 'status',
          align: 'center',
          render: (h, params) => {
            return h('span', params.row.status === 1 ? '成功' : '失败');
          },
        },
      ],
      securityData: [
        {
          time: 1533549358281,
          platform: 'Web',
          ipAddress: '192.223.12.143',
          operation: '修改密码',
          status: 1,
        },
        {
          time: 1533106474000,
          platform: 'iOS',
          ipAddress: '82.231.112.134',
          operation: '绑定银行卡',
          status: 1,
        },
        {
          time: 1532593464005,
          platform: 'Android',
          ipAddress: '92.123.122.34',
          operation: '修改WahtsApp',
          status: 0,
        },
      ],
      tabName: 'loginHistory',
    };
  },
  methods: {
    loginOut() {
      this.$Modal.confirm({
        title: '',
        content: '您确认要退出登录吗？',
        onOk() {
          console.log('loginOut');
        },
      });
    },
    handleSubmit(name) {
      console.log(this.$refs[name]);
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success('Success!');
        } else {
          this.$Message.error('Fail!');
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
  },
  mounted() {},
});
