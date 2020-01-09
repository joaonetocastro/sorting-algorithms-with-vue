// require('./bootstrap');

import Vue from 'vue';
import router from 'vue-router';
import PureVueChart from 'pure-vue-chart';
import HomeComponent from './components/HomeComponent.vue';

Vue.component("PureVueChart",PureVueChart);

// Using Vuetify
import Vuetify from 'vuetify'

Vue.use(Vuetify)
// const vuetify = new Vuetify({});


const app = new Vue({
  vuetify: new Vuetify(),
  el: "#app",
  components: {
    HomeComponent,
  }
});
