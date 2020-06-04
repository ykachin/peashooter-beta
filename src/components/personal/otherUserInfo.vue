<template>
  <div v-loading="isLoading">
    <!--header-->
    <div class="ui attached  segment">
      <div class="ui padded vertical segment m-padded-tb-large" >
      <div class="ui middle aligned mobile reversed stackable grid" >
        <div class="five wide column center aligned" >
          <a target="_blank">
            <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"   alt="" class="ui rounded image">
            <br/>
            <div class="ui horizontal label">
              <p class="ui head">{{ userInfo.nickname }} </p>
            </div>
          </a>
        </div>
        <div class="eleven wide column">
          <p class="m-text " style="text-align: left" >  <span class="ui blue horizontal label">账号</span>{{ userInfo.username }}</p>
          <p class="m-text " style="text-align: left" >  <span class="ui blue horizontal label">余额</span>{{ userInfo.allowance }}</p>
          <p class="m-text " style="text-align: left" >  <span class="ui blue horizontal label">积分</span>{{ userInfo.points }}</p>
          <p v-if="userInfo.profile != null" class="m-text " style="text-align: left" >  <span class="ui blue horizontal label">签名</span>{{ userInfo.profile }}</p>
          <p v-else class="m-text " style="text-align: left" >  <span class="ui blue horizontal label">签名</span>该用户很懒，并未添加任何签名...</p>
        </div>
      </div>
    </div>

      <div id="follow" class="ui padded vertical segment m-padded-tb-large">
        <div id="follow-title">
          <span>ta的粉丝</span>
        </div>
        <div id="follow-content">
          <el-alert v-if="userFollowList.length === 0" title="ta暂时没有粉丝" type="info"></el-alert>
          <el-button v-for="item in userFollowList" size="mini" round @click="toUserDetailInfoPage(item.from_user_id)"> {{ item.username }} </el-button>
        </div>
      </div>

      <div id="message" class="ui padded vertical segment m-padded-tb-large">
        <!-- 留言显示 -->
        <div id="message-title">ta的最新留言</div>
        <div id="message-content">
          <el-alert v-if="userMessageList.length === 0" title="ta暂时没有留言" type="info"></el-alert>
          <div class="message-content-item" v-for="(item, index) in userMessageList" v-if="index < 5">
            <el-input
              style="margin-bottom: 10px;"
              :value="item.content"
              :disabled="true">
            </el-input>
            <span> from: {{ item.username }} </span>
          </div>
        </div>
        <br>

        <!-- 给他留言 -->
       <div id="leave-message">
         <el-input
           type="textarea"
           placeholder="想对ta说..."
           v-model="messageContent"
           maxlength="30"
           show-word-limit
         >
         </el-input>
         <br><br>
         <el-button @click="leaveMessageToUser(loginUserId, curInfouserId, messageContent)">留言</el-button>
       </div>
      </div>

    </div>
  </div>

</template>

<script>
  import {
    getUserDetailInfo,
    getUserMessageList
  } from "../../network/personal";

  import {
    getUserFollowList
  } from "../../network/follow";

  import {
    leaveAMessageToUser
  } from "../../network/message";

  export default {
    inject:['reload'],
    data(){
      return {
        curInfouserId: 0,
        loginUserId: 0,
        userInfo: null,
        userFollowList: [],
        userMessageList: [],
        messageContent: '',
        isLoading: true
      }
    },
    created(){
      this.curInfouserId = this.$route.query.userId
      this.loginUserId = window.sessionStorage.getItem("user_id")
      this.getUserDetailInfo(this.curInfouserId)
      this.getUserFollowList(this.curInfouserId)
      this.getUserMessageList(this.curInfouserId)
    },
    methods:{
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

      /**
       * 获取用户详细信息
       * @param userId  用户id
       */
      getUserDetailInfo(userId) {
        getUserDetailInfo(userId).then(res => {
          this.userInfo = res.data.data
        }).catch(err => {
          console.log(err)
        })
      },

      /**
       * 获取用户的粉丝列表
       * @param userId 用户id
       */
      getUserFollowList(userId) {
        getUserFollowList(userId).then(res => {
          this.userFollowList = res.data.data
        }).catch(err => {
          console.log(err)
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

      /**
       * 获取用户留言列表
       * @param userId  用户id
       */
      getUserMessageList(userId) {
        getUserMessageList(userId).then(res => {
          this.userMessageList = res.data.data
          this.isLoading = false
        }).catch(err => {
          console.log(err)
        })
      },

      /**
       * 给用户留言
       * @param fromUserId  留言来自的用户id
       * @param toUserId  给谁留言
       * @param content 内容
       */
      leaveMessageToUser(fromUserId, toUserId, content) {
        leaveAMessageToUser(fromUserId, toUserId, content).then(res => {
          // 01. 提示留言成功
          this.$message({
            message: '留言成功',
            type: 'success'
          })

          // 02. 重新获取用户的留言列表
          this.getUserMessageList(toUserId)

          // 03. 清空textarea的内容
          this.messageContent = ''
        }).catch(err => {
          this.$message({
            message: '留言失败',
            type: 'error'
          })
        })
      }
    }
  }
</script>

<style scoped>
  /*#follow-title {*/
  /*  margin: 10px;*/
  /*  text-align: left;*/
  /*}*/

  /*#follow-content {*/
  /*  margin: 10px;*/
  /*  text-align: left;*/
  /*}*/

  #follow, #message {
    text-align: left;
  }

  #follow-title, #message-title {
    margin: 0px 0px 15px 0px;
  }

  #leave-message {
    text-align: center;
  }

  .message-content-item {
    text-align: right;
    margin: 5px 0px 10px 0px;
  }
</style>
