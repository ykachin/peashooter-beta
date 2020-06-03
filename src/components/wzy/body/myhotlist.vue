<template>
  <div class="hotlist">
    <div id="oporder">
      <p style="font-size: large;">
        <strong>
          &emsp;
          <i class="idea icon"></i>
          热门话题
          <div style="float: right; font-size: small;">
            <a @click="gototopic"  target="_blank">更多 <i class="angle double right icon"></i></a>
          </div>
        </strong>
        <hr align="center" color="#2E99E6" size="3" />
      </p>
      <div v-for="item in items.slice(0,10)">
        <div class="one" @click="gototopicid(item.id)">
          {{item.title}}
          <el-tooltip class="item" effect="light" :content="item.content" placement="right">
            <i class="el-icon-chat-dot-round"></i>
          </el-tooltip>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'myhotlist',
    data:function() {
      return {
        items:[],//用于存放服务器返回的数据
        allposts:[],
      }
    },
    methods:{
      gototopic() {
        this.$router.push("/topic")
      },
      gototopicid(id) {
        this.$router.push("/topic/"+id)
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

      //全部post
      this.$axios({
        method: 'post',
        url: '/api/posts/getall',
      }).then(function (res) {
        console.log("获取全部post成功")
        console.log(res)
        _this.allposts=res.data.data


      }).catch(function (res) {
        console.log(res)
        console.log("获取全部post失败")
      })
    }
  }
</script>

<style scoped>
  .hotlist {
    /* border: 1px solid; */
    background-color:white;
    border-radius: 10px;
    overflow: hidden;
    padding: 5% 0% 5% 0%;
  }
  .hotlist .one {
    border-radius: 5px;
    text-align: center;
    margin: 3%;
    padding: 10px;
    background-color: #F0F0F0;
  }
  .hotlist .one:hover {
    background-color: #CCCCCC;
  }
  #oporder {
    /* background-color: #42B983; */
    overflow: hidden;
  }
</style>
