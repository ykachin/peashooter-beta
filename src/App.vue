<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
    <router-view name="header"></router-view>
    <router-view v-if="isRouterAlive" name="body"></router-view>
    <router-view name="footer"></router-view>
  </div>
</template>



<script>

export default {

  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive:true
    }
  },
  methods:{
    reload(){
      this.isRouterAlive=false
      this.$nextTick(function () {
        this.isRouterAlive=true
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
</style>
