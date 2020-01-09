// require('./bootstrap');

import Vue from 'vue';
import router from 'vue-router';
import PureVueChart from 'pure-vue-chart';
import HomeComponent from './components/HomeComponent.vue';
import MyColumnChart from './components/MyColumnChart.vue';

Vue.component("PureVueChart",PureVueChart);
// Using Vuetify
import Vuetify from 'vuetify'

Vue.use(Vuetify)
// const vuetify = new Vuetify({});

Vue.component('my-column-chart',MyColumnChart);

const app = new Vue({
  vuetify: new Vuetify(),
  el: "#app",
  components: {
    MyColumnChart,
    HomeComponent,
  }
});
