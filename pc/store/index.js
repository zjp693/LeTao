const cookieparser = require("cookieparser");
export const state = () => {
  return {
    token: "",
    userInfo: ""
  };
};
// 同步方法
export const mutations = {
  // 修改用户数据
  updateUserInfo(state, payload) {
    // 修改用户信息

    state.userInfo = payload;
  },
  // 存储用户数据
  updateToken(state, payload) {
    console.log(payload);
    console.log(1111111);
    // 存储用户信息
    state.token = payload;
  }
};

// 调用异步方法
export const actions = {
  // 只在服务端执行一次   路由切换不会执行
  nuxtServerInit({ commit }, { req }) {
    // 定义token
    let token = "";
    // 是否存在cookie
    if (req.headers.cookie) {
      let parsed = require("cookieparser").parse(req.headers.cookie);
      // 设置token
      token = parsed.token;
    }
    // 修改token
    commit("updateToken", token);
  }
};
