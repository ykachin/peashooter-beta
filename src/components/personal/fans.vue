<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">删除</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>

</template>

<script>
    export default {
      data(){
        return{
          id:5,
        }
      },
      created(){
        console.log("1")
        this.getFansList()
      },
      methods:{
        getFansList(){
          console.log("2")
          const _this=this
          this.$axios({
            method: 'post',
            url: '/api/user/getfollow',
            data:'id=5'
          }).then(function (res) {
            const r=res.data
            _this.works=r.data
            console.log(r.data)
            /*console.log(res)
            console.log('获取作品名',r.data[0].title)
            console.log(11111111111)*/

          }).catch(function (res) {
            console.log("获取用户信息发生异常！请稍后重试...")
          })
        }
      }
    }
</script>

<style scoped>

</style>
