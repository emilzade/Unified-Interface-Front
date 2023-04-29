<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="6">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p class="text-medium-emphasis">Sign In to your account</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      autocomplete="email"
                      placeholder="Email"
                      v-model="payload.email"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      v-model="payload.password"
                      type="password"
                      placeholder="Password"
                      autocomplete="password"
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton @click="login" color="primary" class="px-4">
                        Login
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import router from '@/router'
export default {
  name: 'Login',
  data() {
    const payload = {
      email: '',
      password: '',
    }
    return {
      payload,
    }
  },
  computed: {
    ...mapGetters('auth', {
      getLoginApiStatus: 'getLoginApiStatus',
    }),
  },
  methods: {
    ...mapActions('auth', {
      actionLoginApi: 'loginApi',
    }),
    async login() {
      console.log(this.payload)
      await this.actionLoginApi(this.payload)
      console.log(this.getLoginApiStatus)

      if (this.getLoginApiStatus == 'success') {
        router.push({ name: 'Dashboard' })
      } else {
        console.log('failed')
      }
    },
    // login: function () {
    //   fetch('http://172.20.10.183:7000/login/', {
    //     method: 'Post',
    //     body: JSON.stringify({
    //       email: this.payload.email,
    //       password: this.payload.password,
    //     }),
    //     headers: {
    //       'Content-type': 'application/json',
    //     },
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log(data)
    //       //this.$cookies.set('token', data.token, 14425, '/', '', false, '')
    //       //console.log(this.$cookies.get('token'))
    //     })
    //     .catch((data) => {
    //       throw data
    //     })
    // },
  },
  beforeMount() {
    console.log(
      `Test email : test1@gmail.com
Test password : Password.1`,
    )
  },
}
</script>
