<template>
  <div class="modal-vue">
    <div class="add-comment-modal rounded" v-if="isActive">
      <div class="d-flex justify-content-end py-3">
        <CIcon
          class="border rounded text-secondary cursor-pointer"
          width="40"
          @click="closeModal"
          :content="icons.cilX"
        />
      </div>
      <input class="w-100 form-control m-2" placeholder="Type comment here" />
      <div class="d-flex justify-content-between align-items-center">
        <div class="btn btn-outline-danger w-100 m-2" @click="closeModal">
          Cancel
        </div>
        <div class="btn btn-success w-100 m-2" @click="addComment">Submit</div>
      </div>
    </div>
    <div
      class="overlay overlay-add-comment"
      v-if="isActive"
      @click="closeModal"
    ></div>
  </div>
</template>
<script>
export default {
  props: ['isActive', 'icons'],
  methods: {
    addComment: function () {
      //this.$emit('addComment')
      alert('comment added')
    },
    closeModal: function () {
      this.$emit('closeModal')
    },
  },
}
</script>
