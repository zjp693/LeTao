<template>
  <div class="my">
    <div class="my_info">
      <h3>会员个人信息</h3>
      <p>
        <span>用户名:</span>
        <span>{{ userInfo.username }}</span>
      </p>
      <p>
        <span>手机号:</span>
        <span>{{ userInfo.mobile }}</span>
      </p>
      <van-button type="danger" @click="logout">退出登录</van-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    ...mapMutations(["updateToken"]),
    // 退出登录
    logout() {
      // 清除vuex中token
      this.updateToken("");

      // 跳转index
      this.$router.push("/");
    }
  }
};
</script>

<style></style>
