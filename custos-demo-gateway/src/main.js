import Vue from 'vue';
import App from './App.vue';
import router from "./router.js";
import store from './new-service/store';
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue';
import Vuelidate from 'vuelidate';
import VueTypeaheadBootstrap from 'vue-typeahead-bootstrap';


import './styles.scss';

Vue.use(BootstrapVue)
Vue.use(Vuelidate)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.component('vue-typeahead-bootstrap', VueTypeaheadBootstrap)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')


