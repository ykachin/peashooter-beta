<template>
<div>
  <!--左边广场列表-->

    <!--header-->
    <div class="ui attached  segment">
      <div class="ui padded vertical segment m-padded-tb-large" >
        <div class="ui middle aligned mobile reversed stackable grid" >
          <div class="five wide column" >
            <a target="_blank">
              <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" class="ui rounded image">
              <br/>
              <!--<div class="ui horizontal label">
                <p class="ui head">{{nickname}} </p>
              </div>-->

            </a>
            <!--<span> <el-button @click="yes = true" type="primary" size="mini" icon="el-icon-edit"></el-button></span>-->
            <el-button type="primary" size="mini" class="m-margin-top" @click="showalertpassword = true">修改密码</el-button>
          </div>
          <div class="eleven wide column">
          <p class="m-text " style="text-align: left" >  <span class="ui blue horizontal label">账号</span>{{username}}</p>
            <p class="m-text " style="text-align: left" >  <span class="ui blue horizontal label">昵称</span>{{nickname}}<el-button @click="yes = true" type="primary" size="mini" icon="el-icon-edit"></el-button></p>
          <p class="m-text " style="text-align: left" >  <span class="ui blue horizontal label">余额</span>{{allowance}}</p>
          <p class="m-text " style="text-align: left" >  <span class="ui blue horizontal label">积分</span>{{points}}</p>
            <p class="m-text " style="text-align: left" >  <span class="ui blue horizontal label">注册时间</span>{{formatDate(new Date(created_at*1000))}}</p>
            <p class="m-text " style="text-align: left" >  <span class="ui blue horizontal label">上次修改</span>{{formatDate(new Date(updated_at*1000))}}</p>
          <p class="m-text " style="text-align: left" >  <span class="ui blue horizontal label">签名</span>{{profile}}<el-button @click="no = true" type="primary" size="mini" icon="el-icon-edit"></el-button></p>

          <!--<span> <el-button @click="no = true" type="primary" size="mini" icon="el-icon-edit"></el-button></span>-->
          </div>
        </div>
        <!--我的粉丝-->
        <div id="follow" class="ui padded vertical segment m-padded-tb-large">
          <div id="follow-title">
            <span>我的粉丝</span>
          </div>
          <div id="follow-content">
            <el-alert v-if="myFollowList.length === 0" title="我暂时没有粉丝" type="info"></el-alert>
            <el-button v-for="item in myFollowList" size="mini" round @click="toUserDetailInfoPage(item.from_user_id)"> {{ item.username }} </el-button>
          </div>
        </div>

        <!--我的关注-->
        <div id="watcher" class="ui padded vertical segment m-padded-tb-large">
          <div id="watcher-title">
            <span>我的关注</span>
          </div>
          <div id="watcher-content">
            <el-alert v-if="myWatcherList.length === 0" title="我暂时没有关注" type="info"></el-alert>
            <el-button v-for="item in myWatcherList" size="mini" round @click="toUserDetailInfoPage(item.from_user_id)"> {{ item.username }} </el-button>
          </div>
        </div>
      </div>

    </div>


    <el-dialog title="修改用户名" :visible.sync="yes" width="30%" center>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="amendnickname">确定</el-button>
        <el-button @click="yes = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改个性签名" :visible.sync="no" width="30%" center>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="amendprofile">确定</el-button>
        <el-button @click="no = false">取 消</el-button>
      </div>
    </el-dialog>

  <el-dialog title="修改密码" :visible.sync="showalertpassword" width="30%" center>
    <el-form :model="form" ref="formRef" :rules="formRules" >
      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input type="password" v-model="form.password" ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" :label-width="formLabelWidth" prop="checkPass">
        <el-input type="password" v-model="form.password_repeat"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="alertPasswprd">确定</el-button>
      <el-button @click="showalertpassword = false">取 消</el-button>
    </div>
  </el-dialog>


</div>

</template>

