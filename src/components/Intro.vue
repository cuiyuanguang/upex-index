<template>
    <div>
        <div class="layout-header">
            <Row class="layout-nav">
                <Col span="12" class="text-left layout-nav-left">
                <div class="layout-logo">
                    <img :src="logo" alt="upex.io">
                </div>
                <div class="layout-nav-item">
              <span class="layout-nav-item-link active">
                {{ $t('introT.homepage') }}
              </span>
                </div>
                <div class="layout-nav-item">
                    <a :href="OTC_URL">
                <span class="layout-nav-item-link">
                {{ $t('introT.currencyCoin') }}
              </span>
                    </a>
                </div>
                <div class="layout-nav-item">
              <span class="layout-nav-item-link" @click="jumpEX">
                {{ $t('introT.coinCoin') }}
              </span>
                </div>
                </Col>
                <Col span="12" class="text-right layout-nav-right">
                <div class="layout-nav-item">
                    <Dropdown @on-click="toggleLanguage">
                        <a href="javascript:void(0)" class="layout-nav-item-link">
                            {{ $t('introT.language') }}
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem name="ar_SA">العربية</DropdownItem>
                            <DropdownItem name="en_US">English</DropdownItem>
                            <DropdownItem name="zh_CN">简体中文</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                </Col>
            </Row>
        </div>
        <div class="intro">
            <div id="render">
                <div class="webgl-txt"></div>
                <p class="jump-btn-group render-jump-btn-group">
                    <a :href="OTC_URL">
                        <Button type="ghost" shape="circle" size="large" class="currencyCoin-btn">
                            {{ $t('introT.currencyCoin') }}
                        </Button>
                    </a>
                    <Button type="ghost" shape="circle" size="large" class="coinCoin-btn" @click="jumpEX">
                        {{ $t('introT.coinCoin') }}
                    </Button>
                </p>
            </div>
            <symbol-msg></symbol-msg>
            <div class="intro-box bg-dark-blue" style="height: 540px;">
                <div class="intro-box-inner intro-two">
                    <img src="../assets/images/intro-one-bg.png" class="intro-two-left">
                    <div class="intro-two-right">
                        <div class="intro-two-right-text">
                            {{ $t('introT.certify') }}
                        </div>
                        <div class="intro-two-right-img">
                            <span class="intro-two-right-img-left">UpEx.io</span>
                            <span class="intro-two-right-img-right">{{ $t('introT.bank') }}</span>
                            <img src="../assets/images/collaborate-l.png" alt="">
                            <lottie :options="optionSecond"
                                    style="width: 47%;display: inline-block;margin: -40px auto"/>
                            <img src="../assets/images/collaborate-r.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="intro-box bg-dark-blue">
                <div class="intro-box-inner intro-three">
                    <div class="intro-three-left">
                        <lottie :options="optionThird"/>
                        <span class="intro-three-left-left">{{ $t('introT.buyer') }}</span>
                        <span class="intro-three-left-right">{{ $t('introT.seller') }}</span>
                        <div class="intro-three-left-mid">
                            <p class="intro-three-left-mid-p1">UpEx.io</p>
                            <p class="intro-three-left-mid-p2">{{ $t('introT.buyToSell') }}</p>
                        </div>
                        <span class="intro-three-left-top">{{ $t('introT.buy') }}</span>
                        <span class="intro-three-left-bot">{{ $t('introT.sell') }}</span>
                    </div>
                    <div class="intro-three-right">
                        <p class="intro-three-right-text-1">{{ $t('introT.platOne') }}</p>
                        <p class="intro-three-right-text-2">{{ $t('introT.platTwo') }}</p>
                    </div>
                </div>
            </div>
            <div class="intro-box bg-dark-blue">
                <div class="intro-box-inner intro-coincoin">
                    <div class="intro-coincoin-left">
                        <p class="intro-coincoin-left-text-1">{{ $t('introT.coinTitle')}}</p>
                        <p class="intro-coincoin-left-text-2">{{ $t('introT.coinCont')}}</p>
                    </div>
                    <div class="intro-coincoin-right">
                        <lottie :options="optionCoin"/>
                    </div>
                </div>
            </div>
            <div class="intro-box bg-dark-blue">
                <div class="intro-box-inner intro-four">
                    <div class="intro-four-left">
                        <lottie :options="optionFour"/>
                        <span class="intro-four-left-shield">{{ $t('introT.btcShiled') }}</span>
                        <!--<a href="https://etherscan.io/address/0x4b532bb4a4580712750fa378c80b57dd933d1486" target="_blank">-->
                        <!--<Button class="intro-btn intro-four-btn-1" type="primary">{{ $t('introT.btcBtnOne') }}</Button>-->
                        <!--</a>-->
                        <!--<Button class="intro-btn intro-four-btn-2" type="ghost" @click="showDetail = true">{{-->
                        <!--$t('introT.btcBtnTwo') }}-->
                        <!--</Button>-->
                    </div>
                    <div class="intro-four-right">
                        <p class="intro-four-right-text-1">{{ $t('introT.btcOne') }}</p>
                        <p class="intro-four-right-text-2">{{ $t('introT.btcTwo') }}</p>
                        <p class="intro-four-right-text-3">{{ $t('introT.btcThree') }}</p>
                    </div>
                </div>
            </div>
            <div class="intro-box bg-dark-blue" style="height: 800px;">
                <div class="intro-box-inner">
                    <div class="intro-five">
                        <p class="intro-title">{{ $t('introT.fiveTitle') }}</p>
                        <div class="intro-five-line" style="margin-bottom: 110px;">
                            <div class="intro-five-line-item">
                                <img src="../assets/images/point1.png" alt="">
                                <p class="intro-five-line-item-title">{{ $t('introT.point1title') }}</p>
                                <p class="intro-five-line-item-cont">{{ $t('introT.point1Cont1') }}</p>
                                <p class="intro-five-line-item-cont">{{ $t('introT.point1Cont2') }}</p>
                            </div>
                            <div class="intro-five-line-item">
                                <lottie :options="optionFive1" style="width: 200px;"/>
                                <p class="intro-five-line-item-title" style="margin-top: 34px;">{{
                                    $t('introT.point2title') }}</p>
                                <p class="intro-five-line-item-cont">{{ $t('introT.point2Cont1') }}</p>
                                <p class="intro-five-line-item-cont">{{ $t('introT.point2Cont2') }}</p>
                            </div>
                            <div class="intro-five-line-item">
                                <img src="../assets/images/point3.png" alt="">
                                <p class="intro-five-line-item-title">{{ $t('introT.point3title') }}</p>
                                <p class="intro-five-line-item-cont">{{ $t('introT.point3Cont1') }}</p>
                                <p class="intro-five-line-item-cont">{{ $t('introT.point3Cont2') }}</p>
                            </div>
                        </div>
                        <div class="intro-five-line">
                            <div class="intro-five-line-item">
                                <lottie :options="optionFive2" style="width: 199px;"/>
                                <p class="intro-five-line-item-title" style="margin-top: 34px;">{{
                                    $t('introT.point4title') }}</p>
                                <p class="intro-five-line-item-cont">{{ $t('introT.point4Cont1') }}</p>
                                <p class="intro-five-line-item-cont">{{ $t('introT.point4Cont2') }}</p>
                            </div>
                            <div class="intro-five-line-item">
                                <img src="../assets/images/point5.png" alt="">
                                <p class="intro-five-line-item-title">{{ $t('introT.point5title') }}</p>
                                <p class="intro-five-line-item-cont">{{ $t('introT.point5Cont1') }}</p>
                            </div>
                            <div class="intro-five-line-item">
                                <lottie :options="optionFive3" style="width: 200px;"/>
                                <p class="intro-five-line-item-title" style="margin-top: 34px;">{{
                                    $t('introT.point6title') }}</p>
                                <p class="intro-five-line-item-cont">{{ $t('introT.point6Cont1') }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="intro-linkbox">
                <div class="intro-linkbox-inner">
                    <p class="intro-title">{{ $t('introT.partner') }}</p>
                    <ul class="intro-partner">
                        <li class="intro-partner-1"></li>
                        <li class="intro-partner-2"></li>
                        <li class="intro-partner-3"></li>
                        <li class="intro-partner-4"></li>
                    </ul>
                </div>

            </div>
            <div class="intro-linkbox">
                <div class="intro-linkbox-inner">
                    <p class="intro-title">{{ $t('introT.media') }}</p>
                    <ul class="intro-media">
                        <li class="intro-media-1"></li>
                        <li class="intro-media-2"></li>
                        <li class="intro-media-3"></li>
                    </ul>
                </div>
            </div>
            <div class="intro-box bg-dark-blue intro-six-bg" style="height: 660px;">
                <div class="intro-box-inner">
                    <p class="intro-title" style="padding-top: 140px">{{ $t('introT.sixTitle') }}</p>
                    <div class="intro-six">
                        <div class="intro-six-item">
                            <p class="intro-six-text-1">{{ $t('introT.sixROne') }}</p>
                            <div class="intro-six-text-2">
                                <div class="loc">
                                    <lottie :options="optionSix"/>
                                </div>
                                {{$t('introT.sixRTwo') }}
                            </div>
                            <p class="intro-six-text-3">{{ $t('introT.sixRThree') }}</p>
                            <img src="../assets/images/intro-six-3.png" alt="" class="six-bg">
                        </div>
                        <div class="intro-six-item">
                            <p class="intro-six-text-1">{{ $t('introT.sixMOne') }}</p>
                            <div class="intro-six-text-2">
                                <div class="loc">
                                    <lottie :options="optionSix"/>
                                </div>
                                {{$t('introT.sixMTwo') }}
                            </div>
                            <p class="intro-six-text-3">{{ $t('introT.sixMThree') }}</p>
                            <img src="../assets/images/intro-six-2.png" alt="" class="six-bg">
                        </div>
                        <div class="intro-six-item">

                            <p class="intro-six-text-1">{{ $t('introT.sixLOne') }}</p>
                            <div class="intro-six-text-2">
                                <div class="loc">
                                    <lottie :options="optionSix"/>
                                </div>
                                {{$t('introT.sixLTwo') }}
                            </div>
                            <p class="intro-six-text-3">{{ $t('introT.sixLThree') }}</p>
                            <img src="../assets/images/intro-six-1.png" alt="" class="six-bg">
                        </div>
                    </div>

                </div>
            </div>
            <div class="intro-box-last bg-dark-blue">
                <div class="intro-box-inner">
                    <div class="intro-box-footer">
                        <p class="intro-title" style="margin-bottom: 40px;">{{ $t('introT.lastTitle') }}</p>
                        <p class="jump-btn-group">
                            <a :href="OTC_URL">
                                <Button type="ghost" shape="circle" size="large" class="currencyCoin-btn">
                                    {{ $t('introT.currencyCoin') }}
                                </Button>
                            </a>
                            <Button type="ghost" shape="circle" size="large" class="coinCoin-btn" @click="jumpEX">
                                {{ $t('introT.coinCoin') }}
                            </Button>
                        </p>
                    </div>
                </div>
            </div>
            <!--<modal-intro v-model="showDetail"></modal-intro>-->
            <modal-coin v-model="showCoinCoinModal"></modal-coin>
        </div>
    </div>
</template>

<script>
    // import THREE from '../libs/three/three';
    import Lottie from 'vue-lottie';

    import * as collaborate from '../assets/images/intro_collaborate.json';
    import * as relateData from '../assets/images/intro_relate.json';
    import * as coinData from '../assets/images/intro_coin.json';
    import * as guaranteeData from '../assets/images/intro_guarantee.json';
    import * as fiveOneData from '../assets/images/intro_five1.json';
    import * as fiveTwoData from '../assets/images/intro_five2.json';
    import * as fiveThreeData from '../assets/images/intro_five3.json';
    import * as locData from '../assets/images/intro_address.json';

    import logoEn from '../assets/images/logo.png';
    import logoAr from '../assets/images/logo-ar.png';

    export default {
        name: 'intro',
        components: {
            ModalCoin: () => import('../components/ModalCoin.vue'),
            Lottie,
            SymbolMsg: () => import('../components/Symbol.vue'),
        },
        data() {
            return {
                // showDetail: false,
                optionSecond: {animationData: collaborate},
                optionThird: {animationData: relateData},
                optionCoin: {animationData: coinData},
                optionFour: {animationData: guaranteeData},
                optionFive1: {animationData: fiveOneData},
                optionFive2: {animationData: fiveTwoData},
                optionFive3: {animationData: fiveThreeData},
                optionSix: {animationData: locData},
                showCoinCoinModal: false,
                OTC_URL: '',
                EX_URL: '',

            };
        },
        computed: {
            logo() {
                return this.$i18n.locale === 'ar_SA' ? logoAr : logoEn;
            },
        },
        methods: {
            toggleLanguage(name) {
                const {protocol} = window.location;
                this.$i18n.locale = name;
                document.documentElement.lang = name;
                document.documentElement.dir = name === 'ar_SA' ? 'rtl' : 'ltr';
                document.documentElement.style.fontSize = name === 'ar_SA' ? '12px' : '14px';
                this.OTC_URL = `${protocol}${OTC_URL}?lang=${name}`;
                this.EX_URL = `${protocol}${EX_URL}?lang=${name}`;
                localStorage.setItem('lang', name);
            },
            jumpEX() {
                this.showCoinCoinModal = true;
                // window.open(this.EX_URL, '_blank')
            },
        },
        mounted() {
            const {protocol} = window.location;
            if (window.location.search) {
                const route = window.location.search.split('=')[1];
                localStorage.setItem('lang', route);
            }
            const lang = localStorage.getItem('lang') || 'ar_SA';
            this.$i18n.locale = lang;
            this.OTC_URL = `${protocol}${OTC_URL}?lang=${lang}`;
            this.EX_URL = `${protocol}${EX_URL}?lang=${lang}`;
            document.documentElement.lang = lang;
            document.documentElement.dir = lang === 'ar_SA' ? 'rtl' : 'ltr';
            document.documentElement.style.fontSize = lang === 'ar_SA' ? '12px' : '14px';
            localStorage.setItem('lang', lang);
        },
        beforeDestroy() {
            if (this.interval) clearInterval(this.interval);
        },
    };
</script>

<style lang="less">
    li {
        list-style: none;
    }

    .layout-header {
        margin-bottom: -50px;
        z-index: 9;
        position: relative;
        height: 50px;
        line-height: 50px;
        background-color: #181C2A;
        &.has-bg {
            background-color: rgba(24, 28, 42, 0.62);
        }
    }

    .layout-logo {
        margin-right: 20px;
        display: inline-block;
        width: 110px;
        height: 22px;
        line-height: 22px;
    }

    .layout-logo > img {
        max-width: 100%;
        vertical-align: middle;
    }

    .layout-nav {
        margin: 0 auto !important;
        padding: 0 10px 0 20px;
        .layout-nav-item {
            display: inline-block;
            vertical-align: top;
            &-link {
                padding: 0 10px;
                display: inline-block;
                cursor: pointer;
                color: #6199E8;
                &:hover {
                    color: #BBD5F9;
                }
                &.active {
                    color: #BBD5F9;
                    background-color: #323850;
                }
            }
        }
    }

    .bg-dark-blue {
        background: #0c2546;
    }

    .intro {
        p {
            unicode-bidi: plaintext;
        }
        margin-bottom: -20px;
        &-title {
            font-weight: bold;
            font-size: 24px;
            color: #fff;
            text-align: center;
        }
        &-btn {
            width: 206px;
            height: 52px;
            border: 0;
            border-radius: 3px;
            color: #fff;
            font-size: 12px;
        }
        #render {
            height: 640px;
            width: 100%;
            margin: 0;
            overflow: hidden;
            position: relative;
            background-size: cover;
            background-image: url("../assets/images/banner-en.jpg");
            background-position: 0 100%;
            background-repeat: no-repeat;
            .webgl-txt {
                position: absolute;
                height: 100%;
                width: 1200px;
                left: 50%;
                transform: translateX(-50%);
                background-size: contain;
                background-image: url("../assets/images/banner-text-en.png");
                background-position: 0 100%;
                background-repeat: no-repeat;
            }
            .render-jump-btn-group {
                position: absolute;
                bottom: 184px;
                width: 1200px;
                left: 50%;
                transform: translateX(-50%);
                text-align: left;
                button {
                    margin-right: 24px;
                    margin-left: 0;
                }
            }
        }
        &-box {
            height: 480px;
            width: 100%;
            overflow: hidden;
            &-inner {
                width: 1200px;
                margin: 0 auto;
                height: 100%;
                position: relative;
            }
        }
        &-linkbox {
            background: #0c2546;
            height: 438px;
            width: 100%;
            overflow: hidden;
            position: relative;
            &-inner {
                width: 1200px;
                margin: 0 auto;
                height: 100%;
                position: relative;
                .intro-partner {
                    margin-top: 100px;
                    overflow: hidden;
                    position: absolute;
                    left: 100px;
                    li {
                        cursor: pointer;
                        width: 265px;
                        height: 61px;
                        float: left;
                    }
                    &-1 {
                        background-image: url("../assets/images/OneMena-normal.png");
                        &:hover {
                            background-image: url("../assets/images/OneMena-hover.png");
                        }
                    }
                    &-2 {
                        background-image: url("../assets/images/inblockchain-normal.png");
                        &:hover {
                            background-image: url("../assets/images/inblockchain-hover.png");
                        }
                    }
                    &-3 {
                        background-image: url("../assets/images/jiedian.png");
                        &:hover {
                            background-image: url("../assets/images/jiedian-hover.png");
                        }
                    }
                    &-4 {
                        background-image: url("../assets/images/topsfund-normal.png");
                        &:hover {
                            background-image: url("../assets/images/topsfund-hover.png");
                        }
                    }
                }
                .intro-media {
                    margin-top: 100px;
                    overflow: hidden;
                    position: absolute;
                    left: 74px;
                    li {
                        cursor: pointer;
                        width: 352px;
                        height: 52px;
                        float: left;
                    }
                    &-1 {
                        background-image: url("../assets/images/media1.png");
                        &:hover {
                            background-image: url("../assets/images/media1-hover.png");
                        }
                    }
                    &-2 {
                        background-image: url("../assets/images/media2.png");
                        &:hover {
                            background-image: url("../assets/images/media2-hover.png");
                        }
                    }
                    &-3 {
                        background-image: url("../assets/images/media3.png");
                        &:hover {
                            background-image: url("../assets/images/media3-hover.png");
                        }
                    }
                }
                .intro-title {
                    padding-top: 110px;
                }
            }
        }
        &-two {
            position: relative;
            &-left {
                position: absolute;
                left: 100px;
                top: 114px;
            }
            &-right {
                right: 70px;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                &-img {
                    img {
                        width: 90px;
                    }
                    float: right;
                    margin-top: 60px;
                    width: 356px;
                    height: 90px;
                    color: #fff;
                    position: relative;
                    &-left {
                        position: absolute;
                        bottom: -26px;
                        left: 20px;
                    }
                    &-right {
                        position: absolute;
                        bottom: -26px;
                        right: 14px;
                    }
                }
                &-text {
                    text-align: right;
                    width: 488px;
                    line-height: 40px;
                    color: #fff;
                    font-size: 24px;
                }
            }
        }
        &-three {
            &-left {
                width: 563px;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                display: inline-block;
                margin-left: 72px;
                &-mid {
                    text-align: center;
                    color: #979797;
                    position: absolute;
                    left: 50%;
                    transform: translate(-45%, -50%);
                    top: 50%;
                    &-p1 {
                        font-size: 21px;
                        font-weight: bold;
                        color: #fff;
                    }
                }
                &-left {
                    position: absolute;
                    color: #47BDFF;
                    left: 54px;
                    bottom: 70px;
                }
                &-right {
                    position: absolute;
                    color: #47BDFF;
                    right: 62px;
                    bottom: 70px;
                }
                &-top {
                    position: absolute;
                    left: 50%;
                    color: #8FFF70;
                    transform: translate(-33%);
                    top: 0;
                }
                &-bot {
                    position: absolute;
                    left: 50%;
                    color: #FF3030;
                    transform: translate(-33%);
                    bottom: 4px;
                }
            }
            &-right {
                position: absolute;
                right: 70px;
                top: 50%;
                transform: translateY(-50%);
                &-text-1 {
                    font-weight: bold;
                    text-align: right;
                    font-size: 24px;
                    color: #fff;
                    margin-bottom: 20px;
                }
                &-text-2 {
                    text-align: right;
                    font-size: 16px;
                    width: 310px;
                    color: #fff;
                }
            }
        }
        &-coincoin {
            &-left {
                text-align: left;
                position: absolute;
                top: 50%;
                width: 426px;
                left: 122px;
                transform: translateY(-50%);
                &-text-1 {
                    font-weight: bold;
                    font-size: 24px;
                    color: #fff;
                    margin-bottom: 38px;
                }
                &-text-2 {
                    font-size: 16px;
                    color: #fff;
                    margin-bottom: 8px;
                }
            }
            &-right {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 0;
                width: 560px;
            }
        }
        &-four {
            &-btn-1 {
                background: #2881f0;
                margin-right: 20px;
                &:hover {
                    background: #1d5fb0;
                }
            }
            &-btn-2 {
                background: transparent;
                border: 1px solid #4b678c;
            }
            &-right {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 70px;
                text-align: right;
                &-text-1 {
                    font-weight: bold;
                    font-size: 24px;
                    color: #fff;
                    margin-bottom: 38px;
                }
                &-text-2 {
                    font-size: 16px;
                    color: #fff;
                    margin-bottom: 8px;
                }
                &-text-3 {
                    font-size: 16px;
                    color: #fff;
                }
            }
            &-left {
                position: absolute;
                top: 50%;
                left: 72px;
                transform: translateY(-50%);
                &-shield {
                    position: absolute;
                    color: #16345A;
                    font-size: 22px;
                    left: 50%;
                    transform: translateX(-50%);
                    bottom: 100px;
                }
            }
        }
        &-five {
            width: 100%;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            .intro-title {
                margin-bottom: 110px;
            }
            &-line {
                overflow: hidden;
                &-item {
                    float: left;
                    text-align: center;
                    width: 30%;
                    margin-right: 5%;
                    &:last-child {
                        margin-right: 0;
                    }
                    img {
                        width: 200px;
                        height: 88px;
                        margin-bottom: 34px;
                    }
                    &-title {
                        color: #fff;
                        font-weight: bold;
                        font-size: 16px;
                        margin-bottom: 10px;
                    }
                    &-cont {
                        color: #BCDAFF;
                    }
                }
            }
        }
        &-six {
            position: absolute;
            bottom: 0;
            &-bg {
                background-image: url('../assets/images/intro-six-bg.png');
                background-repeat: no-repeat;
                background-position: 0 100%;
            }
            &-item {
                text-align: center;
                width: 356px;
                float: left;
                margin-right: 66px;
                height: 400px;
                position: relative;
                &:nth-last-child(1) {
                    margin-right: 0;
                }
                img {
                    margin-bottom: 0;
                }
                .six-bg {
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                }
            }
            &-text-1 {
                font-size: 16px;
                color: #529fff;
                margin-bottom: 10px;
            }
            &-text-2 {
                font-size: 12px;
                color: #529fff;
                margin-bottom: 20px;
                .loc {
                    display: inline-block;
                    vertical-align: middle;
                    width: 24px;
                }
            }
            &-text-3 {
                font-size: 14px;
                color: #fff;
                line-height: 20px;
            }
        }
        &-box-last {
            height: 280px;
            width: 100%;
        }
        &-box-footer {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        .jump-btn-group {
            text-align: center;
            width: 100%;
            button {
                width: 208px;
                height: 56px;
                margin: 0 12px;
                background: rgba(12, 37, 70, .9);
            }
            .coinCoin-btn {
                color: #72A2CB;
                border: 1px solid #486E90;
            }
            .currencyCoin-btn {
                border: 2px solid #3BA3FF;
            }
        }
    }

    [dir='rtl'] {
        .intro {
            #render {
                background-image: url("../assets/images/banner-ar.jpg");
                .render-jump-btn-group {
                    text-align: right;
                    button {
                        margin-right: 0;
                        margin-left: 24px;
                    }
                }
            }
        }
        .layout-header, .jump-btn-group {
            direction: rtl;
        }
        .jump-btn-group {
            unicode-bidi: initial;
        }
        .layout-nav-left {
            float: right;
        }
        .layout-nav-right {
            float: left;
        }
        .intro #render .webgl-txt {
            background-image: url("../assets/images/banner-text-ar.png");
        }
        .layout-logo {
            margin-right: 0;
            margin-left: 20px;
        }
        .intro-six-text-2 {
            direction: rtl;
        }
        .intro-coincoin-left {
            left: 0;
            &-text-1 {
                text-align: right;
            }
            &-text-2 {
                text-align: right;
            }
        }
    }
</style>
