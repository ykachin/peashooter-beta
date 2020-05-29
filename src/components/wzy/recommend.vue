<template>
  <!-- 该组件为推荐页面 -->
  <!--
  该页该页的主要功能为:
  显示所有分享,即share表中 热门 的内容(已经实现)
  搜索指定的分享(未完成,只做了搜索框的样式,
          原计划通过start函数获取输入信息,进而对服务器进行信息查询,再渲染到页面)
  内容分页(未完成,
          只引入了elementUI的分页样式,然后绑定了页数)
  进入个人主页功能(未完成,
          原计划通过tomypage函数获取指定的用户id,然后传递参数进而实现页面跳转)

  该页样式:不建议修改.

  该页业务说明:主页页面是将share当中的数据通过gethot方法获取直接渲染到页面当中,和mainpage页面(主页页面)有些不同
  -->
  <div id="recommend">
    <!-- 页首 -->
    <myhead></myhead>
    <!-- 搜做框代码 -->
    <!-- 搜索框代码 -->
    <div class="searchbody" style="background-color: white;opacity:0.8">
      <!-- <img src="../assets/teamlogo.png" style="padding-left: 20%; width: 60px; height: auto;"/> -->
      <span class="title" style="padding-top: 30px;margin-left: 20%;">豌豆</span>
      <span class="title" style="padding-top: 40px;">射手</span>
      <img src="../../../static/images/pea.png" style="width: 30px; height: auto;" />
      <input id="userinput" type="text" v-model="message" placeholder="搜索你感兴趣的推荐" @keyup.enter="start()" />
      <input id="startsearch" type="submit" value="搜索" v-on:click="start()" />
    </div>
    <!-- 搜索框代码 -->
    <!--<div class="searchbody">
      &lt;!&ndash; <img src="../assets/teamlogo.png" style="padding-left: 20%; width: 60px; height: auto;"/> &ndash;&gt;
      <span class="title" style="padding-top: 30px;margin-left: 20%;">豌豆</span>
      <span class="title" style="padding-top: 40px;">射手</span>
      <img src="../../../static/images/pea.png" style="width: 30px; height: auto;" />
      <input id="userinput" type="text" v-model="message" placeholder="搜索你感兴趣的话题" @keyup.enter="start()" />
      <input id="startsearch" type="submit" value="搜索" v-on:click="start()" />
    </div>-->
    <!-- 搜做框代码 -->

    <!-- 主题代码 -->
    <div class="mybody">
      <div class="bodyleft">
        <div class="item1" v-for="num in shares"> <!-- 限制十个推荐 -->
          <div id="itemleft">
            <!-- <img v-bind:src="img"/> .slice(pagenum,pagenum+onepagelinum)-->
            <img src="../../../static/images/pea.png" v-on:click="tomypage(num.user_id)"/>
            <p align="center">{{num.username}}</p>
          </div>
          <div id="itemright">
            <div class="name">{{num.title}}</div>
            <div class="tag">{{num.tags}}</div>
            <div class="article">
              <strong>一句话分享：</strong>{{num.content}}
            </div>
            <div class="article" >
              <!-- <strong>内容链接：</strong> -->
              <!-- <a v-bind:href="'http://129.204.247.165/'+num.route"
                title="点击打开链接"
                @click="checkpoint(num.points)"
                target="_blank">
                <strong>内容链接</strong>
              </a>
              <label readonly="readonly" style="background-color:white">http://129.204.247.165/{{num.route}}</label> -->


              <!-- 内容链接 -->
              <p style="float: left;
                padding: 3px;
                background-color: #6BC4E0;
                color: #F2F2F2;
                border-radius: 3px;"
                v-bind:title="'http://129.204.247.165/'+num.route">
              内容链接
              </p>
              <!-- 文件下载 -->
              <!-- <p style="float: left;
                padding: 3px;
                background-color: #6BC4E0;
                color: #F2F2F2;
                border-radius: 3px;
                margin-left: 8px;"
                @click="downloadfile(num.id,user_id)"
                :title="'累计下载'+num.times+'次'">
              下载
              </p> -->
              <!-- 内容预览 -->
              <p style="float: left;
                padding: 3px;
                background-color: #6BC4E0;
                color: #F2F2F2;
                border-radius: 3px;
                margin-left: 8px;"
                @click="showimg(num.route)"
                v-show="hadpay === 1">
              预览
              </p>

              <div v-if="num.points > 0">
                <!-- <strong>分享到：</strong> 微博、微信、QQ -->
                <p style="padding: 3px;
                    background-color: #CD0A0A;
                    float: left;
                    color: #F2F2F2;
                    border-radius: 4px;
                    margin-left: 8px;"
                    v-show="hadpay === 0">
                  需要 {{num.points}} 积分
                </p>

                <p style="padding: 3px;
                    background-color: #4CAF50;
                    float: left;
                    color: #F2F2F2;
                    border-radius: 4px;
                    margin-left: 8px;"
                    v-show="hadpay === 1">
                  已经支付{{num.points}}积分，可点击下载
                </p>
              </div>
              <div v-if="num.points === 0">
                <!-- <strong>分享到：</strong> 微博、微信、QQ -->
                <!-- <p style="float: right; color: #D39819">无需积分</p> -->
                <p style="padding: 3px;
                    background-color: #D39819;
                    float: left;
                    color: #F2F2F2;
                    border-radius: 4px;
                    margin-left: 8px;"
                    @click="downloadfile(num.id,user_id)"
                    :title="'累计下载'+num.times+'次'">
                    无需积分/点击下载
                </p>
              </div>
              <!-- <p style="float: right;color: #8F949A;">下载次数:{{num.times}}</p> -->
            </div>
          </div>
        </div>
        <!--总条数{{total}}-->
        <el-divider></el-divider>

        <!-- 支付积分提示窗口 -->
        <el-dialog
          title="付给积分提示"
          :visible.sync="payDialogVisible"
          width="30%">
          <div>
            资源标题：  <br>
            所需积分：  <br>
            我的积分：
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="payDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="payPoints(curResId, payResPoints)">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 图片预览窗口 -->
        <el-dialog
          title="文件预览"
          :visible.sync="documentView"
          width="30%">
          <img width="50%" :src="imgroute" />
          <span slot="footer" class="dialog-footer">
            <!-- <el-button @click="documentView = false">取 消</el-button> -->
            <el-button type="primary" @click="documentView = false">关 闭</el-button>
          </span>
        </el-dialog>

        <div class="pageblock">
          <el-pagination
            @current-change="handleCurrentChange"
            background
            layout="prev, pager, next"
            :page-size="20"
            :total="total" >
          </el-pagination>
        </div>
      </div>
      <div class="bodyright">
        <div class="mybody m-margin-top-large" style="background-color:white" >
        <myhotlist></myhotlist>
        </div>
      </div>
    </div>
    <!-- 主题代码 -->
    <!-- 页尾 -->
    <myfoot></myfoot>
  </div>
