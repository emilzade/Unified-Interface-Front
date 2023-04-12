<template>
  <div class="modal-vue">
    <div class="show-comment-modal rounded" v-if="isActive">
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
      <div class="d-flex justify-content-end py-3">
        <CIcon
          class="border rounded text-secondary cursor-pointer"
          width="40"
          @click="closeModal"
          :content="icons.cilX"
        />
      </div>
      <div class="btn btn-success w-100 m-2" @click="setAddCommentModalActive">
        Add Comment
      </div>
      <div class="border rounded w-100 m-2 p-2">
        <h3>{{ data.author }}</h3>
        <p>{{ data.comment }}</p>
      </div>
    </div>
    <div
      class="overlay overlay-show-comment"
      v-if="isActive"
      @click="closeModal"
    ></div>
  </div>
</template>
<script>
export default {
  props: ['isActive', 'isLoading', 'icons', 'isAddActive', 'data'],
  methods: {
    closeModal: function () {
      this.$emit('closeModal')
    },
    setAddCommentModalActive: function () {
      this.$emit('setAddCommentModalActive')
    },
  },
}
</script>
