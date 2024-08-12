<template>
	<div class="shopping-cat">
		<div class="goods-list">
			<div v-for="item in goods" :key="item.id" class="w100">
				<el-card :body-style="{ padding: '0px' }">
					<img :src="item.goods.image || NoneJpg" class="image">
					<div class="text">
						<div class="title">{{ item.goods.name }}</div>
					</div>
					<div class="handle">
						<i class="price el-icon-coin">{{ item.goods.price }}元</i>
						<el-input-number class="ml10" v-model="item.num" :min="1" :max="99999" label="数量"
							style="width:110px" @change="(val) => handleChangeNum(item.goods, val)" />
						<el-popconfirm class="ml10" title="确定删除？" placement="top" @confirm="handleDelete(item.goods)">
							<el-button slot="reference" style="color: red" type="text">
								删除
							</el-button>
						</el-popconfirm>
					</div>
				</el-card>
			</div>
		</div>
		<div class="goods-handle">
			<div class="total">合计：<i class="price el-icon-coin">{{ total }}元</i></div>
			<el-button type="danger" @click="handleAddOrder">下单</el-button>
		</div>
	</div>
</template>
  
<script>
import { ajax } from '@/api/ajax';
import { mapActions, mapGetters } from 'vuex';
import NoneJpg from '@/assets/none.jpg'
export default {
	name: 'GoodsBrowse',
	data() {
		return {
			NoneJpg
		}
	},
	computed: {
		...mapGetters(['goods']),
		// 获取商品的合计金额
		total() {
			return Math.ceil(this.goods.map(({ goods, num }) => {
				return goods.price * num
			}).reduce((x, y) => x + y, 0) * 100) / 100
		},
	},
	created() {
	},
	methods: {
		...mapActions({ setGoods: 'cart/setGoods' }),
		// 设置商品数量
		handleChangeNum(goods, val) {
			this.setGoods({ handle: 'change', data: goods, num: val })
		},
		// 删除商品
		handleDelete(goods) {
			this.setGoods({ handle: 'reduce', data: goods })
		},
		// 下单
		handleAddOrder() {
			this.$global.loading = true;
			const data = this.goods.map(({ goods, num }) => ({ gid: goods.id, num }))
			ajax({
				url: '/orders',
				method: 'post',
				data
			}).then(() => {
				this.setGoods([])
				this.$notify.success('下单成功')
				// 下单成功 清除vuex里的商品信息 ，并返回商品列表
				this.setGoods({ handle: 'empty' })
				this.$router.push('/my-goods/list')
			}).finally(() => {
				this.$global.loading = false
			})
		}
	}
}
</script>
  
<style lang="scss" scoped>
.shopping-cat {
	height: calc(100vh - 108px);
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

					.price {
						width: 80px;
						font-size: 12px;
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
		background-color: #f5f5f5;
		height: 40px;
		padding-left: 12px;

		.total {
			font-size: 14px;

			.price {
				color: #ff4949;
				font-weight: bold;
			}
		}

		.el-button {
			height: 100%;
			width: 100px;
		}
	}
}
</style>