<template>
  <div class="a-userprofile-container">
    <div class="a-base-form a-display-flex px-3">
      <div class="a-userprofile-form bg-light my-lg-5 my-md-5 my-sm-2 my-3">
        <div class="a-userprofile-header a-display-flex py-2 px-3">
          <div class="a-display-flex" style="width: 140%;">
            <p class="h5 a-main-font mt-1 mb-0 text-uppercase font-weight-bold">
              <span class="material-symbols-outlined a-icon-size mb-1 a-va-m" style="font-size: 22px;">
              account_circle
              </span>
              {{ $store.state.userprofile.header }}
            </p>
          </div>
          <div class="text-right" style="width: 60%;">
            <button
              class="btn btn-sm btn-link a-shadow-none"
              @click="$store.commit('userprofile/toggleUserProfileDialog', { status: false, header: null, user_id: null })"
            >
              <span class="material-symbols-outlined a-icon-size a-va-m">
              close
              </span>
            </button>
          </div>
        </div>
        <hr class="a-hr my-0">
        <div class="a-userprofile-body px-2 py-2 pb-0">
          <div class="a-preview-user-profile py-3 rounded">
            <div class="a-profile">
              <img v-if="prevImage" :src="prevImage" class="a-profile-img" width="100%" alt="profile">
              <div v-if="$store.state.userprofile.header !== 'view profile'" class="a-profile-overlay" @click="invokeFileInput">
                <span class="material-symbols-outlined a-profile-icon">
                photo
                </span>
                <p class="text-light a-profile-text">Select Picture</p>
              </div>
              <span class="material-symbols-outlined a-profile-icon text-light" style="font-size: 200px;">
              person
              </span>
            </div>
          </div>
          <template v-if="$store.state.userprofile.header !== 'view profile'">
            <form v-on:submit="uploadProfile">
              <div class="mb-2">
                <input
                  ref="fileImage"
                  type="file"
                  accept="image/jpeg, image/png, image/jpg"
                  class="form-control"
                  hidden
                  @change="previewProfile"
                >
              </div>
              <template v-if="isFileInvalid">
                <div class="text-center">
                  <p class="a-main-font my-0 py-0 px-2 text-light rounded" style="display: inline-block; background: #E26945;">Invalid file</p>
                </div>
              </template>
              <div class="text-right">
                <button type="submit" :disabled="disableUploadBtn" class="btn a-btn-upload-profile px-3 text-light a-main-font">
                  <template v-if="uploading">
                    Uploading...
                  </template>
                  <template v-else>
                    Upload
                    <span class="material-symbols-outlined mb-1 a-va-m" style="font-size: 20px;">
                    upload_file
                    </span>
                  </template>
                </button>
              </div>
            </form>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      prevImage: null,
      filename: null,
      uploading: false,
      disableUploadBtn: true,
      isFileInvalid: false
    }
  },
  mounted () {
    const vm = this
    if (vm.$store.state.userprofile.profile) {
      vm.prevImage = `${this.$config.BACKEND_BASE_URL}${vm.$store.state.userprofile.profile}`
    }
  },
  methods: {
    invokeFileInput () {
      this.$refs.fileImage.click()
    },
    previewProfile () {
      try {
        const vm = this
        const filename = vm.$refs.fileImage.files.item(0)
        const ext = filename.name.split('.').pop()
        vm.isFileInvalid = true
        if (['jpeg','jgp','png'].includes(ext)) {
          vm.filename = filename
          vm.isFileInvalid = false
          vm.disableUploadBtn = false
          vm.prevImage = URL.createObjectURL(vm.filename)
        }
      } catch (err) {
        console.log(err)
      }
    },
    async uploadProfile (e) {
      e.preventDefault()
      const vm = this
      const formData = new FormData()
      const file = vm.$refs.fileImage.files.item(0)
      formData.append('user_id', vm.$store.state.userprofile.user_id)
      formData.append('profile_file', file)

      vm.uploading = true
      const headerType = vm.$store.state.userprofile.header
      if (headerType === 'add profile') {
        await vm.$api.post('/api/upload-user-profile', formData, vm.$utils.multipartHeader())
        vm.$store.commit('userprofile/toggleUserProfileDialog', { status: false, header: null, user_id: null, profile: null })

        setTimeout(() => {
          const popup = {
            status: true,
            header: 'Success',
            message: 'Profile picture has been successfully added!'
          }
          vm.$store.commit('alert/setAlertStatus', popup)
        }, 500)
      } else {
        await vm.$api.put(`/api/update-user-profile/${vm.$store.state.userprofile.user_id}/`, formData, vm.$utils.multipartHeader())
        vm.$store.commit('userprofile/toggleUserProfileDialog', { status: false, header: null, user_id: null })

        setTimeout(() => {
          const popup = {
            status: true,
            header: 'Success',
            message: 'Profile picture has been successfully updated!'
          }
          vm.$store.commit('alert/setAlertStatus', popup)
        }, 500)
      }
    }
  }
}
</script>
