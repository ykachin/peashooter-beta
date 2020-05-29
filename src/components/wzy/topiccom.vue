<template>
  <!-- 该组件为话题详情页面 -->
  <!--
  该页该页的主要功能为:
  显示所有分享,即topic表当中的内容(已经实现)
  搜索指定的分享(未完成,只做了搜索框的样式,
          原计划通过start函数获取输入信息,进而对服务器进行信息查询,再渲染到页面)
  评论分页(未完成,
          只引入了elementUI的分页样式,然后绑定了页数)
  回复评论(未完成,
          毫无设计想法)
  进入个人主页功能(未完成,
          原计划通过tomypage函数获取指定的用户id,然后传递参数进而实现页面跳转)

  该页样式:不建议修改.

  该页业务说明:话题页面是将所有的topic表中的内容显示在话题页面当中
  -->
  <div id="topic">
    <myhead></myhead>
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
    <!-- 搜索框代码
    <div class="searchbody">
       <img src="../assets/teamlogo.png" style="padding-left: 20%; width: 60px; height: auto;"/>
      <span class="title" style="padding-top: 30px;margin-left: 20%;">豌豆</span>
      <span class="title" style="padding-top: 40px;">射手</span>
      <img src="../../../static/images/pea.png" style="width: 30px; height: auto;" />
       以下为搜索输入框和提交按钮
      <input id="userinput" type="text" v-model="message" placeholder="搜索你感兴趣的话题" @keyup.enter="start()" />
      <input id="startsearch" type="submit" value="搜索" v-on:click="start()" />
    </div>
     搜索框代码 -->
    <!-- 主代码 -->
    <div class="mybody m-margin-top-large" style="background-color:white;padding-right:30px" >

      <el-page-header @back="backtotopicpage" content="话题页">
      </el-page-header>

    <div class="mybody">
      <div class="bodyleft">
        <div class="topictitle">
          话题：{{ topic.title }}<br /><br /><br />
          描述：{{topic.content}}
        </div>
        <div id="comment" v-for="num in comments" class="m-margin-top-big">
          <div class="commentleft">
            <img src="../../../static/images/pea.png" v-on:click="tomypage(num.user_id)" />
          </div>
          <div class="commentright">
            <div class="username m-margin-top-big">{{num.username}}</div>
            <div class="usercontent">{{num.content}}</div>
            <!--<div class="thecomment">
              共有9条回复，点击查看
            </div>-->
          </div>
        </div>
        <el-divider></el-divider>
        <!-- 分页的elementUI分页组件 -->
        <div class="pageblock">
          <!--<el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="5">
          </el-pagination>-->
        </div>
        <!-- 输入评论代码 -->
        <div id="publish" >
          <textarea id="subject" placeholder="输入你的评论.." v-model="userinput"></textarea>
          <input class='m-margin-top' style='text-align: center' type="submit" value="发表评论" v-on:click="sendcomment">
        </div>
      </div>
      <div class="bodyright">
        <myhotlist></myhotlist>
      </div>
    </div>

    </div>
    <!-- 主代码 -->
    <myfoot></myfoot>
  </div>
</template>

<script>
  import myhead from '../myhead.vue'
  import myfoot from '../myfoot.vue'
  import myhotlist from './body/myhotlist.vue'

  export default {
    inject:['reload'],
    name: 'topic',
    components: {
      myhead,
      myfoot,
      myhotlist, //热榜组件
    },
    data:function() {
      return{
        topic:"话题内容",
        topic_id:3,//话题id，跳转页面时传入参数
        // topic_id:this.$route.params.topic_id,
        comments:[],//存储服务器返回信息
        message:'',//搜索框的输入信息
        userinput:'',//用户输入的评论内容
        user_id:window.sessionStorage.getItem('user_id'),//登录用户id
        // user_id:window.sessionstorage.getItem（‘user_id’）
        // pagetotal:comments.length,
        total:1000,//分页总页数
      }
    },
    methods:{
      backtotopicpage(){
        this.$router.push("/topic")
      },
      start:function(){
        alert(this.message)
      },
      tomypage:function(id){
        //跳转到个人主页
        //window.sessionstorage.setItem（‘user_id’,id）
        // this.reload();
      },
      //该函数是向服务器发送用户输入的评论
      async sendcomment(){
        //获取topicid
        const _this=this
        console.log('路径')
        console.log(this.$route.path.split('/').length)
        console.log(this.$route.path.split('/')[2])
        if(this.$route.path.split('/')[2]!=='-1'){
          this.topic_id=this.$route.path.split('/')[2]
          console.log('当前路径'+this.$route.path.split('/')[2])
        }
        else{}
        const d = {
          content:this.userinput,
          user_id:window.sessionStorage.getItem('user_id') ,
          topic_id:this.topic_id,
        }
        console.log(d)
        await this.$axios({
          method: 'post',
          url: '/api/comments',
          data:this.$qs.stringify(d),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        }).then(function (res) {
          _this.$message.success("添加评论成功！")
          console.log(res)
          console.log("添加评论成功")
          console.log("当前评论的用户id"+_this.user_id)
        })
        /*setTimeout(this.$router.go(0),1000);*/
        /*this.reload();*/
        this.$router.go(0);
        // location.reload();
      }
    },
    created() {
      this.topic_id=this.$route.path.split('/')[2]
      const d = {
        id:this.topic_id,
      }
      const _this = this
      const id =this.topic_id
      //获取topic_id相对应的评论
      this.$axios({
        method: 'post',
        url: '/api/topics/getcomment',
        data:this.$qs.stringify(d),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      }).then(function (res) {
        const r=res.data
        _this.comments=r.data
        console.log(_this.comments)
        _this.total=_this.comments.length
        console.log(_this.total)
        console.log("当前用户id为："+_this.user_id)
      })
      //获取topic_id对应的title
      this.$axios({
        method: 'get',
        url: '/api/topics/'+id,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      }).then(function (res) {
        const r=res.data
        _this.topic=r.data
        console.log(_this.topic)
      })
      //添加用户评论
      // this.sendcomment()
      // this.reload();
    }
  }
</script>

<style scoped>
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
  #publish textarea {
    width: 97%;
    height: 100px;
    padding: 1%;
    border-radius: 4px;
    resize: vertical;
  }

  #publish input[type=submit] {
    background-color: #4CAF50;
    padding: 1%;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
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
  .topictitle {
    width: 80%;
    padding: 5%;
    overflow: hidden;
    border: 1px solid;
    /* background-color: #45A049; */
    /* background-image: linear-gradient(to bottom right, #42B983, #45A049); */
    background-image: linear-gradient(#42B983, #45A049);
    border-radius: 10px;
    text-align: left;
    margin: auto;
    font-size: x-large;
    font-weight: bold;
  }
  #comment {
    width: 80%;
    margin: auto;
    margin-top: 3%;
    text-align: left;
    overflow: hidden;
    /* box-shadow: 3px 5px 5px #737879; */
    /* border-radius: 10px; */
    /* background-color: bisque; */
    /* background-image: linear-gradient(to bottom right, burlywood, bisque); */
  }
  #comment .commentleft {
    width: 10%;
    float: left;
    padding: 1%;
  }
  #comment .commentleft img {
    float: right;
    width: 50%;
    border-radius: 5px;
  }
  #comment .commentright {
    width: 86%;
    float: right;
  }
  #comment .username {
    text-align: left;
    font-family: "bookman old style";
    font-size: x-large;
  }
  #comment .usercontent{
    text-align: left;
    font-family: "幼圆";
    padding: 2%;
  }
</style>
