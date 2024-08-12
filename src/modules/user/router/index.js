import Layout from '@/layout'
export const route = {
  component: 'User',
  meta: {
    title: '个人中心',
  },
  children: [
    {
      component: 'UserIndex',
      meta: {
        title: '个人中心'
      },
    },
  ]
}

export const component = {
  User: {
    path: '/user',
    component: Layout,
  },
  UserIndex: {
    path: '',
    component: () => import('@/modules/user/views/index'),
  },
}

export default {
  route,
  component
}