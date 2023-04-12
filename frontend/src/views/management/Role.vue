<template>
  <h2 class="text-center pt-2 pb-5">Role Management Menu</h2>
  <div class="border d-flex justify-content-between px-5 py-3">
    <div class="d-flex gap-2">
      <CFormInput />
      <CButton color="primary">Search</CButton>
    </div>
    <CButton
      @click="createRoleProfile(this.isManageRoleModalActive)"
      color="success"
      >Create Role</CButton
    >
  </div>
  <CTable class="border" bordered>
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
    <CTableRow v-for="role in rolesData" :key="role.id">
      <CTableDataCell
        ><span style="width: 100px; display: block; overflow: hidden">
          {{ role.id }}
        </span></CTableDataCell
      >
      <CTableDataCell
        ><span style="width: 100px; display: block; overflow: hidden">
          {{ role.name }}
        </span></CTableDataCell
      >
      <CTableDataCell
        ><span style="width: 100px; display: block; overflow: hidden">
          {{ role.desc }}
        </span></CTableDataCell
      >
      <CTableDataCell class="w-25">
        <div>
          <VueMultiselect
            v-model="role.readAccess"
            :options="role.readAccess"
            :limit="5"
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
      </CTableDataCell>
      <CTableDataCell class="w-25">
        <div>
          <VueMultiselect
            v-model="role.writeAccess"
            :options="role.writeAccess"
            :limit="5"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            :showNoResults="true"
            label="name"
            track-by="id"
            :placeholder="'Select Access'"
          />
        </div>
      </CTableDataCell>
      <CTableDataCell>
        <div
          class="border-start d-flex justify-content-around align-items-center"
        >
          <CIcon
            @click="editRoleProfile(isManageRoleModalActive, role.id)"
            class="w-50 cursor-pointer"
            :content="icons.cilPencil"
          ></CIcon>
        </div>
      </CTableDataCell>
    </CTableRow>
  </CTable>
  <ManageRoleModal
    v-if="isManageRoleModalActive"
    :icons="icons"
    :isActive="isManageRoleModalActive"
    @changeManageRoleModalState="changeManageRoleModalState"
    :data="selectedRole"
  ></ManageRoleModal>
</template>

<script>
import { ref } from 'vue'
import { cilPencil } from '@coreui/icons'
import VueMultiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.css'
import ManageRoleModal from '@/components/ManageRoleModal.vue'
export default {
  name: 'Role',
  components: { VueMultiselect, ManageRoleModal },
  data() {
    const icons = { cilPencil }
    const thData = [
      { id: 1, title: 'N#', sortBy: 'info' },
      { id: 2, title: 'Role Name', sortBy: 'roleName' },
      { id: 3, title: 'Role Desc', sortBy: 'RoleDexc' },
      { id: 4, title: 'Read Access', sortBy: 'readAccess' },
      { id: 5, title: 'Write Access', sortBy: 'writeAccess' },
      { id: 6, title: '', sortBy: 'operations' },
    ]
    const rolesData = [
      {
        id: 1,
        name: 'Role1',
        desc: 'Desc1',
        readAccess: [
          {
            id: 1,
            name: 'read1',
          },
        ],
        writeAccess: [
          {
            id: 101,
            name: 'write1',
          },
          {
            id: 102,
            name: 'write2',
          },
        ],
      },
      {
        id: 2,
        name: 'Role2',
        desc: 'Desc2',
        readAccess: [
          {
            id: 1,
            name: 'read1',
          },
          {
            id: 2,
            name: 'read2',
          },
        ],
        writeAccess: [
          {
            id: 102,
            name: 'write2',
          },
        ],
      },
      {
        id: 3,
        name: 'Role3',
        desc: 'Desc3',
        readAccess: [
          {
            id: 1,
            name: 'read1',
          },
          {
            id: 2,
            name: 'write2',
          },
          {
            id: 3,
            name: 'write3',
          },
        ],
        writeAccess: [],
      },
    ]
    const selectedRole = ref()
    const isManageRoleModalActive = ref(false)
    return {
      thData,
      icons,
      rolesData,
      selectedRole,
      isManageRoleModalActive,
    }
  },
  methods: {
    createRoleProfile: function (state) {
      this.selectedRole = null
      this.changeManageRoleModalState(state)
    },
    editRoleProfile: function (state, id) {
      this.selectedRole = this.rolesData.find((n) => n.id == id)
      this.changeManageRoleModalState(state)
    },
    changeManageRoleModalState: function (state) {
      if (state == false) {
        this.isManageRoleModalActive = true
      } else {
        this.isManageRoleModalActive = false
      }
    },
  },
}
</script>
