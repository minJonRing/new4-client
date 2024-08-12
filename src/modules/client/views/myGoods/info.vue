<template>
  <div class="shopping-cat">
    <div class="goods-list">
      <div v-for="item in list" :key="item.id" class="w100">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="item.image || NoneJpg" class="image">
          <div class="text">
            <div class="title">{{ item.name }}</div>
          </div>
          <div class="handle">
            <i class="price el-icon-coin">{{ item.price }}元</i>
            <i class="el-icon-close">{{ item.num }}</i>
          </div>
        </el-card>
      </div>
    </div>
    <div class="goods-handle">
      <div class="total">合计：<i class="price el-icon-coin">{{ price }}元</i></div>
      <btn-return style="height:100%" />
    </div>
  </div>
</template>
  
<script>
import { ajax } from '@/api/ajax';
import NoneJpg from '@/assets/none.jpg'
export default {
  name: 'GoodsBrowse',
  data() {
    return {
      NoneJpg,
      list: [],
      price: ''
    }
  },
  created() {
    const { id } = this.$route.query;
    id && this.getOrders(id)
  },
  methods: {
    // 获取订单信息
    getOrders(id) {
      this.$global.loading = true;
      ajax({
        url: '/orders/' + id,
      }).then(({ data }) => {
        const { ordersItems, price } = data.order || {};
        this.list = ordersItems;
        this.price = price
      }).finally(() => {
        this.$global.loading = false
      })
    },
  }
}
</script>
  
<style lang="scss" scoped>
.shopping-cat {
  height: calc(100vh - 132px);
  padding: 0;

  .goods-list {
    padding: 1px 0;
    height: calc(100% - 40px);
    overflow: auto;

    .el-card {
      margin: 6px 0;
      width: 100%;

      ::v-deep .el-card__body {
        display: flex;

        .image {
          display: block;
          width: 80px;
          height: 80px;
          object-fit: cover;
        }

        .text {
          flex: 1;

          .title {
            height: 42px;
            line-height: 1.5;
            font-weight: 600;
            font-size: 14px;
            margin: 6px;
            overflow: hidden;
            -webkit-line-clamp: 2;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
          }
        }

        .handle {
          display: flex;
          align-items: center;
          padding: 0 12px;
          background-color: #f5f5f5;
          font-size: 12px;

          .price {
            width: 80px;
            color: #ff5500;
          }
        }
      }
    }
  }

  .goods-handle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #dfdfdf;
    height: 40px;
    padding-left: 12px;


    .total {
      font-size: 14px;

      .price {

        color: #ff4949;
        font-weight: bold;
      }
    }
  }
}
</style>