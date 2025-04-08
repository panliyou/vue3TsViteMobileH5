export const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/home/index.vue'),
    name: 'home',
  },
  {
    path: '/register',
    component: () => import('@/views/register/index.vue'),
    name: 'register',
  },
  // {
  //   // 任意路由：上述匹配不到重定向到404
  //   path: '/:pathMatch(.*)*',
  //   redirect: '/404',
  //   name: 'Any',
  // },
]
