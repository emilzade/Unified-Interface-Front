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
      <ul class="list-group list-group-flush">
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
          <span class="text-secondary">Service Name :</span>
          {{ data.servicename }}
        </li>
        <li class="list-group-item">
          <span class="text-secondary">Provider Id :</span>
          {{ data.providername }}
        </li>
      </ul>
    </div>
    <div class="overlay overlay-info" v-if="isActive" @click="closeModal"></div>
  </div>
</template>
<script>
export default {
  props: ['isActive', 'isLoading', 'data', 'icons'],
  methods: {
    closeModal: function () {
      this.$emit('closeModal')
    },
    bgColorCheck: function (status) {
      switch (status) {
        case 'Error':
          return 'bg-danger'
        case 'Success':
          return 'bg-success'
        case 'Test':
          return 'bg-secondary'
        case 'Cancelled':
          return 'bg-secondary'
        case 'Reject':
          return 'bg-danger'
      }
    },
  },
}
</script>
