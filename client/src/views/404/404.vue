<template>
  <div class="box">
    <div class="gif">
      <img src="../../assets/404.gif" alt="" />
    </div>
    <div class="btn">
      <el-button @click="backHome()">回到首页</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "404"
})
export default class extends Vue {
  backHome() {
    this.$router.replace({
      path: "/home",
    });
  };
}
</script>

<style lang="less" scoped>
  .gif,
  img {
    width: 100%;
    height: 100%;
  }

  .btn {
    display: flex;
    justify-content: center;
  }
</style>