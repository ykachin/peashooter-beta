<template>
  <!-- 该组件为热门话题组件 -->
  <!--
  该页该页的主要功能为:
  显示所有热门话题(已经实现)
  点击标签跳转到指定的话题下(未完成,计划用goto函数完成跳转和参数的传递)

  该页样式:有进一步修改的可能性.
   -->
  <div class="hotlist">
    <div id="oporder">
      <p> <strong> 热门话题 </strong> </p>
      <div v-for="item in items.slice(0,10)"><!-- 限制前十话题输出 -->
        <!-- <li v-for="item,index in items.slice(0,10)" v-on:click="goto"> -->
        <div class="one" v-on:click="goto(item.id)">{{item.title}}|{{item.content}}</div>
        <!-- 跳转到相应的话题页面 -->
        <!-- <router-link to="/...?topicid=item.id"></router-link> -->
        <!--</li>-->
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'myhotlist',
    data:function() {
      return {
        items:[]//用于存放服务器返回的数据
      }
    },
    props:{},
    methods:{
      goto:function(id){
        //跳转到topic_id指定的页面
        // window.sessionstorage.setItem（‘topic_id’,id）
      }
    },
    created() {//向服务器发送获取topic信息
      const _this=this;
      this.$axios({
        method: 'get',
        url: '/api/topics',
      }).then(function (res) {
        const r=res.data
        _this.items=r.data
        console.log(_this.items)
      }).catch(function (res) {
        console.log("数据获取成功。。。")
      })
    }
  }
</script>

<style scoped>
  .hotlist {
    border: 1px solid;
    margin-bottom: 5%;
    /* background-color: crimson; */
    /* border-radius: 10px; */
    overflow: hidden;
    padding-bottom: 5%;
    /* background-image: linear-gradient(crimson, #DDDDDD); */
    /* margin-top: 6%; */
    /* margin-bottom: 5%; */
  }
  .hotlist .one {
    border: 1px solid;
    /* float: left; */
    margin: 3%;
    padding: 1%;
  }
  #oporder {
    /* background-color: #42B983; */
    overflow: hidden;
  }
</style>
