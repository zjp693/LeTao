<template>
  <div class="pay_home">
    <!-- 已支付 -->
    <div v-if="payStatus" class="pay">
      <h3>靓仔，您已支付哦</h3>
    </div>
    <!-- 未支付 -->
    <div v-else class="nopay">
      <h3>支付二维码</h3>
      <van-image width="100" height="100" :src="payUrl" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      payStatus: false, // 支付状态
      payUrl: "", // 支付二维码地址
      timer: null
    };
  },
  async mounted() {
    const {
      data: {
        payUrl,
        nonce_str,
        out_trade_no,
        result_code,
        return_code,
        return_msg
      }
    } = await this.$api.Order({
      body: this.$route.query.name,
      spbill_create_ip: "127.0.0.1",
      total_fee: this.$route.query.price,
      trade_type: "NATIVE"
    });
    console.log(result_code, return_code, return_msg);
    if (
      result_code[0] == "SUCCESS" &&
      return_code[0] == "SUCCESS" &&
      return_msg[0] == "OK"
    ) {
      this.payUrl = payUrl;

      // 开启定时器轮询查询订单状态;
      this.timer = setInterval(async () => {
        const {
          data: { trade_state }
        } = await this.$api.QueryOrder({ nonce_str, out_trade_no });
        // 如果用户已支付
        if (trade_state == "SUCCESS") {
          this.payStatus = true;
          // 清除定时器
          clearInterval(this.timer);
        }
      }, 3000);
    }
  },
  beforeDestroy() {
    this.timer = null;
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
.pay_home {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
