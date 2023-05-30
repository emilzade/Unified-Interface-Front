<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer class="">
      <CRow class="d-flex justify-content-center">
        <CCol
          :md="6"
          class="d-flex align-items-center p-5 gap-5 border rounded"
        >
          <div class="display-3">404</div>
          <div class="">
            <div class="m-2 fw-bold fs-4">Oops! You're lost.</div>
            <div class="m-2 text-dark">
              The page you are looking for is not found.
            </div>
            <RouterLink :to="{ name: 'Dashboard' }" class="m-2 text-dark"
              ><CIcon :content="cilArrowLeft"></CIcon>Go Back to Main Page
            </RouterLink>
          </div>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { cilArrowLeft } from '@coreui/icons'
export default {
  name: 'Page404',
  data() {
    return {
      cilArrowLeft,
    }
  },
}
</script>
