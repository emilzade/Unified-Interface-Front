<template>
  <div class="modal-vue">
    <div class="manage-user-modal rounded" v-if="isActive">
      <div class="d-flex justify-content-end py-3">
        <CIcon
          class="border rounded text-secondary cursor-pointer"
          width="40"
          @click="closeModal"
          :content="icons.cilX"
        />
      </div>
      <h3 v-if="modalPurpose == 'create'" class="text-center">
        Create New Role
      </h3>
      <h3 v-else-if="modalPurpose == 'update'" class="text-center">
        Update Existing Role
      </h3>
      <div class="border rounded p-2 d-flex flex-column gap-2 m-5">
        <div class="d-flex align-items-center justify-content-between gap-3">
          <div>RoleName</div>
          <CFormInput
            v-if="modalPurpose == 'update'"
            :value="data.name"
            class="w-50"
          />
          <CFormInput v-else placeholder="Rolename" class="w-50" />
        </div>
        <div class="d-flex align-items-center justify-content-between gap-3">
          <div>role desc</div>
          <CFormInput
            v-if="modalPurpose == 'update'"
            :value="data.desc"
            class="w-50"
          />
          <CFormInput v-else placeholder="Surname" class="w-50" />
        </div>
        <div class="d-flex align-items-center justify-content-between gap-3">
          <div>Read Access</div>
          <div class="w-50">
            <VueMultiselect
              v-model="selectedReadAccess"
              :options="readAccess"
              :limit="1"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              :showNoResults="true"
              label="name"
              track-by="id"
              :placeholder="'Select Read Access'"
            />
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-between gap-3">
          <div>Write Access</div>
          <div class="w-50">
            <VueMultiselect
              v-model="selectedWriteAccess"
              :options="writeAccess"
              :limit="1"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              :showNoResults="true"
              label="name"
              track-by="id"
              :placeholder="'Select Write Access'"
            />
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-around w-50 m-auto">
        <CButton class="text-light" @click="closeModal" color="danger" size="lg"
          >Cancel</CButton
        >
        <CButton
          v-if="modalPurpose == 'update'"
          class="text-light"
          color="success"
          size="lg"
          >Update</CButton
        >
        <CButton
          v-else-if="modalPurpose == 'create'"
          class="text-light"
          color="success"
          size="lg"
          >Create</CButton
        >
      </div>
    </div>
    <div
      class="overlay overlay-manage-user"
      v-if="isActive"
      @click="closeModal"
    ></div>
  </div>
</template>
<script>
import { ref } from 'vue'
import VueMultiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css'
export default {
  props: ['isActive', 'icons', 'data'],
  components: { VueMultiselect },
  data() {
    const modalPurpose = null
    const readAccess = [
      {
        id: 1,
        name: 'readAccess1',
      },
      {
        id: 2,
        name: 'readAccess2',
      },
      {
        id: 3,
        name: 'readAccess3',
      },
    ]
    const writeAccess = [
      {
        id: 101,
        name: 'writeAccess1',
      },
      {
        id: 102,
        name: 'writeAccess2',
      },
      {
        id: 103,
        name: 'writeAccess3',
      },
    ]
    const selectedReadAccess = ref([])
    const selectedWriteAccess = ref([])
    return {
      modalPurpose,
      readAccess,
      writeAccess,
      selectedReadAccess,
      selectedWriteAccess,
    }
  },
  methods: {
    closeModal: function (isActive) {
      this.$emit('changeManageRoleModalState', isActive)
    },
  },
  mounted() {
    //console.log(this.data)

    if (this.data == null) {
      this.modalPurpose = 'create'
      //console.log('create')
    } else {
      for (let i = 0; i < this.data.readAccess.length; i++) {
        this.selectedReadAccess.push(this.data.readAccess[i])
      }
      for (let i = 0; i < this.data.writeAccess.length; i++) {
        this.selectedWriteAccess.push(this.data.writeAccess[i])
      }
      this.modalPurpose = 'update'
      //console.log('update')
    }
  },
}
</script>
