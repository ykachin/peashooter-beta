<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/primarypage' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>我的留言榜</el-breadcrumb-item>
  </el-breadcrumb>
  <div id="message" class="ui padded vertical segment m-padded-tb-large">
    <!-- 留言显示 -->
    <div id="message-title">我的最新留言</div>
    <div id="message-content" class="m-margin-top">
      <el-alert v-if="userMessageList.length === 0" title="我暂时没有留言" type="info"></el-alert>
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
    <!-- 我的留言榜 -->
    <div id="leave-message" class="m-margin-top">
      <el-input
        type="textarea"
        placeholder="我想对自己说..."
        v-model="messageContent"
        maxlength="30"
        show-word-limit
      >
      </el-input>
      <br><br>
      <el-button @click="leaveMessageToUser(myuserId, myuserId, messageContent)">留言</el-button>
    </div>
  </div>





</div>

</template>

<script>
  import axios from 'axios'
  /*Vue.prototype.$axios = axios;*/
  export default {
    inject:['reload'],
    data(){
      return {
        userMessageList:[],
        messageContent:'',
        myuserId:window.sessionStorage.getItem('user_id')
      }
    },
    created(){
      this.getUserMessageList(window.sessionStorage.getItem('user_id'))
    },
    methods:{
      /**
       * 获取自己留言列表
       * @param userId  用户id
       */
      getUserMessageList(userId) {
        var userid={id:userId}
        const _this=this
        this.$axios({
          method: 'post',
          url: '/api/user/getmessage',
          data:_this.$qs.stringify(userid),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(res => {
          _this.userMessageList = res.data.data
        }).catch(err => {
          console.log(err)
        })
      },
      /**
       * 给自己留言
       * @param fromUserId  留言来自的用户id
       * @param toUserId  给谁留言
       * @param content 内容
       */
      leaveMessageToUser(fromUserId, toUserId, content) {
        const _this=this
        var leaveMessage={from_user_id:fromUserId,to_user_id:toUserId,content:content}
        console.log("留言内容：",leaveMessage)
        this.$axios({
          method: 'post',
          url: '/api/messages',
          data:_this.$qs.stringify(leaveMessage),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(res => {
          // 01. 提示留言成功
          _this.$message({
            message: '留言成功',
            type: 'success'
          })

          // 02. 重新获取用户的留言列表
          _this.getUserMessageList(toUserId)

          // 03. 清空textarea的内容
          _this.messageContent = ''
        }).catch(err => {
          _this.$message({
            message: '留言失败',
            type: 'error'
          })
          console.log("留言失败：",err)
        })
      }
    }
  }

</script>

<style scoped>
  #leave-message {
    text-align: center;
  }
</style>