</template>

<script>
  import myhead from '../myhead.vue'
  import myfoot from '../myfoot.vue'
  import myhotlist from './body/myhotlist.vue'

  export default {
    name: 'recommend',
    components: {
      myhead,
      myfoot,
      myhotlist,
    },
    data:function(){
      return{
        message:"",//搜索框输入
        shares:[],//服务器返回的信息
        pagenum:0,//
        onepagelinum:5,
        total:0,
        payDialogVisible:false,
        documentView:false,
        hadpay:0,
        imgroute:"",
        user_id:window.sessionStorage.getItem('user_id'),//登录用户id
        // pagetotal:this.shares.length,
      }
    },
    methods:{
      /**判断是否支付过改资源
       * @param {Object} id
       * @param {Object} userid
       */
      judgepay(id, userid) {
        const _this = this
        const formData = new FormData()
        formData.append('id', id)
        formData.append('user_id', userid)
        // console.log("id="+id+",userid="+userid+",this.userid="+this.user_id)
        this.$axios({
          url: '/api/shares/jud',
          method: 'post',
          data: formData,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (res) {
          console.log("id="+id+",user_id="+userid)
          console.log(res.data.data)
          _this.hadpay = res.data.data
        })
      },

      /**请求下载文件，使times属性的值加一
       * @param {Object} id 文件id
       * @param {Object} userid 下载文件的用户id
       */
      downloadfile(id, userid) {
        const formData = new FormData()
        formData.append('id', id)
        formData.append('user_id', userid)
        console.log("id="+id+",userid="+userid+",this.userid="+this.user_id)
        this.$axios({
          url: '/api/shares/getfile',
          method: 'post',
          data: formData,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        }).then(function (res) {
          console.log("id="+id+",user_id="+userid)
          console.log(res)
        })
      },
      /**文件预览
       * @param {Object} route 文件路径
       */
      showimg(route) {
        this.imgroute = "http://129.204.247.165/"+route;
        this.documentView = true;
      },
      checkpoint(points) {
        if (points > 0) {
          this.payDialogVisible = true;
        }
      },
      //处理页码改变后的shares数据
      async handleCurrentChange(current){
        this.page=current
        const a={page:this.page}
        console.log('当前页码为')
        console.log(this.page)
        const _this=this
        await this.$axios({
          method: 'post',
          url: '/api/shares/gethot',
          data:this.$qs.stringify(a)
        }).then(function (res) {
          const __this =_this
          const r=res.data
          _this.shares=r.data
          console.log("得到的某一页shares总信息")
          console.log(_this.shares)

        }).catch(function (res) {
          console.log(res)
          console.log("得到的某一页shares总信息发生异常！请稍后重试...")
        })
        console.log('该页下的数据')
        console.log(_this.shares)
      },

      start(){
        // console.log(this.message)
        alert(this.message)
      },

      tomypage(user_id) {
        //跳转到id对应的用户主页
        //window.sessionstorage.setItem（‘user_id’,id）
      }
    },
    async created() {
      const _this=this;
      this.$axios({
        method: 'post',
        url: '/api/shares/gethot',
      }).then(function (res) {
        console.log('shares取到了')
        console.log(res)
        const r=res.data
        _this.shares=r.data
        // console.log(_this.shares.item.content)
      }).catch(function (res) {
        console.log("数据获取成功。。。")
      })
      //获取全部shares个数
      await this.$axios({
        method: 'post',
        url: '/api/shares/getcount',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      }).then(function (res) {
        console.log(res)
        _this.total= parseInt(res.data.data)
        console.log("查找全部shares条数成功")
        console.log(_this.total)
      }).catch(function (res) {
        console.log("查找全部shares条数失败")
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
  .item1 {
    width: 90%;
    margin: auto;
    margin-bottom: 3%;
    border: 1px solid;
    background-color: white;
    opacity:0.9;
    overflow: hidden;
    text-align: left;
    border-radius: 10px;
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
    padding: 3px;
    font-family: "幼圆";
    font-weight: bold;
    font-size: x-small;
    background-color: orangered;
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
