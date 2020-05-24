<template>
  <div class="notice-item">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "NoticeItem"
  }
</script>

<style scoped>
  .notice-item {
    background-color: #F2F2F2;
    height: 30px;
    margin-top: 10px;
  }
</style>