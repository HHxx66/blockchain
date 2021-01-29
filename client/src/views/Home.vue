<template>
  <div class="home">
    <el-card shadow="always" :body-style="{ padding: '20px' }" class="home-card">
      <div slot="header">
        <span>SCFP - 基于区块链的供应链金融平台</span>
      </div>
      <p>基于已有的开源区块链系统FISCO-BCOS（https://github.com/FISCO-BCOS/FISCO-BCOS），以联盟链为主，开发基于区块链或区块链智能合约的供应链金融平台，实现供应链应收账款资产的溯源、流转。</p>
      <div slot="header">
        <span>实现功能</span>
      </div>
      
      <ul>
        <li>功能一：实现采购商品—签发应收账款 交易上链。例如车企从轮胎公司购买一批轮胎并签订应收账款单据。</li>
        <li>功能二：实现应收账款的转让上链，轮胎公司从轮毂公司购买一笔轮毂，便将于车企的应收账款单据部分转让给轮毂公司。轮毂公司可以利用这个新的单据去融资或者要求车企到期时归还钱款。</li>
        <li>功能三：利用应收账款向银行融资上链，供应链上所有可以利用应收账款单据向银行申请融资。</li>
        <li>功能四：应收账款支付结算上链，应收账款单据到期时核心企业向下游企业支付相应的欠款。</li>
      </ul>
    </el-card>    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
  name: "Home"
})
export default class extends Vue {}
</script>

<style scoped>
.box-card {
  width: 480px;
}
li {
  margin-top: 30px;
  margin-left: 30px;
}
</style>