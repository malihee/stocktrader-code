
<template>
  <div class="containerr">
      <div class="header"> 
          {{stock.name}}(price: {{stock.price}})</div>
      <div class="body"> 
          <input type="number" placeholder="Quantity" v-model="quantity">
          <button @click="add_Portfolio()"> Buy </button>   
      </div>
  </div>
</template>

<script>
import { mapActions} from 'vuex'
export default {
    name:'Stock',
    data(){
        return{
            quantity:''
        }
    },
    props:{
        stock: Object
    },
    methods:{
        ...mapActions('portfolio',['addToPortfolio']),
        add_Portfolio(){
            this.addToPortfolio({stock:this.stock, quantity:this.quantity})
        }
    }
}

</script>

<style scoped>
.containerr{
    height: 100px;
    width: 45%;
    border-style: solid;
    border-width: 1px;
    border-radius: 5px;
    border-color:  rgba(161, 160, 160, 0.308);

}
.header{
    background-color: lightgreen;
    height: 40%;
    width: 100%;
    /* padding: 10px; */
}
.body{
     height: 60%;
     width: 100%;
     padding: 10px;
}
</style>