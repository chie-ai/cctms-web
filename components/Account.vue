<template>
  <div class="a-wrapper">
    <div class="a-container">
      <div class="container-fluid pt-4 pb-4">
        <div class="row justify-content-center">
          <div class="col-lg-8 col-md-8 col-sm-12 col-12">
            <div class="row">
              <div class="col-12">
                <p class="h3 a-main-font a-font-b">Account</p>
              </div>
              <div class="col-12">
                <form v-on:submit="saveProfile">
                  <div class="mt-1 mb-2">
                    <p class="h5 my-0 a-main-font a-font-b">Profile</p>
                    <span class="a-font-dim-color">This information will be displayed throughout the system.</span>
                    <hr class="my-2 a-hr" />
                  </div>
                  <div class="row">
                    <div class="col-lg-4 col-md-4 col-sm-12 col-12">
                      <div class="mb-3">
                        <label for="firstname" class="form-label a-main-font ml-2 mb-1">Firstname</label>
                        <input
                          type="text"
                          readonly
                          class="form-control a-account-input a-main-font text-capitalize"
                          id="firstname"
                          v-model="user.first_name"
                          placeholder="Firstname"
                        >
                      </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-12 col-12">
                      <div class="mb-3">
                        <label for="middlename" class="form-label a-main-font ml-2 mb-1">Middlename</label>
                        <input
                          type="text"
                          readonly
                          class="form-control a-account-input a-main-font text-capitalize"
                          id="middlename"
                          v-model="user.middle_name"
                          placeholder="Middlename"
                        >
                      </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-12 col-12">
                      <div class="mb-3">
                        <label for="lastname" class="form-label a-main-font ml-2 mb-1">Lastname</label>
                        <input
                          type="text"
                          readonly
                          class="form-control a-account-input a-main-font text-capitalize"
                          id="lastname"
                          v-model="user.last_name"
                          placeholder="Lastname"
                        >
                      </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                      <div class="mb-3">
                        <label for="usernumber" class="form-label a-main-font ml-2 mb-1">User number</label>
                        <input
                          type="number"
                          readonly
                          class="form-control a-account-input a-main-font"
                          id="usernumber"
                          v-model="user.user_number"
                          placeholder="User number"
                        >
                      </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                      <div class="mb-3">
                        <label for="username" class="form-label a-main-font ml-2 mb-1">Username</label>
                        <input
                          type="text"
                          class="form-control a-account-input a-main-font"
                          id="username"
                          v-model="user.username"
                          placeholder="Username"
                        >
                      </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                      <div class="mb-3 a-account-profile">
                        <template v-if="prevProfile && user?.user_profile?.profile_file">
                          <img :src="base + user?.user_profile?.profile_file" class="a-img-src shadow-sm" width="50px" height="50px" alt="User Profile">
                        </template>
                        <template v-else>
                          <div class="a-img" />
                        </template>
                        <template v-if="user?.user_profile?.profile_file">
                          <button
                            type="button"
                            class="btn btn-sm a-btn-add-profile text-light ml-2"
                            @click="$store.commit('userprofile/toggleUserProfileDialog', { status: true, header: 'change profile', user_id: user.id, profile: user.user_profile.profile_file })"
                          >
                              Change picture
                            </button>
                        </template>
                        <template v-else>
                          <button
                            type="button"
                            class="btn btn-sm a-btn-add-profile text-light ml-2"
                            @click="$store.commit('userprofile/toggleUserProfileDialog', { status: true, header: 'add profile', user_id: user.id })"
                          >
                              Add picture
                            </button>
                        </template>
                      </div>
                    </div>
                  </div>
                  <div class="mt-1 mb-2">
                    <p class="h5 my-0 a-main-font a-font-b">Personal Information</p>
                    <span class="a-font-dim-color">This information will be displayed throughout the system.</span>
                    <hr class="my-2 a-hr" />
                  </div>
                  <div class="row">
                    <div class="col-12">
                      <div class="mb-3">
                        <label for="address" class="form-label a-main-font ml-2 mb-1">Address</label>
                        <input
                          type="text"
                          class="form-control a-account-input a-main-font text-capitalize"
                          id="address"
                          v-model="user.address"
                          placeholder="Address"
                        >
                      </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                      <div class="mb-3">
                        <label for="email" class="form-label a-main-font ml-2 mb-1">Email address</label>
                        <input
                          type="email"
                          class="form-control a-account-input a-main-font"
                          id="email"
                          v-model="user.email"
                          placeholder="Email"
                        >
                      </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                      <div class="mb-3">
                        <label for="phone_number" class="form-label a-main-font ml-2 mb-1">Phone number</label>
                        <input
                          type="number"
                          class="form-control a-account-input a-main-font"
                          id="phone_number"
                          v-model="user.contact_number"
                          placeholder="Phone number"
                        >
                      </div>
                    </div>
                    <div :class="[user.usertype === 'student' ? 'col-4' : 'col-6']">
                      <div class="mb-3">
                        <label for="gender" class="form-label a-main-font ml-2 mb-1">Gender</label>
                        <!-- <input
                          type="text"
                          class="form-control a-account-input a-main-font text-capitalize"
                          id="usertype"
                          v-model="user.sex"
                          placeholder="User type"
                        > -->
                        <select class="form-select form-control a-account-input a-main-font" id="gender" v-model="user.sex">
                          <option value="female">Female</option>
                          <option value="male">Male</option>
                        </select>
                      </div>
                    </div>
                    <template v-if="user.usertype === 'student'">
                      <div :class="[user.usertype === 'student' ? 'col-4' : 'col-6']">
                        <div class="mb-3">
                          <label for="grade_level" class="form-label a-main-font ml-2 mb-1">Grade level</label>
                          <select class="form-select form-control a-account-input a-main-font" id="grade_level" v-model="user.grade_level">
                            <option value="seven">Seven</option>
                            <option value="eight">Eight</option>
                            <option value="nine">Nine</option>
                            <option value="ten">Ten</option>
                            <option value="eleven">Eleven</option>
                            <option value="twelve">Twelve</option>
                          </select>
                        </div>
                      </div>
                    </template>
                    <div :class="[user.usertype === 'student' ? 'col-4' : 'col-6']">
                      <div class="mb-3">
                        <label for="usertype" class="form-label a-main-font ml-2 mb-1">User type</label>
                        <input
                          type="text"
                          readonly
                          class="form-control a-account-input a-main-font text-capitalize"
                          id="usertype"
                          v-model="user.usertype"
                          placeholder="User type"
                        >
                      </div>
                    </div>
                    <template v-if="user.health_care_service">
                      <div class="col-12">
                        <div class="mb-3">
                          <label for="health-care-service" class="form-label a-main-font ml-2 mb-1">Health Care Service</label>
                          <input
                            type="text"
                            class="form-control a-account-input a-main-font text-capitalize"
                            id="health-care-service"
                            v-model="user.health_care_service"
                            placeholder="Health Care Service"
                          >
                        </div>
                      </div>
                    </template>
                    <div class="col-12">
                      <div class="mb-3 text-right">
                        <button type="submit" class="btn a-account-btn text-light px-3">
                          <template v-if="!passwordTxnProcess">
                            Update
                            <span class="material-symbols-outlined a-icon-size mb-1 a-va-m" style="font-size: 20px;">
                            save
                            </span>
                          </template>
                          <template v-else>
                            Updating...
                          </template>
                        </button>
                      </div>
                      <hr class="my-3 a-hr" />
                    </div>
                  </div>
                </form>
                <div class="mt-1 mb-2">
                  <p class="h5 my-0 a-main-font a-font-b">Security Password</p>
                  <span class="a-font-dim-color">Please keep your password secured and private at all times.</span>
                  <hr class="my-2 a-hr" />
                </div>
                <form class="row" v-on:submit="changePassword">
                  <template v-if="currentPassMistMatched">
                    <div class="col-12 py-0">
                      <p class="a-main-font my-0 ml-2" style="color: #EC7063; font-size: 14px;">Current password does not match.</p>
                    </div>
                  </template>
                  <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div class="mb-3">
                      <label for="current-password" class="form-label a-main-font ml-2 mb-1">Current password</label>
                      <div class="input-group a-input-group mb-3">
                        <input
                          :type="[passInputType ? 'text' : 'password']"
                          class="form-control a-account-input a-main-font"
                          id="current-password"
                          aria-label="current password"
                          aria-describedby="current-password_"
                          v-model="current_password"
                          placeholder="Password"
                          required
                        >
                        <span class="input-group-text a-input-span" id="current-password_" @click="passInputType = !passInputType">
                          <span class="material-symbols-outlined" style="font-size: 16px;">
                            <template v-if="passInputType">
                              visibility
                            </template>
                            <template v-else>
                              visibility_off
                            </template>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-12 col-12">
                    <div class="mb-3">
                      <label for="new-password" class="form-label a-main-font ml-2 mb-1">New password</label>
                      <div class="input-group a-input-group mb-3">
                        <input
                          :type="[passInputType2 ? 'text' : 'password']"
                          class="form-control a-account-input a-main-font"
                          id="new-password"
                          aria-label="new password"
                          aria-describedby="new-password_"
                          v-model="new_password"
                          placeholder="Password"
                          required
                        >
                        <span class="input-group-text a-input-span" id="new-password_" @click="passInputType2 = !passInputType2">
                          <span class="material-symbols-outlined" style="font-size: 16px;">
                            <template v-if="passInputType2">
                              visibility
                            </template>
                            <template v-else>
                              visibility_off
                            </template>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="mb-3 text-right">
                      <button type="submit" class="btn a-account-btn text-light px-3">
                        <template v-if="!passwordTxnProcess">
                          Change password
                          <span class="material-symbols-outlined a-icon-size mb-1 a-va-m" style="font-size: 20px;">
                          save
                          </span>
                        </template>
                        <template v-else>
                          Changing password...
                        </template>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: { 
        first_name: null,
        middle_name: null,
        last_name: null,
        user_number: null,
        username: null,
        email: null,
        contact_number: null,
        level: null,
        usertype: null,
        health_care_service: null,
        user_profile: null
      },
      passInputType: false,
      passInputType2: false,
      current_password: '',
      new_password: '',
      currentPassMistMatched: false,
      usernameStatus: false,
      staticUserNumber: '',
      staticUsername: '',
      accountTxnProcess: false,
      passwordTxnProcess: false,
      userData: null,
      base: 'http://localhost:8000',
      prevProfile: false
    }
  },
  props: {
    userType: String
  },
  // watch: {
  //   '$store.state.userprofile.active' (s) {
  //     setTimeout(() => {
  //       if (!s) {
  //         this.prevProfile = false
  //         setTimeout(() => {
  //           this.getUserInformation()
  //         }, 2000)
  //       }
  //     }, 1000)
  //   }
  // },
  mounted () {
    this.getUserInformation()
  },
  methods: {
    async getUserInformation () {
      const vm = this
      const api = '/api/get-current-user-information'
      const { data } = await vm.$api.get(api, vm.$utils.header())
      vm.user = data
      vm.userData = data
      vm.prevProfile = true
    },
    async saveProfile (e) {
      e.preventDefault()
      const vm = this
      vm.accountTxnProcess = true
      vm.user.user_id = vm.user.id
      const payload = vm.user
      const api = `/api/update-user-info/${vm.user.user_id}/`
      vm.$api.put(api, payload, vm.$utils.header())
        .then(res => {
          // console.log('Result: ', res)
          vm.accountTxnProcess = false
          vm.usernameStatus = null
          const popup = {
            status: true,
            header: 'Success',
            message: 'Account has been successfully updated!'
          }
          vm.$store.commit('alert/setAlertStatus', popup)
        })
        .catch(err => {
          console.log(err)
          vm.accountTxnProcess = false
        })
    },
    async changePassword (e) {
      e.preventDefault()
      const vm = this
      try {
        vm.passwordTxnProcess = true
        const payload = { current_password: vm.current_password, new_password: vm.new_password }
        const api = '/api/change-password'
        await vm.$api.post(api, payload, vm.$utils.header())
        const popup = {
          status: true,
          header: 'Success',
          message: 'New password has been successfully saved!'
        }
        vm.$store.commit('alert/setAlertStatus', popup)
        vm.current_password = ''
        vm.new_password = ''
        vm.passInputType = false
        vm.passInputType2 = false
        vm.currentPassMistMatched = false
        vm.passwordTxnProcess = false
      } catch (err) {
        console.log(err)
        vm.currentPassMistMatched = true
      }
    }
  }
}
</script>
