<template>
  <div class="pop-res-item">
    <div id="left">
      <slot name="title"></slot>
    </div>
    <div id="right">
      <slot name="download-times"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PopResItem"
  }
</script>

<style scoped>
  .pop-res-item {
    margin-top: 10px;
    display: flex;
  }
  #left {
    /*background-color: red;*/
    /*height: 10px;*/
    width: 70%;
  }
  #right {
    /*background-color: blue;*/
    /*height: 10px;*/
    width: 30%;
  }
  .title {
    color: #3377AA;
    text-decoration: none;
    font-size: 14px;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  a:visited {
    color: #669;
    text-decoration: none;
  }
  a:hover {
    color: #333333;
  }
  .download-times {
    color: #a9a9a9;
    font-size: 10px;
    float: right;
}
</style>