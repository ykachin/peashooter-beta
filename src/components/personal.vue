<template >
<div>
  <div  class="m-container m-padded-tb-large animated fadeIn">
  <div class="ui container" style="height:150px; background:url(./static/images/wenjie1.png)">
    <div class="eight wide column">
      <div class="ui stackable grid">
        <div class="wide column two-size-center">
          <div style="margin-top:0px">
            <nav class="mainNavs">
              <a class="ui big-font" style="color: greenyellow">豌豆射手</a>
            </nav>
            <br>
            <br>
            <div class="right m-item item m-mobile-hide">
              <form name="search" action="#"  method="post" target="_blank">
                <div class="ui icon inverted white input m-margin-tb-tiny">
                  <input type="text" name="query" :query='query' v-model="query"  placeholder="用户名，uid" style="width: 500px">
                  <i @click="search" class="search link icon"></i>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="eleven wide column">
    </div>
  </div>
</div>


<div  class="m-container m-padded-tb-large animated fadeIn">
  <div class="ui container">
    <div class="ui stackable grid">
      <div class="eleven wide column">
        <div class="ui attached  segment">
          <div class="ui padded vertical segment m-padded-tb-large" >
            <router-view></router-view>
          </div>
        </div>
      </div>
      <!--右边的top-->
      <div class="five wide column">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          :default-openeds="['1']" router>
          <el-submenu index="1" >
            <template slot="title">
              <i class="el-icon-s-grid"></i>
              <span>我的个人主页</span>
            </template>
              <el-menu-item :index="'/personal/searchpage'" @click.native="flushCom">搜索</el-menu-item>
              <el-menu-item :index="'/personal/information'" @click.native="flushCom">个人信息</el-menu-item>
              <el-menu-item :index="'/personal/journal'" @click.native="flushCom">文章</el-menu-item>
              <el-menu-item :index="'/personal/comments'" @click.native="flushCom">留言</el-menu-item>
              <el-menu-item :index="'/personal/photos'" @click.native="flushCom">相册</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>


    </div>
  </div>

</div>

</div>
</template>

<script>
  import axios from 'axios'
  import myhead from "./myhead";
  import myfoot from "./myfoot";
  import information from "./personal/information";
  export default{
    components:{
      myhead:myhead,
      myfoot:myfoot,
      information:information,
    },
    name: "personal",
    created(){
      console.log("添加评论成功")
      console.log("添加评论成功")
    },
    methods:{
      search(){
          const _this=this
          window.sessionStorage.setItem('query',this.query)
          this.flushCom()
        },

      flushCom:function(){
        this.$router.go(0);
      },
    }
  }
</script>

<style scoped>

</style>
