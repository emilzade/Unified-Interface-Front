<template>
  <h2 class="text-center pt-2 pb-5">User Management Menu</h2>
  <div class="border d-flex justify-content-between px-5 py-3">
    <div class="d-flex gap-2">
      <CFormInput />
      <CButton color="primary">Search</CButton>
    </div>
    <CButton
      @click="createUserProfile(this.isManageUserModalActive)"
      color="success"
      >Create User</CButton
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
    <CTableRow v-for="user in userData" :key="user.id">
      <CTableDataCell
        ><span style="width: 100px; display: block; overflow: hidden">
          {{ user.id }}
        </span></CTableDataCell
      >
      <CTableDataCell>
        <span
          v-if="user.isActive"
          style="width: 100px; display: block; overflow: hidden"
        >
          <CIcon :content="icons.cilCheck" class="text-success"></CIcon>
        </span>
        <span v-else style="width: 100px; display: block; overflow: hidden">
          <CIcon :content="icons.cilX" class="text-danger"></CIcon>
        </span>
      </CTableDataCell>
      <CTableDataCell
        ><span style="width: 100px; display: block; overflow: hidden">
          {{ user.username }}
        </span></CTableDataCell
      >
      <CTableDataCell
        ><span style="width: 100px; display: block; overflow: hidden">
          {{ user.name }}
        </span></CTableDataCell
      >
      <CTableDataCell
        ><span style="width: 100px; display: block; overflow: hidden">
          {{ user.surname }}
        </span></CTableDataCell
      >
      <CTableDataCell
        ><span style="width: 100px; display: block; overflow: hidden">
          {{ user.roles.map((a) => a.name).toString() }}
        </span></CTableDataCell
      >
      <CTableDataCell
        ><span style="width: 100px; display: block; overflow: hidden">
          {{ user.pass }}
        </span></CTableDataCell
      >
      <CTableDataCell
        ><span style="width: 100px; display: block; overflow: hidden">
          {{ user.repPass }}
        </span></CTableDataCell
      >
      <CTableDataCell>
        <span
          v-if="user.passUpdate"
          style="width: 100px; display: block; overflow: hidden"
        >
          <CIcon :content="icons.cibCircle" class="text-danger"></CIcon>
        </span>
        <span v-else style="width: 100px; display: block; overflow: hidden">
          <CIcon :content="icons.cibCircle" class="text-success"></CIcon>
        </span>
      </CTableDataCell>
      <CTableDataCell>
        <div
          class="border-start d-flex justify-content-around align-items-center"
        >
          <CIcon
            @click="editUserProfile(isManageUserModalActive, user.id)"
            class="w-50 cursor-pointer"
            :content="icons.cilPencil"
          ></CIcon>
          <CIcon
            class="text-danger w-50 cursor-pointer"
            :content="icons.cilX"
          ></CIcon>
        </div>
      </CTableDataCell>
    </CTableRow>
  </CTable>
  <ManageUserModal
    v-if="isManageUserModalActive"
    :icons="icons"
    :isActive="isManageUserModalActive"
    @changeManageUserModalState="changeManageUserModalState"
    :data="selectedUser"
  ></ManageUserModal>
</template>
<script>
import { ref } from 'vue'
import { cilPencil, cilX, cibCircle, cilCheck } from '@coreui/icons'
import ManageUserModal from '@/components/ManageUserModal.vue'
export default {
  name: 'User',
  components: { ManageUserModal },
  data() {
    const thData = [
      { id: 2, title: 'N#', sortBy: 'info' },
      { id: 3, title: 'Active', sortBy: 'paymentid' },
      { id: 4, title: 'Username', sortBy: 'status_value' },
      { id: 5, title: 'Name', sortBy: 'account' },
      { id: 5, title: 'Surname', sortBy: 'paydate' },
      { id: 6, title: 'Role', sortBy: 'point_id' },
      { id: 7, title: 'Password', sortBy: 'servicename' },
      { id: 8, title: 'Rep.Pass', sortBy: 'paysum' },
      { id: 9, title: 'Pass Upd', sortBy: 'type' },
      { id: 10, title: 'Operations', sortBy: 'operations' },
    ]
    const userData = [
      {
        id: 1,
        isActive: false,
        username: 'user1',
        name: 'us',
        surname: 'er1',
        roles: [
          {
            id: 1,
            name: 'role1',
          },
          {
            id: 2,
            name: 'role2',
          },
        ],
        pass: '****',
        repPass: '****',
        passUpdate: true,
      },
      {
        id: 2,
        isActive: true,
        username: 'user2',
        name: 'us',
        surname: 'er2',
        roles: [
          {
            id: 3,
            name: 'role3',
          },
        ],
        pass: '****',
        repPass: '****',
        passUpdate: true,
      },
      {
        id: 3,
        isActive: false,
        username: 'user3',
        name: 'us',
        surname: 'er3',
        roles: [
          {
            id: 4,
            name: 'role4',
          },
        ],
        pass: '****',
        repPass: '****',
        passUpdate: false,
      },
    ]
    const selectedUser = ref(null)
    const icons = { cilPencil, cilX, cibCircle, cilCheck }
    const isManageUserModalActive = false
    return {
      userData,
      thData,

      selectedUser,

      isManageUserModalActive,

      icons,
    }
  },
  methods: {
    createUserProfile: function (state) {
      this.selectedUser = null
      this.changeManageUserModalState(state)
    },
    editUserProfile: function (state, id) {
      this.selectedUser = this.userData.find((n) => n.id == id)
      this.changeManageUserModalState(state)
    },
    changeManageUserModalState: function (state) {
      if (state == false) {
        this.isManageUserModalActive = true
      } else {
        this.isManageUserModalActive = false
      }
    },
  },
}
</script>
