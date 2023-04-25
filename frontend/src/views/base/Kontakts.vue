<template>
  <CForm method="GET">
    <CRow>
      <CCol class="col-md-4 col-sm-6 col-12 my-2">
        <CFormLabel for="name"> </CFormLabel>
        <CFormInput
          v-model="searchForm.name"
          :placeholder="[['Name']]"
          id="name"
          type="search"
          autocomplete="off"
          class="w-100"
        />
      </CCol>
      <CCol class="col-md-4 col-sm-6 col-12 my-2">
        <CFormLabel for="surname"> </CFormLabel>
        <CFormInput
          v-model="searchForm.surname"
          :placeholder="[['Surname']]"
          id="surname"
          type="search"
          autocomplete="off"
          class="w-100"
        />
      </CCol>
      <CCol class="col-md-4 col-sm-12 col-12 my-2">
        <CFormLabel for="company"> </CFormLabel>
        <VueMultiselect
          v-model="selectedCompany"
          :options="companies"
          :limit="1"
          :multiple="false"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          label="name"
          :placeholder="'Select Company'"
          track-by="name"
          id="company"
          @select="addCompanyId"
        />
      </CCol>
    </CRow>
    <!--selectible start-->
    <CCol class="col-12 my-2 d-flex justify-content-between">
      <div class="d-flex align-items-center">
        <div class="form-check">
          <CFormLabel
            role="button"
            class="form-check-label"
            for="isSelectMultipleTableDataActive"
          >
            Selectible
            <input
              class="form-check-input"
              type="checkbox"
              id="isSelectMultipleTableDataActive"
              v-model="isSelectMultipleTableDataActive"
            />
          </CFormLabel>
        </div>
        <Transition name="fade">
          <div class="d-flex" v-if="isSelectMultipleTableDataActive">
            <select
              v-model="selectedOperation"
              class="form-select w-50 mx-3"
              :disabled="isSelectedTableDataEmpty"
            >
              <option
                v-for="operation in operations"
                :key="operation.id"
                :value="operation.id"
              >
                {{ operation.name }}
              </option>
            </select>
            <input
              type="button"
              class="btn btn-outline-info w-50 mx-3"
              @click="doOperation(selectedOperation)"
              :disabled="isSelectedTableDataEmpty"
              value="Initiate"
            />
          </div>
        </Transition>
      </div>
      <JsonExcel
        class="btn btn-outline-success"
        v-c-tooltip="{
          content: 'Download as excel',
          placement: 'top',
        }"
        :data="sortedSearchResults"
      >
        <CIcon :content="cilDataTransferDown"></CIcon>
      </JsonExcel>
    </CCol>
    <!--selectible end-->
    <CCol class="col-12 my-2 d-flex justify-content-end">
      <div class="d-flex align-items-center">
        <CFormInput
          type="submit"
          @click="searchArticle"
          calue="Search"
          class="btn btn-primary"
        />
      </div>
    </CCol>
  </CForm>

  <CTable striped hover small responsive class="mt-5">
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell
          v-for="(item, index) in thData"
          :key="index"
          class="user-select-none"
          role="button"
          scope="col"
          @click="sort(item.sortBy)"
        >
          {{ item.title }}
        </CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      <CTableRow align="middle" v-for="item in sortedSearchResults" :key="item">
        <CTableDataCell
          ><label class="form-check-label py-3">
            <input
              type="checkbox"
              class="form-check-input"
              :value="item.id"
              :disabled="!isSelectMultipleTableDataActive"
              v-model="selectedTableData"
              @click="selectTableData(item.id)"
            /> </label
        ></CTableDataCell>
        <CTableDataCell>
          {{ item.id }}
        </CTableDataCell>
        <CTableDataCell>
          {{ item.name }}
        </CTableDataCell>
        <CTableDataCell>
          <span style="width: 100px; overflow: hidden">
            {{ item.surname }}
          </span>
        </CTableDataCell>
        <CTableDataCell>
          <span style="width: 100px; overflow: hidden">
            {{ item.status }}
          </span>
        </CTableDataCell>
        <CTableDataCell>
          <span style="width: 100px; overflow: hidden">
            {{ item.workPhone }}
          </span>
        </CTableDataCell>
        <CTableDataCell>
          <span style="width: 100px; overflow: hidden">
            {{ item.mobileNumber }}
          </span>
        </CTableDataCell>
        <CTableDataCell>
          <span style="width: 100px; overflow: hidden">
            {{ item.email }}
          </span>
        </CTableDataCell>
        <CTableDataCell>
          <span style="width: 100px; overflow: hidden">
            {{ item.skypeName }}
          </span>
        </CTableDataCell>
        <CTableDataCell>
          <span style="width: 100px; overflow: hidden">
            {{ item.companyName }}
          </span>
        </CTableDataCell>
        <CTableDataCell>
          <span style="width: 100px; overflow: hidden"> salam </span>
        </CTableDataCell>
      </CTableRow>
    </CTableBody>
  </CTable>
