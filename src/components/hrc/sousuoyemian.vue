<template>
  <div id="app">
      <myhead></myhead>
    <div id="sousuolan1" class="ui container" style="height:300px; background:url(./static/images/a1.jpg)no-repeat;background-size: cover;">
        <div class="eight wide column">
          <div class="ui stackable grid">
            <div class="wide column two-size-center">
              <div style="margin-top:180px">
                <nav class="mainNavs">
                  <a id="sstitle" class="ui big-font" style="color: lightseagreen">豌豆射手</a>
                </nav>
                <br>
                <br>
                <div class="right m-item item m-mobile-hide">
                    <div id="ssform" class="ui icon inverted white input m-margin-tb-tiny">
                      <input id="input1" type="text" name="query"   placeholder="书名、影视名、歌曲名..." style="width: 500px"  v-on:keyup.13="search_post">
                      <i @click="search_post" class="search link icon"></i>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="eleven wide column">
        </div>
    </div>
    <div style="">
    <div style="background:white;border:solid;width:600px;cursor:pointer;height:360px;margin-top:10px" class="ui container" v-for="(item,index) in ssresult" :value="item.id" :key="item.id" @click="intosp">
    <div id="ssdiv1" class="20px Extra large" style="" >{{item.percent}}</div>
    <img id="ssimage1" style="" class="" :src='"http://129.204.247.165/"+item.route'  :value="item.id" >
    <el-row>
      
       <el-col :span="6" class="grid-content"  :value="item.id" >&nbsp;</el-col>
      <el-col :span="6" style="font-size:15px; width:auto" class="grid-content ui red horizontal label"  :value="item.id" >标题:   &laquo;{{item.title}}&raquo;</el-col>
      <el-col :span="6"  style="font-size:15px" class="grid-content ui purple horizontal label "  :value="item.id" >类别:   {{trastatus[item.status]}}</el-col>
    </el-row>
     
               
    </div>
    </div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <myfoot> </myfoot>
  </div>
  
</template>



<script>
    import axios from 'axios';
  import myfoot from "../myfoot";
  import myhead from "../myhead";
export default {
    components: {
      myhead,
      myfoot
    },
  data(){
    return{
      posttitle:'',   
      ssresult:[],
      trastatus:["电影","音乐","书籍","电视剧"],
    }
  },
  created:function()
  {
    const _this=this
     var qs = require('qs');
     console.log(this.$route.path.split('/')[2])
    _this.posttitle=this.$route.path.split('/')[2]
    console.log(_this.posttitle)
      this.$axios({
        method: 'post',
        url: '/api/posts/getbytitle',
        data:qs.stringify({
          title:this.posttitle,
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      }).then(function (res) {
          var dizengindex=1;
          console.log(res);
          const dres=res.data;
          _this.ssresult=dres.data;
          for(var i=0;i<_this.ssresult.length;i++)
          {
            _this.ssresult[i].percent=dizengindex++;
          }
          console.log(_this.ssresult)
      }).catch(function (res) {
        console.log(res)
      })
  },
  methods:{
      search_post()
      {
        const sousuo_name=input1.value;
        var qs = require('qs');
        document.getElementById("input1");
        console.log(sousuo_name);
        const _this=this;
       this.$axios({
        method: 'post',
        url: '/api/posts/getbytitle',
        data:qs.stringify({
          title:input1.value,
          pagesize:1,
        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      }).then(function (res) {
          console.log(res);
          const dres=res.data;
          if(dres.data.length==0)  
          {
            _this.$message.info("未找到作品!");
          }
          else
          {
            _this.$message.success("找到作品!");
            _this.$router.push("/sousuoyemian/"+sousuo_name);
            _this.$router.go(0);
          }


      }).catch(function (res) {
        console.log(res)
      })
      },
      intosp:function(e)
      {
        console.log(e.target);
        console.log(e.target.getAttribute("value"));
        this.$router.push("/squareinfo/"+e.target.getAttribute("value"));
      },

  }
}
</script>

<style>

</style>