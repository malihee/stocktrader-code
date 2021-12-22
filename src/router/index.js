
import Vue from 'vue';
import Router from 'vue-router';
// import Dashboard from '@/views/Dashboard';
Vue.use(Router);
// importing the components
import Stocks from '../components/Stocks.vue'
// import Stock from './components/Stock.vue'
import Portfolio from '../components/Portfolio.vue'
import Mainpage from '../components/Mainpage.vue'

const routes = [
    { path: '/Stocks', component: Stocks },
    { path: '/Portfolio', component: Portfolio },
    { path: '/Mainpage', component: Mainpage }
  ]
  
//   const router = new VueRouter({
//     routes // short for `routes: routes`
//   })
  
  export default new Router({
    routes,
  });
  