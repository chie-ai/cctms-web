<template>
  <div class="container-fluid">
    <div class="row mt-lg-4 mt-md-4 mt-sm-2 mt-2 pb-3">
      <div class="col-12">
        <div class="a-user-list-container mt-1 p-3 rounded">
          <table class="table table-bordered a-table">
            <thead>
              <tr>
                <th class="a-main-font h5 px-2 py-2 a-font-b text-uppercase" colspan="9">
                  <span class="material-symbols-outlined" style="position: relative !important; bottom: -5px;">
                  person
                  </span>
                  CAMPUS {{ userType }}S
                  <template v-if="!['covid-19 case', 'recovered covid-19 case'].includes(userType) && $store.state.oauth2.usertype === 'admin'">
                    <button
                      class="btn btn-sm a-add-user-btn a-shadow-none px-3 text-light float-right mt-lg-0 mt-md-0 mt-sm-0 mt-2"
                      @click="$store.commit('userform/activateForm', { status: true, header: `ADD ${userType.toUpperCase()}`, user_id: null })"
                    >
                      <span class="material-symbols-outlined a-va-m mr-2" style="font-size: 21px;">
                      person_add
                      </span>
                      ADD
                    </button>
                  </template>
                  <template v-else-if="userType === 'covid-19 case'">
                    <div class="dropdown float-right mt-lg-0 mt-md-0 mt-sm-0 mt-2">
                      <button class="btn a-add-user-btn btn-sm a-shadow-none px-3 dropdown-toggle text-light a-main-font" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Filter by: <span class="text-capitalize a-font-b">{{ filterByClassification }}</span>
                      </button>
                      <ul class="dropdown-menu">
                        <li @click="filterByClassification = 'all'">
                          <a
                            class="dropdown-item a-main-font py-2"
                            :class="{'a-active-classification': filterByClassification === 'all'}"
                            href="#"
                          >
                            All
                          </a>
                        </li>
                        <li @click="filterByClassification = 'suspect covid-19 case'">
                          <a
                            class="dropdown-item a-main-font py-2"
                            :class="{'a-active-classification': filterByClassification === 'suspect covid-19 case'}"
                            href="#">Suspect Covid-19 Case</a>
                        </li>
                        <li @click="filterByClassification = 'probable covid-19 case'">
                          <a
                            class="dropdown-item a-main-font py-2"
                            :class="{'a-active-classification': filterByClassification === 'probable covid-19 case'}"
                            href="#">Probable Covid-19 Case</a>
                        </li>
                        <li @click="filterByClassification = 'confirmed covid-19 case'">
                          <a
                            class="dropdown-item a-main-font py-2"
                            :class="{'a-active-classification': filterByClassification === 'confirmed covid-19 case'}"
                            href="#">Confirmed Covid-19 Case</a>
                        </li>
                      </ul>
                    </div>
                  </template>
                </th>
              </tr>
            </thead>
          </table>
          <div class="row justify-content-end">
            <div class="col-lg-3 col-md-3 col-sm-12 col-12">
              <div class="input-group flex-nowrap mb-3 a-input-group">
                <span class="input-group-text a-search-icon" id="addon-wrapping">
                  <span class="material-symbols-outlined" style="font-size: 18px;">
                  search
                  </span>
                </span>
                <input
                  type="text"
                  class="form-control a-search_by-input pl-0 a-main-font"
                  :placeholder="`Search by ${userType === 'covid-19 case' ? 'user' : userType} no.`"
                  aria-label="Usernumber"
                  aria-describedby="addon-wrapping"
                  v-model="search.usernumber"
                  v-debounce:500ms="searchUser"
                >
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12 col-12">
              <div class="input-group p-0 flex-nowrap mb-3 a-input-group">
                <span class="input-group-text a-search-icon m-0" id="addon-wrapping">
                  <span class="material-symbols-outlined" style="font-size: 18px;">
                  search
                  </span>
                </span>
                <input
                  type="text"
                  class="form-control a-search_by-input pl-0 a-main-font"
                  placeholder="Search by firstname"
                  aria-label="Firstname"
                  aria-describedby="addon-wrapping"
                  v-model="search.firstname"
                  v-debounce:500ms="searchUser"
                >
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12 col-12">
              <div class="input-group flex-nowrap mb-3 a-input-group">
                <span class="input-group-text a-search-icon" id="addon-wrapping">
                  <span class="material-symbols-outlined" style="font-size: 18px;">
                  search
                  </span>
                </span>
                <input
                  type="text"
                  class="form-control a-search_by-input pl-0 a-main-font"
                  placeholder="Search by middlename"
                  aria-label="Middlename"
                  aria-describedby="addon-wrapping"
                  v-model="search.middlename"
                  v-debounce:500ms="searchUser"
                >
              </div>
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12 col-12">
              <div class="input-group flex-nowrap mb-3 a-input-group">
                <span class="input-group-text a-search-icon" id="addon-wrapping">
                  <span class="material-symbols-outlined" style="font-size: 18px;">
                  search
                  </span>
                </span>
                <input
                  type="text"
                  class="form-control a-search_by-input pl-0 a-main-font"
                  placeholder="Search by lastname"
                  aria-label="Firstname"
                  aria-describedby="addon-wrapping"
                  v-model="search.lastname"
                  v-debounce:500ms="searchUser"
                >
              </div>
            </div>
          </div>
          <div class="table-responsive shadow-sm">
            <table class="table table-sm table-bordered table-striped a-table">
              <thead class="a-main-font text-center">
                <tr>
                  <th class="py-2 a-va-m text-uppercase">{{ !['covid-19 case', 'recovered covid-19 case'].includes(userType) ? userType : 'ID' }} NO.</th>
                  <template v-if="['admin', 'health care staff'].includes($store.state.oauth2.usertype)">
                    <th class="py-2 a-va-m">USERNAME</th>
                  </template>
                  <th class="py-2 a-va-m">NAME</th>
                  <th class="py-2 a-va-m">GENDER</th>
                  <template v-if="userType === 'student'">
                    <th class="py-2 a-va-m">GRADE</th>
                  </template>
                  <th class="py-2 a-va-m">ADDRESS</th>
                  <th class="py-2 a-va-m">CONTACT NO.</th>
                  <!-- <th class="py-2 a-va-m">EMAIL</th> -->
                  <template v-if="['covid-19 case', 'recovered covid-19 case'].includes(userType)">
                    <th class="py-2 a-va-m">ROLE</th>
                  </template>
                  <template v-if="userType !== 'health care staff'">
                    <th class="py-2 a-va-m">COVID-19 CLASSIFICATION</th>
                    <th class="py-2 a-va-m">VACCINATION STATUS</th>
                  </template>
                  <template v-if="!['covid-19 case', 'recovered covid-19 case'].includes(userType)">
                    <template v-if="['admin', 'health care staff'].includes($store.state.oauth2.usertype) && userType !== 'health care staff'">
                      <th class="py-2 a-va-m px-2">ACTION</th>
                    </template>
                  </template>
                </tr>
              </thead>
              <tbody>
                <template v-if="users.length > 0">
                  <tr v-for="(user, index) in users" :key="index">
                    <td
                      class="a-main-font text-center a-va-m"
                      :class="{'px-5': !['covid-19 case', 'recovered covid-19 case'].includes(userType)}"
                      >
                      #{{ user.user_number }}
                    </td>
                    <template v-if="['admin', 'health care staff'].includes($store.state.oauth2.usertype)">
                      <td class="a-main-font a-va-m px-2">{{ user.username }}</td>
                    </template>
                    <td class="a-main-font text-uppercase a-va-m px-2">{{ user | fullname }}</td>
                    <td class="a-main-font text-center text-uppercase a-va-m px-2">{{ user.sex }}</td>
                    <template v-if="userType === 'student'">
                      <td class="a-main-font text-center text-uppercase a-va-m px-2">{{ user.grade_level }}</td>
                    </template>
                    <td class="a-main-font text-uppercase a-va-m px-2">{{ user.address }}</td>
                    <td class="a-main-font text-center text-uppercase a-va-m px-3">{{ user.contact_number }}</td>
                    <!-- <td class="a-main-font text-center a-va-m px-2">{{ user.email }}</td> -->
                    <template v-if="['covid-19 case', 'recovered covid-19 case'].includes(userType)">
                      <td class="a-main-font text-center text-uppercase a-va-m px-2">{{ user.usertype }}</td>
                    </template>
                    <template v-if="userType !== 'health care staff'">
                      <td class="a-main-font text-center text-uppercase a-va-m px-2">
                        {{ user.covid19_main_status | formatCovidClassification }}
                      </td>
                      <td class="a-main-font text-center text-uppercase a-va-m px-2">
                        {{ user.vaccination_record | isVaccinated }}
                      </td>
                    </template>
                    <template v-if="!['covid-19 case', 'recovered covid-19 case'].includes(userType)">
                      <template v-if="['admin', 'health care staff'].includes($store.state.oauth2.usertype) && userType !== 'health care staff'">
                        <td class="a-main-font a-va-m">
                          <button
                            class="btn btn-sm a-action-btn a-display-flex a-align-center"
                            type="button" data-bs-toggle="dropdown" aria-expanded="false"
                          >
                            <span class="material-symbols-outlined a-va-m text-light">
                            more_vert
                            </span>
                          </button>
                          <ul class="dropdown-menu">
                              <li>
                                <a
                                  class="dropdown-item a-main-font px-3"
                                  href="#"
                                  style="position: relative;"
                                  @click="toggleUserProfileDialog({ status: true, header: 'view profile', user_id: user.id, profile: user.user_profile.profile_file })"
                                >
                                  <span class="material-symbols-outlined a-action-icon">
                                  account_circle
                                  </span>
                                  View Profile Picture
                                </a>
                              </li>
                            <li>
                              <a
                                class="dropdown-item a-main-font px-3"
                                href="#"
                                style="position: relative;"
                                @click="toggleCovid19RecordManagementDialog({ status: true, user_id: user.id })"
                              >
                                <span class="material-symbols-outlined a-action-icon">
                                medical_information
                                </span>
                                Covid-19 Record Management & History
                              </a>
                            </li>
                            <li>
                              <a
                                class="dropdown-item a-main-font px-3"
                                href="#"
                                style="position: relative;"
                                @click="toggleVaccinationDialog({ status: true, user_id: user.id })"
                              >
                                <span class="material-symbols-outlined a-action-icon">
                                overview
                                </span>
                                Vaccination Record Management & History
                              </a>
                            </li>
                            <template v-if="currentUserUsertype === 'admin'">
                              <li>
                                <a
                                  class="dropdown-item a-main-font text-capitalize px-3"
                                  href="#"
                                  style="position: relative;"
                                  @click="activateForm({ status: true, header: `EDIT ${userType.toUpperCase()}`, user_id: user.id })"
                                >
                                  <span class="material-symbols-outlined a-action-icon">
                                  edit
                                  </span>
                                  Edit {{ userType }} Profile
                                </a>
                              </li>
                              <li>
                                <a
                                  class="dropdown-item a-main-font text-capitalize px-3"
                                  href="#"
                                  style="position: relative;"
                                  @click="deleteUser(user.id)"
                                >
                                  <span class="material-symbols-outlined a-action-icon">
                                  delete_forever
                                  </span>
                                  Delete {{ userType }} Profile
                                </a>
                              </li>
                            </template>
                          </ul>
                        </td>
                      </template>
                    </template>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td class="px-3" colspan="9">NO {{ userType.toUpperCase() }} RECORDS FOUND.</td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
          <div>
            <p class="my-0 y-0 a-main-font a-va-m" style="display: inline-block;">Total: {{ count }}</p>
            <nav class="a-pagination float-right">
              <ul class="pagination my-0">
                <li class="page-item" :class="{ 'disabled' : (previousPage === null) }" @click="() => { searchPage = previousPage !== null ? previousPage : '' }"> 
                  <a class="page-link a-page-text-color" href="#">
                    <span class="material-symbols-outlined" style="font-size: 14px;">
                    arrow_back
                    </span>
                  </a>
                </li>
                <li v-for="(prev, index) in jumpPrevious" :key="`jumpP-${index}`" class="page-item" @click="() => { searchPage = prev }"> 
                  <a class="page-link a-page-text-color" href="#">{{ prev }}</a>
                </li>
                <li v-if="jumpPrevious.length > 0" class="page-item disabled">
                  <a class="page-link a-page-text-color" href="#">...</a>
                </li>
                <li v-for="(page, index) in pages" :key="`page-${index}`" class="page-item" :class="{ 'active': (currentPage === page) }" @click="() => { searchPage = page !== currentPage ? page : '' }"> 
                  <a class="page-link a-page-text-color" href="#">{{ page }}</a>
                </li>
                <li v-if="jumpNext.length > 0" class="page-item disabled">
                  <a class="page-link a-page-text-color" href="#">...</a>
                </li>
                <li v-for="(next, index) in jumpNext" :key="`jumpN-${index}`" class="page-item" @click="() => { searchPage = next }"> 
                  <a class="page-link a-page-text-color" href="#">{{ next }}</a>
                </li>
                <li class="page-item" :class="{ 'disabled' : (nextPage === null) }" @click="() => { searchPage = nextPage !== null ? nextPage : '' }"> 
                  <a class="page-link a-page-text-color" href="#">
                    <span class="material-symbols-outlined" style="font-size: 14px;">
                    arrow_forward
                    </span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  filters: {
    fullname: (user) => {
      return `${user.last_name}, ${user.first_name} ${user.middle_name}`
    },
    formatCovidClassification: (status) => {
      if (status.length > 0) {
        return status[0]?.classification || '--'
      }
      return ''
    },
    isVaccinated: (record) => {
      return record.length > 0 ? 'vaccinated' : 'unvaccinated'
    }
  },
  props: {
    userType: String
  },
  data () {
    return {
      users: [],
      page: 1,
      pages: [],
      currentPage: null,
      nextPage: null,
      previousPage: null,
      jumpNext: [],
      jumpPrevious: [],
      pageLabel: null,
      totalPages: null,
      searchPage: null,
      pageValuePair: '',
      count: null,
      search: {
        usernumber: '',
        firstname: '',
        middlename: '',
        lastname: '',
      },
      filterByClassification: 'all',
      currentUserUsertype: null
    }
  },
  watch: {
    searchPage (n, o) {
      this.page = n
      this.pageValuePair = `&page=${n}`
      this.getUsersList()
    },
    '$store.state.userform.active' (status) {
      if (!status) {
        this.getUsersList()
      }
    },
    '$store.state.covid19recordmanagement.active' (status) {
      if (!status) {
        this.getUsersList()
      }
    },
    '$store.state.vaccinationrecordmanagement.active' (status) {
      if (!status) {
        this.getUsersList()
      }
    },
    filterByClassification (n, o) {
      this.pageValuePair = ''
      this.getUsersList()
    },
    '$store.state.oauth2.usertype' (txt) {
      this.currentUserUsertype = txt
    }
  },
  mounted () {
    this.getUsersList()
  },
  methods: {
    ...mapMutations({
      activateForm: 'userform/activateForm',
      toggleVaccinationDialog: 'vaccinationrecordmanagement/toggleVaccinationDialog',
      toggleCovid19RecordManagementDialog: 'covid19recordmanagement/toggleCovid19RecordManagementDialog',
      toggleUserProfileDialog: 'userprofile/toggleUserProfileDialog'
    }),
    async getUsersList () {
      const vm = this
      const usertype = `usertype=${vm.userType}`
      const usernumber = vm.search.usernumber !== '' ? `&user_number__user_number=${vm.search.usernumber}` : ''
      const firstname = vm.search.firstname !== '' ? `&first_name=${vm.search.firstname}` : ''
      const middlename = vm.search.middlename !== '' ? `&middle_name=${vm.search.middlename}` : ''
      const lastname = vm.search.lastname !== '' ? `&last_name=${vm.search.lastname}` : ''
      const classification = vm.filterByClassification !== 'all' ? `&covid19_status__classification=${vm.filterByClassification}` : ''
      const filters = `${usertype}${usernumber}${firstname}${middlename}${lastname}${classification}${vm.pageValuePair}`
      const { data } = await vm.$api.get(`/api/get-users-list/?${filters}`, vm.$utils.header())
      console.log('User list: ', data)
      vm.users = data.results
      vm.count = data.count
      vm.currentUserUsertype = this.$store.state.oauth2.usertype
      vm.updatePagination(data, Number(vm.page))
    },
    searchUser () {
      this.pageValuePair = ''
      this.getUsersList()
    },
    updatePagination (pageObj, page = 1) {
      const vm = this
      const {
        pages,
        jumpPrevious,
        jumpNext,
        nextPage,
        previousPage,
        currentPage,
        totalPages
      } = vm.$utils.pagination(pageObj, isNaN(page) ? '' : page)

      vm.pages = pages
      vm.jumpPrevious = jumpPrevious
      vm.jumpNext = jumpNext
      vm.nextPage = nextPage
      vm.previousPage = previousPage
      vm.currentPage = currentPage
      vm.totalPages = totalPages
    },
    async deleteUser (id) {
      const vm = this
      if (confirm(`Are you sure you want to delete ${vm.userType} record?`)) {
        try {
          await vm.$api.delete(`/api/delete-user/${id}/`, this.$utils.header())
          const popup = {
            status: true,
            header: 'Success',
            message: `${userType} record has been successfully deleted!`
          }
          vm.$store.commit('alert/setAlertStatus', popup)
          vm.getUsersList()
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
}
</script>
