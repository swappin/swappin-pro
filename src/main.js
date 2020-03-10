import './firebase'
import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from 'vue-router'
import { firestorePlugin } from 'vuefire'
import Login from './pages/login/login.vue';
import Pedidos from './pages/pedidos.vue';
import Produtos from './pages/produtos.vue';
import Signup from './pages/signup.vue';
import editProfile from './pages/editProfile.vue';
import historic from './pages/historic.vue';
import report from './pages/report.vue';

import Notifications from 'vue-notification';
import vueAwesomeCountdown from 'vue-awesome-countdown';
import ToggleButton from 'vue-js-toggle-button';
import InputTag from 'vue-input-tag';
import VueSimpleAlert from "vue-simple-alert";
import VueApexCharts from 'vue-apexcharts';
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'

import ImageUploader from 'vue-image-upload-resize'

Vue.use(ImageUploader);

Vue.use(VueMoment, {
    moment,
})

Vue.component('apexchart', VueApexCharts)

Vue.use(VueSimpleAlert);

Vue.use(ToggleButton)
Vue.use(vueAwesomeCountdown, 'vac')
Vue.use(Notifications)
Vue.use(firestorePlugin)
Vue.use(VueRouter)

Vue.use(BootstrapVue)

Vue.component('apexchart', VueApexCharts)
Vue.config.productionTip = false

const router = new VueRouter({
  routes: [
    { path: '/login',  component: Login },
    { path: '/pedidos', component: Pedidos },
    { path: '/produtos', component: Produtos },
    { path: '/signup', component: Signup },
    { path: '/editProfile', component: editProfile },
    { path: '/historic', component: historic },
    { path: '/report', component: report },

  ]
})



new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
