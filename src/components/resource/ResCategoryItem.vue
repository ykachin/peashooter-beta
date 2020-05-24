<template>
  <div class="res-categories-item">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "ResCategoryItem"
  }
</script>

<style scoped>
  .res-categories-item {
    text-align: center;
    font-size: 26px;
    font-weight: bold;
    padding: 10px;
  }
</style>