import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import VueCookies from 'vue-cookies'
import DefaultLayout from '@/layouts/DefaultLayout'
import Page404 from '@/views/pages/Page404'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    meta: {
      authRequired: true,
      staffRequired: false,
      adminRequired: false,
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
          authRequired: true,
          staffRequired: false,
          adminRequired: false,
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
            authRequired: true,
            staffRequired: false,
            adminRequired: false,
          },
        },
        children: [
          {
            path: '/payments/payment-search',
            name: 'PaymentSearch',
            component: () => import('@/views/payments/PaymentSearch.vue'),
            meta: {
              authRequired: true,
              staffRequired: false,
              adminRequired: false,
            },
          },
          {
            path: '/payments/service-check',
            name: 'ServiceCheck',
            component: () => import('@/views/payments/ServiceCheck.vue'),
            meta: {
              authRequired: true,
              staffRequired: true,
              adminRequired: false,
            },
          },
          {
            path: '/base/log',
            name: 'Log',
            component: () => import('@/views/base/Log.vue'),
            meta: {
              authRequired: true,
              staffRequired: true,
              adminRequired: true,
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
            authRequired: true,
            staffRequired: false,
            adminRequired: false,
          },
        },
        children: [
          {
            path: '/base/kontakts',
            name: 'Kontakts',
            component: () => import('@/views/base/Kontakts.vue'),
            meta: {
              authRequired: true,
              staffRequired: false,
              adminRequired: false,
            },
          },
          {
            path: '/base/log',
            name: 'Log',
            component: () => import('@/views/base/Log.vue'),
            meta: {
              authRequired: true,
              staffRequired: false,
              adminRequired: false,
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
            authRequired: true,
            staffRequired: false,
            adminRequired: false,
          },
        },
        children: [
          {
            name: 'User',
            path: '/management/user',
            component: () => import('@/views/management/User.vue'),
            meta: {
              authRequired: true,
              staffRequired: false,
              adminRequired: false,
            },
          },
          {
            name: 'Role',
            path: '/management/role',
            component: () => import('@/views/management/Role.vue'),
            meta: {
              authRequired: true,
              staffRequired: false,
              adminRequired: false,
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
        authRequired: true,
        staffRequired: false,
        adminRequired: false,
      },
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: () => import('@/views/pages/Page404'),
        meta: {
          authRequired: true,
          staffRequired: false,
          adminRequired: false,
        },
      },

      {
        path: '500',
        name: 'Page500',
        component: () => import('@/views/pages/Page500'),
        meta: {
          authRequired: true,
          staffRequired: false,
          adminRequired: false,
        },
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/pages/Login'),
        meta: {
          authRequired: false,
          staffRequired: false,
          adminRequired: false,
        },
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/pages/Register'),
        meta: {
          authRequired: false,
          staffRequired: false,
          adminRequired: false,
        },
      },
    ],
  },
  {
    path: '/404',
    name: 'Page404',
    component: Page404,
    meta: {
      authRequired: false,
      staffRequired: false,
      adminRequired: false,
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

  //const isAuthenticated = localStorage.getItem('isAuthenticated')
  const token = VueCookies.get('token')
  var user = localStorage.getItem('user')

  var role = ''
  if (user != null) {
    if (user.length > 0) {
      user = JSON.parse(user)
    }
  }

  if (to.meta.authRequired == true) {
    if (user.is_active && token != null) {
      if (to.meta.staffRequired == true) {
        if (user.is_staff && token != null) {
          if (to.meta.adminRequired == true) {
            if (role == 'admin' && token != null) {
              return next()
            } else {
              console.log('Only admins')
              router.push({
                name: 'Index',
              })
            }
          } else {
            return next()
          }
        } else {
          console.log('Only Staff')
          router.push({
            name: 'Dashboard',
          })
        }
      } else {
        return next()
      }
    } else {
      console.log('Only Users')
      router.push({
        name: 'Login',
      })
    }
  } else {
    return next()
  }
})

export default router
