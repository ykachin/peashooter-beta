<template>
  <div class="headbody">
    <a class="opleft">&emsp;&emsp;</a>
    <a class="op"  @click="f1">豌豆</a>
    <a class="op"  @click="f3">推荐</a>
    <a class="op"  @click="f4">资源</a>
    <a class="op"  @click="f5">话题</a>
    <a class="op"  @click="f6">广场</a>
    <a class="op"  @click="f2">作品讨论区</a>
    <el-dropdown class="op2">
      <span class="el-dropdown-link">
        {{personalInfo}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item  @click.native="topersonal">个人中心</el-dropdown-item>
        <el-dropdown-item  @click.native="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <a class="op2" href="" @click=""><el-avatar :size="20" :src="circleUrl"></el-avatar></a>
  </div>
</template>

<script>
  export default {
  name: 'myhead',
  data(){
    return{
      personalInfo:window.sessionStorage.getItem('personalInfo'),
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
    }
  },
    methods:{
      f1(){
        this.$router.push("/primarypage")
      },
      f2(){

        this.$router.push("/work/-1")
      },
      f3(){
        this.$router.push("/recommend")
      },
      f4(){
        this.$router.push("/resource")
      },
      f5(){
        this.$router.push("/topic")
      },
      f6(){
        this.$router.push("/square")
      },
      logout(){
        window.sessionStorage.clear()
        const _this=this
        _this.$router.push("/login")
      }
    }
}
</script>

<style scoped>
  .headbody{
    overflow: hidden;
    background-color: #333;
  }
  .headbody .op{
    float: left;
    display: block;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 2%;
    text-decoration: none;
    font-size: large;
  }
  .headbody .op:hover{
    background-color: #ddd;
    color: black;
  }
  .headbody .op2{
    float: right;
    display: block;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 3px;
    text-decoration: none;
    font-size: large;
  }
  .opleft {
    float: left;
    display: block;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }
  .teamname{
    margin: 0px;
    font-size: medium;
    float: left;
  }
  a{
    font-size: medium;
    text-decoration: none;
    float: right;
  }
  .logout{
    float: right;
    color: #f2f2f2;
    text-decoration: none;
    text-align: center;
    font-size: large;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #f2f2f2;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

</style>
