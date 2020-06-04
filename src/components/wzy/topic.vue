<template>
  <div id="topic">
    <Myhead></Myhead>
    <!-- 搜索框代码 -->
    <div class="searchbody">
      <!-- <img src="../assets/teamlogo.png" style="padding-left: 20%; width: 60px; height: auto;"/> -->
      <span class="title" style="padding-top: 30px;margin-left: 20%;">豌豆</span>
      <span class="title" style="padding-top: 40px;">射手</span>
      <img src="../../../static/images/pea.png" style="width: 30px; height: auto;" />
      <!-- <input id="userinput" type="text" v-model="message" placeholder="搜索你感兴趣的话题" @keyup.enter="start()" />
      <input id="startsearch" type="submit" value="搜索" v-on:click="start()" /> -->
    </div>
    <!-- 搜索框代码 -->
    <!-- 主代码 -->

    <div class="mybody">
      <div class="bodyleft">
        <div style="background-color: white; border-radius: 10px;">
          <div class="alltopic">
            <i class="el-icon-reading">  全部话题</i>
          </div>

          <el-collapse v-model="activeName" accordion>
            <el-collapse-item v-for="(item, index) in topics" :name="index">
              <div slot="title" style="padding-left: 150px;width: 100%;" @click="getConment(item.id)">
                <div>
                  <p class="itemnew">new</p>
                  <p class="itemtitle" @click="gototopicid(item.id)"><strong>{{item.title}}</strong></p>
                  <i class="el-icon-chat-dot-square" style="float: left;margin-top: 18px;">{{item.content}}</i>
                </div>
              </div>
              <div style="padding-left: 100px;width: 100%;">
                <div v-for="num in comments.slice(0,6)">
                  <p class="itemcomment" @click="gototopicid(item.id)">{{num.username}}:{{num.content}}</p>
                </div>
                <p class="getmore" @click="gototopicid(item.id)">查看更多</p>
              </div>
            </el-collapse-item>
          </el-collapse>

          <!-- elementUI分页组件 -->
          <div class="pageblock">
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="pageSize"
              :total="total"
               v-if="pageSize < total">
            </el-pagination>
          </div>
        </div>
      </div>

      <div class="bodyright">
        <myhotlist></myhotlist>
      </div>
    </div>
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
        user_id:window.sessionStorage.getItem('user_id'),//登录用户id
        total:100,//分页页数
        pageSize:10,
        activeName: '1',
        show:1,
        itemTitle:"",
        comments:[],
      }
    },
    methods:{
      getConment(topicid) {
        this.comments = []
        const _this = this
        const formData = new FormData()
        formData.append('id', topicid)
        //获取topic_id相对应的评论
        this.$axios({
          method: 'post',
          url: '/api/topics/getcomment',
          data:formData,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        }).then(function (res) {
          const r=res.data
          _this.comments=r.data
          console.log(_this.comments)
        })
      },

      /**跳转到话题详情页
       * @param {Object} id 话题id
       */
      gototopicid(id) {
        this.$router.push("/topic/"+id)
      },

      //搜索框输入
      start:function(){
        console.log(this.message)
        // alert(this.message)
      },
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
        console.log("_this.total="+_this.total+",_this.pageSize="+_this.pageSize)
      })
    }
  }
</script>

<style scoped>
  .alltopic {
    background-image: linear-gradient(#239DC2, #F2F2F2);
    padding: 5%;
    font-size: xx-large;
  }
  .getmore {
    float: left;
    padding: 5px;
    margin: 5px;
    background-color: #D39819;
    border-radius: 5px;
    color: #FFFFFF;
  }
  .getmore:hover {
    background-color: chocolate;
    color: #FFFFFF;
  }
  .itemcomment {
    float: left;
    background-color: #73B309;
    margin: 5px;
    padding: 5px;
    border-radius: 5px;
    color: white;
  }
  .itemcomment:hover {
    background-color: #45A049;
  }
  .itemtitle{
    float: left;
    margin-top: 18px;
    margin-right: 8px;
    font-size: large;
  }
  .itemnew{
    background-color: #CD0A0A;
    float: left;
    margin-top: 15px;
    margin-right: 8px;
    padding: 1px;
    border-radius: 3px;
    color: #FFFFFF;
    font-size: smaller;
  }
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
    height: 85px;
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
    min-height: 550px;
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
    /* background-color: #000000; */
  }
  .one {
    border-radius: 5px;
    text-align: center;
    /* margin: 3%; */
    padding: 10px;
    background-color: #F0F0F0;
  }
  .one:hover {
    background-color: #CCCCCC;
  }
</style>
