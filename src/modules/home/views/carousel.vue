<template>
  <el-carousel :height="height" trigger="click">
    <el-carousel-item v-for="item in list" :key="item">
      <img :src="Banner" alt="">
    </el-carousel-item>
  </el-carousel>
</template>
  
<script>
import Banner from '@/assets/banner.png'
export default {
  name: "Carousel",
  props: {
    height: {
      type: String,
      default: '540px'
    }
  },
  data() {
    return {
      modules: [Navigation],
      Banner,
      list: [1]
      // list: [
      //   "https://img.zcool.cn/community/01f05c63298ee60002421c5735b8cb.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/quality,q_100/format,webp",
      //   "https://img.zcool.cn/community/01kmq95ilnqf3rcpmvnj2a3333.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/quality,q_100/format,webp",
      //   "https://img.zcool.cn/community/010cb16161830611013e89439ba996.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/quality,q_100/format,webp"
      // ],
    };
  },
  created() {
  },
  methods: {
  },
};
</script>
<style lang="scss" scoped>
.el-carousel {
  ::v-deep {
    .el-carousel__container {
      .el-carousel__item {
        img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          image-rendering: auto;
        }
      }
    }
  }
}
</style>
  