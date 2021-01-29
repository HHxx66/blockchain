<template>
  <div class="receipt_list">
    <el-table
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :data="
        tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
    "
      border
      style="width: 100%"
      stripe
      highlight-current-row
    >
      <el-table-column label="序号">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="addr" label="持有账户" sortable></el-table-column>
      <el-table-column prop="amount" label="金额" sortable></el-table-column>
      <el-table-column prop="start" label="票据时间戳" sortable></el-table-column>
      <el-table-column prop="deadline" label="票据截止期" sortable></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    ></el-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { postData } from "@/utils/request"
@Component({
    name: "ReceiptsOutList"
})
export default class extends Vue {
    private tableData:any[] = [];
    private currentPage:number = 1;
    private pagesize:number = 10;
    mounted() {
        this.refresh();
    };
    async refresh(){
        var info = await postData("/api/user/getReceiptsOutList",{
        publicKey:localStorage.getItem("account"),
        privateKey:localStorage.getItem('password')
        });
        var list = [];
        for(let item of info){
            item.start = '第' + item.timestamp + '个区块';
            item.deadline = '第' + (item.timestamp + item.validity) + '个区块';
            list.push(item);
        }
        this.tableData = list;
    }
    handleSizeChange (size:number) {
        this.pagesize = size;
    };
    handleCurrentChange(currentPage:number) {
        this.currentPage = currentPage;
    };
};
</script>
<style lang="less" scoped>
.receipt_list {
    padding: 30px;
    box-sizing: border-box;
}
</style>