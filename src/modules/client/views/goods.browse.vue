<template>
  <div class="goods-browse" @scroll="handleScroll">
    <div class="list">
      <div v-for="item in list" :key="item.id">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="item.image || NoneJpg" class="image">
          <div class="text">
            <div class="title">{{ item.name }}</div>
            <div class="info">
              <i class="price el-icon-coin">{{ item.price }}元</i>
              <i class="stock el-icon-box">库存:{{ item.stock }}</i>
            </div>
          </div>
          <div class="handle">
            <el-button class="w100" :type="item.stock ? 'primary' : 'info'" :disabled="!item.stock"
              icon="el-icon-shopping-cart-full" @click="handleAddGoods(item)">{{ item.stock ?
                '加入购物车' : '商品已售罄'
              }}</el-button>
          </div>
        </el-card>
      </div>
    </div>
    <div class="no-nore">暂无更多商品...</div>
    <router-link to="/shopping-cart/list">
      <div class="cart">
        <i class="el-icon-shopping-cart-full">{{ total }}</i>
      </div>
    </router-link>
  </div>
</template>

<script>
import { ajax } from '@/api/ajax'
import { mapActions, mapGetters } from 'vuex'
import NoneJpg from '@/assets/none.jpg'
export default {
  name: 'GoodsBrowse',
  data() {
    return {
      list: [],
      NoneJpg,
      ajaxOver: true,
      current: 1,
      pageTotal: 0
    }
  },
  computed: {
    ...mapGetters(['goods']),
    total() {
      return this.goods.map(({ num }) => {
        return num
      }).reduce((x, y) => x + y, 0)
    }
  },
  mounted() {
    this.getGoodsList().then(() => {
      this.getGoodsList()
    })
  },
  methods: {
    ...mapActions({ setGoods: 'cart/setGoods' }),
    // 获取商品列表
    getGoodsList() {
      return new Promise((r) => {
        this.$global.loading = true;
        this.ajaxOver = false
        ajax({
          url: '/goods',
          data: {
            current: this.current,
            pageSize: 10
          }
        }).then(({ data }) => {
          const { list, total } = data
          this.list = [...this.list, ...list]
          this.pageTotal = total;
          this.current += 1
          this.ajaxOver = true
          r()
        }).finally(() => {
          this.$global.loading = false
        })
      })

    },
    // 判断页面滚动高度  加载剩余商品
    handleScroll(e) {
      const { scrollTop, scrollHeight, clientHeight } = e.target;
      const min = scrollHeight - (scrollTop + clientHeight)
      if (min < 100) {
        if (this.list.length < this.pageTotal && this.ajaxOver) {
          this.getGoodsList()
        }
      }
    },
    // 添加商品进 购物车
    handleAddGoods(goods) {
      // 调用vuex里的setGodds方法 将商品存储到vuex里
      this.setGoods({ handle: 'add', data: goods })
      this.$notify({
        type: 'success',
        message: '商品成功加入购物车',
        duration: 1000,
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.goods-browse {

  height: calc(100vh - 108px);
  overflow: auto;

  .list {
    display: flex;
    flex-wrap: wrap;
    padding: 1px 0;

    .el-card {
      margin: 6px;
      width: 200px;

      ::v-deep .el-card__body {
        .image {
          display: block;
          width: 200px;
          height: 200px;
          object-fit: cover;
        }

        .text {
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

          .info {
            display: flex;
            align-items: center;
            justify-content: space-between;
            line-height: 1;
            padding: 12px;
            border-top: 1px #dfdfdf dashed;
            font-size: 12px;

            .price {
              color: #ff5500;
            }

            .stock {
              color: #444;
              font-weight: 550;
            }
          }
        }
      }
    }
  }



  .no-nore {
    text-align: center;
    font-size: 16px;
    padding: 24px;
  }

  .cart {
    position: fixed;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 40px;
    bottom: 40px;
    font-size: 24px;
    border-radius: 50%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    color: #ff5500;
    cursor: pointer;
    transition-duration: 600ms;

    &:hover {
      border-radius: 6px;
      color: #1890ff;
    }
  }
}
</style>