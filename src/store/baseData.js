import $http from '@/plugins/axios';

// 默认获取全站需要的数据
export default {
    state: {
        default_code: null,
        isReady: false,
        _lan: null,
        _lanList: null,
        _user: null,
        _ws: null,
        _symbols: {},
        _topSymbol: null,
        _rate: null,
        _coinList: null,
        _maket_index: null,
        _theme: null,
        isLogin: false,
        nc_appkey: null,
        otcOpen: null,
        agentOpen: null,
        contractOpen: null,
        _footer: null,
        logo: null,
        indexHeaderTitle: null,
        marketSort: null, // 市场排序
        invitationCode: null,
    },
    actions: {
        // public_info
        getCommonPublic_info({commit}) {
            $http.post('/common/public_info').then((data) => {
                if (data.code === '0') {
                    commit('GETCOMMONPUBLICINFO', data.data);
                }
            });
        },
        getRate_info({commit}, isfals) {
            let rateInterval = null;
            clearInterval(rateInterval);
            if (!isfals) return;
            rateInterval = setInterval(() => {
                $http.post('/common/rate').then((data) => {
                    if (data.code === '0') {
                        commit('RATE', data.data);
                    }
                });
            }, 5000);
        },
    },
    mutations: {
        // public_info
        GETCOMMONPUBLICINFO(state, data) {
            // if (/Android|webOS|iPhone|iPod|Windows Phone|BlackBerry/i.test(navigator.userAgent) && data.h5_url) {
            //   window.location.href = data.h5_url
            // }
            state._maket_index = data.maket_index;
            state.default_code = data.default_country_code;
            state.isReady = true; // 是否有public数据
            state._rate = data.rate; // 货币汇率
            state._ws = data.wsUrl; // ws路径
            state._topSymbol = data.headerSymbol; // 首页推荐货币
            state._lan = localStorage.getItem('lan'); // 语言
            state._lanList = data.lan.lanList; // 语言列表
            state._coinList = data.coinList; // 币种列表
            state.contractOpen = data.contractOpen; // 合约开关
            state.nc_appkey = data.nc_appkey; // 阿里云滑动验证码参数
            state.otcOpen = data.otcOpen;
            state.logo = data.logoUrl;
            state.indexHeaderTitle = data.indexHeaderTitle; // 页面Title
            state.marketSort = data.marketSort; // 市场排序
            state.agentOpen = data.agentUserOpen; // 经济人开关
            state.invitationCode = data.is_invitationCode_required; // 邀请码开关
            state._footer = {
                name: data.company_name,
                email: data.contact_email,
                number: data.contact_number,
            };
            // eslint-disable-next-line
            for (let item in data.market) {
                state._symbols[item] = data.market[item];
            }
            // const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
            // link.type = 'image/x-icon';
            // link.rel = 'shortcut icon';
            // link.href = data.iconUrl;
            // document.getElementsByTagName('head')[0].appendChild(link);
        },
        RATE: (state, data) => {
            state._rate = data.rate; // 货币汇率
        },
    },
};
