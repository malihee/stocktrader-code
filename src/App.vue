<template>
  <div>
    <Header/>
    <router-view></router-view>
  </div>
</template>

<script>

import Header from './components/Header.vue'
import { mapActions } from 'vuex'

  export default {
    name: 'App',
    data(){
      return{
        data:[]
      }
    },
     methods:{
        ...mapActions('portfolio',['fetchPortfolio']),
        ...mapActions('stocks',['fetchdata']),
        // ...mapGetters('stocks',['all_stocks']),
       
        // this.portfolioGetter()
    },
    created:function(){
      this.fetchPortfolio()
      this.fetchdata()
    },

    components: {
      Header
    },

    // computed:{
    //   ...mapState(['portfolio']),
    //   ...mapGetters(['getfund'])
    //   }
  }

</script>

<style scoped>
.header{
  width: 80%;
  height: 50 px;
  border-style: solid;
  border-width: 0.5px;
  border-radius: 5px; 
  border-color:  rgba(161, 160, 160, 0.308);
  /* color: white; */
  background-color: rgba(218, 218, 218, 0.432);
  margin : 20px auto;
  padding: 20px;
}


</style>
