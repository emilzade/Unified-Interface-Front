<template>
  <CForm
    method="GET"
    class="d-flex justify-content-between align-items-center user-select-none"
  >
    <CRow class="container-fluid">
      <!--select options start-->
      <CCol
        class="d-flex col-md-4 col-sm-12 col-12 my-1 justify-content-between align-items-center col-12 border rounded"
      >
        <div
          class="d-flex flex-column align-items-center w-100"
          v-for="terminal in terminalTypes"
          v-bind:key="terminal.id"
        >
          <label class="w-100 text-center" role="button" :for="terminal.name"
            ><small>{{ terminal.name }}</small></label
          >
          <input
            class="form-check-input"
            type="radio"
            :id="terminal.name"
            v-model="searchForm.terminalType"
            name="terminalType"
            :value="terminal.name"
            :checked="terminal.default"
            @click="selectTerminalType"
          />
        </div>
      </CCol>
      <CCol class="col-12 col-md-4 col-sm-6 my-2">
        <VueMultiselect
          v-model="selectedProvider"
          :options="providers"
          :limit="1"
          :multiple="false"
          :close-on-select="true"
          :clear-on-select="false"
          :preserve-search="true"
          label="providername"
          track-by="providername"
          :placeholder="'Select Providers'"
          @select="selectProvider"
          @remove="searchForm.provider_id = ''"
        />
      </CCol>
      <CCol class="col-12 col-md-4 col-sm-6 my-2">
        <VueMultiselect
          v-model="selectedService"
          :options="services"
          :limit="1"
          :multiple="false"
          :close-on-select="true"
          :clear-on-select="false"
          :preserve-search="true"
          :placeholder="'Select Service'"
          label="servicename"
          track-by="servicename"
          @select="selectService"
          @remove="searchForm.serviceid = ''"
        />
      </CCol>
      <CCol
        class="d-flex col-md-4 col-12 border rounded my-2 justify-content-between align-items-center"
      >
        <div
          class="d-flex flex-column align-items-center my-1 w-100"
          v-for="successType in successTypes"
          v-bind:key="successType.id"
        >
          <label :for="'successType' + successType.id" role="button"
            ><small>{{ successType.name }}</small></label
          >
          <input
            class="form-check-input"
            type="checkbox"
            :id="'successType' + successType.id"
            v-model="searchForm.successTypeList"
            :name="'successType' + successType.id"
            :value="successType.name"
            :checked="successType.default"
          />
        </div>
      </CCol>
      <CCol class="col-md-2 col-6 my-2">
        <CFormInput
          v-model="searchForm.dateStart"
          id="StartDate"
          type="date"
          placeholder="StartDate"
          class="w-100 h-100"
        />
      </CCol>
      <CCol class="col-md-2 col-6 my-2">
        <CFormInput
          v-model="searchForm.timeStart"
          id="hourStart"
          type="time"
          placeholder="StartDate"
          class="w-100 h-100"
        />
      </CCol>
      <CCol class="col-md-2 col-6 my-2">
        <CFormInput
          v-model="searchForm.dateEnd"
          id="EndDate"
          type="date"
          placeholder="EndDate"
          class="w-100 h-100"
        />
      </CCol>
      <CCol class="col-md-2 col-6 my-2">
        <CFormInput
          v-model="searchForm.timeEnd"
          id="hourEnd"
          type="time"
          placeholder="EndDate"
          class="w-100 h-100"
        />
      </CCol>
      <!--select options end-->

      <CCol class="col-12 my-2 d-flex align-items-center justify-content-end"
        ><div class="btn btn-lg btn-secondary" @click="search">
          Search
        </div></CCol
      >
      <!--date inputs start-->
      <!-- <CCol class="col-sm-2 col-6 my-2">
        <CFormInput
          v-model="searchForm.dateStart"
          id="StartDate"
          type="date"
          placeholder="StartDate"
          class="w-100 h-100"
        />
      </CCol>
      <CCol class="col-sm-2 col-6 my-2">
        <CFormInput
          v-model="searchForm.timeStart"
          id="hourStart"
          type="time"
          placeholder="StartDate"
          class="w-100 h-100"
        />
      </CCol>
      <CCol class="col-sm-2 col-6 my-2">
        <CFormInput
          v-model="searchForm.dateEnd"
          id="EndDate"
          type="date"
          placeholder="EndDate"
          class="w-100 h-100"
        />
      </CCol>
      <CCol class="col-sm-2 col-6 my-2">
        <CFormInput
          v-model="searchForm.timeEnd"
          id="hourEnd"
          type="time"
          placeholder="EndDate"
          class="w-100 h-100"
        />
      </CCol> -->
      <!--date inputs end-->
    </CRow>
  </CForm>

  <!--data table start-->
  <CTable striped hover small responsive class="mt-5">
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell
          class="user-select-none"
          v-for="(item, index) in thData"
          :key="index"
          role="button"
          scope="col"
          @click="sort(item.sortBy)"
          >{{ item.title }}</CTableHeaderCell
        >
      </CTableRow>
    </CTableHead>
    <CTableBody>
      <CTableRow align="middle" v-for="item in sortedSearchResults" :key="item">
        <CTableDataCell> o </CTableDataCell>
        <CTableDataCell>
          <span style="width: 100px; display: block; overflow: hidden">
            {{ item.providername }}
          </span>
        </CTableDataCell>
        <CTableDataCell>
          <span style="width: 100px; display: block; overflow: hidden">
            {{ item.servicename }}
          </span>
        </CTableDataCell>
        <CTableDataCell>
          <span
            class="text-center text-light rounded"
            :class="bgColorCheck(item.status_value)"
            style="width: 100px; display: block; overflow: hidden"
          >
            {{ item.status_value }}
          </span>
        </CTableDataCell>
        <CTableDataCell>
          <span style="width: 100px; display: block; overflow: hidden">
            {{ item.locationname }}
          </span>
        </CTableDataCell>
        <CTableDataCell>
          <span style="width: 100px; display: block; overflow: hidden">
            {{ item.payment_count }}
          </span>
        </CTableDataCell>
        <CTableDataCell>
          <span
            :class="{
              'bg-purple': item.type == 'Mpay',
              'bg-blue': item.type == 'Modenis',
            }"
            class="text-center rounded"
            style="width: 100px; display: block; overflow: hidden"
          >
            {{ item.type }}
          </span>
        </CTableDataCell>
        <CTableDataCell>
          <span
            @click="PassQueryToPaymentSearch(item)"
            class="d-flex justify-content-center align-items-center"
          >
            <CIcon
              class="text-success m-auto"
              :content="cilExternalLink"
            ></CIcon>
          </span>
        </CTableDataCell>
      </CTableRow>
    </CTableBody>
  </CTable>
  <!--data table end-->

  <!--alert start-->
  <CAlert
    v-if="alertObject.isActive"
    @close="
      () => {
        alertObject.isActive = false
      }
    "
    color="danger"
    dismissible
    class="alert-custom"
  >
    {{ alertObject.message }}
  </CAlert>
  <!--alert end-->

  <!--pagination start-->
  <div
    class="d-flex flex-column justify-content-center align-items-center w-50 m-auto gap-2 text-center pt-3"
  >
    <!-- <div class="border rounded p-1">
      <CFormLabel for="itemsPerPage">Items per page</CFormLabel>
      <input
        class="p-2 rounded border"
        type="number"
        v-model="itemsPerPage"
        id="itemsPerPage"
        name="itemsPerPage"
        min="1"
        max="100"
      />
    </div> -->
    <pagination
      v-model="page"
      :records="totalElementCount"
      :per-page="itemsPerPage"
      @paginate="pageSelected"
      :options="{ chunk: 8 }"
    />
  </div>
  <!--pagination end-->

  <PageLoader :isLoading="pageLoading"></PageLoader>
