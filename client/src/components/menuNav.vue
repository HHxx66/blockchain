<template>
  <div class="menuBox">
    <el-menu :default-active="$route.path" background-color="#304156" text-color="#BFCBD9" router unique-opened
      :collapse="isCollapse" v-for="(item, index) in menuList" :key="index">
      <el-menu-item :index="item.path" v-if="!item.hasOwnProperty('childList')">
        <i :class="item.icon"></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
      <el-submenu :index="index.toString()" v-if="item.hasOwnProperty('childList')">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </template>
        <div v-for="(row, i) in item.childList" :key="i">
          <el-menu-item :index="row.path" v-if="row.path">
            {{ row.title }}
          </el-menu-item>
          <el-submenu :index="index + '-' + i" v-if="row.hasOwnProperty('sunList')">
            <template slot="title">{{ row.title }}</template>
            <el-menu-item v-for="(col, j) in row.sunList" :key="j" :index="col.path">
              {{ col.title }}
            </el-menu-item>
          </el-submenu>
        </div>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  name: "MenuNav"
})
export default class extends Vue {
  private menuList: object[] = [
    {
      title: "首页",
      path: "/home",
      icon: "el-icon-s-home",
    },
    {
      title: "公司账户信息",
      path: "/companyInfo",
      icon: "el-icon-s-data",
    },
    {
      title: "查询",
      icon: "el-icon-s-data",
      childList: [
        {
          title: "查询借入票据",
          path:  "/getReceiptsInList",
        },
        {
          title: "查询借出票据",
          path:  "/getReceiptsOutList",
        },
      ]
    },
    {
      title: "办理业务",
      icon: "el-icon-edit",
      childList: [
        {
          title: "金融交易",
          path:  "/tradingWithBalance",
        },
        {
          title: "开具信用票据",
          path:  "/tradingWithCredit",
        },
        {
          title: "票据转让",
          path:  "/tradingWithReceipt",
        },
        {
          title: "还款/销毁票据",
          path:  "/arrearsPaying",
        },
        {
          title: "票据融资",
          path:  "/financing",
        },
      ],
    },
    {
      title: "设置",
      path: "/setting",
      icon: "el-icon-setting",
    },
  ];
  @Prop({
    type: Boolean,
    default: function(): Boolean {
      return true;
    }
  })
  private isCollapse: Boolean | undefined;
}
  
</script>

<style lang="less" scoped>
  .menuBox .el-menu {
    border-right: unset;
  }
</style>