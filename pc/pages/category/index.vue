<template>
  <div class="category">
    <!-- 一级分类 -->
    <van-tree-select
      height="100vw"
      :items="oneCategoryList"
      :main-active-index.sync="active"
      @click-nav="hanleList"
    >
      <!-- 二级分类 -->
      <template #content>
        <div v-for="item in twoCategoryList" :key="item.id" class="cate_item">
          <van-image width="4rem" :src="item.brandLogo" />
          <p>{{ item.brandName }}</p>
        </div>
      </template>
    </van-tree-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      items: [{ text: "分组 1" }, { text: "分组 2" }]
    };
  },
  async asyncData({ $api }) {
    let active = 0;
    let { oneCategoryList } = await $api.OneCategory();
    // 按照vant 组件对数据的要求，所以我们需要对返回的数据进行加工处理
    oneCategoryList = oneCategoryList.map(item => {
      return {
        text: item.categoryName,
        ...item
      };
    });
    // console.log(oneCategoryList);
    // 加载二级分类
    const { twoCategoryList } = await $api.TwoCategory(
      oneCategoryList[active]["id"]
    );
    // console.log(oneCategoryList[active]["id"]);
    // console.log(twoCategoryList);
    return {
      active,
      oneCategoryList,
      twoCategoryList
    };
  },
  methods: {
    async hanleList(index) {
      console.log(index);
      // 加载二级分类
      const { twoCategoryList } = await this.$api.TwoCategory(
        this.oneCategoryList[index]["id"]
      );
      this.twoCategoryList = twoCategoryList;
      // console.log(
      //   "twoCategoryList",
      //   twoCategoryList,
      //   this.oneCategoryList[index]["id"]
      //   // this.twoCategoryList
      // );
    }
  }
};
</script>

<style scoped>
.cate_item {
  float: left;
  text-align: center;
}
</style>
