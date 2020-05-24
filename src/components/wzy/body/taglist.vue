<template>
  <!-- 该组件为标签组件，只在mainpage（主页页面）当中出现 -->
  <!--
  该页该页的主要功能为:
  显示所有标签(已经实现)
  点击标签跳转到指定的标签话题或者文章下(未完成,计划用totag函数完成跳转和参数的传递)
  显示更多标签(未完成,相关代码已经注释掉了)

  该页样式:有进一步修改的可能性.
   -->
  <div id="tag">
    <p> <strong> 标签榜单 </strong> </p>
    <div v-for="tag in tagslist.slice(tagfrom,tagend)">
      <div class="one" v-on:click="totag(tag.id)" >{{tag.name}}</div>
    </div>
    <!-- <div class="setend" v-on:click="getmore"> <strong> 点击查看等多 </strong> </div> -->
  </div>
</template>

<script>
  export default {
    name:"tag",
    data:function() {
      return{
        tagslist:[],
        tagfrom:0,
        tagend:100,
      }
    },
    methods:{
      // getmore:function(){
      //   // this.tagend+=10
      //   alert(this.tagend)
      // },
      totag:function(id){
        //跳转到指定的标签id指向的post页
        // window.sessionstorage.setItem（‘tag_id’,id）
      }
    },
    created() {
      const _this=this
      this.$axios({
        method:"get",
        url:"/api/tags",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      }).then(function(res){
        const r=res.data
        _this.tagslist=r.data
        console.log(_this.tagslist)
      })
    }
  }
</script>

<style scoped>
  #tag {
    border: 1px solid;
    overflow: hidden;
    padding: 0% 10% 10% 10%;
	margin-bottom: 4%;
  }
  #tag .one {
    border: 1px solid;
    /* float: left; */
    margin: 3%;
    padding: 1%;
  }
</style>
