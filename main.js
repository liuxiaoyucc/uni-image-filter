import Vue from 'vue'
import App from './App'
import helper from './helper/helper.js';

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$helper = helper;
const app = new Vue({
    ...App
})
app.$mount()
