<template>
  <!-- 搜索框代码 -->
  <div class="searchbody" style="background-color: white;opacity: 0.8">
    <!-- <img src="../assets/teamlogo.png" style="padding-left: 20%; width: 60px; height: auto;"/> -->
    <span class="title" style="padding-top: 30px;margin-left: 20%;">豌豆</span>
    <span class="title" style="padding-top: 40px;">射手</span>
    <img src="../../../static/images/pea.png" style="width: 30px; height: auto;" />
    <input id="userinput" type="text" v-model="message" placeholder="搜索你感兴趣的资源" @keyup.enter="start()" />
    <input id="startsearch" type="submit" value="搜索" v-on:click="start()" />
  </div>
  <!-- 搜索框代码 -->
  <!--<div class="searchbody">
    &lt;!&ndash; <img src="../assets/teamlogo.png" style="padding-left: 20%; width: 60px; height: auto;"/> &ndash;&gt;
    <span class="title" style="padding-top: 30px;margin-left: 20%;">豌豆</span>
    <span class="title" style="padding-top: 40px;">射手</span>
&lt;!&ndash;    <img src="../../static/img/u402.png" style="width: 30px; height: auto;" />&ndash;&gt;
    <input id="userinput" type="text" v-model="message" placeholder="搜索你感兴趣的话题" @keyup.enter="start()" />
    <input id="startsearch" type="submit" value="搜索" v-on:click="start()" />
  </div>-->
</template>

<script>
  import ResCategories from "./ResCategories";
  import ResCategoryItem from "./ResCategoryItem";

  export default {
    name: "TopBar",
    components: {
      ResCategories,
      ResCategoryItem
    },
    data() {
      return {
        message:"",
      }
    },
    methods: {
      start:function(){
        console.log(this.message)
        alert(this.message)
      },
    }
  }
</script>

<style scoped>
  .searchbody {
    overflow: hidden;
    background-color: #DDDDDD;
    height: auto;
  }
  .title{
    font-family:"幼圆";
    font-size: 30px;
    font-weight: bold;
    color: #42B983;
    float: left;
  }
  .searchbody img {
    float: left;
    display: block;
    padding-top: 1%;
  }
  .searchbody input[type=text]{
    width: 30%;
    padding: 1%;
    margin: 2% 0 2% 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  .searchbody input[type=submit] {
    width: 5%;
    background-color: #4CAF50;
    color: white;
    padding: 1%;
    margin: 2% 0 2% 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .searchbody input[type=submit]:hover {
    background-color: #45a049;
  }
</style>
