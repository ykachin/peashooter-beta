<template>
  <div id="app">
      <myhead></myhead>
    <div id="topsousuolan1" class="ui container" style="height:300px; background:url(./static/images/bg4.jpg)no-repeat;background-size: cover;">
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
                  <form id="ssform" name="search" action="#"  method="post" target="_blank">
                    <div class="ui icon inverted white input m-margin-tb-tiny">
                      <input id="input1" type="text" name="query"   placeholder="书名、影视名、歌曲名..." style="width: 500px">
                      <i @click="search_post" class="search link icon"></i>
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
    <div style="background:white">
    <div class="comment" v-for="(item,index) in ssresult" :key="item.id">
        <div></div>
    <img :src='"http://129.204.247.165/"+item.route'> 
     <div>{{item.title}}</div>
               
    </div>
    </div>

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
      posttitle,   
      ssresult:[],
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
          console.log(res);
          const dres=res.data;
          _this.ssresult=dres.data;
          console.log(_this.ssresult)
      }).catch(function (res) {
        console.log(res)
      })
  },
  methods:{
      search_post()
      {

      },
  }
}
</script>

<style>

</style>