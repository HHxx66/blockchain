<template>
  <div class="trading-box">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="收款账户">
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="交易金额">
        <el-input v-model="form.amount"></el-input>
      </el-form-item>
      <el-form-item label="票据有效时长">
        <el-input v-model="form.validity"></el-input>
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
  name: "TradingWithCredit"
})
export default class extends Vue {
  private form:any = {
    account: '0x',
    amount: 0,
    validity: 0,
  };
  async onSubmit(){
    var info = await postData("/api/user/tradingWithCredit",{
      publicKey:localStorage.getItem("account"),
      privateKey:localStorage.getItem('password'),
      receiver: this.form.account,
      amount: this.form.amount,
      validity: this.form.validity,
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