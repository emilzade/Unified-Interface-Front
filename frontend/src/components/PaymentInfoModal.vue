<template>
  <div class="modal-vue">
    <div
      class="info-modal rounded p-5"
      style="overflow-y: auto"
      v-if="isActive"
    >
      <div v-if="isLoading" class="modal-loading">
        <div class="fingerprint-spinner">
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
          <div class="spinner-ring"></div>
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <CIcon
          class="border rounded text-secondary cursor-pointer"
          width="40"
          @click="closeModal"
          :content="icons.cilX"
        />
      </div>
      <h3 class="display-5 text-center">Detailed History</h3>
      <div class="d-flex gap-4">
        <ul class="list-group list-group-flush w-50 border-top">
          <li class="list-group-item">
            <span class="text-secondary">Payment Id :</span>
            {{ data.paymentid }}
          </li>
          <li class="list-group-item">
            <span class="text-secondary">Account :</span>
            {{ data.account }}
          </li>
          <li class="list-group-item">
            <span class="text-secondary">Payment Date :</span>
            {{ data.paydate.slice(0, 10) }}
            {{ data.paydate.slice(11, 19) }}
          </li>
          <li class="list-group-item">
            <span class="text-secondary">Status : </span>
            <span
              class="text-center text-light rounded px-2"
              :class="bgColorCheck(data.status_value)"
              >{{ data.status_value }}</span
            >
          </li>
          <li class="list-group-item">
            <span class="text-secondary">Pay Sum :</span>
            {{ data.paysum }}
          </li>
          <li class="list-group-item">
            <span class="text-secondary">Point Id :</span>
            {{ data.point_id }}
          </li>
          <li class="list-group-item">
            <span class="text-secondary">Service :</span>
            {{ data.servicename }}
          </li>
          <li class="list-group-item">
            <span class="text-secondary">Provider :</span>
            {{ data.providername }}
          </li>
        </ul>
        <div bordered hover class="w-50 m-auto">
          <div class="bg-info py-2 bg-gradient text-center text-light">
            {{ data.type }}
          </div>
          <div
            class="d-flex justify-content-between py-2 bg-light bg-gradient text-center"
          >
            <div class="w-50 text-dark">Name</div>
            <div class="w-50 text-dark">Value</div>
          </div>
          <div v-if="data.parameters.length == 0">
            <div
              style="padding: 3px; border: 1px solid rgb(221, 221, 221)"
              class="text-center text-secondary"
            >
              No Parameters to show...
            </div>
          </div>
          <div
            v-else
            class="w-100 d-flex justify-content-between"
            v-for="item in data.parameters"
            :key="item"
          >
            <div class="parametersTableCell">
              {{ item.name }}
            </div>
            <div class="parametersTableCell">
              {{ item.value }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="overlay overlay-info" v-if="isActive" @click="closeModal"></div>
  </div>
</template>
<style>
.parametersTableCell {
  padding: 3px;
  display: inline;
  border: 1px solid rgb(221, 221, 221);
  width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
<script>
export default {
  props: ['isActive', 'isLoading', 'data', 'icons'],
  data() {
    return {}
  },
  methods: {
    closeModal: function () {
      this.$emit('closeModal')
    },
    bgColorCheck: function (status) {
      switch (status) {
        case 'error':
          return 'bg-danger'
        case 'success':
          return 'bg-success'
        case 'test':
          return 'bg-secondary'
        case 'processing':
          return 'bg-secondary'
        case 'reject':
          return 'bg-danger'
      }
    },
  },
}
</script>
