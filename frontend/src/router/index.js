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
    meta: {
      authRequired: 'true',
      adminRequired: 'true',
    },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
        meta: {
          authRequired: 'true',
          adminRequired: 'true',
        },
      },
      {
        path: '/payments',
        name: 'Payments',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
          meta: {
            authRequired: 'true',
            adminRequired: 'true',
          },
        },
        children: [
          {
            path: '/payments/payment-search',
            name: 'PaymentSearch',
            component: () => import('@/views/payments/PaymentSearch.vue'),
            meta: {
              authRequired: 'true',
              adminRequired: 'true',
            },
          },
          {
            path: '/payments/service-check',
            name: 'ServiceCheck',
            component: () => import('@/views/payments/ServiceCheck.vue'),
            meta: {
              authRequired: 'true',
              adminRequired: 'true',
            },
          },
          {
            path: '/base/log',
            name: 'Log',
            component: () => import('@/views/base/Log.vue'),
            meta: {
              authRequired: 'true',
              adminRequired: 'true',
            },
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
          meta: {
            authRequired: 'true',
            adminRequired: 'true',
          },
        },
        children: [
          {
            path: '/base/kontakts',
            name: 'Kontakts',
            component: () => import('@/views/base/Kontakts.vue'),
            meta: {
              authRequired: 'true',
              adminRequired: 'true',
            },
          },
          {
            path: '/base/log',
            name: 'Log',
            component: () => import('@/views/base/Log.vue'),
            meta: {
              authRequired: 'true',
              adminRequired: 'true',
            },
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
          meta: {
            authRequired: 'true',
            adminRequired: 'true',
          },
        },
        children: [
          {
            name: 'User',
            path: '/management/user',
            component: () => import('@/views/management/User.vue'),
            meta: {
              authRequired: 'true',
              adminRequired: 'true',
            },
          },
          {
            name: 'Role',
            path: '/management/role',
            component: () => import('@/views/management/Role.vue'),
            meta: {
              authRequired: 'true',
              adminRequired: 'true',
            },
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
      meta: {
        authRequired: 'true',
        adminRequired: 'true',
      },
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: () => import('@/views/pages/Page404'),
        meta: {
          authRequired: 'true',
          adminRequired: 'true',
        },
      },

      {
        path: '500',
        name: 'Page500',
        component: () => import('@/views/pages/Page500'),
        meta: {
          authRequired: 'true',
          adminRequired: 'true',
        },
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/pages/Login'),
        meta: {
          authRequired: 'false',
          adminRequired: 'false',
        },
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/pages/Register'),
        meta: {
          authRequired: 'false',
          adminRequired: 'false',
        },
      },
    ],
  },
  {
    path: '/404',
    name: 'Page404',
    component: Page404,
    meta: {
      authRequired: 'false',
      adminRequired: 'false',
    },
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

router.beforeEach((to, from, next) => {
  //check page is protected or not
  console.log('authRequired', to.meta.authRequired)
  console.log('adminRequired', to.meta.adminRequired)

  if (to.meta.authRequired === 'true') {
    const role = localStorage.getItem('role')
    if (role == 'user' || role == 'admin') {
      if (to.meta.adminRequired === 'true') {
        if (role == 'admin') {
          return next()
        } else {
          alert('Sorry , you need an admin permission for that...')
          router.push({
            name: 'Index',
          })
        }
      } else {
        return next()
      }
    } else {
      router.push({
        name: 'Login',
      })
    }
  } else {
    return next()
  }
})

export default router
