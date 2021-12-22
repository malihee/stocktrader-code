import Vuex from 'vuex'
import Vue from 'vue'
import stocks from './modules/stocks'
import portfolio from './modules/portfolio'


Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        stocks,
        portfolio
    }
    
});