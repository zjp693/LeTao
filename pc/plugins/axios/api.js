export default ({ $request }, inject) => {
  inject("api", {
    /**
     * 首页轮播图接口
     * @returns
     */
    IndexBanners() {
      return $request.$get("/banners");
    },
    /**
     * 获取首页宫格数据
     * @returns
     */
    IndexGridList() {
      return $request.$get("/gridList");
    },

    /**
     * 获取首页运动专区数据
     * @returns
     */
    IndexSport() {
      return $request.$get("/sports");
    },
    /**
     * 获取一级分类数据
     * @returns
     */
    OneCategory() {
      return $request.$get("/oneCategory");
    },
    /**
     * 获取二级分类
     * @returns
     */
    TwoCategory(cid) {
      return $request.$get(`/twoCategory?id=${cid}`);
    },
    /**
     *发送短信
     * @param {} mobile
     * @returns
     */
    SendSmsCode(mobile) {
      return $request.$post("/sendsms", { mobile });
    },
    /**
     *注册
     * @param {*} data
     * @returns
     */
    Register(data) {
      return $request.$post("/users/register", data);
    },
    /**
     *登录
     * @param {*} data
     * @returns
     */
    Login(data) {
      return $request.$post("/users/login", data);
    },
    /**
     * 微信下单
     * @param {Object} data 下单参数
     * @returns
     */
    Order(data) {
      return $request.$post("/order", data);
    },
    /**
     * 微信订单查询
     * @param {Object} data
     * @returns
     */
    QueryOrder(data) {
      return $request.$post("/queryorder", data);
    }
  });
};
