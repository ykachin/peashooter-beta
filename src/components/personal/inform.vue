<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/primarypage' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的消息</el-breadcrumb-item>
    </el-breadcrumb>
    <!--我的赞-->
    <div class="ui attached  segment">
      <div class="ui padded vertical segment" >
        <el-collapse v-model="activeName">
          <el-collapse-item title="我的最新点赞" name="1">
            <div id="like" class="ui padded vertical segment m-padded-tb-large">
              <div id="message-content" class="m-margin-top">
                <el-alert v-if="myLikeList.length === 0" title="我没有被赞" type="info"></el-alert>
                <div class="message-content-item" v-for="(item, index) in myLikeList" v-if="index < 10">
                  <!--<el-input
                    style="margin-bottom: 10px;"
                    :value="item.username"
                    :disabled="true">
                  </el-input>-->
                  <div class="m-margin-top" style="text-align: left">{{index+1}}:{{item.username}}&emsp;赞了你的发布贴《{{item.title}}》</div>
                </div>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="我的最新评论" name="2">
            <div id="comment" class="ui padded vertical segment m-padded-tb-large">
              <div id="comment-content" class="m-margin-top">
                <el-alert v-if="myCommentList.length === 0" title="我没有被评论" type="info"></el-alert>
                <div class="message-content-item" v-for="(item, index) in myCommentList" v-if="index < 10">
                  <!--<el-input
                    style="margin-bottom: 10px;"
                    :value="item.username"
                    :disabled="true">
                  </el-input>-->
                  <div class="m-margin-top" style="text-align: left">{{index+1}}:{{item.username}}&emsp;评论了你的发布贴《{{item.title}}》：{{item.content}}</div>
                </div>
              </div>
            </div>
          </el-collapse-item>

        </el-collapse>
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
        //我的赞
        myLikeList:[],
        //我的评论
        myCommentList:[],
        //折叠面板
        activeName: ['1','2'],

        userMessageList:[],
        messageContent:'',
        myuserId:window.sessionStorage.getItem('user_id')
      }
    },
    created(){
      const _this=this
      const userid = {id:window.sessionStorage.getItem('user_id')}
      //获取最新赞
      this.$axios({
        method: 'post',
        url: '/api/user/getlike',
        data:_this.$qs.stringify(userid),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        _this.myLikeList = res.data.data
      }).catch(err => {
        console.log(err)
      })
      //获取最新评论
      this.$axios({
        method: 'post',
        url: '/api/user/getcomment',
        data:_this.$qs.stringify(userid),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        _this.myCommentList = res.data.data
      }).catch(err => {
        console.log(err)
      })
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
