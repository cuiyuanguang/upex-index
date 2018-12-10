<template>
    <div>
        <div class="notice-line">
            <ul class="notice-line-inner">
                <li v-for="(item, index) in noticeList" :key="index">
                    <a :href="item.fileName" target="_blank"><span class="notice-title">{{item.title}}</span></a>
                    <span class="notice-time">({{item.ctime | day}})</span>
                </li>
            </ul>
        </div>
        <div class="trade-message">
            <div class="trade-message-inner">
                <div class="trade-item" v-for="(item, index) in symbolTop" :key="index">
                    <p class="trade-item-coin">{{item.nameOne}}/ <span class="primary">{{item.nameTwo}}</span></p>
                    <p class="trade-item-price">{{item.close.data}}
                        <span class="trade-item-rate">≈{{item.rate}}</span>
                    </p>
                    <p class="trade-item-volume">
                        <span class="dark-blue">24h vol</span>
                        <span>{{item.vol}}</span>
                    </p>
                    <span class="trade-item-change" :class="item.rose.class">{{item.rose.data}}</span>
                    <div :id="item.id" style="width: 100px;height:40px;" class="trade-item-chart" :ref="item.id"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import pako from 'pako';
    import fecha from '@/utils/date';
    import axios from 'axios';

    const echarts = require('echarts/lib/echarts');
    import 'echarts/lib/chart/line';

    export default {
        name: "symbolMsg",
        computed: {
            ...mapState({
                baseData: 'baseData',
            })
        },
        data() {
            return {
                firstFlag: false,
                topMarket: null,
                symbolTop: {},
                symbolListData: {},
                enabledSymbols: [],
                lastSymbol: [],
                rate: '',
                chartData: {},
                noticeList: [],
            };
        },
        methods: {
            createWs() {
                // 创建ws
                this.topMarket = new WebSocket(WS_URL);
                this.topMarket.binaryType = 'arraybuffer';

                // 建立连接
                this.topMarket.onopen = () => {
                    this.symbolTopList();
                };
                // 获取数据
                this.topMarket.onmessage = (evt) => {
                    const na = new Uint8Array(evt.data);
                    if (na.length > 0) {
                        const data = JSON.parse(pako.inflate(na, {to: 'string'}));
                        if (data.ping) {
                            this.topMarket.send(JSON.stringify({pong: data.ping}));
                        } else if (data.tick) {
                            const d = data.tick;
                            const key = data.channel.split('_')[1];
                            const topMN = this.symbolTop[key].name.split('/')[1]; // 当前市场
                            const j = this.baseData._symbols[topMN][this.symbolTop[key].name].price; // 当前市场信息
                            const oldClose = this.symbolTop[key].close.data; // 上次价格
                            const close = this._P.fixD(d.close, j);
                            const rate = this._P.fixRate(d.close, this.baseData._rate, topMN);
                            const Od = parseFloat(oldClose);
                            const cs = parseFloat(close);
                            let rs = '';
                            if (`${Od}` !== 'NaN') {
                                if (cs > Od) {
                                    rs = 'c-fall';
                                } else if (cs === Od) {
                                    rs = '';
                                } else {
                                    rs = 'c-rise';
                                }
                            }
                            this.symbolTop[key].close = {
                                class: rs,
                                data: `${close}`,
                            };
                            this.symbolTop[key].rate = rate;
                            let rose = `${Math.round(d.rose * 10000) / 100}%`;
                            let rc = '';
                            if (rose.indexOf('NaN') < 0) {
                                if (d.rose > 0) {
                                    rose = `+${rose}`;
                                    rc = 'c-rise';
                                } else if (d.rose === 0) {
                                    rc = '';
                                } else {
                                    rc = 'c-fall';
                                }
                            } else {
                                rc = '';
                                rose = '0.00%';
                            }
                            this.symbolTop[key].rose = {
                                class: rc,
                                data: rose,
                            };
                            this.symbolTop[key].id = key;
                            this.symbolTop[key].vol = d.vol || '--';
                            this.symbolTop[key].amount = this._P.fixD(d.amount, j);
                            this.$forceUpdate();
                            if (!this.firstFlag) {
                                this.firstFlag = true;
                                this.$nextTick(() => {
                                    this.renderChart();
                                });
                            }

                        }
                    }
                };
                this.topMarket.onclose = (evt) => {
                    console.log('关闭', evt);
                };
                this.topMarket.onerror = (evt) => {
                    console.log('错误', evt);
                };
            },
            symbolTopList() {
                for (let i = 0; i < this.baseData._topSymbol.length; i += 1) {
                    const s = this.baseData._topSymbol[i];
                    const sMarket = s.split('/')[1];
                    const sWs = s.toLowerCase().split('/');
                    const key = sWs[0] + sWs[1];
                    this.symbolTop[key] = {
                        close: {
                            class: '',
                            data: '--',
                        },
                        rose: {
                            class: '',
                            data: '--',
                        },
                        amount: '--',
                        name: s,
                        nameOne: s.split('/')[0],
                        nameTwo: s.split('/')[1],
                        vol: '--'
                    };
                    this.$forceUpdate();
                    if (this.baseData._symbols[sMarket] && this.baseData._symbols[sMarket][s]) {
                        this.sendSymbolTop(key);
                    }
                }
            },
            sendSymbolTop(symbol) {
                if (this.topMarket) {
                    this.topMarket.send(
                        JSON.stringify({
                            event: 'sub',
                            params: {
                                channel: `market_${symbol}_ticker`,
                                cb_id: symbol,
                            },
                        }),
                    );
                }
            },
            // 第三方获取chart数据
            getChartData(symbolA, symbolB) {
                const params = {
                    'fsym': symbolA,
                    'tsym': symbolB,
                    'limit': '47',
                    'aggregate': '30'
                };
                axios.get('https://min-api.cryptocompare.com/data/histominute', {
                    params: params,
                }).then((res) => {
                    const { Data } = res.data;
                    this.chartData[`${symbolA}${symbolB}`] = [];
                    Data.map(item => {
                        this.chartData[`${symbolA}${symbolB}`].push(item.close);
                    });
                    this.useChartConfig(`${symbolA}${symbolB}`, this.chartData[`${symbolA}${symbolB}`]);
                })
            },
            // 生成线状图
            renderChart() {
                const obj = {};
                this.baseData._topSymbol.map(item => {
                    const [symbolA, symbolB] = item.split('/');
                    this.getChartData(symbolA, symbolB);
                })
            },
            useChartConfig(coinID, data, date) {
                const myChart = echarts.init(this.$el.querySelector(`#${coinID.toLowerCase()}`));
                // 指定图表的配置项和数据
                const option = {
                    grid: {
                        height: 36,
                        width: 'auto',
                        top: 0
                    },
                    xAxis: {
                        show: false,
                        type: 'category',
                        boundaryGap: false,
                        data: date,
                        axisPointer: {
                            show: true,
                            lineStyle: {
                                color: "#3c2d26",
                                width: 1,
                                type: 'dashed'
                            }
                        }
                    },
                    yAxis: {
                        show: false,
                        type: 'value',
                        min: 'dataMin',
                        max: 'dataMax'

                    },
                    tooltip: {
                        //  confine: true,
                        trigger: 'axis',
                        formatter: "${c}<br/>{b}",
                        textStyle: {
                            color: '#fff'
                        },
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        padding: [5, 5]
                    },
                    series: [{
                        data: data,
                        type: 'line',
                        symbol: 'none',
                        showSymbol: false,
                        lineStyle: {
                            width: 1
                        },
                        smooth: 0.5,
                        smoothMonotone: 'none'
                    }],
                    color: ['#1D406D']
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
            getNoticeList(lang) {
                axios.get(`${OTC_API}/api/cms/list`, {
                    headers: {
                        'exchange-language': lang
                    }
                }).then((res) => {
                    const { data } = res.data;
                    if (data.length && data.length > 3) {
                        this.noticeList = data.slice(0, 3);
                    } else {
                        this.noticeList = data;
                    }
                });
            },
        },
        mounted() {
            const lang = localStorage.getItem('lang');
            this.getNoticeList(lang);
            this.createWs();
        },
        filters: {
            day: (time) => {
                return fecha.format(time, 'MM-dd');
            }
        },
        watch: {
            '$i18n.locale'(newVal, oldVal) {
                if(newVal !== oldVal) {
                    this.getNoticeList(newVal);
                }
            }
        },
    }
</script>

<style lang="less">
    .primary {
        color: #73acff;
    }
    .c-fall {
        color: #FF567A;
    }
    .c-rise {
        color: #01BD8B;
    }
    .notice-line {
        height: 46px;
        background: #05172F;
        &-inner {
            width: 1200px;
            margin: 0 auto;
            li {
                float: left;
                line-height: 46px;
                font-size: 12px;
                color: #99B1D7;
                margin-right: 200px;
                &:last-child {
                    margin-right: 0;
                }
                span {
                    float: left;
                }
                &:hover {
                    span {
                        color: #B5D3FF;
                        text-decoration: underline;
                    }

                }
                .notice-title {
                    max-width: 320px;
                    text-overflow:ellipsis;
                    cursor: pointer;
                    white-space: nowrap;
                    color: #99B1D7;
                    overflow: hidden;
                    margin-right: 4px;
                }
            }
        }
    }
    .trade-message {
        height: 180px;
        background: #05172F;
        &-inner {
            border-top: 1px solid #092449;
            width: 1200px;
            margin: 0 auto;
            height: 100%;
            display: flex;
            .trade-item {
                padding-left: 25px;
                width: 25%;
                margin: 20px 0;
                flex-grow: 1;
                border-right: 1px solid #082C5D;
                position: relative;
                color: #D2E6FF;
                &-coin {
                    font-size: 24px;
                    margin: 8px 0 16px;
                }
                &-rate {
                    font-size: 14px;
                    color: #81B7FF;
                    margin-left: 10px;
                    vertical-align: middle;
                }
                &-price {
                    margin-bottom: 34px;
                    font-size: 20px;
                }
                &-volume {
                    .dark-blue {
                        color: #68ABFF;
                    }
                }
                &-change {
                    position: absolute;
                    right: 20px;
                    top: 8px;
                    padding: 3px 12px;
                    background: #0D2543;
                    border-radius: 2px;
                    font-size: 16px;
                }
                &-chart {
                    position: absolute;
                    bottom: 0;
                    right: 12px;
                }
                &:first-child {
                    padding-left: 0;
                }
                &:last-child {
                    border-right: 0;
                }
            }
        }

    }
</style>
