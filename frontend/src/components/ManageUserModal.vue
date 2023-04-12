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
        Create New User
      </h3>
      <h3 v-else-if="modalPurpose == 'update'" class="text-center">
        Update Existing User
      </h3>
      <div class="border rounded p-2 d-flex flex-column gap-2 m-5">
        <div class="d-flex align-items-center justify-content-between gap-3">
          <div>UserName</div>
          <CFormInput
            v-if="modalPurpose == 'update'"
            :value="data.username"
            class="w-50"
          />
          <CFormInput v-else placeholder="Username" class="w-50" />
        </div>
        <div class="d-flex align-items-center justify-content-between gap-3">
          <div>Name</div>
          <CFormInput
            v-if="modalPurpose == 'update'"
            :value="data.name"
            class="w-50"
          />
          <CFormInput v-else placeholder="Name" class="w-50" />
        </div>
        <div class="d-flex align-items-center justify-content-between gap-3">
          <div>Surname</div>
          <CFormInput
            v-if="modalPurpose == 'update'"
            :value="data.surname"
            class="w-50"
          />
          <CFormInput v-else placeholder="Surname" class="w-50" />
        </div>
        <div class="d-flex align-items-center justify-content-between gap-3">
          <div>Role</div>
          <div class="w-50">
            <VueMultiselect
              v-model="selectedRoles"
              :options="roles"
              :limit="1"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              :showNoResults="true"
              label="name"
              track-by="id"
              :placeholder="'Select Role'"
            />
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-between gap-3">
          <div>Password</div>
          <CFormInput
            v-if="modalPurpose == 'update'"
            :value="data.pass"
            class="w-50"
          />
          <CFormInput v-else placeholder="Password" class="w-50" />
        </div>
        <div class="d-flex align-items-center justify-content-between gap-3">
          <div>Repeat Password</div>
          <CFormInput
            v-if="modalPurpose == 'update'"
            :value="data.repPass"
            class="w-50"
          />
          <CFormInput v-else placeholder="Repeat Password" class="w-50" />
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
    const roles = [
      {
        id: 1,
        name: 'role1',
      },
      {
        id: 2,
        name: 'role2',
      },
      {
        id: 3,
        name: 'role3',
      },
      {
        id: 4,
        name: 'role4',
      },
    ]
    const selectedRoles = ref([])
    return {
      modalPurpose,
      roles,
      selectedRoles,
    }
  },
  methods: {
    closeModal: function (isActive) {
      this.$emit('changeManageUserModalState', isActive)
    },
  },
  mounted() {
    console.log(this.data)

    if (this.data == null) {
      this.modalPurpose = 'create'
      console.log('create')
    } else {
      for (let i = 0; i < this.data.roles.length; i++) {
        this.selectedRoles.push(this.data.roles[i])
      }
      this.modalPurpose = 'update'
      console.log('update')
    }
  },
}
</script>
