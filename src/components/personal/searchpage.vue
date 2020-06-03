<template>
  <!--用户列表区-->
  <div>
    <el-table
      v-loading="isLoading"
      :data="userList"
      style="width: 100%" border stripe>
      <el-table-column
        type="index">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户">
      </el-table-column>
      <el-table-column
        prop = "follow"
        label="关注数">
      </el-table-column>
      <el-table-column
        label="关注">
        <template scope="scope">
          <el-button v-if="scope.row.jud === 0" type="success" size="mini" @click="followUser(curUserId, scope.row.id)">关注</el-button>
          <el-button v-else type="success" icon="el-icon-check" size="mini" plain @click="cancleFollowUser(curUserId, scope.row.id)">已关注</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="查看详情">
        <template scope="scope">
          <el-button @click="toUserDetailInfoPage(scope.row.id)" size="mini"> 了解他 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {
    getUserListByUserName,
    getUserDetailInfo
  } from "../../network/personal";

  import {
    followUser,
    cancleFollowUser
  } from "../../network/follow";

  export default {
    data() {
      return {
        searchUserName: '',
        userList: [],
        curUserId: 0,
        isLoading: true
      }
    },
    created(){
      this.isLoading = true
      this.curUserId = window.sessionStorage.getItem("user_id")
      this.getPersonInfo();
      this.init()
      // 获取模糊搜索的用户
      this.getUserListByUserName(this.searchUserName, this.curUserId)
      // this.isLoading = false
    },
    methods:{
      getPersonInfo(){
        const _this=this
        const token={'access_token':window.sessionStorage.getItem('token')}
        console.log('输出token')
        console.log(window.sessionStorage.getItem('token'))
        console.log(this.$qs.stringify(token))
        this.$axios({
          method: 'get',
          url: '/api/user',
        }).then(function (res) {
          const r=res.data
          _this.tableData=r.data
          console.log(_this.tableData)
        }).catch(function (res) {
          // _this.$message.error('获取用户信息失败')
        })
      },

      /**
       * 根据用户名模糊搜索用户列表
       * @param username 搜索的用户名
       * @param id  当前登录的用户id
       */
      getUserListByUserName(username, id) {
        getUserListByUserName(username, id).then(res => {
          this.userList = res.data.data
          console.log(res.data.data)
          this.isLoading = false
        }).catch(err => {
          console.log(err)
        })
      },

      /**
       * 初始化变量
       */
      init() {
        this.searchUserName = window.sessionStorage.getItem("query")
      },

      /**
       * 跳转到用户详情页
       * @param userId  用户id
       */
      toUserDetailInfoPage(userId) {
        // 查看某用户详情跳转
        this.$router.push({
          path: '/personal/otherUserInfo',
          query: {
            userId: userId
          }
        })
      },

      /**
       * 关注用户
       * @param fromUserId 关注者id
       * @param toUserId  被关注者id
       */
      followUser(fromUserId, toUserId) {
        followUser(fromUserId, toUserId).then(res => {
          // 01. 关注成功提示
          this.$message({
            message: '关注成功',
            type: 'success'
          })

          // 02. 重新获取信息
          this.getUserListByUserName(this.searchUserName, this.curUserId)
        }).catch(err => {
          this.$message.error('关注出错')
        })
      },

      /**
       * 取消关注用户
       * @param fromUserId  关注者id
       * @param toUserId  被关注者id
       */
      cancleFollowUser(fromUserId, toUserId) {
        cancleFollowUser(fromUserId, toUserId).then(res => {
          // 01. 取消关注成功提示
          this.$message({
            message: '成功取消关注',
            type: 'success'
          })

          // 02. 刷新信息
          this.getUserListByUserName(this.searchUserName, this.curUserId)
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>
<style scoped>

</style>
