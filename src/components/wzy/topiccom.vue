<template>
  <div id="topic">
    <myhead></myhead>
    <!-- 搜索框代码 -->
    <div class="searchbody">
      <span class="title" style="padding-top: 30px;margin-left: 20%;">豌豆</span>
      <span class="title" style="padding-top: 40px;">射手</span>
      <img src="../../../static/images/pea.png" style="width: 30px; height: auto;" />
      <input id="userinput" type="text" v-model="message" placeholder="搜索你感兴趣的话题" @keyup.enter="start()" />
      <input id="startsearch" type="submit" value="搜索" v-on:click="start()" />
    </div>
    <!-- 搜索框代码 -->
    <!-- 主代码 -->
    <div class="mybody">
      <el-page-header @back="backtotopicpage" content="话题页">
      </el-page-header>
      <div class="bodyleft">
        <div class="topictitle">
          话题：{{ topic.title }}<br /><br /><br />
          描述：{{topic.content}}
        </div>
        <!-- 输入评论代码 -->
        <div id="publish" >
          <textarea placeholder="输入你的评论.." v-model="userinput"></textarea>
          <input type="submit" value="发表评论" v-on:click="sendcomment">
        </div>
        <div class="thecomment">
          <div id="comment" v-for="num in comments" class="m-margin-top-big">
            <div class="commentleft">
              <img src="../../../static/images/pea.png" v-on:click="tomypage(num.user_id)" />
            </div>
            <div class="commentright">
              <div class="username m-margin-top-big">{{num.username}}</div>
              <div class="usercontent">{{num.content}}</div>
              <div class="metadata">
                <span class="date">{{formatDate(new Date(num.create_time*1000))}}</span>
              </div>
              <div class="usercontent">回复</div>
            </div>
          </div>
        </div>
        <!-- 分页的elementUI分页组件 -->
        <!-- <div class="pageblock">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="5">
          </el-pagination>
        </div> -->
        <!-- 输入评论代码 -->
        <div id="publish" >
          <textarea placeholder="输入你的评论.." v-model="userinput"></textarea>
          <input type="submit" value="发表评论" v-on:click="sendcomment">
        </div>
      </div>
      <div class="bodyright">
        <myhotlist></myhotlist>
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
        comments:[],//存储服务器返回信息
        message:'',//搜索框的输入信息
        userinput:'',//用户输入的评论内容
        user_id:window.sessionStorage.getItem('user_id'),//登录用户id
        total:1000,//分页总页数
        commentdate:0,
      }
    },
    methods:{
      formatDate(date) {
        var year=date.getFullYear();
        var month=date.getMonth()+1;
        var day=date.getDate();
        var hour=date.getHours();
        var minute=date.getMinutes();
        var second=date.getSeconds();
        this.commentdate = year + '-' +
        (String(month).length > 1 ? month : '0' + month) + '-' +
        (String(day).length > 1 ? day : '0' + day) + ' ' +
        (String(hour).length > 1 ? hour : '0' + hour) + ':' +
        (String(minute).length > 1 ? minute : '0' + minute) + ':' +
        (String(second).length > 1 ? second : '0' + second)
        // return
        //   year + '-' +
        //   (String(month).length > 1 ? month : '0' + month) + '-' +
        //   (String(day).length > 1 ? day : '0' + day) + ' ' +
        //   (String(hour).length > 1 ? hour : '0' + hour) + ':' +
        //   (String(minute).length > 1 ? minute : '0' + minute) + ':' +
        //   (String(second).length > 1 ? second : '0' + second)
      },
      backtotopicpage(){
        this.$router.push("/topic")
      },
      start:function(){
        alert(this.message)
      },
      tomypage:function(id){ },
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
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        }).then(function (res) {
          _this.$message.success("添加评论成功！")
          console.log(res)
          console.log("添加评论成功")
          console.log("当前评论的用户id"+_this.user_id)
        })
        this.$router.go(0);
        // location.reload();
      },
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
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
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
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      }).then(function (res) {
        const r=res.data
        _this.topic=r.data
        console.log(_this.topic)
      })
    }
  }
</script>

<style scoped>
  .thecomment {
    background-color: white;
    width: 70%;
    margin: auto;
    margin-top: 3%;
    border-radius: 10px;
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
    background-color: white;
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
    width: 74%;
    height: auto;
    margin: auto;
    margin-top: 3%;
    overflow: hidden;
    box-sizing: border-box;
  }
  #publish textarea {
    width: 80%;
    height: 50px;
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
    float: right;
    margin-right: 2%;
    height: 50px;
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
    width: 76%;
    padding: 17% 15% 17% 15%;
    overflow: hidden;
    /* border: 1px solid; */
    /* background-image: linear-gradient(#42B983, #45A049); */
    background-image: url(../../../static/images/background2.jpg);
    border-radius: 10px;
    text-align: left;
    margin: auto;
    font-size: x-large;
    font-weight: bold;
  }
  #comment {
    padding-top: 3%;
    text-align: left;
    overflow: hidden;
    /* background-color: white; */
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
