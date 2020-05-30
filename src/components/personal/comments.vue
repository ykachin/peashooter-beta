<template>
<div>


    <!--content-->
    <div class="ui bottom attached segment">
      <div  class="ui bottom attached " >
        <!--留言区域列表-->
        <div id="comment-container"  class="ui teal segment">
          <div >
            <div class="ui threaded comments" style="max-width: 100%;">
              <h3 class="ui dividing header">留言</h3>
              <div class="comment" v-for="(item,index) in thispagecomments" :key="item.id">
                <a class="avatar">
                  <img src="https://unsplash.it/100/100?image=1005" >
                </a>
                <div class="content" style="text-align: left">
                  <a class="author" >
                    <span >{{item.user_id}}</span>
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
        <div v-if="isemptycomment===true">留言为空，快来抢第一个沙发吧！<br><br></div>
        <!--分页-->
        <el-pagination
          background
          layout="prev, pager, next"
          page-size="10"
          :total="61"
          @current-page="page">
        </el-pagination>
        <br/>

        <div id="comment-form" class="ui form m-margin-tb-big ">
          <input type="hidden" name="blog.id" >
          <input type="hidden" name="parentComment.id" value="-1">
          <div class="field">
            <textarea name="content" id="sub" placeholder="请输入评论信息..." v-model="message.content"></textarea>
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

</template>

<script>
  import axios from 'axios'
  /*Vue.prototype.$axios = axios;*/
  export default {
    props: "someprops",
    name: "workInfo",
    inject:['reload'],
    data(){
      return {
        isemptycomment:false,
        thispagecomments:[],
        userid:'5',
        message:{
          content:'',
          to_user_id:'',
          from_user_id:'',
        },
        works:{},
        tableData:[],
        comments:{},
        messages:{},
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

      }
    },
    created(){
      const  _this=this
      this.getPersonInfo();
      this.getList()
      //获取对应id的作品内容
      this.$axios({
        method: 'get',
        url: '/api/messages',
      }).then(function (res) {
        console.log(res)
        console.log("成功")
        _this.workItem=rs.data
      }).catch(function (res) {
        console.log("失败")
      })

    },
    methods:{
      reply(fatherUser_id){
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
      getPersonInfo(){
        const _this=this
        const token={'access_token':window.sessionStorage.getItem('token')}
        console.log('输出token')
        console.log(window.sessionStorage.getItem('token'))
        console.log(this.$qs.stringify(token))
        this.$axios({
          method: 'post',
          url: '/api/user/getbyaccess',
          data: this.$qs.stringify(token),
        }).then(function (r) {
          console.log(r)
          //将用户id保存至sessionstorage
          _this.message.to_user_id=r.data.data.id
        }).catch(function (res) {
          _this.$message.error('获取用户信息失败')
        })
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
        if(this.$route.path.split('/')[2]!=='-1'){
          this.isindex=false
          this.workid=this.$route.path.split('/')[2]
          //没有对应作品的评论，所以。。。
          this.addComment.topic_id=this.$route.path.split('/')[2]
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
        //获取评论
        this.$axios({
          method: 'get',
          url: '/api/messages',
        }).then(function (res) {
          const r=res.data
          _this.messages=r.data
          let data= [];
          for(let c in _this.messages){
            if(_this.messages[c].to_user_id+''===_this.userid+''){
              data.push(_this.messages[c]);
            }
          }
          if(data.length+''===0+''){
            _this.isemptycomment=true
          }
          _this.thispagecomments=data

        }).catch(function (res) {
          console.log("获取评论异常！请稍后重试...")
        })
        //获取作品类
        this.$axios({
          method: 'get',
          url: '/api/works',
        }).then(function (res) {
          const r=res.data
          _this.works=r.data

        }).catch(function (res) {
        })
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
        this.$axios({
          method: 'post',
          url: '/api/messages',
          data:this.$qs.stringify(this.message)
        }).then(function (res) {
          _this.$message.success("添加评论成功！")
          _this.reload()
          /*_this.getList()*/
        }).catch(function (res) {
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
