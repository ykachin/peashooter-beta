<template>
  <div class="ui inverted attached segment m-padded-tb-mini m-shadow-small" >
   <!-- <hr />
    <p class="teamname"> &emsp;&emsp;&copy;2020wandou.com, fzu豌豆射手队 </p>
    <a href="" >&emsp;关于我们&emsp;</a>
    <a href="" >&emsp;联系我们&emsp;</a>-->
    <div class="ui  center aligned container m-padded-tb-large">
      <div class="ui inverted  stackable grid">
        <div class="three wide column">
          <div class="ui inverted link list">
            <div class="item">
              <img src="../../static/images/pooshooter.png"   class="ui rounded image" alt="" style="width: 110px">
            </div>
          </div>
        </div>
        <div class="three wide column">
          <h4 class="ui inverted header m-text-thin m-text-spaced ">软工实践第01小组</h4>
          <div class="ui inverted link list">
            <!--<a href="#" class="item m-text-thin" th:text="#{index.email}">Email：1343615717@qq.com</a>
            <a href="#" class="item m-text-thin" th:text="#{index.qq}">QQ：1343615717</a>-->
            <div class="item m-text-thin" >明德至诚</div>
            <div class="item m-text-thin" >博学远志</div>
          </div>
        </div>
        <div class="three wide column" >
          <h4 class="ui inverted header m-text-thin m-text-spaced " >最新发布</h4>
          <div id="newblog-container">
            <div class="ui inverted link list"  v-for="(item,index) in getNewShares">
              <a @click="gotosource" class="item m-text-thin center aligned" >{{item.title}}</a>
            </div>
          </div>
        </div>
        <div class="seven wide column">
          <h4 class="ui inverted header m-text-thin m-text-spaced ">Peashooter</h4>
          <!--<p class="m-text-thin m-text-spaced m-opacity-mini" th:text="#{index.blogDescription}">该应用致力于提供一个让用户可以方便简短记录自己对书影音看法与评价的平台,以及在这基础上分类与延伸出相应的兴趣社区和市集等功能。在豌豆射手上，你可以自由发表有关书籍、电影、音乐的评论，也可以搜索别人的推荐。</p>-->
          <p class="m-text-thin m-text-spaced m-opacity-mini" >该应用致力于提供一个让用户可以方便简短记录自己对书影音看法与评价的平台,以及在这基础上分类与延伸出相应的兴趣社区和市集等功能。在豌豆射手上，你可以自由发表有关书籍、电影、音乐的评论，也可以搜索别人的推荐。</p>

        </div>
      </div>
      <div class="ui inverted section divider"></div>
      <p class="m-text-thin m-text-spaced m-opacity-tiny">Copyright © 2020 - <span >{{new Date().getFullYear()}}</span>Peashooter Designed by 软工实践第01小组</p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'myfoot',
  data:function() {
    return{
      getNewShares:[],
      works:[]
    }
  },
  methods:{
    gotosource(){
      this.$router.push('/resource')
    }
  },
  created() {
    //获取当前年份
    /*let nowDate = new Date();
    let date = {
      year: nowDate.getFullYear(),
      month: nowDate.getMonth() + 1,
      date: nowDate.getDate(),
    }*/
    //获取最新分享（3条）
    const _this=this
    this.$axios({
      method: 'post',
      url: '/api/shares/getnew',
      data:''
    }).then(function (res) {
      const r=res.data
      _this.works=r.data
      console.log('获取最新分享')
      console.log(res)

      for(let c=0;c<3;c++){
        _this.getNewShares.push(_this.works[c]);
      }

    }).catch(function (res) {
      console.log(res)
      console.log("获取最新分享异常！请稍后重试...")
    })
  }
}
</script>

<style scoped>
  .teamname{
    margin: 0px;
    font-size: medium;
    float: left;
  }
  /*a{
    font-size: medium;
    text-decoration: none;
    float: right;
  }*/
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
    padding: 14px 4%;
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
</style>
