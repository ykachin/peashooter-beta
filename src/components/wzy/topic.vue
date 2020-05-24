<template>
  <!-- 该组件为话题页面 -->
  <!--
  该页该页的主要功能为:
  显示所有分享,即topic表当中的内容(已经实现)
  搜索指定的分享(未完成,只做了搜索框的样式,
          原计划通过start函数获取输入信息,进而对服务器进行信息查询,再渲染到页面)
  内容分页(未完成,
          只引入了elementUI的分页样式,然后绑定了页数)
  点击话题进入话题详情页(未完成,
          原计划通过totopicid函数获取话题id进而进行跳转)

  该页样式:不建议修改.

  该页业务说明:话题页面是将所有的topic表中的内容显示在话题页面当中
  -->
  <div id="topic">
    <Myhead></Myhead>
    <!-- 搜索框代码 -->
    <div class="searchbody" style="background-color: white;opacity:0.8">
      <!-- <img src="../assets/teamlogo.png" style="padding-left: 20%; width: 60px; height: auto;"/> -->
      <span class="title" style="padding-top: 30px;margin-left: 20%;">豌豆</span>
      <span class="title" style="padding-top: 40px;">射手</span>
      <img src="../../../static/images/pea.png" style="width: 30px; height: auto;" />
      <input id="userinput" type="text" v-model="message" placeholder="搜索你感兴趣的话题" @keyup.enter="start()" />
      <input id="startsearch" type="submit" value="搜索" v-on:click="start()" />
    </div>
    <!-- 搜索框代码 -->
    <!-- 主代码 -->

        <div class="mybody m-margin-top-large" style="background-color:white;padding-right:30px" >
          <div class="bodyleft">
            <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              :default-openeds="['1']" router>
              <el-submenu index="1" >
                <template slot="title">
                  <i class="el-icon-s-grid"></i>
                  <span>全部话题</span>
                </template>

                <el-menu-item  :index="'/topic/'+item.id+''" v-for="(item,index) in topics" :key="item.id" style="text-align: left">话题：{{ item.title }}&emsp;|&emsp;描述：{{item.content}}</el-menu-item>

              </el-submenu>
            </el-menu>
            <!--<div style="margin: 1%; padding: 2%; text-align: left; font-size: x-large;">
              <strong> 全部话题: </strong>
            </div>
            <div class="singletopic" v-for="topic in topics" @click="totopicid(topic.id)">
              话题：{{ topic.title }}&emsp;|&emsp;描述：{{topic.content}}
            </div>
            <el-divider></el-divider>-->
            <!-- elementUI分页组件 -->
            <div class="pageblock">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="total">
              </el-pagination>
            </div>
          </div>
          <div class="bodyright">
            <myhotlist></myhotlist>
          </div>
        </div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <!-- 主代码 -->
    <Myfoot></Myfoot>
  </div>
</template>

<script>
  /*import myhead from './myhead.vue'
  import myfoot from './myfoot.vue'*/
  import Myhead from '../myhead'
  import Myfoot from '../myfoot'
  import myhotlist from './body/myhotlist.vue'

  export default {
    inject:['reload'],
    name: 'topic',
    components: {
      Myhead,
      Myfoot,
      myhotlist, //热榜组件
    },
    data:function() {
      return{
        message:'',//搜索框输入内容
        topics:[],//服务器返回信息
        user_id:1  ,//登录用户id
        total:100,//分页页数
        // user_id:window.sessionstorage.getItem（‘user_id’）
      }
    },
    methods:{
      //搜索框输入
      start:function(){
        console.log(this.message)
        alert(this.message)
      },
      //跳转到指定的话题详情页
      totopicid:function(id){
        console.log(id)
        // this.$route.push({name:'./topiccom', params:{topic_id:id}})//代码不可用
      }
    },
    created() {
      const d = {
        id:this.topic_id,
      }
      const _this = this
      //获取topic_id相对应的评论
      this.$axios({
        method: 'get',
        url: '/api/topics',
        data:this.$qs.stringify(d),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      }).then(function (res) {
        const r=res.data
        _this.topics=r.data
        console.log(_this.topics)
        _this.total=_this.topics.length
        console.log(_this.total)
      })
    }
  }
</script>

<style scoped>
  .singletopic{
    border: 1px solid;
    text-align: left;
    padding: 2%;
    margin: 1%;
  }
  .thecomment {
    float:right;
    font-size: x-small;
  }
  .pageblock{
    padding: 1%;
    width: 80%;
    margin: auto;
    margin-bottom: 5%;
  }
  .searchbody {
    overflow: hidden;
    background-color: #DDDDDD;
    height: auto;
  }
  .searchbody img {
    float: left;
    display: block;
    padding-top: 1%;
  }
  .title{
    font-family:"幼圆";
    font-size: 30px;
    font-weight: bold;
    color: #42B983;
    float: left;
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
  #publish {
    width: 80%;
    height: auto;
    margin: auto;
    overflow: hidden;
    box-sizing: border-box;
  }
  .mybody{
    width: 80%;
    height: auto;
    margin: auto;
    overflow: hidden;
  }
  .bodyleft{
    float: left;
    margin-top: 1%;
    width: 77%;
    height: auto;
    border-radius: 10px;
    padding: 1%;
  }
  .bodyright{
    text-align: center;
    float: right;
    width: 20%;
    height: auto;
    padding-top: 1%;
    margin-top: 1%;
    padding-bottom: 1%;
    overflow: hidden;
  }
</style>
