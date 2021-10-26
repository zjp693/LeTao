<template>
  <div class="home">
    <!-- 1.轮播图组件 -->
    <IndexCarousel :swipeList="swipeList" />
    <!-- 2.宫格组件 -->
    <IndexGridList :gridList="gridList" />
    <!-- 3.活动组件 -->
    <IndexActive />
    <!-- 4.品牌组件 -->
    <IndexBrand />
    <!-- 5.运动专区 -->
    <IndexSports :sports="sports" />
  </div>
</template>

<script>
export default {
  //asyncData 刷新页面时，运行在服务器，服务器调用服务端接口不存在跨域
  // 跨域是浏览器端一种安全策略  解决浏览器跨域
  async asyncData({ $axios, app: { $api } }) {
    // console.log($axios);
    // const { swipeList } = await $api.$get("/banners");
    // const { gridList } = await $api.$get("/gridList");
    // const { sports } = await $api.$get("/sports");
    // console.log(sports);
    // 并发请求
    const [{ swipeList }, { gridList }, { sports }] = await Promise.all([
      $api.IndexBanners(),
      $api.IndexGridList(),
      $api.IndexSport()
    ]);
    return {
      swipeList,
      gridList,
      sports
    };
  }
};
</script>

<style lang="scss" scoped></style>
