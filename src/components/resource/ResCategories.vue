<template>
  <div>
    <div id="res-categories">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ResCategories"
  }
</script>

<style scoped>
  #res-categories {
    height: 56px;
    display: flex;
    float: right;
    position: relative;
    top: -63px;
  }
</style>