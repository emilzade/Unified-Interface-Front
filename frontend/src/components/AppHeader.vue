<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <CHeaderToggler class="ps-1" @click="$store.commit('toggleSidebar')">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>
      <CHeaderBrand class="mx-auto d-lg-none" to="/">
        <CIcon :icon="logo" height="48" alt="Logo" />
      </CHeaderBrand>
      <CHeaderNav class="d-none d-md-flex me-auto">
        <CNavItem>
          <router-link class="nav-link" :to="{ name: 'Dashboard' }"
            >Dashboard</router-link
          >
        </CNavItem>
      </CHeaderNav>
      <CHeaderNav>
        <CDropdown color="secondary" direction="center">
          <CDropdownToggle color="secondary"
            ><CIcon :content="cilUser"
          /></CDropdownToggle>
          <CDropdownMenu class="transition-0">
            <CDropdownItem disabled>Profile</CDropdownItem>
            <CDropdownItem disabled>Settings</CDropdownItem>
            <CDropdownItem disabled>Events</CDropdownItem>
            <CDropdownDivider />
            <CDropdownItem class="cursor-pointer" @click="logOut"
              >Log out</CDropdownItem
            >
          </CDropdownMenu>
        </CDropdown>
      </CHeaderNav>
    </CContainer>
    <CHeaderDivider />
    <CContainer fluid>
      <AppBreadcrumb />
    </CContainer>
  </CHeader>
</template>

<script>
import { mapActions } from 'vuex'
import router from '@/router'
import AppBreadcrumb from './AppBreadcrumb'
import { logo } from '@/assets/brand/logo'
import { cilUser } from '@coreui/icons'
export default {
  name: 'AppHeader',
  components: {
    AppBreadcrumb,
  },
  data() {
    return {
      logo,
      cilUser,
    }
  },
  methods: {
    ...mapActions('auth', {
      actionLogOut: 'userLogout',
    }),
    logOut: async function () {
      await this.actionLogOut()

      router.push({ name: 'Login' })
    },
  },
  beforeMount() {},
}
</script>
