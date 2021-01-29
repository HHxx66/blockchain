<template>
  <div class="trading-box">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="收款账户">
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="单据时间戳">
        <el-input v-model="form.timestamp"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { postData } from "@/utils/request"
import { Message } from "element-ui";
@Component({
  name: "ArrearsPaying"
})
export default class extends Vue {
  private form:any = {
    timestamp: 0,
  };
  async onSubmit(){
    var info = await postData("/api/user/arrearsPaying",{
      publicKey:localStorage.getItem("account"),
      privateKey:localStorage.getItem('password'),
      timestamp: this.form.timestamp,
    });
    if(info.status === "success"){
      Message({
        message: '交易成功',
        type: 'success'
      });
    }else{
      Message.error('交易失败');
      Message.error(info);
    }
  }
}
</script>

<style scoped>
.trading-box {
  width: 500px;
  padding: 50px 30px;
  box-sizing: border-box;
}
</style>