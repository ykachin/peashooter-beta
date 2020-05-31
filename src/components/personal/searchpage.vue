<template>
  <!--用户列表区-->
  <el-table
    :data="tableData"
    style="width: 100%" border stripe>
    <el-table-column
    type="index">
    </el-table-column>
    <el-table-column
      prop="nickname"
      label="昵称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="username"
      label="用户"
      width="180">
    </el-table-column>
    <el-table-column
      label="关注数"
      prop="num">
    </el-table-column>
    <el-table-column
      prop="aaaa"
      label="关注">
      <template slot-scope="scope">
          <el-button type="success">关注</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData:[{
        nickname:'12',
        username:'904566722',
        num:'0',
        id:10,
      }]
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
          url: '/api/user/searchbyid',
          data: 'id='+_this.id
        }).then(function (res) {
          const r=res.data
          _this.tableData=r.data
          console.log(_this.tableData)
          /*console.log(res)
          console.log('获取作品名',r.data[0].title)
          console.log(11111111111)*/

        }).catch(function (res) {
          _this.$message.error('获取用户信息失败')
        })
      },
    }
  }
</script>
<style scoped>

</style>