<script>
  import axios from 'axios'
  /*Vue.prototype.$axios = axios;*/
  export default {
    inject:['reload'],
    data(){
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.form.password_repeat !== '') {
            this.$refs.formRef.validateField('password_repeat');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (this.form.password_repeat === '') {
          callback(new Error('请再次输入密码'));
        } else if (this.form.password_repeat !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        form:{
          password:'',
          password_repeat:''
        },
        formRules:{
          password: [
            {required:true, validator: validatePass, trigger: 'blur' },
            {min:6,message:'密码至少6个字符!',trigger: 'blur'}
          ],
          checkPass: [
            { required:true,validator: validatePass2, trigger: 'blur' },
            {min:6,message:'密码至少6个字符!',trigger: 'blur'}
          ]
        },

        formLabelWidth: '120px',
        myWatcherList:[],
        myFollowList:[],
        personalInfo:{},
        yes:false,
        no:false,
        showalertpassword:false,
        isemptycomment:false,
        thispagecomments:[],
        works:{},
        tableData:[],
        comments:{},
        workid:'',
        workItem:{},
        username:'',
        nickname:'',
        allowance:'',
        points:'',
        profile:'',
        input:'',
      }
    },
    created(){
      const _this=this
      this.getPersonInfo();
      /**
       * 获取用户的粉丝列表
       * @param userId 用户id
       */
      const myuserid={id:window.sessionStorage.getItem('user_id')}
      this.$axios({
        method: 'post',
        url: '/api/user/getfollow',
        data: this.$qs.stringify(myuserid),
      }).then(function (res) {
        console.log('我的粉丝',res)
        _this.myFollowList=res.data.data
      }).catch(function (res) {
        console.log('我的粉丝获取失败 ')
      })

      /**
       * 获取用户的关注列表
       * @param userId 用户id
       */
      this.$axios({
        method: 'post',
        url: '/api/user/getfollowed',
        data: this.$qs.stringify(myuserid),
      }).then(function (res) {
        console.log('我的关注',res)
        _this.myWatcherList=res.data.data
      }).catch(function (res) {
        console.log('我的关注获取失败 ')
      })

    },
    methods:{
      /*
      * 修改密码
      * @param null
      */
      alertPasswprd(){
        const _this=this
        const pwdInfo={access_token:window.sessionStorage.getItem('token'),password:this.form.password,password_repeat:this.form.password_repeat}
        this.$axios({
          method: 'post',
          url: '/api/user/resetpwd',
          data: this.$qs.stringify(pwdInfo),
        }).then(function (res) {
          console.log("修改密码后的返回数据：",res)
          _this.$message.success('密码修改成功')
          _this.showalertpassword = false

        }).catch(function (res) {
          _this.$message.error('服务器网络繁忙！请稍后再试！')
        })
      },
      /**
       * 跳转到用户详情页
       * @param userId  用户id
       */
      toUserDetailInfoPage(userId) {
        console.log("进入了跳转用户详情函数")
        // 查看某用户详情跳转
        this.$router.push({
          path: '/personal/otherUserInfo',
          query: {
            userId: userId
          }
        })
        this.$router.go(0)
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
          window.sessionStorage.setItem('user_id',r.data.data.id)
          _this.username=r.data.data.username
          _this.nickname=r.data.data.nickname
          _this.allowance=r.data.data.allowance
          _this.points=r.data.data.points
          /*_this.personalInfo=r.data.data*/
          _this.created_at=r.data.data.created_at
          _this.updated_at=r.data.data.updated_at
          if(!r.data.data.profile){
            _this.profile='该用户很懒，并未添加任何签名...'
          }else{
            _this.profile=r.data.data.profile
          }
        }).catch(function (res) {
          // _this.$message.error('获取用户信息失败')
        })
      },
      amendnickname(){
        const  _this=this
        const nickname={nickname:this.input}
        this.$axios({
          method: 'put',
          url: '/api/user/'+window.sessionStorage.getItem('user_id'),
          data: this.$qs.stringify(nickname),
        }).then(function (res) {
          console.log(res)
          _this.$message.success('修改昵称成功！')
          _this.yes=false
          _this.reload()
          /*_this.workItem=rs.data*/
        }).catch(function (res) {
          _this.$message.success('服务器正在忙，请稍后再试！')
        })

      },
      amendprofile(){
        const  _this=this
        const profile={profile:this.input}
        this.$axios({
          method: 'put',
          url: '/api/user/'+window.sessionStorage.getItem('user_id'),
          data: this.$qs.stringify(profile),
        }).then(function (res) {
          console.log(res)
          _this.$message.success('修改个人简介成功！')
          _this.no=false
          _this.reload()
          /*_this.workItem=rs.data*/
        }).catch(function (res) {
          /*console.log("456")*/
          _this.$message.success('服务器正在忙，请稍后再试！')
        })
      },
      AlertPassword(){

      },
    }
  }
</script>

<style scoped>
  #follow, #watcher {
    text-align: left;
  }

  #follow-title, #watcher-title {
    margin: 0px 0px 15px 0px;
  }
</style>
