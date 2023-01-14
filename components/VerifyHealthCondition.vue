<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-lg-5 col-md-8 col-sm-10 col-12">
        <div class="a-statistic-check text-center mt-2 py-4 px-4">
          <div class="a-input">
            <p class="my-0 h3 mb-4 a-main-font a-font-b">VERIFY HEALTH CONDITION </p>
            <div class="row justify-content-center">
              <div class="col-lg-10 col-md-10 col-12">
                <label for="user-number" class="form-label float-left ml-2 mb-1">ID NO.</label>
                <form v-on:submit="verifyHealth" class="input-group a-input-verify-health-condition-group input-group-lg mb-3">
                  <input
                    ref="user-number"
                    type="number"
                    class="form-control a-main-font a-verify-input"
                    placeholder=""
                    min="0"
                    aria-describedby="user-number"
                    autofocus
                    required
                    v-model="userNumber"
                  >
                  <button
                    class="btn a-verify-health-condition-btn text-light"
                    type="submit"
                    id="user-number"
                  >
                    <span class="material-symbols-outlined">
                    arrow_circle_right
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div class="a-qrcode-reader mt-2">
            <p class="mt-0 mb-2 a-main-font">QR Code Scanner</p>
            <button type="button" class="btn a-btn-qrcode-reader text-light" @click="toggleQrcodeStream">
              <span class="material-symbols-outlined a-va-m" style="font-size: 24px;">
              qr_code_scanner
              </span>
            </button>
          </div>
          <div class="mt-3">
            <p class="my-0 a-main-font">Health Condition</p>
            <p
              class="my-0 a-main-font h3 text-uppercase"
              :style="{ color: isGoodCondition(userInfo[0]?.covid19_main_status[0].classification) ? '#EC7063' : '#58D68D' }">
              {{ userInfo[0]?.covid19_main_status[0].classification || 'HAVE A GREAT DAY AHEAD' }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 mt-2">
        <div class="table-responsive shadow-sm">
          <table class="table table-bordered table-striped table-sm my-0">
            <thead>
              <tr class="text-center a-main-font">
                <th>ID NO.</th>
                <th>NAME</th>
                <th>GENDER</th>
                <th>CONTACT</th>
                <th>ADDRESS</th>
                <!-- <th>EMAIL</th> -->
                <th>ROLE</th>
                <th>HEALTH CONDITION</th>
                <th>SEVERITY</th>
                <th>VACCINATION STATUS</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="userInfo.length > 0">
                <tr v-for="(user, index) in userInfo" :key="index">
                  <td class="a-main-font text-uppercase text-center">{{ user?.user_number }}</td>
                  <td class="a-main-font text-uppercase text-center">{{ user | fullname }}</td>
                  <td class="a-main-font text-uppercase text-center">{{ user?.sex }}</td>
                  <td class="a-main-font text-uppercase text-center">{{ user?.contact_number }}</td>
                  <td class="a-main-font text-uppercase text-center">{{ user?.address }}</td>
                  <!-- <td class="a-main-font text-uppercase text-center">{{ user?.email }}</td> -->
                  <td class="a-main-font text-uppercase text-center">{{ user?.usertype }}</td>
                  <td class="a-main-font text-uppercase text-center">{{ user?.covid19_main_status | formatCovidClassification }}</td>
                  <td class="a-main-font text-uppercase text-center">{{ user?.covid19_main_status | formatCovidSeverity}}</td>
                  <td class="a-main-font text-uppercase text-center">{{ user?.vaccination_record | isVaccinated}}</td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td class="text-center a-main-font" colspan="9">
                    HEALTH CONDITION INFO
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-if="streamQrcode" class="a-qrcode-scanner">
      <div style="position: relative; width: 100%;">
        <button class="btn a-close-qrcode-scanner a-va-m p-0" @click="streamQrcode = !streamQrcode">
          <span class="material-symbols-outlined" style="font-size: 14px;">
          close
          </span>
        </button>
      </div>
      <qrcode-stream v-if="streamQrcode" @decode="onDecode" @init="onInit" />
    </div>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
export default {
  filters: {
    fullname: (user) => {
      return `${user?.last_name}, ${user?.first_name} ${user?.middle_name}`
    },
    formatCovidClassification: (status) => {
      if (status.length > 0) {
        return status[0]?.classification || '--'
      }
      return ''
    },
    formatCovidSeverity: (status) => {
      if (status.length > 0) {
        return status[0]?.severity || '--'
      }
      return ''
    },
    isVaccinated: (record) => {
      return record.length > 0 ? 'vaccinated' : 'unvaccinated'
    }
  },
  components: {
    'qrcode-stream': QrcodeStream
  },
  data () {
    return {
      streamQrcode: false,
      userNumber: null,
      userInfo: []
    }
  },
  methods: {
    toggleQrcodeStream () {
      const vm = this
      vm.streamQrcode = !vm.streamQrcode
      vm.$refs['user-number'].focus()
    },
    verifyHealth (e) {
      e.preventDefault()
      this.verifyHealthCondition(this.userNumber)
    },
    onDecode (usernumber) {
      this.userNumber = usernumber
      this.verifyHealthCondition(usernumber)
    },
    async verifyHealthCondition (usernumber) {
      const vm = this
      const { data } = await vm.$api.get(`/api/verify-user-health-condition/?user_number=${usernumber}`, vm.$utils.header())
      // console.log('Data: ', data)
      vm.userInfo = data
      if (data.length === 0) {
        const popup = {
          status: true,
          header: 'Info',
          message: 'No ID number matched!'
        }
        vm.$store.commit('alert/setAlertStatus', popup)
      }
    },
    isGoodCondition (condition) {
      if (['suspect covid-19 case', 'probable covid-19 case', 'confirmed covid-19 case'].includes(condition)) {
        return true
      }
      return false
    },
    async onInit (promise) {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = "ERROR: you need to grant camera access permission"
        } else if (error.name === 'NotFoundError') {
          this.error = "ERROR: no camera on this device"
        } else if (error.name === 'NotSupportedError') {
          this.error = "ERROR: secure context required (HTTPS, localhost)"
        } else if (error.name === 'NotReadableError') {
          this.error = "ERROR: is the camera already in use?"
        } else if (error.name === 'OverconstrainedError') {
          this.error = "ERROR: installed cameras are not suitable"
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = "ERROR: Stream API is not supported in this browser"
        } else if (error.name === 'InsecureContextError') {
          this.error = 'ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.';
        } else {
          this.error = `ERROR: Camera error (${error.name})`;
        }
      }
    }
  }
}
</script>
