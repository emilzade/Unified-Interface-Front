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
  },
  /* {
    component: 'CNavTitle',
    name: 'Theme',
  },
  {
    component: 'CNavItem',
    name: 'Colors',
    to: '/theme/colors',
    icon: 'cil-drop',
  },
  {
    component: 'CNavItem',
    name: 'Typography',
    to: '/theme/typography',
    icon: 'cil-pencil',
  },
  {
    component: 'CNavTitle',
    name: 'Components',
  }, */
  {
    component: 'CNavGroup',
    name: 'Ödənişlər',
    to: '/payments',
    icon: 'cil-puzzle',
    items: [
      {
        component: 'CNavItem',
        name: 'Ödəniş axtarışı',
        to: '/payments/payment-search',
      },
      {
        component: 'CNavItem',
        name: 'Service Check',
        to: '/payments/service-check',
      },
      {
        component: 'CNavItem',
        name: 'Log',
        to: '/base/log',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Base',
    to: '/base',
    icon: 'cil-puzzle',
    items: [
      {
        component: 'CNavItem',
        name: 'Kontakts',
        to: '/base/kontakts',
      },
      {
        component: 'CNavItem',
        name: 'Log',
        to: '/base/log',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Management',
    icon: 'cil-settings',
    to: '/management',
    items: [
      {
        component: 'CNavItem',
        name: 'User',
        to: '/management/user',
      },
      {
        component: 'CNavItem',
        name: 'Role',
        to: '/management/role',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Pages',
    to: '/pages',
    icon: 'cil-star',
    items: [
      {
        component: 'CNavItem',
        name: 'Login',
        to: '/pages/login',
      },
      {
        component: 'CNavItem',
        name: 'Register',
        to: '/pages/register',
      },
      {
        component: 'CNavItem',
        name: 'Error 404',
        to: '/pages/404',
      },
      {
        component: 'CNavItem',
        name: 'Error 500',
        to: '/pages/500',
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
