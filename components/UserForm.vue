<template>
  <div class="a-form-container">
    <div class="a-base-form a-display-flex px-1">
      <div class="a-add-user-form bg-light my-lg-5 my-md-5 my-sm-2 my-3">
        <div class="a-form-header a-display-flex py-2 px-3">
          <div class="a-display-flex" style="width: 100%;">
            <p class="h5 mt-1 mb-0">
              <template v-if="!isAddForm()">
                <span class="material-symbols-outlined a-icon-size mb-2 a-va-m" style="font-size: 22px;">
                edit_square
                </span>
              </template>
              <template v-else>
                <span class="material-symbols-outlined a-icon-size mb-1 a-va-m">
                person_add
                </span>
              </template>
              {{ header }}
            </p>
          </div>
          <div class="text-right" style="width: 100%;">
            <button
              class="btn btn-sm btn-link a-shadow-none"
              @click="$store.commit('userform/activateForm', { status: false, header: null })"
            >
              <span class="material-symbols-outlined a-icon-size a-va-m">
              close
              </span>
            </button>
          </div>
        </div>
        <hr class="a-hr my-0">
        <div class="a-form-body px-2 pt-2 pb-0">
          <div v-if="txnSuccess" class="a-success px-3 py-2 mb-2">
            <p class="my-0 text-capitalize" style="display: inline-block;">
              <template v-if="isAddForm()">
                {{ successCreateMessage }}
              </template>
              <template v-else>
                {{ successUpdateMessage }}
              </template>
            </p>
            <span @click="txnSuccess = false" class="material-symbols-outlined a-icon-size a-va-m float-right a-pointer">
            close
            </span>
          </div>
          <form v-on:submit="submitForm">
            <fieldset>
              <div class="a-form_ px-3 pb-2">
                <div class="row py-1">
                  <div class="col-lg-6 col-md-6 col-sm-6 col-12 px-2 py-1">
                    <div class="">
                      <label for="usernumber" class="a-main-font form-label ml-2 mb-1 text-uppercase">
                        {{ userType }} NO. <span class="a-required-input">*</span>
                        <template v-if="userNumberStatus">
                          <span style="color: #ec7063;">
                          Already exist
                          </span>
                        </template>
                        <template v-else-if="userNumberStatus === false">
                          <span style="color: #76d7c4;">
                          Available
                          </span>
                        </template>
                      </label>
                      <input
                        ref="userNumber"
                        type="number"
                        id="usernumber"
                        class="form-control form-control a-form-input a-main-font"
                        :placeholder="`${userType.toUpperCase()} NO.`"
                        v-model="userForm.user_number"
                        v-debounce:500ms="checkUserNumber"
                        required
                        autofocus
                      >
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-6 col-12 px-2 py-1">
                    <div class="">
                      <label for="username" class="a-main-font form-label ml-2 mb-1">
                        USERNAME <span class="a-required-input">*</span>
                        <template v-if="usernameStatus">
                          <span style="color: #ec7063;">
                          Username already exist
                          </span>
                        </template>
                        <template v-else-if="usernameStatus === false">
                          <span style="color: #76d7c4;">
                          Available
                          </span>
                        </template>
                      </label>
                      <input
                        type="text"
                        id="username"
                        class="form-control form-control a-form-input a-main-font"
                        v-model="userForm.username"
                        placeholder="USERNAME"
                        v-debounce:100ms="checkUsername"
                        required
                      >
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-4 col-md-4 col-sm-4 col-12 px-2 py-1">
                    <div class="">
                      <label for="firstname" class="a-main-font form-label ml-2 mb-1">FIRSTNAME <span class="a-required-input">*</span></label>
                      <input
                        type="text"
                        id="firstname"
                        class="form-control form-control a-form-input a-main-font text-capitalize"
                        v-model="userForm.first_name"
                        placeholder="FIRSTNAME"
                        required
                      >
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-4 col-12 px-2 py-1">
                    <div class="">
                      <label for="middlename" class="a-main-font form-label ml-2 mb-1">MIDDLENAME <span class="a-required-input">*</span></label>
                      <input
                        type="text"
                        id="middlename"
                        class="form-control form-control a-form-input a-main-font text-capitalize"
                        v-model="userForm.middle_name"
                        placeholder="MIDDLENAME"
                        required
                      >
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-4 col-12 px-2 py-1">
                    <div class="">
                      <label for="lastname" class="a-main-font form-label ml-2 mb-1">LASTNAME <span class="a-required-input">*</span></label>
                      <input
                        type="text"
                        id="lastname"
                        class="form-control form-control a-form-input a-main-font text-capitalize"
                        v-model="userForm.last_name"
                        placeholder="LASTNAME"
                        required
                      >
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-4 col-md-4 col-sm-4 col-12 px-2 py-1">
                    <div>
                      <label for="sex" class="a-main-font form-label ml-2 mb-1">GENDER <span class="a-required-input">*</span></label>
                      <select class="form-select form-control a-form-input a-main-font text-uppercase" id="sex" v-model="userForm.sex" required>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-4 col-12 px-2 py-1">
                    <div class="">
                      <label for="contact-number" class="a-main-font form-label ml-2 mb-1">CONTACT NO. <span class="a-required-input">*</span></label>
                      <input
                        type="number"
                        id="contact-number"
                        class="form-control form-control a-form-input a-main-font"
                        placeholder="CONTRACT NO."
                        required
                        v-model="userForm.contact_number"
                      >
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-4 col-12 px-2 py-1">
                    <div class="">
                      <label for="grade-level" class="a-main-font form-label ml-2 mb-1">GRADE LEVEL <span class="a-required-input">*</span></label>
                      <select
                        class="form-select form-control a-form-input a-main-font text-uppercase"
                        id="grade-level"
                        v-model="userForm.level"
                        :disabled="['teacher', 'staff', 'health care staff', 'admin'].includes(userType)"
                        required
                      >
                        <option value="seven">Seven</option>
                        <option value="eight">Eight</option>
                        <option value="nine">Nine</option>
                        <option value="ten">Ten</option>
                        <option value="eleven">Eleven</option>
                        <option value="twelve">Twelve</option>
                      </select>
                    </div>
                  </div>
                </div>
                <template v-if="$route.path === '/health-care-staff'">
                <div class="row">
                  <div class="col-12 px-2 py-1">
                    <div class="">
                      <label for="address" class="a-main-font form-label ml-2 mb-1">HEALTH CARE SERVICE <span class="a-required-input">*</span></label>
                      <input
                        type="text"
                        id="address"
                        class="form-control form-control a-form-input a-main-font text-capitalize"
                        placeholder="HEALTH CARE SERVICE"
                        required
                        v-model="userForm.health_care_service"
                      >
                    </div>
                  </div>
                </div>
                </template>
                <div class="row">
                  <div class="col-lg-6 col-md-6 col-sm-12 px-2 py-1">
                    <div class="">
                      <label for="address" class="a-main-font form-label ml-2 mb-1">ADDRESS <span class="a-required-input">*</span></label>
                      <input
                        type="text"
                        id="address"
                        class="form-control form-control a-form-input a-main-font text-capitalize"
                        placeholder="ADDRESS"
                        required
                        v-model="userForm.address"
                      >
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-12 col-12 px-2 py-1">
                    <div class="">
                      <label for="address" class="a-main-font form-label ml-2 mb-1">EMAIL</label>
                      <input
                        type="email"
                        id="address"
                        class="form-control form-control a-form-input a-main-font"
                        placeholder="EMAIL"
                        v-model="userForm.email"
                      >
                    </div>
                  </div>
                  <!-- <div class="col-lg-3 col-md-3 col-sm-6 col-12 px-2 py-1">
                    <div class="">
                      <label for="usertype" class="form-label ml-2 mb-2">USER TYPE</label>
                      <select class="form-select form-control a-form-input a-main-font" id="usertype" v-model="userForm.usertype" required>
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                        <option value="staff">Staff</option>
                        <option value="community">Community</option>
                      </select>
                    </div>
                  </div> -->
                </div>
                <template v-if="!['EDIT STUDENT', 'EDIT TEACHER', 'EDIT STAFF', 'EDIT HEALTH CARE STAFF', 'EDIT ADMIN'].includes(header)">
                  <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-12 px-2 py-1">
                      <div class="">
                        <label for="password" class="a-main-font form-label ml-2 mb-1">PASSWORD <span class="a-required-input">*</span></label>
                        <input
                          type="password"
                          id="password"
                          class="form-control form-control a-form-input a-main-font"
                          placeholder="PASSWORD"
                          v-model="userForm.password"
                        >
                      </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 px-2 py-1">
                      <div >
                        <label for="password2" class="a-main-font form-label ml-2 mb-1">
                          CONFIRM PASSWORD <span class="a-required-input">*</span>
                          <template v-if="isPassMismatched">
                            <span style="color: #ec7063;">
                              mismatched
                            </span>
                          </template>
                          <template v-if="passwordValidation2()">
                            <span style="color: #ec7063;">
                              please type password first
                            </span>
                          </template>
                        </label>
                        <input
                          type="password"
                          id="password2"
                          class="form-control form-control a-form-input a-main-font"
                          placeholder="CONFIRM PASSWORD"
                          v-model="userForm.password2"
                          v-debounce:100ms="passwordValidation"
                        >
                      </div>
                    </div>
                  </div>
                </template>
              </div>
              <div class="row px-3">
                <div class="col-12 text-right px-2 py-2">
                  <button type="submit" :disabled="txnProcess || isPassMismatched || userNumberStatus || usernameStatus || passwordValidation2()" class="btn a-btn-submit text-light px-3">
                    <template v-if="!['EDIT STUDENT', 'EDIT TEACHER', 'EDIT STAFF', 'EDIT HEALTH CARE STAFF'].includes(header)">
                      <template v-if="txnProcess">
                        Saving Account...
                      </template>
                      <template v-else>
                        Save Account
                      </template>
                    </template>
                    <template v-else>
                      <template v-if="txnProcess">
                        Updating...
                      </template>
                      <template v-else>
                        Update
                      </template>
                    </template>
                    <template v-if="['EDIT STUDENT', 'EDIT TEACHER', 'EDIT STAFF', 'EDIT HEALTH CARE STAFF'].includes(header)">
                      <template v-if="!txnProcess">
                        <span class="material-symbols-outlined a-icon-size mb-0 a-va-m" style="font-size: 20px;">
                        update
                        </span>
                      </template>
                    </template>
                    <template v-else>
                      <template v-if="!txnProcess">
                        <span class="material-symbols-outlined a-icon-size mb-1 a-va-m" style="font-size: 20px;">
                        save
                        </span>
                      </template>
                    </template>
                  </button>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*
 * TODO: 
 * disable submit button if `username` and `user_number` exist
 * password validation
 **/
