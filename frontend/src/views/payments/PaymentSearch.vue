<template>
  <CForm
    method="GET"
    class="d-flex justify-content-between align-items-center user-select-none"
  >
    <CRow class="container-fluid position-relative m-0">
      <!--basic top search start-->
      <CCol
        class="col-12 my-1 d-flex justify-content-around align-items-center"
        :class="{
          'col-md-8': !isAdvancedSearchActive,
          'col-md-12': isAdvancedSearchActive,
        }"
      >
        <CRow class="w-100 d-flex justify-content-around align-items-center">
          <CCol
            class="col-md-4 col-sm-6 col-12 my-1 d-flex justify-content-center align-items-center"
          >
            <CFormLabel for="PaymentId"></CFormLabel>
            <CFormInput
              v-model="searchForm.paymentId"
              :placeholder="[['Payment Id']]"
              id="PaymentId"
              type="text"
              autocomplete="off"
              class="w-100"
            />
          </CCol>
          <CCol
            class="col-md-4 col-sm-6 col-12 my-1 d-flex justify-content-center align-items-center"
          >
            <CFormLabel for="AccountNumber"> </CFormLabel>
            <CFormInput
              v-model="searchForm.accountPhoneNumber"
              :placeholder="[['Account/Phone Number']]"
              id="AccountNumber"
              type="search"
              autocomplete="off"
              class="w-100"
            />
          </CCol>
          <CCol
            class="d-flex col-md-4 col-sm-12 col-12 my-1 justify-content-between align-items-center col-12 border rounded"
          >
            <div
              class="d-flex flex-column align-items-center w-100"
              v-for="terminal in terminalTypes"
              v-bind:key="terminal.id"
            >
              <label
                class="w-100 text-center"
                role="button"
                :for="terminal.name"
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
                :disabled="this.dynamicData != ''"
              />
            </div>
          </CCol>
        </CRow>
        <!--basic buttons start-->
        <CCol
          v-if="!isAdvancedSearchActive"
          class="col-md-4 h-100 col-12 basic-buttons-inactive justify-content-around d-flex align-items-center"
        >
          <CButton
            v-c-tooltip="{
              content: 'Click here to open advanced search section',
              placement: 'top',
            }"
            @click="isAdvancedSearchActive = !isAdvancedSearchActive"
            color="dark"
            variant="outline"
            >Advanced Search</CButton
          >
          <CButton @click="searchManual" color="dark"> Search </CButton>
        </CCol>
        <!--basic buttons end-->
      </CCol>
      <!--basic top search end-->
      <!--advanced search start-->
      <CRow v-if="isAdvancedSearchActive" class="m-auto">
        <!--inputs start-->
        <CCol class="col-sm-4 col-6 my-2">
          <CFormInput
            v-model="searchForm.transactionId"
            id="transactionId"
            type="text"
            placeholder="Transaction Id"
            class="w-100 h-100"
            autocomplete="off"
          />
        </CCol>
        <CCol class="col-sm-4 col-6 my-2">
          <CFormInput
            v-model="searchForm.terminalId"
            id="terminalId"
            type="text"
            @keyup="changeTerminalIdState(searchForm.terminalId)"
            placeholder="Terminal Id"
            class="w-100 h-100"
            autocomplete="off"
          />
        </CCol>
        <!--inputs end-->
        <!--select options start-->
        <CCol class="col-12 col-sm-4 my-2">
          <VueMultiselect
            v-model="selectedAgent"
            :options="dbAgents"
            :limit="1"
            :multiple="false"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            :placeholder="'Select Agent'"
            :disabled="this.dynamicData != ''"
            label="agentname"
            track-by="agentname"
            @select="selectAgent"
          />
        </CCol>
        <CCol class="col-12 col-sm-4 my-2">
          <VueMultiselect
            v-model="selectedProvider"
            :options="providers"
            :limit="1"
            :multiple="false"
            :close-on-select="true"
            :clear-on-select="false"
            :preserve-search="true"
            :placeholder="'Select Providers'"
            :disabled="this.dynamicData != ''"
            label="providername"
            track-by="providername"
            @select="selectProvider"
            @remove="searchForm.selectedProvider = ''"
          />
        </CCol>
        <CCol class="col-12 col-sm-4 my-2">
          <VueMultiselect
            v-model="selectedService"
            :options="services"
            :limit="1"
            :multiple="false"
            :close-on-select="true"
            :clear-on-select="false"
            :preserve-search="true"
            :placeholder="'Select Service'"
            :disabled="this.dynamicData != ''"
            label="servicename"
            track-by="servicename"
            @select="selectService"
            @remove="searchForm.selectedService = ''"
          />
        </CCol>
        <CCol class="col-12 col-sm-4 my-2">
          <VueMultiselect
            v-model="selectedRegionList"
            :options="regions"
            :limit="1"
            :multiple="true"
            :disabled="isTerminalIdSelected"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            :showNoResults="true"
            label="name"
            track-by="id"
            :placeholder="'Select Region'"
            @select="addRegionIdToList"
          />
        </CCol>
        <!--select options end-->
        <!--date inputs start-->
        <CCol class="col-sm-2 col-6 my-2">
          <CFormInput
            v-model="searchForm.paymentMin"
            id="MinPayment"
            type="number"
            placeholder="Min Payment"
            class="w-100 h-100"
            autocomplete="off"
          />
        </CCol>
        <CCol class="col-sm-2 col-6 my-2">
          <CFormInput
            v-model="searchForm.paymentMax"
            id="MaxPayment"
            type="number"
            placeholder="Max Payment"
            class="w-100 h-100"
            autocomplete="off"
          />
        </CCol>
        <CCol class="col-sm-2 col-6 my-2">
          <CFormInput
            v-model="searchForm.dateStart"
            id="StartDate"
            type="date"
            placeholder="StartDate"
            class="w-100 h-100"
            :disabled="this.dynamicData != ''"
          />
        </CCol>
        <CCol class="col-sm-2 col-6 my-2">
          <CFormInput
            v-model="searchForm.timeStart"
            id="hourStart"
            type="time"
            placeholder="StartDate"
            class="w-100 h-100"
            :disabled="this.dynamicData != ''"
          />
        </CCol>
        <CCol class="col-sm-2 col-6 my-2">
          <CFormInput
            v-model="searchForm.dateEnd"
            id="EndDate"
            type="date"
            placeholder="EndDate"
            class="w-100 h-100"
            :disabled="this.dynamicData != ''"
          />
        </CCol>
        <CCol class="col-sm-2 col-6 my-2">
          <CFormInput
            v-model="searchForm.timeEnd"
            id="hourEnd"
            type="time"
            placeholder="EndDate"
            class="w-100 h-100"
            :disabled="this.dynamicData != ''"
          />
        </CCol>
        <!--date inputs end-->

        <!--selectible start-->
        <CCol
          class="col-12 my-2 d-flex justify-content-between align-items-center"
        >
          <div class="d-flex align-items-center">
            <div class="form-check">
              <CFormLabel
                role="button"
                class="form-check-label p-0 m-0"
                for="isSelectMultipleTableDataActive"
              >
                Selectible
                <input
                  class="form-check-input p-0"
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
          <div class="w-25 d-flex justify-content-between my-2">
            <div
              class="d-flex flex-column align-items-center"
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
                :disabled="this.dynamicData != ''"
              />
            </div>
          </div>
          <JsonExcel
            class="btn btn-outline-success"
            v-c-tooltip="{
              content: 'Download as excel',
              placement: 'top',
            }"
            :data="sortedSearchResults"
          >
            <CIcon :content="icons.cilDataTransferDown"></CIcon>
          </JsonExcel>
        </CCol>
        <!--selectible end-->
        <!--advanced buttons start-->
        <CCol class="p-2 d-flex justify-content-end">
          <CButton
            @click="isAdvancedSearchActive = !isAdvancedSearchActive"
            color="dark"
            variant="outline"
            class="m-1"
            >Basic Seach</CButton
          >
          <CButton @click="searchManual" color="dark" class="m-1">
            Search
          </CButton>
        </CCol>
        <!--advanced buttons end-->
      </CRow>
      <!--advanced search end-->
    </CRow>
  </CForm>

  <!--dynamic data start-->
  <CCallout v-if="typeof dynamicData == 'object'" color="primary">
    <CTable>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">#</CTableHeaderCell>
          <CTableHeaderCell scope="col">Type</CTableHeaderCell>
          <CTableHeaderCell scope="col">Agent</CTableHeaderCell>
          <CTableHeaderCell scope="col">Provider Name</CTableHeaderCell>
          <CTableHeaderCell scope="col">Service Name</CTableHeaderCell>
          <CTableHeaderCell scope="col">Status </CTableHeaderCell>
          <CTableHeaderCell scope="col">Count </CTableHeaderCell>
          <CTableHeaderCell scope="col">Date Start </CTableHeaderCell>
          <CTableHeaderCell scope="col">Date End </CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow>
          <CTableHeaderCell scope="row">*</CTableHeaderCell>
          <CTableDataCell>{{ dynamicData.type }}</CTableDataCell>
          <CTableDataCell>{{ dynamicData.agentname }}</CTableDataCell>
          <CTableDataCell>{{ dynamicData.providername }}</CTableDataCell>
          <CTableDataCell>{{ dynamicData.servicename }}</CTableDataCell>
          <CTableDataCell>{{ dynamicData.status_value }}</CTableDataCell>
          <CTableDataCell>{{ dynamicData.payment_count }}</CTableDataCell>
          <CTableDataCell
            >{{ dynamicData.dateStart }} - {{ dynamicData.timeStart }}
          </CTableDataCell>
          <CTableDataCell
            >{{ dynamicData.dateEnd }} - {{ dynamicData.timeStart }}
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
    <!-- <div>
      <p>Searching for these parameters</p>
      <div>
        <span class="text-secondary px-1">Type:</span>
        <span class="text-dark px-1">{{ dynamicData.type }}</span>
      </div>
      <div>
        <span class="text-secondary px-1">Agent:</span>
        <span class="text-dark px-1"> {{ dynamicData.agentname }}</span>
      </div>
      <div>
        <span class="text-secondary px-1">ProviderName:</span>
        <span class="text-dark px-1">{{ dynamicData.providername }}</span>
      </div>
      <div>
        <span class="text-secondary px-1">Service Name:</span>
        <span class="text-dark px-1">{{ dynamicData.servicename }}</span>
      </div>
      <div>
        <span class="text-secondary px-1">Status:</span>
        <span class="text-dark px-1">{{ dynamicData.status_value }}</span>
      </div>
      <div>
        <span class="text-secondary px-1">Count:</span>
        <span class="text-dark px-1">{{ dynamicData.payment_count }}</span>
      </div>
      <div>
        <span class="text-secondary px-1">Date:</span>
        <span class="text-dark px-1"
          >{{ dynamicData.dateStart }} - {{ dynamicData.dateEnd }}</span
        >
      </div>
      <div>
        <span class="text-secondary px-1">Time:</span>
        <span class="text-dark px-1"
          >{{ dynamicData.timeStart }} - {{ dynamicData.timeEnd }}</span
        >
      </div>
    </div> -->

    <div @click="resetDynamicDataSearch" class="btn btn-primary m-2">Reset</div>
  </CCallout>
  <!--dynamic data end-->

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
        <CTableDataCell>
          <label class="form-check-label py-3">
            <input
              type="checkbox"
              class="form-check-input"
              :value="item.paymentid"
              :disabled="!isSelectMultipleTableDataActive"
              v-model="selectedTableData"
              @click="selectTableData(item.paymentid)"
            />
          </label>
        </CTableDataCell>
        <CTableDataCell>
          <CIcon
            class="text-secondary"
            :content="icons.cilInfo"
            role="button"
            @click="showFullInfo(item.paymentid)"
          ></CIcon>
        </CTableDataCell>
        <CTableDataCell>
          <span style="width: 100px; overflow: hidden">
            {{ item.paymentid }}
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
          <span style="width: 120px; display: block; overflow: hidden">
            {{ item.account }}
          </span>
        </CTableDataCell>
        <CTableDataCell>
          <span
            v-if="item.paydate != null"
            style="width: 100px; display: block; overflow: hidden"
          >
            {{ item.paydate.slice(11, 19) }} <br />
            {{ item.paydate.slice(0, 10) }}
          </span>
        </CTableDataCell>
        <CTableDataCell>
          <span style="width: 100px; display: block; overflow: hidden">
            {{ item.point_id }}
          </span>
        </CTableDataCell>
        <CTableDataCell>
          <span style="width: 100px; display: block; overflow: hidden">
            {{ item.servicename }}
          </span>
        </CTableDataCell>
        <CTableDataCell>
          <span style="width: 100px; display: block; overflow: hidden">
            {{ item.paysum }}
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
          <div class="w-100 d-flex justify-content-between pt-1">
            <CIcon
              v-c-tooltip="{
                content: 'Submit this payment',
                placement: 'top',
              }"
              :content="icons.cilCheckAlt"
              @click="submitPayment(item.paymentid)"
              role="button"
              class="text-success"
            ></CIcon>
            <CIcon
              v-c-tooltip="{
                content: 'Comment this payment',
                placement: 'top',
              }"
              :content="icons.cilCommentBubble"
              role="button"
              @click="openShowCommentsModal(item.paymentid)"
              class="text-warning"
            ></CIcon>
            <CIcon
              v-c-tooltip="{
                content: 'Mail this payment',
                placement: 'top',
              }"
              :content="icons.cilEnvelopeClosed"
              @click="mailPayment(item.paymentid)"
              role="button"
              class="text-info"
            ></CIcon>
            <CIcon
              v-c-tooltip="{
                content: 'Cancel this payment',
                placement: 'top',
              }"
              :content="icons.cilX"
              @click="cancelPayment(item.paymentid)"
              role="button"
              class="text-danger"
            ></CIcon>
          </div>
        </CTableDataCell>
      </CTableRow>
    </CTableBody>
  </CTable>
  <!--data table end-->

  <!--alert start-->
  <CAlert
    v-if="isAlertActive"
    @dismiss="isAlertActive = !isAlertActive"
    color="danger"
    dismissible
    class="alert-custom"
  >
    <strong>Please</strong> enter correct input !
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

  <PaymentInfoModal
    :isActive="isInfoModalActive"
    :isLoading="modalLoading"
    :data="detailedPayment"
    :icons="icons"
    @closeModal="closeInfoModal"
    @bgColorCheck="bgColorCheck"
  ></PaymentInfoModal>

  <ShowCommentModal
    :isActive="isShowCommentModalActive"
    :isLoading="modalLoading"
    :icons="icons"
    :isAddActive="isAddCommentModalActive"
    :data="fetchedCommentData"
    @closeModal="closeShowCommentModal"
    @setAddCommentModalActive="isAddCommentModalActive = true"
  ></ShowCommentModal>

  <AddCommentModal
    :isActive="isAddCommentModalActive"
    :icons="icons"
    @setAddCommenModalPassive="isAddCommentModalActive = false"
    @closeModal="isAddCommentModalActive = false"
  >
  </AddCommentModal>

  <PageLoader :isLoading="pageLoading"></PageLoader>
