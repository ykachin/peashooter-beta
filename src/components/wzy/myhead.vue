<template>
  <div>
    <div class="headbody">
      <a class="opleft">&emsp;&emsp;</a>
      <a class="op" href="" @click="">豌豆</a>
      <a class="op" href="" @click="">广场</a>
      <a class="op" href="" @click="">推荐</a>
      <!-- <a class="op" href="" @click=""><router-link to="/recommend"> 推荐 </router-link></a> -->
      <a class="op" href="" @click="">资源</a>
      <a class="op" href="" @click="totopic()">话题</a>
      <!-- <a class="op" href="" @click=""><router-link to="/topic"> 话题 </router-link></a> -->
      <a class="op2" href="" @click="">登录</a>
    </div>
    <router-view></router-view>
  </div>

</template>

<script>
  export default {
    name: 'myhead',
    data(){
      return{}
    },
    methods:{
      totopic:function(){
        this.$router.push({path:'/topic'})
      }
    }
  }
</script>

<style scoped>
  .headbody{
    overflow: hidden;
    background-color: #333;
  }
  .headbody .op{

    float: left;
    display: block;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 2%;
    text-decoration: none;
    font-size: large;
  }
  .headbody .op:hover{
    background-color: #ddd;
    color: black;
  }
  .headbody .op2{
    float: right;
    display: block;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 4%;
    text-decoration: none;
    font-size: large;
  }
  .opleft {
    float: left;
    display: block;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }
</style>
