// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import {router} from './router'
import store from "./store";
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false
Vue.use(iView);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  render: function (h) {
    // return h('div','Welcome,Sean <router-view></router-view>');
    return h(App);
  }
})
