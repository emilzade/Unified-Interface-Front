<template>
  <CForm>
    <CRow class="w-md-75 w-100 m-auto p-0 m-0">
      <CCol class="col-6 col-sm-4 col-md-3 my-1">
        <CFormLabel class="container-fluid"
          >Start Date
          <CFormInput
            id="StartDate"
            type="date"
            placeholder="StartDate"
            class="w-100 h-100"
        /></CFormLabel>
      </CCol>
      <CCol class="col-6 col-sm-4 col-md-3 my-1">
        <CFormLabel class="container-fluid"
          >Start Date
          <CFormInput
            id="EndDate"
            type="date"
            placeholder="StartDate"
            class="w-100 h-100"
        /></CFormLabel>
      </CCol>
      <CCol class="col-6 col-sm-4 col-md-3 my-1">
        <CFormLabel class="container-fluid"
          >Start Date
          <CFormInput
            id="hourStart"
            type="time"
            placeholder="StartDate"
            class="w-100 h-100"
        /></CFormLabel>
      </CCol>
      <CCol class="col-6 col-sm-4 col-md-3 my-1">
        <CFormLabel class="container-fluid"
          >Start Date
          <CFormInput
            id="hourStart"
            type="time"
            placeholder="StartDate"
            class="w-100 h-100"
        /></CFormLabel>
      </CCol>
      <CCol class="col-6 col-sm-4 col-md-3 my-1">
        <CFormLabel class="container-fluid"
          >Start Date
          <VueMultiselect
            v-model="selectedRetailNetwork"
            :options="retailNetworks"
            :limit="1"
            :multiple="false"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            label="name"
            :placeholder="'Select retail network'"
            track-by="name"
        /></CFormLabel>
      </CCol>
      <CCol class="col-6 col-sm-4 col-md-3 my-1">
        <CFormLabel class="container-fluid"
          >Start Date
          <VueMultiselect
            v-model="selectedService"
            :options="services"
            :limit="1"
            :multiple="false"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            label="name"
            :placeholder="'Select Service'"
            track-by="name"
        /></CFormLabel>
      </CCol>
      <CCol class="col-6 col-sm-4 col-md-3 my-1">
        <CFormLabel class="container-fluid"
          >Start Date
          <VueMultiselect
            v-model="selectedStatus"
            :options="statuses"
            :limit="1"
            :multiple="false"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            label="name"
            :placeholder="'Select Status'"
            track-by="name"
        /></CFormLabel>
      </CCol>
      <CCol class="col-6 col-sm-4 col-md-3 my-1">
        <CFormLabel class="container-fluid"
          >Start Date
          <VueMultiselect
            v-model="selectedStatus"
            :options="statuses"
            :limit="1"
            :multiple="false"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            label="name"
            :placeholder="'Select Status'"
            track-by="name"
        /></CFormLabel>
      </CCol>
      <CCol class="col-sm-8 col-12 d-flex justify-content-center gap-4 my-1">
        <div
          class="d-flex flex-column align-items-center"
          v-for="successType in successTypes"
          v-bind:key="successType.Id"
        >
          <label :for="'successType' + successType.Id" role="button"
            ><small>{{ successType.name }}</small></label
          >
          <input
            class="form-check-input"
            type="checkbox"
            :id="'successType' + successType.Id"
            :name="'successType' + successType.Id"
            :value="successType.Id"
          />
        </div>
      </CCol>
      <CCol class="col-sm-4 col-12 d-flex justify-content-end px-3">
        <input class="btn btn-dark mx-2" type="submit" value="search" />
      </CCol>
    </CRow>
  </CForm>

  <CTable hover responsive class="log-table-custom mt-5">
    <CTableHead>
      <CTableRow align="middle">
        <CTableHeaderCell role="button"> </CTableHeaderCell>
        <CTableHeaderCell role="button">Id</CTableHeaderCell>
        <CTableHeaderCell role="button">Name</CTableHeaderCell>
        <CTableHeaderCell role="button"> Surname </CTableHeaderCell>
        <CTableHeaderCell role="button">Some Data</CTableHeaderCell>
        <CTableHeaderCell role="button">Another Data</CTableHeaderCell>
        <CTableHeaderCell role="button">And Another Data</CTableHeaderCell>
        <CTableHeaderCell role="button">And Another Data</CTableHeaderCell>
        <CTableHeaderCell role="button">And Another Data</CTableHeaderCell>
        <CTableHeaderCell role="button">And Another Data</CTableHeaderCell>
        <CTableHeaderCell role="button">And Another Data</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      <CTableRow align="middle">
        <CTableDataCell>
          <div class="d-flex gap-2 justify-content-between">
            <CIcon
              class="text-primary"
              :content="cilMediaPlay"
              role="button"
            ></CIcon>
            <CIcon
              class="text-success"
              :content="cilReload"
              role="button"
            ></CIcon>
          </div>
        </CTableDataCell>
        <CTableDataCell>12323</CTableDataCell>
        <CTableDataCell>Test</CTableDataCell>
        <CTableDataCell>Testov</CTableDataCell>
        <CTableDataCell>Some data example</CTableDataCell>
        <CTableDataCell>Another Data example</CTableDataCell>
        <CTableDataCell>And another Data example</CTableDataCell>
        <CTableDataCell>And another Data example</CTableDataCell>
        <CTableDataCell>And another Data example</CTableDataCell>
        <CTableDataCell>And another Data example</CTableDataCell>
        <CTableDataCell>And another Data example</CTableDataCell>
      </CTableRow>
      <CTableRow align="middle">
        <CTableDataCell>
          <div class="d-flex gap-2 justify-content-between">
            <CIcon
              class="text-primary"
              :content="cilMediaPlay"
              role="button"
            ></CIcon>
            <CIcon
              class="text-success"
              :content="cilReload"
              role="button"
            ></CIcon>
          </div>
        </CTableDataCell>
        <CTableDataCell>12323</CTableDataCell>
        <CTableDataCell>Test</CTableDataCell>
        <CTableDataCell>Testov</CTableDataCell>
        <CTableDataCell>Some data example</CTableDataCell>
        <CTableDataCell>Another Data example</CTableDataCell>
        <CTableDataCell>And another Data example</CTableDataCell>
        <CTableDataCell>And another Data example</CTableDataCell>
        <CTableDataCell>And another Data example</CTableDataCell>
        <CTableDataCell>And another Data example</CTableDataCell>
        <CTableDataCell>And another Data example</CTableDataCell>
      </CTableRow>
      <CTableRow align="middle">
        <CTableDataCell>
          <div class="d-flex gap-2 justify-content-between">
            <CIcon
              class="text-primary"
              :content="cilMediaPlay"
              role="button"
            ></CIcon>
            <CIcon
              class="text-success"
              :content="cilReload"
              role="button"
            ></CIcon>
          </div>
        </CTableDataCell>
        <CTableDataCell>12323</CTableDataCell>
        <CTableDataCell>Test</CTableDataCell>
        <CTableDataCell>Testov</CTableDataCell>
        <CTableDataCell>Some data example</CTableDataCell>
        <CTableDataCell>Another Data example</CTableDataCell>
        <CTableDataCell>And another Data example</CTableDataCell>
        <CTableDataCell>And another Data example</CTableDataCell>
        <CTableDataCell>And another Data example</CTableDataCell>
        <CTableDataCell>And another Data example</CTableDataCell>
        <CTableDataCell>And another Data example</CTableDataCell>
      </CTableRow>
      <CTableRow align="middle">
        <CTableDataCell>
          <div class="d-flex gap-2 justify-content-between">
            <CIcon
              class="text-primary"
              :content="cilMediaPlay"
              role="button"
            ></CIcon>
            <CIcon
              class="text-success"
              :content="cilReload"
              role="button"
            ></CIcon>
          </div>
        </CTableDataCell>
        <CTableDataCell>12323</CTableDataCell>
        <CTableDataCell>Test</CTableDataCell>
        <CTableDataCell>Testov</CTableDataCell>
        <CTableDataCell>Some data example</CTableDataCell>
        <CTableDataCell>Another Data example</CTableDataCell>
        <CTableDataCell>And another Data example</CTableDataCell>
        <CTableDataCell>And another Data example</CTableDataCell>
        <CTableDataCell>And another Data example</CTableDataCell>
        <CTableDataCell>And another Data example</CTableDataCell>
        <CTableDataCell>And another Data example</CTableDataCell>
      </CTableRow>
      <CTableRow align="middle">
        <CTableDataCell>
          <div class="d-flex gap-2 justify-content-between">
            <CIcon
              class="text-primary"
              :content="cilMediaPlay"
              role="button"
            ></CIcon>
            <CIcon
              class="text-success"
              :content="cilReload"
              role="button"
            ></CIcon>
          </div>
        </CTableDataCell>
        <CTableDataCell>12323</CTableDataCell>
        <CTableDataCell>Test</CTableDataCell>
        <CTableDataCell>Testov</CTableDataCell>
        <CTableDataCell>Some data example</CTableDataCell>
        <CTableDataCell>Another Data example</CTableDataCell>
        <CTableDataCell>And another Data example</CTableDataCell>
        <CTableDataCell>And another Data example</CTableDataCell>
        <CTableDataCell>And another Data example</CTableDataCell>
        <CTableDataCell>And another Data example</CTableDataCell>
        <CTableDataCell>And another Data example</CTableDataCell>
      </CTableRow>
    </CTableBody>
  </CTable>
