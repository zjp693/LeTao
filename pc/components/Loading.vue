<template>
  <van-overlay :show="show" class="loading">
    <van-loading type="spinner" color="#1989fa" />加载中。。。
  </van-overlay>
</template>

<script>
export default {
  data() {
    return {
      show: false //控制遮罩的显示与隐藏
    };
  },
  methods: {
    // 1.loading 开始加载
    start() {
      console.log("开始");
      this.show = true;
    },
    // 2，laoding 结束加载
    finish() {
      console.log("结束");
      this.show = false;
    }
  }
};
</script>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
