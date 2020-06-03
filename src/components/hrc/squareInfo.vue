<template>

<div>
  <myhead></myhead>
  <!--左边广场列表-->

    <!--header-->
<div class="eleven wide column m-container m-padded-tb-large animated fadeIn">
    <div id="zuiwaimian" class="ui attached  segment" >
      <div class="ui padded vertical segment m-padded-tb-large" >
          <div id="button_gc"><button class="ui button blue" @click="fhgc">&lt;返回广场页面</button></div>
        <div class="ui middle aligned mobile reversed stackable grid" >
        
          <div class="five wide column center aligned" >
            <a  target="_blank">
              <img id="jianjieimage" v-bind:src="this.workItem.route"   alt="" class="ui rounded image">
              <br/>
              <div style="font-size:15px" class="ui horizontal label">
                <p class="ui head">&laquo;{{this.workItem.title}}&raquo;</p>
              </div>


            </a>
          </div>
          <div class="eleven wide column">
            <span id="jianjiespan" class="ui blue horizontal label">简介</span><p id="jianjiep" class="m-text " style="text-align: left" ><span>&emsp;&emsp;</span>{{this.workItem.content}}</p>
          </div>



        </div>
        <div id="ziyuanbar1" class="eleven wide column ">
          <span class="ui yellow horizontal label">分数:{{(this.workItem.score)/10}}</span>
        </div>
        <div id="ziyuanbar2" class="eleven wide column ">
          <span class="ui blue horizontal label ">资源链接:</span><a :href="this.workItem.url" target="_blank">{{this.workItem.url}}</a>
        </div>
        <div id="ziyuanbar3" class="eleven wide column ">
          <span class="ui orange horizontal label ">标签:  {{this.workItem.tags}}</span>
        </div>
        <div id="ziyuanbar4" class="eleven wide column ">
          <span class="ui orange horizontal label purple">分类:  {{this.trastatus[this.workItem.status]}}</span>
        </div>

      </div>
      

    </div>

    <!--content-->
    <div class="ui bottom attached segment">
      <div  class="ui bottom attached " >
        <!--留言区域列表-->
        <div id="comment-container"  class="ui teal segment">
          <div >
            <div class="ui threaded comments" style="max-width: 100%;">
              <h3 class="ui dividing header">评论</h3>
              <div class="comment" v-for="(item,index) in thispagecomments" :key="item.idx">
                <a class="avatar">
                  <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" >
                </a>
                <div class="content" style="text-align: left">
                  <a class="author" >
                    <span >{{item.username}}</span>
                  </a>
                  <div class="metadata">
                    <span class="date">{{formatDate(new Date(item.create_time*1000))}}</span>
                  </div>
                  <div class="text" >
                    {{item.content}}
                  </div>
                  <div class="actions" >
                    <a class="reply" data-commentid="1" data-commentnickname="Matt"  @click="reply(item.user_id)" >回复</a>
                  </div>
                </div>
               
              </div>
            </div>
          </div>
        </div>
        <div v-if="isemptycomment===true">评论为空，快来抢第一个沙发吧！<br><br></div>
        <!--分页-->
        <!--<el-pagination
          background
          layout="prev, pager, next"
          page-size="10"
          :total="61"
          @current-page="page">
        </el-pagination>-->
        <br/>

        <div id="comment-form" class="ui form m-margin-tb-big ">
          <input type="hidden" name="blog.id" >
          <input type="hidden" name="parentComment.id" value="-1">
          <div class="field">
            <textarea name="content" id="sub" placeholder="请输入评论信息..." v-model="addComment.content"></textarea>
          </div>
          <div class="fields">



            <!--<div class="field m-mobile-wide m-margin-bottom-small">
              <div class="ui left icon input">
                <i class="user icon"></i>
                <input type="text" name="nickname" placeholder="用户名" v-model="comment.userName">
              </div>
            </div>
            <div class="field m-mobile-wide m-margin-bottom-small">
              <div class="ui left icon input">
                <i class="mail icon"></i>
                <input type="text" name="email" placeholder="邮箱" v-model="comment.email">
              </div>
            </div>-->
            <div class="field  m-margin-bottom-small m-mobile-wide"style="width: 100%">
              <!--<button id="commentpost-btn " type="button" class="ui teal button m-mobile-wide" @onclick="submitForm"><i class="edit icon"></i>发布</button>-->
              <el-button type="primary" @click="submitForm">发布</el-button>
            </div>
          </div>

        </div>
      </div>
    </div>

</div>
<myfoot></myfoot>
</div>

</template>

