import Vue from 'vue';
import elementUI from "@/plugins/elementui";
import App from './App'


Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    elementUI
}).$mount('#app')
