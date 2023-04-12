import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'
import Page404 from '@/views/pages/Page404'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
      },
      {
        path: '/payments',
        name: 'Payments',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        children: [
          {
            path: '/payments/payment-search',
            name: 'PaymentSearch',
            component: () => import('@/views/payments/PaymentSearch.vue'),
            //component: () => import('@/views/base/Breadcrumbs.vue'),
          },
          {
            path: '/payments/service-check',
            name: 'ServiceCheck',
            component: () => import('@/views/payments/ServiceCheck.vue'),
            //component: () => import('@/views/base/Breadcrumbs.vue'),
          },
          {
            path: '/base/log',
            name: 'Log',
            component: () => import('@/views/base/Log.vue'),
          },
        ],
      },
      {
        path: '/base',
        name: 'Base',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect: '/base/breadcrumbs',
        children: [
          {
            path: '/base/kontakts',
            name: 'Kontakts',
            component: () => import('@/views/base/Kontakts.vue'),
          },
          {
            path: '/base/log',
            name: 'Log',
            component: () => import('@/views/base/Log.vue'),
          },
        ],
      },
      {
        path: '/management',
        name: 'Management',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        children: [
          {
            name: 'User',
            path: '/management/user',
            component: () => import('@/views/management/User.vue'),
          },
          {
            name: 'Role',
            path: '/management/role',
            component: () => import('@/views/management/Role.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: () => import('@/views/pages/Page404'),
      },
      {
        path: '500',
        name: 'Page500',
        component: () => import('@/views/pages/Page500'),
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/pages/Login'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/pages/Register'),
      },
    ],
  },
  {
    path: '/404',
    name: 'Page404',
    component: Page404,
  },
  {
    path: '/:catchall(.*)',
    redirect: '/404',
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
