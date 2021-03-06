import Vue from 'vue'
import VueI18n from 'vue-i18n';
import messages from './locale';
import App from './App'
import iView from 'iview';
import _P from './assets/js/public';
import store from './store';

import './plugins/axios';

Vue.use(iView);
Vue.use(_P);
Vue.use(VueI18n);

const i18n = new VueI18n({
    locale: 'zh_CN',
    messages,
    fallbackLocale: 'zh_CN',
});

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    components: {App},
    i18n,
    store,
    template: '<App/>'
});
