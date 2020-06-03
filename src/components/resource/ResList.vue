<template>
  <div id="res-list">
    <!-- 资源选择按钮 -->
    <div id="res-list-cho " style="text-align: center">
      <slot name="cho-button"></slot>
<!--      <el-button type="primary" round><router-link to="/resource/share" class="router-link-btn">去分享<i class="el-icon-share" style="color: white"></i></router-link></el-button>-->
<!--      <el-button @click="getResBy('time', 1)">最新</el-button>-->
<!--      <el-button @click="getResBy('hot', 1)">精华</el-button>-->
    </div>
    <!-- 资源列表 -->
    <div id="res-list-content">
      <div style="text-align: center">
        <span><strong style="font-size:30px;text-align: center;">资源列表</strong></span>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ResList",
    methods: {
      getResBy(type, page) {
        this.$emit('res-order-event', type, page)
      }
    }
  }
</script>

<style scoped>
  #res-list-cho {
    text-align: center;
    display: flex;
    margin-left: 20px;
  }
  .router-link-btn {
    text-decoration: none;
    color: #606266;
  }
  #res-list {
    height: 500px;
    margin-top: 20px;
    border-radius: 7px;
  }
  #res-list-content {
    /*background-color: #D7D7D7;*/
    margin-top: 20px;
    border-radius: 7px;
    padding: 16px;
  }
  .none-res-tip {
    margin-top: 15px;
  }
</style>
