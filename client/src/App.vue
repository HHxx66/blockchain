<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "App"
})
export default class extends Vue {}

</script>
<style lang="less">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
      Microsoft YaHei, Arial, sans-serif;
  }

  ::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #bbb;
  }

  ::-webkit-scrollbar-thumb:active {
    background-color: #aaa;
  }
</style>