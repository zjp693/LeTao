export const verify = {
  // 1.校验用户名
  username(uName) {
    //1.1 用户名是否为空
    if (!uName) {
      return "必须输入用户名";
    }
    if (!/^[a-zA-Z0-9]{4,20}$/.test(uName.trim())) {
      return "您输入4到20位的用户的用户名";
    }
    // 1.2 用户名
  },
  // 2.校验密码
  password(pwd, repeatPwd) {
    //2.1 密码是否为空
    if (!pwd) return "密码不能为空";
    // 2,2 密码格式是否正确
    if (!/^[a-zA-Z0-9]{6,20}$/.test(pwd.trim())) {
      return "请输入6到20位的密码";
    }
    //2.3 确认密码是否一致
    if (pwd !== repeatPwd) {
      return "两次输入密码不一致";
    }
  },

  // 3. 校验手机号
  mobile(phone) {
    if (!phone) return "手机号码不能为空";
    if (
      !/^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(
        phone.trim()
      )
    )
      return "手机号码格式不对";
  }
};
