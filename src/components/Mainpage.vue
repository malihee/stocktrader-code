<template>
  <div class="container">
      <h1>Trade or view your portfolio</h1>
      <p>you may save and load your data</p>
      <p>click on 'end day' to begining a new day</p>
      <hr>
      <h2>your Funds: {{getfund}} $</h2>
      <router-view></router-view>
      <!-- <Stocks/>
      <Portfolio/> -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name:'Mainpage',

    computed:{
      ...mapGetters('portfolio', ['getfund'])
    },
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
}
</style>