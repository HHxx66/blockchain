<template>
  <div class="box">
    <div class="main">
      <div class="title">登录</div>
      <div class="form">
        <el-input placeholder="请输入账户" prefix-icon="el-icon-user" v-model="account">
        </el-input>
        <el-input placeholder="请输入私钥" prefix-icon="el-icon-lock" v-model="passWord" show-password>
        </el-input>
        <div class="btn">
          <el-button type="success" :loading="isLoading" @click="regist">创建账户</el-button>
          <el-button type="primary" :loading="isLoading" @click="login">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { postData } from "@/utils/request";
import { Message } from "element-ui";
@Component({
  name: "login"
})
export default class extends Vue {
  private account:string = "admin";
  private passWord:string = "123456";
  private isLoading:Boolean = false;

  async regist() {
    var info = await postData("/api/user/regist");
    const h = this.$createElement;
    if(info.publicKey && info.privateKey){
      this.$msgbox({
        title: '提示',
        message: h('div', undefined, [
          h('p', undefined, [
            h('span', undefined, '账户地址 '),
            h('i', { style: 'color: teal' }, info.publicKey)
          ]),
          h('p', undefined, [
            h('span', undefined, '账户私钥 '),
            h('i', { style: 'color: teal' }, info.privateKey)
          ]),
        ]),
        confirmButtonText: '已经记下',
      });
    } else {
      Message.error("获取失败")
    }
  }
  async login() {
    var info = await postData("/api/user/test");
    if(info === "user test"){
      this.isLoading = true;
      localStorage.setItem("account", this.account.replace(/\\n/g,'\n'));
      localStorage.setItem("password", this.passWord.replace(/\\n/g,'\n'));
      this.$router.replace({
        path: "/home",
      });
    }else{
      this.$message.error("服务端连接失败");
    }
  };
};
</script>

<style lang="less" scoped>
  .box {
    width: 100%;
    height: 100vh;
    background-color: #2d3a4b;
    overflow: hidden;
  }

  .main {
    width: 400px;
    margin: 200px auto;
  }

  .title {
    text-align: center;
    font-size: 26px;
    color: #eee;
    font-weight: 600;
  }

  .form {
    margin-top: 40px;
  }

  .form .el-input:nth-child(1) {
    margin-bottom: 25px;
  }

  .btn .el-button {
    width: 40%;
    margin-top: 25px;
    margin-left: 5%;
    margin-right: 5%;
  }

  @media (max-width: 500px) {
    .main {
      width: 320px;
    }
  }
</style>