<template>
  <!-- 1.标题 -->
  <div class="container">
    <header>
      <van-nav-bar :title="title" left-text="返回" left-arrow>
        <template #right>
          <van-icon name="search" size="18" />
        </template>
      </van-nav-bar>
    </header>
    <!-- 2.主题 -->
    <main>
      <nuxt />
    </main>
    <!-- 3.导航 -->
    <footer>
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="search" to="/category">分类</van-tabbar-item>
        <van-tabbar-item icon="friends-o" to="/cart">购物车</van-tabbar-item>
        <van-tabbar-item icon="setting-o" to="/my">我的</van-tabbar-item>
      </van-tabbar>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      title: ""
    };
  },
  methods: {
    refreshHandle() {
      // console.log(1);
      this.title = {
        index: "乐淘-首页",
        category: "乐淘-分类页",
        cart: "乐淘-购物车",
        my: "乐淘-我的"
      }[this.$route.name];
    }
  },
  mounted() {
    this.refreshHandle();
  },
  watch: {
    $route() {
      console.log(this.$route);
      this.refreshHandle();
    }
  }
};
</script>

<style lang="scss" scoped></style>
