<template>
  <div class="tagBox">
    <el-tag v-for="(item, index) in tagList" :key="item.path" :closable="index > 0" size="medium"
      :disable-transitions="false" @click="clickTag(item)" @close="closeTag(item)"
      :effect="item.active ? 'dark' : 'plain'">
      {{ item.title }}
    </el-tag>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";
@Component({
  name: "TagNav"
})
export default class extends Vue {
  private tagList: any[] = [{
    title: "首页",
    path: "/home",
    active: false
  }];
  mounted() {
    var item = {
      title: this.$route.meta.title,
      path: this.$route.path,
    };
    this.getTag(item);
  };
  @Watch("$route", { immediate: true })
  private onRouteChange(route: Route) {
    var item = {
      title: route.meta.title,
      path: route.path,
    };
    this.getTag(item);
  }
  // 路由跳转
  private skipTag(item:any){
    this.$router.push({
      path: "." + item.path,
    });
  }
  // 跳转页面push到面包屑
  private getTag(item:any) {
    var index = this.tagList.map((item) => item.path).indexOf(item.path);
    if (index == -1) {
      this.tagList.push({
        path: item.path,
        title: item.title,
        active: false,
      });
    }
    this.activeTag(item.path);
  };

  // 监听路由选中
  private activeTag(path:string) {
    for (let i in this.tagList) {
      this.tagList[i].active = false;
      if (this.tagList[i].path == path) {
        this.tagList[i].active = true;
      }
    }
  };

  // 选择tag
  private clickTag(item:any) {
    this.skipTag(item);
  };

  // 删除tag
  private closeTag(item:any) {
    var index = this.tagList.map((item) => item.path).indexOf(item.path);
    if (item.active) {
      this.skipTag(this.tagList[index - 1]);
    }
    this.tagList.splice(index, 1);
  };
}
</script>

<style lang="less" scoped>
  .tagBox {
    width: 90%;
    overflow-x: auto;
    white-space: nowrap;
  }

  .tagBox .el-tag {
    margin-right: 10px;
    cursor: pointer;
    transition: all 0.3s;
  }

  .tagBox .el-tag:last-child {
    margin-right: unset;
  }
</style>