export default {
  props: {
    userType: String,
  },
  data () {
    return {
      header: null,
      user_id: null,
      userForm: {
        user_number: null,
        username: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        sex: '',
        address: '',
        email: '',
        classification: 'uninfected covid-19 case',
        contact_number: '',
        level: '',
        health_care_service: '',
        usertype: this.getUserType(),
        password: '',
        password2: '',
      },
      txnSuccess: false,
      txnProcess: false,
      userNumberStatus: null,
      usernameStatus: null,
      successUpdateMessage: `${this.userType.toLowerCase()}'s information has been successfully updated!`,
      successCreateMessage: 'Account has been successfully added!',
      staticUserNumber: null,
      staticUsername: null,
      isPassMismatched: false
    }
  },
  mounted () {
    const vm = this
    vm.$refs.userNumber.focus()
    vm.header = vm.$store.state.userform.header
    if (!vm.isAddForm()) {
      vm.getUserInfo() 
    }
  },
  methods: {
    async checkUserNumber () {
      const vm = this
      vm.userNumberStatus = null
      if (vm.userForm.user_number && vm.userForm.user_number !== vm.staticUserNumber) {
        const { data } = await vm.$api.get(`/api/does-user-number-exist/?user_number=${vm.userForm.user_number}`, vm.$utils.header())
        if (data.user_number) { 
          vm.userNumberStatus = true
        } else {
          vm.userNumberStatus = false
        }
      }
    },
    async checkUsername () {
      const vm = this
      vm.usernameStatus = null
      if (vm.userForm.username && vm.userForm.username !== vm.staticUsername) {
        const { data } = await vm.$api.get(`/api/does-username-exist/?username=${vm.userForm.username}`, vm.$utils.header())
        // console.log('Username: ', data)
        if (data.username) {
          vm.usernameStatus = true
        } else {
          vm.usernameStatus = false
        }
      }
    },
    async getUserInfo () {
      const vm = this
      if (!vm.isAddForm()) {
        const { data } = await vm.$api.get(`/api/get-user-info/${vm.$store.state.userform.user_id}/`, vm.$utils.header())
        console.log('Student info: ', data)
        vm.userInfo(data)
      }
    },
    passwordValidation () {
      const vm = this
      const pass = vm.userForm.password
      const pass2 = vm.userForm.password2
      if (pass.length > 0) {
        if (pass !== pass2) {
          if (pass2.length === 0) {
            vm.isPassMismatched = false
          } else {
            vm.isPassMismatched = true
          }
        } else {
          vm.isPassMismatched = false
        }
      }
    },
    passwordValidation2 () {
      if (this.isAddForm()) {
        return (this.userForm.password.length === 0 && this.userForm.password2.length > 0) 
      }
    },
    userInfo (obj) {
      const vm = this
      vm.staticUserNumber = obj.user_number
      vm.staticUsername = obj.username

      const keys = Object.keys(obj)
      for (let i in keys) {
        const exclude_fields = ['id', 'created_at', 'updated_at', 'covid19_status', 'covid19_main_status', 'password', 'password2', 'last_login']
        if (!exclude_fields.includes(keys[i])) {
          vm.userForm[keys[i] !== 'grade_level' ? keys[i] : 'level'] = obj[keys[i]]
        }
      }
      if (vm.userType !== 'health care service') {
        vm.userForm.health_care_service = obj.health_care_service
      } else {
        vm.userForm.classification = obj.covid19_main_status[obj.covid_status.length-1].classification
      }
    },
    submitForm (e) {
      e.preventDefault()
      const vm = this
      if (vm.isAddForm()) {
        vm.registerUserInfo()
      } else {
        vm.updateUserInfo()
      }
    },
    registerUserInfo () {
      const vm = this
      const payload = vm.userForm
      // console.log('Payload: ', payload)
      vm.txnProcess = true
      vm.$api.post('/api/register-user-info', payload, vm.$utils.header())
        .then(res => {
          vm.txnSuccess = true
          vm.txnProcess = false
          vm.resetForm()
        })
        .catch(err => {
          console.log(err)
          vm.txnProcess = false
        })
    },
    updateUserInfo () {
      const vm = this
      const payload = vm.userForm
      vm.txnProcess = true
      vm.userForm.user_id = vm.$store.state.userform.user_id
      vm.$api.put(`/api/update-user-info/${vm.userForm.user_id}/`, payload, vm.$utils.header())
        .then(res => {
          // console.log('Result: ', res)
          vm.txnSuccess = true
          vm.txnProcess = false
          vm.userNumberStatus = null
        })
        .catch(err => {
          console.log(err)
          vm.txnProcess = false
        })
    },
    getUserType () {
      const path = this.$route.path
      if (path === '/students') {
        return 'student'
      } else if (path === '/teachers')  {
        return 'teacher'
      } else if (path === '/staff') {
        return 'staff'
      } else if (path === '/health-care-staff') {
        return 'health care staff'
      } else if (path === '/administrators') {
        return 'admin'
      }
    },
    isAddForm () {
      if (['ADD STUDENT', 'ADD TEACHER', 'ADD STAFF', 'ADD HEALTH CARE STAFF', 'ADD ADMIN'].includes(this.header)) {
        return true
      } else {
        return false
      }
    },
    resetForm () {
      const vm = this
      const keyNames = Object.keys(vm.userForm)
      for (let i in keyNames) {
        if (keyNames[i] === 'usertype') {
          vm.userForm[keyNames[i]] = vm.getUserType()
        } else {
          vm.userForm[keyNames[i]] = ''
        }
      }
      vm.userNumberStatus = null
      vm.usernameStatus = null
    }
  }
}
</script>