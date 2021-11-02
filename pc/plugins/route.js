export default ({ app }) => {
  app.router.beforeEach((to, from, next) => {
    next();
    // console.log("to", to.path);
    // to.path("/my/login");
    // console.log("from", from);
    // from.path();
    //   // console.log("next", next);
    // console.log(app);
    //   // console.log(this);
    // //   // console.log(app.store.state.token);
    //   // console.log(
    //   //   "hhhh===",
    //   //   arr.filter(item => item == to.path)
    //   // );
    let arr = ["/my/register", "/my/login"];
    if (app.store.state.token) {
      if (arr.filter(item => item == to.path).length <= 0) {
        console.log("999999999999", app);
        app.context.route.path = "/my/login";
      } else {
        next();
      }
    } else {
      next();
    }
  });
};
