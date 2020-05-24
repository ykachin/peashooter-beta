<template>
  <div>
    <button class="res-list-cho-item">
      <slot></slot>
    </button>
  </div>
</template>

<script>
  export default {
    name: "ResListChoButton"
  }
</script>

<style scoped>
  .res-list-cho-item {
    margin: 10px 7px;
    height: 32px;
    width: 70px;
    font-weight: bold;
    font-size: 16px;
  }
</style>