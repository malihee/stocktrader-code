
<template>
  <div class="container">
      <Stock v-for="(st, ind) in all_stocks()" :class="[ind%2 == 0 ? 'left' : 'right']" :key="st.id" :stock="st" />
  </div>
</template>

<script>
import Stock from './Stock.vue'
import { mapGetters} from 'vuex'
export default {
  name: 'Stocks',
  components:{
    Stock,
  },
  // created(){
  //   this.fetching()
  // },
  methods:{
    // ...mapActions('stocks',['fetchdata']),
    ...mapGetters('stocks',['all_stocks']),
    // fetching(){
    //   this.fetchdata()
    // }
  }
}
</script>

<style scoped>
.container {
 
  height: auto;
  width: 80%;
  border-style: solid;
  border-width: 0.5px;
  border-radius: 5px; 
  border-color: rgba(161, 160, 160, 0.308);
  margin : 10px auto;
  padding: 20px  ;
  /* position: relative; */
  overflow: hidden;
}
.left{
  /* background-color: rgb(9, 75, 97); */
 clear: both;
 float: left;
  margin-bottom: 10px;
  /* position: absolute; */
}
.right{
  /* background-color: rgb(223, 35, 123); */
  float: right;
   margin-bottom: 10px;
  /* position: absolute; */
}
</style>