</template>
<script>
//no terminal id
//no point
//parameters [] instead of {}
//provider_id provider_id
import { ref } from 'vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import {
  cilInfo,
  cilCommentBubble,
  cilX,
  cilCheckAlt,
  cilEnvelopeClosed,
  cilDataTransferDown,
} from '@coreui/icons'
import VueMultiselect from 'vue-multiselect'
import Pagination from 'v-pagination-3'
import 'vue-multiselect/dist/vue-multiselect.css'
import JsonExcel from 'vue-json-excel3'
import ShowCommentModal from '@/components/ShowCommentModal.vue'
import AddCommentModal from '@/components/AddCommentModal.vue'
import PageLoader from '@/components/PageLoader.vue'
import PaymentInfoModal from '@/components/PaymentInfoModal.vue'
export default {
  components: {
    VueMultiselect,
    Pagination,
    JsonExcel,
    ShowCommentModal,
    AddCommentModal,
    PageLoader,
    PaymentInfoModal,
  },
  name: 'PaymentSearch',
  setup() {
    const store = useStore()
    return {
      dynamicData: computed(() => store.state.paymentSearchObject),
    }
  },
  data() {
    const searchQuery = ''
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
    const regions = [
      {
        id: 1,
        name: 'Baku',
      },
      {
        id: 2,
        name: 'Sumgait',
      },
      {
        id: 3,
        name: 'Ganja',
      },
      {
        id: 4,
        name: 'Nakhchivan',
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
    const dbServices = []
    const dbProviders = []
    const dbAgents = []
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
    const successTypes = [
      // {
      //   id: 1,
      //   name: 'All',
      //   default: true,
      // },
      {
        id: 2,
        name: 'success',
        default: false,
      },
      {
        id: 3,
        name: 'reject',
        default: false,
      },
      {
        id: 4,
        name: 'processing',
        default: false,
      },
    ]
    //selected objects
    const searchForm = ref({
      paymentId: '',
      accountPhoneNumber: '',
      terminalType: 'Both',
      agentId: '',
      selectedService: '',
      selectedProvider: '',
      retailNetworkId: '',
      regionIdList: [],
      transactionId: '',
      terminalId: '',
      successTypeList: [],
      paymentMin: '',
      paymentMax: '',
      dateStart: this.getPreviousDay(
        new Date(new Date().toISOString().slice(0, 10)),
      )
        .toISOString()
        .slice(0, 10),
      dateEnd: new Date().toISOString().slice(0, 10),
      timeStart: new Date().toString().slice(16, 21),
      timeEnd: new Date().toString().slice(16, 21),
    })
    const selectedRetailNetwork = ref()
    const selectedService = ref()
    const selectedProvider = ref()
    const selectedAgent = ref()
    const selectedRegionList = ref([])
    const selectedTableData = ref([])
    const selectedOperation = ref(1)
    //sorting
    const currentSort = 'id'
    const currentSortDir = 'asc'
    //booleans
    const isTerminalIdSelected = ref(false)
    const isSelectMultipleTableDataActive = ref(false)
    const pageLoading = ref(false)
    const modalLoading = ref(false)
    const isInfoModalActive = ref(false)
    const isShowCommentModalActive = ref(false)
    const isAddCommentModalActive = ref(false)
    const isAlertActive = ref(false)
    //database things
    const thData = [
      { id: 1, title: '', sortBy: null },
      { id: 2, title: 'Info', sortBy: 'info' },
      { id: 3, title: 'Payment Id', sortBy: 'paymentid' },
      { id: 4, title: 'Status', sortBy: 'status_value' },
      { id: 5, title: 'Account', sortBy: 'account' },
      { id: 5, title: 'Pay Date', sortBy: 'paydate' },
      { id: 6, title: 'Point Id', sortBy: 'point_id' },
      { id: 7, title: 'Service', sortBy: 'servicename' },
      { id: 8, title: 'Pay Sum', sortBy: 'paysum' },
      { id: 9, title: 'Terminal', sortBy: 'type' },
      { id: 10, title: 'Operations', sortBy: 'operations' },
    ]

    const dbData = { results: [] }
    const detailedPayment = {}
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
    const fetchedFullData = {
      name: null,
      surname: null,
    }
    const fetchedCommentData = {
      author: null,
      comment: null,
    }
    const totalElementCount = 0
    const itemsPerPage = 25
    const icons = {
      cilInfo,
      cilCommentBubble,
      cilX,
      cilCheckAlt,
      cilEnvelopeClosed,
      cilDataTransferDown,
    }
    return {
      token: '',
      searchQuery,
      terminalTypes,
      icons,
      //initial objects
      regions,
      operations,
      successTypes,
      retailNetworks,
      //selected objects
      selectedOperation,
      selectedRetailNetwork,
      selectedService,
      selectedProvider,
      selectedAgent,
      selectedRegionList,
      selectedTableData,
      //sort
      currentSort,
      currentSortDir,
      //booleans
      isSelectMultipleTableDataActive,
      pageLoading,
      modalLoading,
      isTerminalIdSelected,
      isAdvancedSearchActive: false,
      isInfoModalActive,
      isShowCommentModalActive,
      isAddCommentModalActive,
      isAlertActive,
      //db things
      searchForm,

      thData,
      dbData,
      dbServices,
      dbProviders,
      dbAgents,
      detailedPayment,
      fetchedFullData,
      fetchedCommentData,
      page: 1,
      totalElementCount,
      itemsPerPage,
    }
  },
  computed: {
    dynamicSearchQuery() {
      return (offset) =>
        typeof this.dynamicData == 'object'
          ? `http://172.20.10.183:7000/payment/?paymentid=${this.searchForm.paymentId}${this.selectedModel}&account=${this.searchForm.accountPhoneNumber}&status=${this.dynamicData.status_value}&format=json&paydate__range=${this.dynamicData.dateStart}T${this.dynamicData.timeStart}%2C${this.dynamicData.dateEnd}T${this.dynamicData.timeEnd}&service_name=${this.dynamicData.servicename}&provider_name=${this.dynamicData.providername}&point_id=${this.searchForm.terminalId}&offset=${offset}`
          : `http://172.20.10.183:7000/payment/?paymentid=${this.searchForm.paymentId}${this.selectedModel}&account=${this.searchForm.accountPhoneNumber}${this.selectedStatus}&format=json&paydate__range=${this.searchForm.dateStart}T${this.searchForm.timeStart}%2C${this.searchForm.dateEnd}T${this.searchForm.timeEnd}&service_id=${this.searchForm.selectedService}&provider_id=${this.searchForm.selectedProvider}&point_id=${this.searchForm.terminalId}&offset=${offset}`
    },
    //computed dynamic property for sorted search results
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
    selectedModel() {
      if (this.searchForm.terminalType == 'Both') {
        return ''
      } else if (this.searchForm.terminalType == 'Mpay') {
        return '&model=mpay'
      } else if (this.searchForm.terminalType == 'Modenis') {
        return '&model=modenis'
      }
    },
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
    isSelectedTableDataEmpty: ({ selectedTableData }) =>
      selectedTableData.length === 0,
  },
  methods: {
    resetDynamicDataSearch: function () {
      this.$store.state.paymentSearchObject = ''
      this.dbData = { results: [] }
      this.page = 1
      this.totalElementCount = 0
    },
    //datetime returns previous day
    getPreviousDay: function (date = new Date()) {
      const previous = new Date(date.getTime())
      previous.setDate(date.getDate() - 1)

      return previous
    },
    // void , sorts selected column . If asc to desc , if desc to asc
    sort: function (sortDir) {
      //if sortDir == current sort, reverse
      if (sortDir === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = sortDir
    },
    // void , adds service id to selected service
    selectService: function (service) {
      this.searchForm.selectedService = service.serviceid
      //console.log(service)
    },
    selectProvider: function (provider) {
      this.searchForm.selectedProvider = provider.provider_id
      console.log(this.searchForm.selectedProvider)
    },
    selectAgent: function (agent) {
      this.searchForm.agentId = agent.agent_id
      console.log(this.searchForm.agentId)
    },
    // void , adds retail network id to selected retail network
    addRetailNetworkId: function (retailNetwork) {
      this.searchForm.retailNetworkId = retailNetwork.id
    },
    // void , adds region id to selected region list
    addRegionIdToList: function (region) {
      this.searchForm.regionIdList.push(region.id)
    },
    selectTableData: function (id) {
      if (!this.selectedTableData.includes(id)) {
        this.selectedTableData.push(id)
      } else {
        this.selectedTableData.splice(this.selectedTableData.indexOf(id), 1)
      }
    },
    searchManual() {
      this.searchArticle(this.dynamicSearchQuery(0))
    },
    // void , gets specific search info
    //payment id 388291856 1561894410 account num 558557596    GPG10020899   1561892072
    searchArticle: function (query) {
      this.pageLoading = true
      this.page = 1
      if (
        !this.itemsPerPage ||
        this.itemsPerPage == 0 ||
        this.itemsPerPage > 500
      ) {
        this.itemsPerPage = 25
      }
      console.log(query)
      fetch(query, {
        method: 'Get',
        headers: {
          'Content-type': 'application/json;charset=UTF-8',
          Authorization: 'Token 684a106219727b548d5a077eedccd5ab4743c50f',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          //console.log(data)
          this.dbData = data
          this.totalElementCount = data.overall_total
          this.pageLoading = false
        })
    },
    pageSelected: function (pageId) {
      var offset = (pageId - 1) * this.itemsPerPage
      this.searchArticle(this.dynamicSearchQuery(offset))
      this.page = pageId
    },
    // void , call to get full data of specified element
    showFullInfo: function (id) {
      this.modalLoading = true
      this.isInfoModalActive = true
      this.detailedPayment = this.dbData.results.find((x) => x.paymentid == id)
      this.modalLoading = false
    },
    //void , closes modal
    closeInfoModal: function () {
      this.fetchedFullData.name = null
      this.fetchedFullData.surname = null
      this.isInfoModalActive = false
    },
    //void shows comment modal that contains comments
    openShowCommentsModal: function (id) {
      this.modalLoading = true
      this.isShowCommentModalActive = true
      setTimeout(() => {
        this.fetchedCommentData.author = 'Author ' + id
        this.fetchedCommentData.comment = 'Comment: ' + id
        this.modalLoading = false
      }, 1000)
    },
    //void , closes show comment modal
    closeShowCommentModal: function () {
      this.fetchedCommentData.author = null
      this.fetchedCommentData.comment = null
      this.isShowCommentModalActive = false
    },
    //test
    submitPayment: function (selectedTableData) {
      //console.log('submit this elements ' + selectedTableData)
    },
    //test
    cancelPayment: function (selectedTableData) {
      //fetch(www.ciefjffef/id)
      //console.log('cancel this elements ' + selectedTableData)
    },
    //test
    mailPayment: function (selectedTableData) {
      //console.log('mail this elements ' + selectedTableData)
    },
    //test
    doOperation(operationId) {
      switch (operationId) {
        case 1:
          //console.log('add comment this elements ' + this.selectedTableData)
          this.isAddCommentModalActive = true
          //this.addComment(this.selectedTableData)
          break
        case 2:
          this.cancelPayment(this.selectedTableData)
          break
        case 3:
          this.submitPayment(this.selectedTableData)
          break
        case 4:
          this.mailPayment(this.selectedTableData)
          break
      }
    },
    // void , checks if terminal id is null or not. If false , disables selecting regions and retail networks
    changeTerminalIdState: function (terminalId) {
      this.isTerminalIdSelected = terminalId != null && terminalId != ''
    },
    //checks status and return color for spesific status type
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
  mounted() {
    if (typeof this.dynamicData == 'object') {
      this.searchArticle(this.dynamicSearchQuery(0))
    }
    console.log(this.dynamicData)
  },
  beforeMount() {
    console.log(localStorage.getItem('token'))

    fetch('http://172.20.10.183:7000/service')
      .then((response) => response.json())
      .then((data) => {
        this.dbServices = data
        console.log(this.dbServices)
      })
    fetch('http://172.20.10.183:7000/provider')
      .then((response) => response.json())
      .then((data) => {
        this.dbProviders = data
        //console.log(this.dbProviders)
      })
    fetch('http://172.20.10.183:7000/agent')
      .then((response) => response.json())
      .then((data) => {
        this.dbAgents = data
        //console.log(this.dbAgents)
      })
  },
}
</script>
