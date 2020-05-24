<template>
  <div id="pop-res">
    <strong>人气资源</strong>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "PopRes"
  }
</script>

<style scoped>
  #pop-res {
    /*background-color: #F2F2F2;*/
    border-radius: 7px;
    padding: 10px 22px;
    margin: 0px 10px;
    background-color: white;padding-top: 1em !important;border-radius: 10px
  }
</style>
