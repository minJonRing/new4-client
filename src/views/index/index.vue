<template>
  <div class="dashboard-container">
    <el-carousel>
      <el-carousel-item v-for="item in list" :key="item">
        <img :src="item" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import Swiper, { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper';
import "swiper/swiper-bundle.min.css";
import NoneJpg from '@/assets/none.jpg'
import { ajax } from '@/api/ajax'
export default {
  name: "Dashboard",
  data() {
    return {
      list: [
        "https://images.unsplash.com/photo-1636537511494-c3e558e0702b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
        "https://images.unsplash.com/photo-1468436385273-8abca6dfd8d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1705&q=80",
        "https://images.unsplash.com/photo-1493707553966-283afac8c358?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
        "https://images.unsplash.com/photo-1508189860359-777d945909ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      ],
      NoneJpg
    };
  },
  mounted() {
    // this.getList()
  },
  methods: {
    getList() {
      return new Promise((r) => {
        this.$global.loading = true;
        ajax({
          url: '/goods/warnList',
          data: {
            current: this.current,
            pageSize: 10
          }
        }).then(({ data }) => {
          const { list } = data
          const _list = [[]]
          for (let key in list) {
            const el = list[key];
            const len = _list.length
            const l = _list[len - 1].length
            if (l === 5) {
              _list.push([])
              _list[len].push(el)
            } else {
              _list[len - 1].push(el)
            }

          }
          this.list = _list
          r()
        }).finally(() => {
          this.$global.loading = false
        })
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 0 !important;

  .el-carousel {
    ::v-deep .el-carousel__container {
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
