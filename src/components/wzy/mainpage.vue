<template>
  <!-- 该组件为主页页面 -->
  <!--
  该页该页的主要功能为:
  显示所有分享,即share表当中的内容(已经实现)
  搜索指定的分享(未完成,只做了搜索框的样式,
          原计划通过start函数获取输入信息,进而对服务器进行信息查询,再渲染到页面)
  内容分页(未完成,
          只引入了elementUI的分页样式,然后绑定了页数)
  进入个人主页功能(未完成,
          原计划通过tomypage函数获取指定的用户id,然后传递参数进而实现页面跳转)

  该页样式:不建议修改.

  该页业务说明:主页页面是将share当中的数据通过get方法获取直接渲染到页面当中,和recommend页面(推荐页面)有些不同
  -->
  <div id="recommend">
    <!-- 页首 -->
    <myhead></myhead>
    <!-- 搜做框代码 -->
    <div class="searchbody">
      <!-- <img src="../assets/teamlogo.png" style="padding-left: 20%; width: 60px; height: auto;"/> -->
      <span class="title" style="padding-top: 30px;margin-left: 20%;">豌豆</span>
      <span class="title" style="padding-top: 40px;">射手</span>
      <img src="../../static/img/u402.png" style="width: 30px; height: auto;" />
      <input id="userinput" type="text" v-model="message" placeholder="搜索你感兴趣的话题" @keyup.enter="start()" />
      <input id="startsearch" type="submit" value="搜索" v-on:click="start()" />
    </div>
    <!-- 搜做框代码 -->

    <!-- 主题代码 -->
    <div class="mybody">
      <div class="bodyleft">
        <div class="item" v-for="num in shares.slice(pagenum,pagenum+onepagelinum)"> <!-- 限制十个推荐 -->
          <div id="itemleft">
            <!-- <img v-bind:src="img"/> -->
            <img src="../../static/img/u402.png" v-on:click="tomypage(num.user_id)"/>
          </div>
          <div id="itemright">
            <div class="name">{{num.title}}</div>
            <div class="tag">{{num.tags}}</div>
            <div class="article">
              <strong>一句话分享：</strong>{{num.content}}
            </div>
            <div class="article">
              <!-- <strong>内容链接：</strong> -->
              <a v-bind:href="'http://129.204.247.165/'+num.route" title="点击打开链接"> <strong>内容链接</strong> </a>
              <textarea readonly="readonly">http://129.204.247.165/{{num.route}}</textarea>
            </div>
            <div class="shareto">
              <strong>分享到：</strong> 微博、微信、QQ
            </div>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="pageblock">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total" >
          </el-pagination>
        </div>
      </div>
      <div class="bodyright">
        <taglist></taglist>
        <myhotlist></myhotlist>
      </div>
    </div>
    <!-- 主题代码 -->
    <!-- 页尾 -->
    <myfoot></myfoot>
  </div>
</template>

<script>
  import myhead from './myhead.vue'
  import myfoot from './myfoot.vue'
  import myhotlist from './body/myhotlist.vue'
  import taglist from './body/taglist.vue'

  export default {
    name: 'recommend',
    components: {
      myhead,
      myfoot,
      myhotlist,
      taglist,
    },
    data:function(){
      return{
        message:"",
        shares:[],
        pagenum:0,
        onepagelinum:10,
        total:10,//分页总页面
      }
    },
    methods:{
      start:function(){
        console.log(this.message)
        alert(this.message)
      },
      tomypage:function(id) {
        //跳转到id对应的用户主页
      }
    },
    created() {
      const _this=this;
      this.$axios({
        method: 'get',
        url: '/api/shares',
      }).then(function (res) {
        const r=res.data
        _this.shares=r.data
        _this.total=_this.shares.length
        // console.log(_this.shares.item.content)
      }).catch(function (res) {
        console.log("数据获取成功。。。")
      })
    }
  }
</script>

<style scoped>
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
  #itemcon hr {
    width: 90%;
  }
  .item {
    width: 90%;
    margin: auto;
    margin-bottom: 3%;
    border: 1px solid;
    background-image: linear-gradient(to bottom right, burlywood, bisque);
    overflow: hidden;
    text-align: left;
    /* border-radius: 10px; */
  }
  #itemleft {
    float: left;
    width: 10%;
    overflow: hidden;
    padding: 1%;
  }
  #itemleft img {
    float: left;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    margin: 10%;
  }
  #itemright {
    float: right;
    width: 86%;
    overflow: hidden;
    padding: 1%;
  }
  #itemright .name{
    text-align: left;
    float: left;
    padding: 2%;
    font-size: x-large;
    font-family: "bookman old style";
    font-weight: bold;
  }
  #itemright .tag{
    text-align: left;
    float: left;
    padding: 1%;
    font-family: "幼圆";
    font-weight: bold;
    font-size: x-small;
    background-color: crimson;
    border-radius: 5px;
    color: #FFFFFF;
    margin-top: 2%;
  }
  #itemright .article{
    text-align: left;
    float: left;
    width: 96%;
    /* background-color: #CCCCCC; */
    padding: 2%;
  }
  #itemright .article a {
    padding: 3px;
    background-color: lightseagreen;
    float: left;
    border-radius: 5px;
    color: #CCCCCC;
  }
  #itemright .article a:hover {
    color: black;
  }
  #itemright .shareto{
    text-align: right;
    float: left;
    width: 96%;
    padding: 1% 1% 2% 1%;
  }
  #itemright textarea{
    width: 50%;
    height: 15px;
    padding: 1%;
    border-radius: 5px;
    resize: none;
    background-color: blanchedalmond;
  }
</style>
