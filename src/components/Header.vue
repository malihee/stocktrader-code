
<template>
  <div class="header">
    <h5 class="header-elem"><router-link to ="/Mainpage"> Stock Trader </router-link></h5>
    <h5 class="header-elem"><router-link to ="/Portfolio"> Portfolio </router-link></h5>
    <h5 class="header-elem"><router-link to ="/Stocks"> Stocks </router-link></h5>
    <h5 class="header-elem" @click="enddDay"><a href ="#"> End Day </a></h5>
    <div class="dropdown">
    <h5 class="dropbtn, header-elem "> Save/Load </h5>
    <div class="dropdown-content">
      <a @click="save"> save data</a>
      <a  @click="load">load data</a>
    </div>
    </div>
    <!-- <h4 class="header-elem" @click="saveAndLoad"> </h4> -->
    <v-spacer></v-spacer>
    <!-- <h4 class="header-elem"> fund: {{portfolio.fund}} $</h4> -->
    <h5 class="header-elem"> fund: {{getfund()}} $</h5>
    
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    created(){
      this.fetchingfund()
    },
    watch:{
      getfund(){
        console.log('lll',this.getfund);
      }
    },
    methods:{
      ...mapActions('stocks', ['endDay']),
      ...mapActions('portfolio',['fetchfund', 'savePortfolio', 'loadPortfolio']),
      ...mapGetters('portfolio',['getfund']),
      // ...mapMutations('portfolio')

      fetchingfund(){
        this.fetchfund()
      },
      enddDay(){
        this.endDay()
      },
      save(){
        this.savePortfolio()
      },
      load(){
        this.loadPortfolio()
      }
    }
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
.header-elem{
  padding: 2%;
  display: inline-block;
  text-decoration: none;
}


/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {background-color: #ddd;}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {display: block;}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {background-color: #3e8e41;}
</style>