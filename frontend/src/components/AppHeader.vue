<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <CHeaderToggler class="ps-1" @click="$store.commit('toggleSidebar')">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>
      <CHeaderNav class="d-none d-md-flex me-auto">
        <CNavItem>
          <router-link class="nav-link" :to="{ name: 'Dashboard' }"
            >Dashboard</router-link
          >
        </CNavItem>
      </CHeaderNav>
      <CHeaderBrand class="mx-auto d-lg-none" to="/">
        <CIcon :icon="logo" height="48" alt="Logo" />
      </CHeaderBrand>

      <CHeaderNav>
        <CDropdown
          v-if="isAuthenticated == true || getToken != null"
          color="secondary"
          direction="center"
        >
          <CDropdownToggle color="secondary"
            ><CIcon :content="cilUser"
          /></CDropdownToggle>
          <CDropdownMenu class="transition-0">
            <CDropdownItem
              class="text-secondary"
              style="background-color: rgb(240, 240, 240)"
              >{{ JSON.parse(getUserProfile).email }}</CDropdownItem
            >
            <CDropdownItem disabled>Profile</CDropdownItem>
            <CDropdownItem disabled>Settings</CDropdownItem>
            <CDropdownItem disabled>Events</CDropdownItem>
            <CDropdownDivider />
            <CDropdownItem class="cursor-pointer" @click="logOut"
              >Log out</CDropdownItem
            >
          </CDropdownMenu>
        </CDropdown>
        <CNavItem v-else>
          <router-link class="nav-link" :to="{ name: 'Login' }"
            >Login</router-link
          >
        </CNavItem>
      </CHeaderNav>
    </CContainer>
    <CHeaderDivider />
    <CContainer fluid>
      <AppBreadcrumb />
    </CContainer>
  </CHeader>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
//import router from '@/router'
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
  computed: {
    isAuthenticated: function () {
      return this.$store.state.auth.isAuthenticated
    },
    ...mapGetters('auth', {
      getToken: 'getToken',
      getUserProfile: 'getUserProfile',
    }),
    userProfile: function () {
      return this.getUserProfile
    },
  },
  methods: {
    ...mapActions('auth', {
      actionLogOut: 'userLogout',
    }),
    logOut: async function () {
      await this.actionLogOut()
      location.reload()
    },
  },
  beforeMount() {
    if (this.isAuthenticated == true) {
      location.reload()
    }
  },
}
</script>