<script>
  import axios from 'axios';
  import myfoot from "../myfoot";
  import myhead from "../myhead";
  /*Vue.prototype.$axios = axios;*/
  export default {
    props: "someprops",
    name: "workInfo",
    components: {
      myhead,
      myfoot
    },
    inject:['reload'],
    data(){
      return {
        isemptycomment:false,
        thispagecomments:[],
        works:{},
        tableData:[],
        comments:{},
        workid:'',
        workItem:{},
        addComment:{
          content:'',
          user_id:'1',
          topic_id:'1'
        },
        sonComment:{
          content:'',
          user_id:'',
          comment_id:''
        },
        trastatus:["电影","音乐","书籍","电视剧"],
        persontoken:window.sessionStorage.getItem('token'),
      }
    },  
    created(){
      var qs = require('qs');
      const  _this=this
      console.log(_this.personinfo)
      this.getList()
      //获取对应id的作品内容
      this.$axios({
        method: 'get',
        url: '/api/posts/'+this.workid,
      }).then(function (res) {
        console.log(res)
        const rs=res.data
        console.log(rs.data)
        _this.workItem=rs.data
        _this.workItem.route="http://129.204.247.165/"+ _this.workItem.route
      }).catch(function (res) {
        console.log("获取作品发生异常！请稍后重试...")
      })
      this.$axios({
        method: 'post',
        url: '/api/user/getbyaccess',
         data:qs.stringify({
          access_token:_this.persontoken,
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      }).then(function (res) {
        console.log("这是用户")
        console.log(res)
        const dres=res.data;
        _this.addComment.user_id=dres.data.id;
        console.log(_this.addComment);
      }).catch(function (res) {
        console.log(res);
        console.log("获取作品发生异常！请稍后重试...")
      })

    },
    methods:{
      fhgc(){
        this.$router.push("/square")
      },
      reply(fatherUser_id){
        console.log("fatherUser_id指的是？")
        console.log(fatherUser_id)
        this.sonComment.comment_id=fatherUser_id
        this.sonComment.user_id=window.sessionStorage.getItem('user_id')
        var input=document.getElementById('sub')
        input.value+='回复内容：'
      },
      formatDate(date) {
        var year=date.getFullYear();
        var month=date.getMonth()+1;
        var day=date.getDate();
        var hour=date.getHours();
        var minute=date.getMinutes();
        var second=date.getSeconds();
        //  return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
        return year + '-' + (String(month).length > 1 ? month : '0' + month) + '-' +
          (String(day).length > 1 ? day : '0' + day) + ' ' + (String(hour).length > 1 ? hour : '0' + hour) + ':' + (String(minute).length > 1 ? minute : '0' + minute)
          + ':' + (String(second).length > 1 ? second : '0' + second)
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
        var qs = require('qs');
        const _this=this
        console.log(this.$route.path.split('/').length)
        console.log(this.$route.path.split('/')[2])
        if(this.$route.path.split('/')[2]!=='-1'){
          this.isindex=false
          console.log('当前路径'+this.$route.path.split('/')[2])
          this.workid=this.$route.path.split('/')[2]
          //没有对应作品的评论，所以。。。
          this.addComment.post_id=this.$route.path.split('/')[2];
          this.addComment.work_id=0;
          this.addComment.topic_id=0;
        }
        else{}
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
        /*const d={title:'无名之辈'}
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
          content:'酷哦',
          user_id:3,
          topic_id:3
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
        //获取post评论
        this.$axios({
          method: 'post',
          url: '/api/posts/getcomment',
          data:qs.stringify({
           id:this.workid,
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        }).then(function (res) {
          console.log(res)
          const r=res.data
          _this.comments=r.data
          console.log("获取全部评论：")
          console.log(_this.comments)
          //获取对应id作品的评论
          console.log('aaaaaaaaaaaaaaaaaa')
          let data= [];
          console.log('_this.workid'+_this.workid)
          console.log(_this.comments)
        
          /*console.log('评论为空吗')
          console.log(data.length)
          console.log('data')
          console.log(data)
          if(data.length+''===0+''){
            console.log('评论是否为空的状态改了吗？')
            _this.isemptycomment=true
            console.log(_this.isemptycomment)
          }*/
          if(r.success+''=="false"+'')
          {
              console.log("为空")
              _this.isemptycomment=true;
          }
          else
          {
                for(let c in _this.comments){
            data.push(_this.comments[c]);
          }
          }
          _this.thispagecomments=data

        }).catch(function (res) {
          console.log("获取评论异常！请稍后重试...")
        })
        //获取评论
        /*this.$axios({
          method: 'get',
          url: '/api/comments',
        }).then(function (res) {
          const r=res.data
          _this.comments=r.data
          console.log("获取全部评论：")
          console.log(_this.comments)
          //获取对应id作品的评论
          console.log('aaaaaaaaaaaaaaaaaa')
          let data= [];
          console.log('_this.workid'+_this.workid)
          console.log(_this.comments)
          for(let c in _this.comments){
            console.log(_this.comments[c].topic_id)
            console.log(_this.workid)
            console.log(_this.comments[c].topic_id+''===_this.workid+'')
            if(_this.comments[c].topic_id+''===_this.workid+''){
              console.log('我要这个数据')
              data.push(_this.comments[c]);
            }
          }
          console.log('评论为空吗')
          console.log(data.length)
          console.log('data')
          console.log(data)
          if(data.length+''===0+''){
            console.log('评论是否为空的状态改了吗？')
            _this.isemptycomment=true
            console.log(_this.isemptycomment)
          }
          _this.thispagecomments=data

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

        }).catch(function (res) {
          console.log('这个嘛？')
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
        console.log('要加入的评论数据')
        console.log(this.addComment)
        this.$axios({
          method: 'post',
          url: '/api/comments',
          data:this.$qs.stringify(this.addComment)
        }).then(function (res) {
          _this.$message.success("添加评论成功！")
          console.log(res)
          console.log('报错了吗')
          _this.reload()
          console.log('报错了吗')
          /*_this.getList()*/
        }).catch(function (res) {
          console.log(res)
          console.log("添加评论异常！请稍后重试...")
        })

      },
      /*page(getpages){

      },*/
    }
  }

</script>

<style scoped>

</style>
