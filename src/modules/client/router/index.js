import Layout from '@/layout'
export const route = [
  {
    component: 'GoodsBrowse',
    meta: {
      title: '商品浏览',
      icon: 'education'
    },
    children: [
      {
        component: 'GoodsBrowseIndex',
        meta: {
          title: '商品浏览'
        },
      },
    ]
  },
  {
    component: 'ShoppingCart',
    meta: {
      title: '购物车',
      icon: 'education'
    },
    children: [
      {
        component: 'ShoppingCartIndex',
        meta: {
          title: '购物车'
        },
      },
    ]
  },
  {
    component: 'MyGoods',
    meta: {
      title: '我的订单',
      icon: 'education'
    },
    children: [
      {
        component: 'MyGoodsIndex',
        meta: {
          title: '我的订单'
        },
      },
      {
        component: 'MyGoodsInfo',
        hidden: true,
        meta: {
          title: '订单详情'
        },
      },
    ]
  },

]

export const component = {
  GoodsBrowse: {
    path: '/goods-browse',
    component: Layout,
  },
  GoodsBrowseIndex: {
    path: 'list',
    component: () => import('@/modules/client/views/goods.browse'),
  },
  MyGoods: {
    path: '/my-goods',
    component: Layout,
  },
  MyGoodsIndex: {
    path: 'list',
    component: () => import('@/modules/client/views/myGoods/list'),
  },
  MyGoodsInfo: {
    path: 'see',
    component: () => import('@/modules/client/views/myGoods/see'),
  },
  ShoppingCart: {
    path: '/shopping-cart',
    component: Layout,
  },
  ShoppingCartIndex: {
    path: 'list',
    component: () => import('@/modules/client/views/shopping.cat'),
  },
}

export default {
  route,
  component
}