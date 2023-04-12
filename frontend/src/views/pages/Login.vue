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
                    <CFormInput placeholder="Email" v-model="payload.email" />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      v-model="payload.password"
                      type="password"
                      placeholder="Password"
                      autocomplete="off"
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
  methods: {
    login: function () {
      fetch('http://172.20.10.183:7000/login/', {
        method: 'Post',
        body: JSON.stringify({
          email: this.payload.email,
          password: this.payload.password,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          this.$cookies.set('token', data.token, 14425, '/', '', false, '')
          //console.log(this.$cookies.get('token'))
        })
    },
  },
  beforeMount() {},
}
</script>
