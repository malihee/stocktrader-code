
<template>

  <div class="container">
      <div class="containerr" v-for="(st , ind) in pg" :key="st.id" :class="[ind%2 == 0 ? 'left' : 'right']">
      <div class="header"> 
          {{st.name}}(price:{{st.price}} | quantity:{{st.earn_quantity}})
      </div>
      <div class="body"> 
          <input type="number" placeholder="Quantity" v-model="st.sell_quantity">
          <!-- <font-awesome-icon icon="fa-solid fa-trash" /> -->
          <font-awesome-icon :icon="['fas', 'trash']" @click="deleteStock(st)"/>
         
      </div>

  </div>
      <!-- {{portfolioGetter()}} -->
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    name:'Portfolio',
    data(){
        return{
            data:[],
            quantity:''
        }
    },
    created:function(){
    //    this.fetchPortfolio()
        this.portfolioGetter()
    },

    computed: {
    ...mapGetters('portfolio',{
        pg: 'portfolioGetter',
        fund :'getfund'
    }),
},
    methods:{
       ...mapActions('portfolio',['fetchPortfolio','deleteStockfromPortfolio']),
       ...mapGetters('portfolio',['portfolioGetter']),
        deleteStock(st){
            this.deleteStockfromPortfolio({stock:st , quantity:this.quantity})
        }
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
  padding: 20px;
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
.containerr{
    height: 100px;
    width: 45%;
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    border-color:  rgba(161, 160, 160, 0.308);

}
.header{
    background-color: lightblue;
    height: 40%;
    width: 100%;
    /* padding: 10px; */
}
.body{
     height: 60%;
     width: 100%;
     padding: 10px;
}
.item {
    /* padding-left: 2px; */
    /* padding-right: 2px; */
    color: lightslategray;
}
</style>