<template>
  <van-form @submit="onSubmit">
    <van-field
      v-model="username"
      name="username"
      label="用户名"
      placeholder="用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <van-field
      v-model="password"
      type="password"
      name="password"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">提交</van-button>
    </div>
  </van-form>
</template>

<script>
import Cookie from "js-cookie";
import { verify } from "~/utils";
import { Toast } from "vant";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    ...mapMutations(["updateToken", "updateUserInfo"]),
    async onSubmit(values) {
      // console.log("submit", values);
      const msg =
        verify.username(this.username) || verify.password(this.password);

      // 2.校验不通过 弹框提示并且退出
      if (msg) {
        Toast(msg);
        return;
      }

      // // 表单验证通过
      const {
        code,
        data: { token, username, mobile },
        message
      } = await this.$api.Login(values);
      const data = await this.$api.Login(values);
      if (code == 200) {
        // 存储token到vuex
        this.updateToken(token);
        // 存储用户信息到vuex
        this.updateUserInfo({
          username,
          mobile
        });
        // 存储token到cookie
        Cookie.set("token", token);
        Cookie.set("userInfo", JSON.stringify({ username, mobile }));
        // console.log(JSON.stringify({ username, mobile }));

        // 到首页
        this.$router.push("/");
      } else {
        Toast(message);
        return;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
