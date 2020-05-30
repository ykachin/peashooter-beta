<template>
<div>
  <!--左边广场列表-->

    <!--header-->
    <div class="ui attached  segment">
      <div class="ui padded vertical segment m-padded-tb-large" >
        <div class="ui middle aligned mobile reversed stackable grid" >
          <div class="five wide column center aligned" >
            <a href="#"  target="_blank">
              <img src="https://picsum.photos/1000/1000/?blur=5"   alt="" class="ui rounded image">
              <br/>
              <div class="ui horizontal label">
                <p class="ui head">{{nickname}} </p>
              </div>
            </a>
            <span> <el-button @click="yes = true" type="primary" size="mini" icon="el-icon-edit"></el-button></span>
          </div>
          <div class="eleven wide column">
          <p class="m-text " style="text-align: left" >  <span class="ui blue horizontal label">账号</span>{{username}}</p>
          <p class="m-text " style="text-align: left" >  <span class="ui blue horizontal label">余额</span>{{allowance}}</p>
          <p class="m-text " style="text-align: left" >  <span class="ui blue horizontal label">积分</span>{{points}}</p>
          <p class="m-text " style="text-align: left" >  <span class="ui blue horizontal label">签名</span>{{profile}}</p>
          <span> <el-button @click="no = true" type="primary" size="mini" icon="el-icon-edit"></el-button></span>
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


</div>

</template>

<script>
  import axios from 'axios'
  /*Vue.prototype.$axios = axios;*/
  export default {
    inject:['reload'],
    data(){
      return {
        yes:false,
        no:false,
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
      this.getPersonInfo();
    },
    methods:{
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
          _this.profile=r.data.data.profile
        }).catch(function (res) {
          _this.$message.error('获取用户信息失败')
        })
      },
      amendnickname(){
        const  _this=this
        this.$axios({
          method: 'post',
          url: '/api/user',

        }).then(function (res) {
          console.log(res)
          console.log("123")
          _this.workItem=rs.data
        }).catch(function (res) {
          console.log("456")
        })
      },
    }
  }
</script>

<style scoped>

</style>