</template>

<!-- <style>
.log-table-custom {
  white-space: nowrap;
}
</style> -->

<script>
import { ref } from 'vue'
import VueMultiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css'
import { cilReload, cilMediaPlay } from '@coreui/icons'
export default {
  name: 'Breadcrumbs',
  components: { VueMultiselect },
  data() {
    const services = [
      {
        id: 1,
        name: 'azercell',
      },
      {
        id: 2,
        name: 'bakcell',
      },
      {
        id: 3,
        name: 'kapital',
      },
    ]
    const retailNetworks = [
      {
        id: 1,
        name: 'Araz',
      },
      {
        id: 2,
        name: 'Kapital',
      },
      {
        id: 3,
        name: 'Bravo',
      },
    ]
    const statuses = [
      {
        id: 1,
        name: 'Success',
      },
      {
        id: 2,
        name: 'Error',
      },
      {
        id: 3,
        name: 'Waiting',
      },
      {
        id: 4,
        name: 'Returned',
      },
    ]
    const successTypes = [
      {
        Id: 1,
        name: 'All',
        default: true,
      },
      {
        Id: 2,
        name: 'Success',
        default: false,
      },
      {
        Id: 3,
        name: 'Error',
        default: false,
      },
      {
        Id: 4,
        name: 'Cancelled',
        default: false,
      },
      {
        Id: 5,
        name: 'Waiting',
        default: false,
      },
    ]
    const selectedService = ref()
    const selectedRetailNetwork = ref()
    const selectedStatus = ref()
    return {
      cilReload,
      cilMediaPlay,

      services,
      retailNetworks,
      statuses,
      successTypes,

      selectedService,
      selectedRetailNetwork,
      selectedStatus,
    }
  },
}
</script>
