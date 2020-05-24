<template>
  <div>
    <div class="ui attached  segment">
      <div class="ui padded vertical segment m-padded-tb-large" >
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>作品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <div style="padding-bottom: 10px;text-align: left">
          <el-button type="primary" @click="showAllWorks" plain>回退-展示全部作品</el-button>
        </div>

        <br>
        <div class="ui middle aligned mobile reversed stackable grid" >
          <el-card shadow="hover">
              <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                  type="index"
                  label="序号"
                  width="100">
                </el-table-column>
                <!--<el-table-column
                  prop="id"
                  label="作品id"
                  width="180">
                </el-table-column>-->
                <el-table-column
                  prop="title"
                  label="作品名"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="introduction"
                  label="作品描述"
                  width="320"
                >
                </el-table-column>
              </el-table>
          </el-card>

        </div>
      </div>
    </div>

  </div>

</template>

<script>
    export default {
      name: "workindex",
      props:['query'],
      /*props:{
        query:String
      },*/
      data(){
        return{
          query:'',
          tableData:{},
        }
      },
      created(){
        //获取query
        /*this.query=this.$route.path.split('/')[3]*/
        this.query=window.sessionStorage.getItem('query')
        this.getList()

        const  _this=this
        if(this.query===''){
          console.log('query为空')
        }
        //写到这

        console.log('window.sessionStorage.getItem(biubiubiu)')
        console.log(window.sessionStorage.getItem('biubiubiu'))
        if(window.sessionStorage.getItem('query')==="null"){
          //获取作品类
          this.$axios({
            method: 'get',
            url: '/api/works',
          }).then(function (res) {
            const r=res.data
            _this.tableData=r.data
            console.log(_this.tableData)
            /*console.log(res)
            console.log('获取作品名',r.data[0].title)
            console.log(11111111111)*/

          }).catch(function (res) {
            console.log("获取作品发生异常！请稍后重试...")
          })
          console.log('为空后的作品数据')
          console.log(_this.tableData)
          return
        }
        const d={query:this.query}
        console.log(d)
        this.$axios({
          method: 'post',
          url: '/api/works/query',
          data:this.$qs.stringify(d),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        }).then(function (res) {
          console.log(res)
          _this.tableData=res.data.data
          console.log("查找作品成功")

        }).catch(function (res) {
          console.log(res)
          console.log("查找作品失败")
        })
        window.sessionStorage.setItem('query',null)
      },
      mounted() {
        console.log('query是')
        console.log(this.query)
      },
      methods:{
        flushCom:function(){
          this.$router.go(0);
        },
        showAllWorks(){
          const _this=this
          /*//获取作品类
          this.$axios({
            method: 'get',
            url: '/api/works',
          }).then(function (res) {
            const r=res.data
            _this.tableData=r.data
            console.log(_this.tableData)
            /!*console.log(res)
            console.log('获取作品名',r.data[0].title)
            console.log(11111111111)*!/

          }).catch(function (res) {
            console.log("获取作品发生异常！请稍后重试...")
          })*/

          this.flushCom()
        },
        getList(){
          /*const _this=this
          //获取作品类
          this.$axios({
            method: 'get',
            url: '/api/works',
          }).then(function (res) {
            const r=res.data
            _this.tableData=r.data
            console.log(_this.tableData)
            /!*console.log(res)
            console.log('获取作品名',r.data[0].title)
            console.log(11111111111)*!/

          }).catch(function (res) {
            console.log("获取作品发生异常！请稍后重试...")
          })*/
          const  _this=this
          if(this.query===''){
            console.log('query为空')
          }
          //写到这

          console.log('window.sessionStorage.getItem(biubiubiu)')
          console.log(window.sessionStorage.getItem('biubiubiu'))
          if(window.sessionStorage.getItem('query')==="null"){
            //获取作品类
            this.$axios({
              method: 'get',
              url: '/api/works',
            }).then(function (res) {
              const r=res.data
              _this.tableData=r.data
              console.log(_this.tableData)
              /*console.log(res)
              console.log('获取作品名',r.data[0].title)
              console.log(11111111111)*/

            }).catch(function (res) {
              console.log("获取作品发生异常！请稍后重试...")
            })
            console.log('为空后的作品数据')
            console.log(_this.tableData)
            return
          }
          const d={query:this.query}
          console.log(d)
          this.$axios({
            method: 'post',
            url: '/api/works/query',
            data:this.$qs.stringify(d),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
          }).then(function (res) {
            console.log(res)
            _this.tableData=res.data.data
            console.log("查找作品成功")

          }).catch(function (res) {
            console.log(res)
            console.log("查找作品失败")
          })
          window.sessionStorage.setItem('query',null)
        },
      }
    }
</script>

<style scoped>

</style>
