export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    /*  badge: {
      color: 'primary',
      text: 'NEW',
    }, */
    meta: {
      authRequired: true,
      staffRequired: false,
      adminRequired: false,
    },
  },
  {
    component: 'CNavGroup',
    name: 'Ödənişlər',
    to: '/payments',
    icon: 'cil-puzzle',
    meta: {
      authRequired: true,
      staffRequired: false,
      adminRequired: false,
    },
    items: [
      {
        component: 'CNavItem',
        name: 'Ödəniş axtarışı',
        to: '/payments/payment-search',
        meta: {
          authRequired: true,
          staffRequired: false,
          adminRequired: false,
        },
      },
      {
        component: 'CNavItem',
        name: 'Service Check',
        to: '/payments/service-check',
        meta: {
          authRequired: true,
          staffRequired: true,
          adminRequired: false,
        },
      },
      {
        component: 'CNavItem',
        name: 'Log',
        to: '/base/log',
        meta: {
          authRequired: true,
          staffRequired: true,
          adminRequired: true,
        },
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Base',
    to: '/base',
    icon: 'cil-puzzle',
    meta: {
      authRequired: true,
      staffRequired: false,
      adminRequired: false,
    },
    items: [
      {
        component: 'CNavItem',
        name: 'Kontakts',
        to: '/base/kontakts',
        meta: {
          authRequired: true,
          staffRequired: false,
          adminRequired: false,
        },
      },
      {
        component: 'CNavItem',
        name: 'Log',
        to: '/base/log',
        meta: {
          authRequired: true,
          staffRequired: false,
          adminRequired: false,
        },
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Management',
    icon: 'cil-settings',
    to: '/management',
    meta: {
      authRequired: true,
      staffRequired: false,
      adminRequired: false,
    },
    items: [
      {
        component: 'CNavItem',
        name: 'User',
        to: '/management/user',
        meta: {
          authRequired: true,
          staffRequired: false,
          adminRequired: false,
        },
      },
      {
        component: 'CNavItem',
        name: 'Role',
        to: '/management/role',
        meta: {
          authRequired: true,
          staffRequired: false,
          adminRequired: false,
        },
      },
    ],
  },

  // {
  //   component: 'CNavItem',
  //   name: 'Download CoreUI',
  //   href: 'http://coreui.io/vue/',
  //   icon: { name: 'cil-cloud-download', class: 'text-white' },
  //   _class: 'bg-success text-white',
  //   target: '_blank'
  // },
  // {
  //   component: 'CNavItem',
  //   name: 'Try CoreUI PRO',
  //   href: 'http://coreui.io/pro/vue/',
  //   icon: { name: 'cil-layers', class: 'text-white' },
  //   _class: 'bg-danger text-white',
  //   target: '_blank'
  // }
]