</template>

<script>
//paginate , pass data via route
import { ref } from 'vue'
import VueMultiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css'
import Pagination from 'v-pagination-3'
import PageLoader from '@/components/PageLoader.vue'
import { cilExternalLink } from '@coreui/icons'
export default {
  components: {
    VueMultiselect,
    Pagination,
    PageLoader,
  },
  name: 'ServiceCheck',

  data() {
    const searchForm = ref({
      terminalType: 'Both',
      serviceid: '',
      provider_id: '',
      successTypeList: [],
      dateStart: this.getPreviousDay(
        new Date(new Date().toISOString().slice(0, 10)),
      )
        .toISOString()
        .slice(0, 10),
      dateEnd: new Date().toISOString().slice(0, 10),
      timeStart: new Date().toString().slice(16, 21),
      timeEnd: new Date().toString().slice(16, 21),
    })
    const terminalTypes = [
      {
        id: '1',
        name: 'Both',
        type: 'radio',
        default: true,
      },
      {
        id: '2',
        name: 'Mpay',
        type: 'radio',
        default: false,
      },
      {
        id: '3',
        name: 'Modenis',
        type: 'radio',
        defaut: false,
      },
    ]
    const successTypes = [
      // {
      //   id: 1,
      //   name: 'All',
      //   type: 'radio',
      //   default: true,
      // },
      {
        id: 2,
        name: 'success',
        type: 'radio',
        default: false,
      },
      {
        id: 3,
        name: 'reject',
        type: 'radio',
        default: false,
      },
      {
        id: 4,
        name: 'processing',
        type: 'radio',
        default: false,
      },
    ]
    const dbData = { results: [] }
    const thData = [
      { id: 1, title: '', sortBy: null },
      { id: 2, title: 'Provider', sortBy: 'providername' },
      { id: 3, title: 'Service', sortBy: 'servicename' },
      { id: 4, title: 'Status', sortBy: 'status_value' },
      { id: 5, title: 'Location', sortBy: 'locationname' },
      { id: 6, title: 'Payment Count', sortBy: 'payment_count' },
      { id: 7, title: 'Terminal', sortBy: 'type' },
      { id: 8, title: 'Operations', sortBy: 'operations' },
    ]

    const dbServices = []
    const dbProviders = []
    const pageLoading = ref(false)
    const totalElementCount = 0
    const itemsPerPage = 25

    const currentSort = 'servicename'
    const currentSortDir = 'asc'

    const selectedService = ref()
    const selectedProvider = ref()

    const alertObject = {
      isActive: false,
      message: '',
    }

    return {
      alertObject,
      cilExternalLink,
      searchForm,
      terminalTypes,
      successTypes,
      thData,
      dbData,
      pageLoading,
      totalElementCount,
      itemsPerPage,
      page: 1,
      dbServices,
      dbProviders,
      selectedService,
      selectedProvider,
      currentSortDir,
      currentSort,
    }
  },
  computed: {
    dynamicSearchQuery() {
      return (offset) =>
        `http://172.20.10.183:7000/service-check/?service_id=${this.searchForm.serviceid}&provider_id=${this.searchForm.provider_id}&paydate__range=${this.searchForm.dateStart}T${this.searchForm.timeStart}%2C${this.searchForm.dateEnd}T${this.searchForm.timeEnd}${this.selectedModel}${this.selectedStatus}&offset=${offset}`
    },
    sortedSearchResults() {
      /*eslint-disable*/
      return this.dbData.results.sort((a, b) => {
        let modifier = 1
        if (this.currentSortDir === 'desc') modifier = -1
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier
        return 0
      })
    },
    selectedModel() {
      if (this.searchForm.terminalType == 'Both') {
        return ''
      } else if (this.searchForm.terminalType == 'Mpay') {
        return '&model=mpay'
      } else if (this.searchForm.terminalType == 'Modenis') {
        return '&model=modenis'
      }
    },
    selectedStatus() {
      if (this.searchForm.successTypeList.length == 0) {
        return ''
      } else {
        var tempString = ''
        for (var i = 0; i < this.searchForm.successTypeList.length; i++) {
          tempString += '&status=' + this.searchForm.successTypeList[i]
        }
        return tempString
      }
    },
    // selectedStatus() {
    //   if (this.searchForm.successType == 'All') {
    //     return ''
    //   } else if (this.searchForm.successType == 'success') {
    //     return '&status=success'
    //   } else if (this.searchForm.successType == 'reject') {
    //     return '&status=reject'
    //   } else if (this.searchForm.successType == 'processing') {
    //     return '&status=processing'
    //   }
    // },
    services() {
      if (this.selectedProvider == null) {
        return this.searchForm.terminalType == 'Mpay'
          ? this.dbServices.filter((x) => x.type == 'Mpay_Service')
          : this.searchForm.terminalType == 'Modenis'
          ? this.dbServices.filter((x) => x.type == 'Modenis_Service')
          : this.dbServices
      } else {
        return this.searchForm.terminalType == 'Mpay'
          ? this.dbServices.filter(
              (x) =>
                x.type == 'Mpay_Service' &&
                x.provider_id == this.selectedProvider.provider_id,
            )
          : this.searchForm.terminalType == 'Modenis'
          ? this.dbServices.filter(
              (x) =>
                x.type == 'Modenis_Service' &&
                x.provider_id == this.selectedProvider.provider_id,
            )
          : this.dbServices.filter(
              (x) => x.provider_id == this.selectedProvider.provider_id,
            )
      }
    },
    providers() {
      return this.searchForm.terminalType == 'Mpay'
        ? this.dbProviders.filter((x) => x.type == 'Mpay_Provider')
        : this.searchForm.terminalType == 'Modenis'
        ? this.dbProviders.filter((x) => x.type == 'Modenis_Provider')
        : this.dbProviders
    },
    token() {
      return this.$store.state.auth.token
    },
  },
  methods: {
    search: function () {
      this.searchArticle(this.dynamicSearchQuery(0))
    },
    searchArticle: function (query) {
      this.pageLoading = true
      this.page = 1
      console.log(query)
      fetch(query, {
        method: 'Get',
        headers: {
          'Content-type': 'application/json;charset=UTF-8',
          Authorization: `Token ${this.token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          }
          return Promise.reject(response)
        })
        .then((data) => {
          console.log(data)
          this.dbData = data
          this.totalElementCount = data.overall_total
          this.pageLoading = false
        })
        .catch((data) => {
          if (data.status == 401) {
            this.alertObject.isActive = true
            this.alertObject.message =
              'You are unauthorized. Please log in again...'
          }
          this.pageLoading = false
        })
    },
    pageSelected: function (pageId) {
      var offset = (pageId - 1) * this.itemsPerPage
      this.searchArticle(this.dynamicSearchQuery(offset))
      this.page = pageId
    },
    PassQueryToPaymentSearch: function (item) {
      item = {
        ...item,
        dateStart: this.searchForm.dateStart,
        dateEnd: this.searchForm.dateEnd,
        timeStart: this.searchForm.timeStart,
        timeEnd: this.searchForm.timeEnd,
      }
      //console.log(item)
      this.$store.commit('setPaymentSearchObject', item)
      this.$router.push({
        name: 'PaymentSearch',
      })
    },
    sort: function (sortDir) {
      //if sortDir == current sort, reverse
      if (sortDir === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = sortDir
    },
    selectService: function (service) {
      this.searchForm.serviceid = service.serviceid
      //console.log(this.searchForm.serviceid)
    },
    selectProvider: function (provider) {
      this.searchForm.provider_id = provider.provider_id
      this.selectedService = ref()
      //console.log(provider)
    },
    selectTerminalType: function () {
      this.selectedProvider = ref()
      this.selectedService = ref()
    },
    //datetime returns previous day
    getPreviousDay: function (date = new Date()) {
      const previous = new Date(date.getTime())
      previous.setDate(date.getDate() - 1)

      return previous
    },
    bgColorCheck: function (status) {
      switch (status) {
        case 'error':
          return 'bg-danger'
        case 'success':
          return 'bg-success'
        case 'rejected':
          return 'bg-danger'
        case 'processing':
          return 'bg-secondary'
        case 'reject':
          return 'bg-danger'
      }
    },
  },
  beforeMount() {
    fetch('http://172.20.10.183:7000/service')
      .then((response) => response.json())
      .then((data) => {
        this.dbServices = data
        //console.log(this.dbServices)
      })
    fetch('http://172.20.10.183:7000/provider')
      .then((response) => response.json())
      .then((data) => {
        this.dbProviders = data
        //console.log(this.dbProviders)
      })
  },
}
</script>
