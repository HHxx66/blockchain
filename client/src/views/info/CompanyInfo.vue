<template>
  <div class="company_info">
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="info_data" border style="width: 100%" stripe highlight-current-row>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="data" label="内容"></el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { postData } from "@/utils/request"
@Component({
  name: "CompanyInfo"
})
export default class extends Vue {
  private info_data:any[] = [
    {
        name:"可用余额",
        data:"-",
    },
    {
        name:"可用信用",
        data:"-",
    }
  ];
  mounted() {
    this.refresh();
  };
  async refresh(){
    this.info_data[0].data = 'receiving';
    this.info_data[1].data = 'receiving';
    var info = await postData("/api/user/companyInfo",{
      publicKey:localStorage.getItem("account"),
      privateKey:localStorage.getItem('password')
    });
    this.info_data[0].data = info.balance;
    this.info_data[1].data = info.credit;
  }
};
</script>

<style lang="less" scoped>
.company_info {
    padding: 30px;
    box-sizing: border-box;
}
</style>