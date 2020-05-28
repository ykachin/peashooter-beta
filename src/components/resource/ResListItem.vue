<template>
  <div class="res-list-content-item" style="background-color: white;padding-left:20px">
    <!-- 用户名、用户头像 -->
    <div class="head">
      <slot name="user-avator"><el-avatar size="small" :src="circleUrl"></el-avatar></slot>
      <slot name="user-name"></slot>
    </div>
    <!-- 标题、内容 -->
    <slot name="title"></slot>
    <slot name="content"></slot>
    <!-- 标签、链接 -->

    <i class="el-icon-price-tag el-icon-price-tag-my-style" slot="tag-icon"></i>
    <slot name="tag"></slot>
    <slot name="route-icon"></slot>
    <slot name="route"></slot>
    <slot name="needpay-tip"></slot>
  </div>
</template>

<script>
  export default {
    name: "ResListItem",
    data() {
      return {
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      }
    }
  }
</script>

<style scoped>
  .res-list-content-item {
    /*background-color: #f2f2f2;*/
    margin-top: 16px;
    padding: 12px 20px 15px 13px;
    border-radius: 8px;
  }
  .user-name {
    position: relative;
    top: -7px;
    margin-left: 5px;
    font-size: 13px;
  }
  .title {
    color: #409EFF;
    font-weight: bold;
    font-size: 14px;
  }
  .content {
    font-size: 16px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    padding: 10px 11px;
    margin-top: 10px;
    background: #DDDDDD;
    border-radius: 5px;
  }
  .el-icon-paperclip-my-style {
    margin-left: 16px;
    margin-right: 3px;
  }
  .el-icon-price-tag-my-style {
    margin-right: 3px;
  }
</style>
