<template>
  <div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
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
        <van-field
          v-model="repeatPassword"
          type="password"
          name="password"
          label="确认密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请确认密码' }]"
        />
        <van-field
          v-model="mobile"
          type="mobile"
          name="mobile"
          label="手机号"
          placeholder="请输入手机号"
          :rules="[{ required: true, messagee: '请填手机号' }]"
        >
          <template #button>
            <van-button
              type="primary"
              size="small"
              :disabled="isDisabled"
              @click="sendSmsHandle"
              >{{ smsBtnText }}</van-button
            >
          </template>
        </van-field>
        <van-field
          v-model="smscode"
          type="txt"
          name="smscode"
          label="验证码"
          placeholder="请输入验证码"
          :rules="[{ required: true, messagee: '请输入验证吗' }]"
        >
        </van-field>
        <template #input> </template>
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <!-- 会员协议 -->
    <van-row type="flex" justify="left">
      <van-col offset="2">
        <van-checkbox v-model="checked" shape="square"></van-checkbox>
      </van-col>
      <van-col>《请阅读相关协议》</van-col>
    </van-row>
  </div>
</template>

<script>
import { verify } from "~/utils";
import { Toast } from "vant";
export default {
  data() {
    return {
      username: "", //用户名
      password: "", //密码
      repeatPassword: "", //确认密码
      mobile: "", //手机号

      isDisabled: false, //发送短信禁用
      smsBtnText: "发送短信",
      smscode: "", // 保存用户在页面输入的短信验证码
      smscodeServer: "", // 保存调用发送短信接口返回的验证码
      checked: false // 用户是否勾选吧协议
    };
  },
  methods: {
    // value 所有表单数据
    async onSubmit(value) {
      // console.log(value);
      // console.log(this.mobile);
      if (!this.checked) Toast("请勾选协议后才能注册~");
      const msg =
        verify.username(this.username) ||
        verify.password(this.password, this.repeatPassword) ||
        verify.mobile(this.mobile);

      // 2.校验不通过 弹框提示并且退出
      if (msg) {
        Toast(msg);
        return;
      }
      // 3.验证短信验证码
      if (this.smscode !== this.smscodeServer) {
        Toast("验证码输入有误");
      }
      console.log(this.smscode);
      console.log(this.smscodeServer);
      // 4.调用注册接口
      const { status } = await this.$api.Register(value);
      // console.log(data);

      if (status == 200) {
        // 注册成功把用户的信息 存在vuex中
        // 跳转登录页面
        this.$router.push("/my/login");
      }
    },
    // 发送短信验证码
    async sendSmsHandle() {
      // 禁用发送按钮可用状态
      this.isDisabled = true;
      // 定义时间 控制禁用时间
      let times = 30;
      this.timerId = setInterval(() => {
        times--;
        this.smsBtnText = `剩余${times}s`;
        //  30秒到了  按钮可用
        if (times == 0) {
          this.isDisabled = false;
          // 清除定时器
          clearInterval(this.timerId);
          // 重置发送短信按钮提示信息
          this.smsBtnText = "发送短信";
        }
      }, 1000);
      // 调用发送短信接口
      const { code } = await this.$api.SendSmsCode(this.mobile);
      console.log(code);
      // 保存服务端返回的短信验证码
      this.smscodeServer = code;

      console.log(this.smscodeServer);
    }
  }
};
</script>

<style lang="scss" scoped></style>
