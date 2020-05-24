<template>
  <div>
    <div  class="m-container m-padded-tb-large animated fadeIn">
      <div class="ui container" style="height:500px; background:url(./static/images/bg4.jpg)no-repeat;background-size: cover;">
        <div class="eight wide column">
          <div class="ui stackable grid">
            <div class="wide column two-size-center">
              <div style="margin-top:180px">
                <nav class="mainNavs">
                  <a class="ui big-font" style="color: lightseagreen">豌豆射手</a>
                </nav>
                <br>
                <br>
                <div class="right m-item item m-mobile-hide">
                  <form name="search" action="#"  method="post" target="_blank">
                    <div class="ui icon inverted white input m-margin-tb-tiny">
                      <input type="text" name="query" :query='query' v-model="query"  placeholder="书名、电影名、歌曲名..." style="width: 500px">
                      <i @click="search" class="search link icon"></i>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="eleven wide column">
        </div>
      </div>






      <div  class="m-container m-padded-tb-large animated fadeIn">
        <div class="ui container">
          <div class="ui stackable grid">
            <div class="eleven wide column">
              <work-info ref="workInfo" v-if="!isindex"></work-info>
              <work-index ref="wordIndex" v-if="isindex"></work-index>
            </div>
            <!--右边的top-->
            <div class="five wide column">
              <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                :default-openeds="['1']" router>
                <el-submenu index="1" >
                  <template slot="title">
                    <i class="el-icon-s-grid"></i>
                    <span>热门作品</span>
                  </template>

                  <el-menu-item  :index="'/work/'+item.id+''" v-for="(item,index) in works" :key="item.id" style="text-align: left"><div class="ui red horizontal label">New</div><router-link :to="'/work/' + item.id" :key="$route.fullPath" @click.native="flushCom">&laquo;{{item.title}}&raquo;</router-link></el-menu-item>

                </el-submenu>
              </el-menu>
              <!--最新推荐-->
              <!--<div class="ui segments ">
                <div class="ui blue segment ">
                  <i class="bookmark icon"></i>热门作品
                </div>
                <div class="ui segment left aligned"  :index="index+''" v-for="(item,index) in works" :key="item.id">
                  <div class="ui red horizontal label">New</div><a href="#"  target="_blank" class="m-black m-text-thin" >&laquo;{{item.title}}&raquo;</a>
                </div>

              </div>-->
            </div>

          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>

  import axios from 'axios'
  import workInfo from "./work/workInfo";
  import workindex from "./workindex";
  /*Vue.prototype.$axios = axios;*/
  export default {
    components:{
      workInfo:workInfo,
      workIndex:workindex
    },
    inject:['reload'],
    data(){
      return {
        query:'',
        isindex:true,
        works:{},
        tableData:[],
        comments:{},
        workid:'',
        workItem:{},
        thispagecomments:{},
        addComment:{
          content:'',
          user_id:'1',
          topic_id:''
        }
      }
    },
    /*activated() {
      this.getList()
      console.log(this.$route.path.split('/').length)
      console.log(this.$route.path.split('/')[2])
      if(this.$route.path.split('/')[2]!=='-1'){
        this.isindex=false
        console.log('当前路径'+this.$route.path.split('/')[2])
        this.workid=this.$route.path.split('/')[2]
        //没有对应作品的评论，所以。。。
        this.topic_id=this.$route.path.split('/')[2]
      }
      else{

      }
    },*/
    created(){
      this.getList()
      console.log(this.$route.path.split('/').length)
      console.log(this.$route.path.split('/')[2])
      if(this.$route.path.split('/')[2]!=='-1'){
        this.isindex=false
        console.log('当前路径'+this.$route.path.split('/')[2])
        this.workid=this.$route.path.split('/')[2]
        //没有对应作品的评论，所以。。。
        this.topic_id=this.$route.path.split('/')[2]
      }
      else{

      }
      //获取对应id的作品内容
      /*this.$axios({
        method: 'get',
        url: '/api/works/'+this.workid,
      }).then(function (res) {
        const r=res.data
        _this.works=r.data
        /!*console.log(res)
        console.log('获取作品名',r.data[0].title)
        console.log(11111111111)*!/

      }).catch(function (res) {
        console.log("获取作品发生异常！请稍后重试...")
      })*/

      /*let data = {username:'testadmin',password:'testadmin'};
      axios.post(`/api/adminuser/login`,data)
        .then(res=>{
          console.log('res=>',res);
        })
*/
    },
    methods:{
      search(){
        const _this=this
        /*const d={query:this.query}
        console.log(d)
        this.$axios({
          method: 'post',
          url: '/api/works/query',
          data:this.$qs.stringify(d),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        }).then(function (res) {
          console.log(res)
          console.log("查找作品成功")

        }).catch(function (res) {
          console.log(res)
          console.log("查找作品失败")
        })*/
        /*this.$router.push('/work/query/'+this.query)*/
        window.sessionStorage.setItem('query',this.query)
        this.flushCom()
      },
      flushCom:function(){
        this.$router.go(0);
      },
      /*formatDate(value) {
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
      },*/
      getList(){
        const _this=this
        /*//增加topic
        const d={title:'科幻',author:'1',content:'科幻类电影'}
        console.log(d)
        this.$axios({
          method: 'post',
          url: '/api/topics',
          data:this.$qs.stringify(d),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        }).then(function (res) {
          console.log(res)
          console.log("添加话题成功")

        }).catch(function (res) {
          console.log("添加话题失败")
        })*/
        //删除
        /*this.$axios({
          method: 'delete',
          url: '/api/works',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        }).then(function (res) {
          console.log(res)
          console.log("删除作品成功")

        }).catch(function (res) {
          console.log("删除作品失败")
        })*/
        //增加作品
        /*const d={title:'寻',introduction:'《寻》里的笛声模拟风声和鸟鸣，鼓点穿越赤道季风，排山倒海的和音奇妙不已，让《寻》成为季风以南的旖旎冒险，带来舒心和愉悦。'}
        console.log(d)
        this.$axios({
          method: 'post',
          url: '/api/works',
          data:this.$qs.stringify(d),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        }).then(function (res) {
          console.log(res)
          console.log("添加作品成功")

        }).catch(function (res) {
          console.log("添加作品失败")
        })*/
        //增加comment
        /*const d={
          content:'好棒啊',
          user_id:1,
          post_id:3
        }
        console.log(d)
        this.$axios({
          method: 'post',
          url: '/api/comments',
          data:this.$qs.stringify(d),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        }).then(function (res) {
          console.log(res)
          console.log("添加评论成功")

        }).catch(function (res) {
          console.log("添加评论失败")
        })*/
        //获取评论
        /*this.$axios({
          method: 'get',
          url: '/api/comments',
        }).then(function (res) {
          const r=res.data
          _this.comments=r.data
          console.log(_this.comments)
        }).catch(function (res) {
          console.log("获取评论异常！请稍后重试...")
        })*/
        //获取作品类
        this.$axios({
          method: 'get',
          url: '/api/works',
        }).then(function (res) {
          const r=res.data
          _this.works=r.data
          /*console.log(res)
          console.log('获取作品名',r.data[0].title)
          console.log(11111111111)*/

        }).catch(function (res) {
          console.log("获取作品发生异常！请稍后重试...")
        })
      },
      submitForm() {
        const _this=this
        /*this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            axios.get("http://129.204.247.165/articles").then(function (resp) {
              console.log(resp)
              _this.$router.push("/work")
              /!*console.log(11111111111111111111)*!/
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });*/
        console.log(this.addComment)
        /*this.$axios({
          method: 'post',
          url: '/api/comments',
          data:this.$qs.stringify(this.addComment)
        }).then(function (res) {
          _this.$message.success("添加评论成功！")
          console.log(res)
          console.log('报错了吗')
          _this.reload()
          console.log('报错了吗')
          /!*_this.getList()*!/
        }).catch(function (res) {
          console.log(res)
          console.log("添加评论异常！请稍后重试...")
        })*/

      },
      /*page(getpages){

      },*/
    }
  }


</script>

<style scoped>

</style>