</template>
<script>
import { ref } from 'vue'
import VueMultiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css'
import JsonExcel from 'vue-json-excel3'
import {
  cilCommentBubble,
  cilX,
  cilCheckAlt,
  cilEnvelopeClosed,
  cilDataTransferDown,
} from '@coreui/icons'
export default {
  components: {
    VueMultiselect,
    JsonExcel,
  },
  name: 'Kontakts',
  setup() {},
  data() {
    const thData = ref([
      { id: 0, title: '', sortBy: null },
      { id: 1, title: 'Id', sortBy: 'id' },
      { id: 2, title: 'Ad', sortBy: 'name' },
      { id: 3, title: 'Soyad', sortBy: 'surname' },
      { id: 4, title: 'Vəzifə', sortBy: 'status' },
      { id: 5, title: 'İş Telefonu', sortBy: 'workPhone' },
      { id: 6, title: 'Mobil Nömrə', sortBy: 'mobileNumber' },
      { id: 7, title: 'Skype Adı', sortBy: 'skypeName' },
      { id: 8, title: 'Email', sortBy: 'email' },
      { id: 9, title: 'Şirkət Adı', sortBy: 'companyName' },
      { id: 10, title: 'Operations', sortBy: 'operations' },
    ])
    const searchResults = ref([])
    const fetchedDbElements = [
      {
        id: 1,
        name: 'salam',
        surname: 13,
        status: 102324,
        workPhone: 1203320,
        mobileNumber: '0515630813',
        email: 103923,
        skypeName: 121231,
        companyName: 'bakcell',
      },

      {
        id: 2,
        name: 'salam',
        surname: 13,
        status: 8765,
        workPhone: 23324,
        mobileNumber: '0515630813',
        email: 103923,
        skypeName: 234565,
        companyName: 'bakcell',
      },
      {
        id: 3,
        name: 'sagol',
        surname: 13,
        status: 12324,
        workPhone: 7654,
        mobileNumber: '0515630813',
        email: 23456,
        skypeName: 6543,
        companyName: 'bakcell',
      },
      {
        id: 4,
        name: 'salam',
        surname: 13,
        status: 102324,
        workPhone: 1203320,
        mobileNumber: '0515630813',
        email: 103923,
        skypeName: 121231,
        companyName: 'bakcell',
      },
    ]
    const selectedCompany = ref()
    const searchForm = ref({
      name: null,
      surname: null,
      companyId: null,
    })
    const companies = [
      {
        id: 1,
        name: 'Kapital',
      },
      {
        id: 2,
        name: 'bank of baku',
      },
      {
        id: 3,
        name: 'Pashabank',
      },
      {
        id: 4,
        name: 'araz',
      },
      {
        id: 5,
        name: 'sfefe',
      },
      {
        id: 6,
        name: 'Nakhefefchivan',
      },
      {
        id: 7,
        name: 'sfeg',
      },
      {
        id: 8,
        name: 'egcs',
      },
      {
        id: 9,
        name: 'sgege',
      },
      {
        id: 10,
        name: 'egecs',
      },
      {
        id: 11,
        name: 'gefscx',
      },
      {
        id: 12,
        name: 'brre',
      },
      {
        id: 13,
        name: 'üfef',
      },
      {
        id: 14,
        name: 'gef',
      },
    ]
    const operations = [
      {
        id: 1,
        name: 'Add Comment',
        icon: cilCommentBubble,
      },
      {
        id: 2,
        name: 'Cancel Payment',
        icon: cilX,
      },
      {
        id: 3,
        name: 'Submit Payment',
        icon: cilCheckAlt,
      },
      {
        id: 4,
        name: 'Mail Payment',
        icon: cilEnvelopeClosed,
      },
    ]
    const currentSort = 'id'
    const currentSortDir = 'asc'

    const selectedTableData = ref([])
    const isTableDataSelected = ref(false)
    const isSelectMultipleTableDataActive = ref(false)
    const selectedOperation = ref(1)
    return {
      selectedOperation,
      operations,
      selectedTableData,
      isTableDataSelected,
      isSelectMultipleTableDataActive,
      thData,
      searchResults,
      selectedCompany,
      searchForm,
      fetchedDbElements,
      currentSort,
      currentSortDir,
      companies,
      cilDataTransferDown,
    }
  },
  computed: {
    sortedSearchResults() {
      /*eslint-disable*/
      return this.searchResults.sort((a, b) => {
        let modifier = 1
        if (this.currentSortDir === 'desc') modifier = -1
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier
        return 0
      })
    },
    isSelectedTableDataEmpty: ({ selectedTableData }) =>
      selectedTableData.length === 0,
  },
  methods: {
    sort: function (sortDir) {
      //if sortDir == current sort, reverse
      if (sortDir === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = sortDir
    },
    searchArticle: function () {
      //console.log(this.searchForm)
      this.searchArticles(this.searchForm)
    },
    // list , call to get database data
    searchArticles: function (searchForm) {
      this.searchResults = this.fetchedDbElements.filter(
        (n) => n.name == searchForm.name,
      )
      // fetch('api/articles/search/', searchForm)
      //   .then((response) => response.json())
      //   .then((data) => console.log(data))
      //   .then((data) => (searchResults = data))
    },
    addCompanyId: function (company) {
      this.searchForm.companyId = company.id
    },
    selectOperation: function (operation) {
      this.selectedOperation = operation
      //console.log(operation)
    },
  },
}
</script>
