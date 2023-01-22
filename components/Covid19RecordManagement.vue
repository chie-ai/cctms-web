<template>
  <div class="a-management-container">
    <div class="a-base-form a-display-flex px-3">
      <div class="a-health-management-form bg-light my-lg-5 my-md-5 my-sm-2 my-3">
        <div class="a-management-header a-display-flex py-2 px-3">
          <div class="a-display-flex" style="width: 160%;">
            <p class="h5 a-main-font mt-1 mb-0 font-weight-bold">
              <span class="material-symbols-outlined a-icon-size mb-2 a-va-m"> 
              medical_information
              </span>
              COVID-19 RECORD MANAGEMENT & HISTORY
            </p>
          </div>
          <div class="text-right" style="width: 40%;">
            <button
              class="btn btn-sm btn-link a-shadow-none"
              @click="$store.commit('covid19recordmanagement/toggleCovid19RecordManagementDialog', { status: false, user_id: null })"
            >
              <span class="material-symbols-outlined a-icon-size a-va-m">
              close
              </span>
            </button>
          </div>
        </div>
        <hr class="a-hr my-0">
        <div class="a-management-body p-2">
          <div class="a-body-decorator px-2 pt-2 pb-1 mb-0">
            <p class="a-main-font mt-0 mb-1 a-font-b text-uppercase">
              <span class="material-symbols-outlined a-icon-size mb-1 a-va-m" style="font-size: 18px;">
              badge
              </span>
              {{ userType }} BRIEF PROFILE
            </p>
          </div>
          <hr class="a-hr my-0">
          <div class="a-body-decorator px-3 py-2">
            <div class="row">
              <div class="col-lg-7 col-md-7 col-sm-12 col-12 px-2">
                <p class="my-0 text-uppercase a-main-font">
                  NAME: <span class="a-font-b">{{ userInfo | fullname }}</span>
                </p>
              </div>
              <div class="col-lg-5 col-md-5 col-sm-12 col-12 px-2">
                <p class="my-0 text-uppercase a-main-font">
                  GENDER: <span class="a-font-b"> {{ userInfo?.sex }}</span>
                </p>
              </div>
            </div>
          </div>
          <hr class="a-hr my-0">
          <div class="a-body-decorator px-3 py-2 mb-2">
            <div class="row">
              <div class="col-lg-12 col-md-4 col-sm-12 col-12 px-2">
                <p class="my-0 text-uppercase a-main-font">
                  CONDITION: <span class="a-font-b"> {{ userInfo?.covid19_main_status | formatCovid19Classification }}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="a-body-decorator px-2 pt-2 pb-1 mb-0">
            <p class="a-main-font mt-0 mb-1 a-font-b">
              <span class="material-symbols-outlined a-icon-size mb-1 a-va-m" style="font-size: 18px;">
              docs_add_on
              </span>
              ADD COVID-19 STATUS
            </p>
          </div>
          <hr class="a-hr my-0">
          <div class="a-body-decorator px-3 py-2 mb-2">
            <form v-on:submit="addCovid19Status">
              <div class="row">
                <div class="col-6 px-2">
                  <label for="sex" class="a-main-font form-label a-font-b ml-2 mt-0 mb-1">CLASSIFICATION</label>
                  <select
                    class="form-select form-control a-form-input a-main-font"
                    v-model="statusForm.classification"
                    @change="changeClassification"
                  >
                    <option :value="null">Select</option>
                    <option value="uninfected covid-19 case">Uninfected Covid-19 Case</option>
                    <option value="suspect covid-19 case">Suspect Covid-19 Case</option>
                    <option value="probable covid-19 case">Probable Covid-19 Case</option>
                    <option value="confirmed covid-19 case">Confirmed Covid-19 Case</option>
                    <option value="recovered covid-19 case">Recovered Covid-19 Case</option>
                  </select>
                </div>
                <div class="col-6 px-2">
                  <label for="sex" class="a-main-font form-label a-font-b ml-2 mt-0 mb-1">SEVERITY</label>
                  <select
                    :disabled="severitySelectionStatus"
                    class="form-select form-control a-form-input a-main-font"
                    v-model="statusForm.severity"
                    @change="changeClassification"
                  >
                    <option value="">Select</option>
                    <option value="mild disease">Mild Disease</option>
                    <option value="moderate disease">Moderate Disease</option>
                    <option value="severe disease">Severe Disease</option>
                  </select>
                </div>
              </div>
              <div class="row justify-content-end">
                <div class="col-6 px-2">
                  <button
                    type="submit"
                    :disabled="txnProcess || notSubmittable"
                    class="btn a-btn-submit btn-block text-light a-main-font mt-2 px-5"
                  >
                    <template v-if="txnProcess">
                      SAVING...
                    </template>
                    <template v-else>
                      SAVE
                    </template>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div v-if="saved" class="a-success px-3 py-2 mb-2">
            <p class="my-0" style="display: inline-block;">
              Covid-19 Status has been recorded.
            </p>
            <span @click="saved = false" class="material-symbols-outlined a-icon-size a-va-m float-right a-pointer">
            close
            </span>
          </div>
          <div class="a-body-decorator px-2 pt-2 pb-1 mb-0">
            <p class="a-main-font mt-0 mb-1 a-font-b">
              <span class="material-symbols-outlined a-icon-size mb-1 a-va-m" style="font-size: 18px;">
              history
              </span>
              COVID-19 HISTORY
            </p>
          </div>
          <hr class="a-hr my-0">
          <div class="a-body-decorator px-2 py-2">
            <div class="table-responsive shadow-sm a-fixed-height">
              <table class="table table-sm table-bordered table-striped my-0 bg-light" style="border-top: none !important;">
                <thead style="position: sticky !important; top: 0 !important; border-top: none !important;">
                  <tr class="bg-light shadow-sm" style="border-top: none !important;">
                    <th class="a-main-font text-capitalize text-center px-2 a-va-m" style="border-top: none !important;" scope="col">CLASSIFICATION</th>
                    <th class="a-main-font text-capitalize text-center px-2 a-va-m" style="border-top: none !important;" scope="col">SEVERITY</th>
                    <th class="a-main-font text-capitalize text-center px-2 a-va-m" style="border-top: none !important;" scope="col">DATE RECORDED</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="history.length > 0">
                    <tr v-for="(record, index) in history" :key="index">
                      <td class="a-main-font text-uppercase text-center px-2 a-va-m" width="40px">{{ record.classification || '--' }}</td>
                      <td class="a-main-font text-uppercase text-center px-2 a-va-m" width="30px">{{ record.severity || '--' }}</td>
                      <td class="a-main-font text-uppercase text-center px-2 a-va-m" width="30px">{{ record.created_at | formatDate }}</td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr>
                      <td class="text-center" colspan="3">NO COVID-19 CASE HISTORY</td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  filters: {
    formatDate: (date) => {
      return moment(date).format('MMM. DD, YYYY')
    },
    fullname: (user) => {
      const dot = user?.middle_name.length > 1 ? '' : '.'
      return `${user?.first_name} ${user?.middle_name}${dot} ${user?.last_name}`
    },
    formatCovid19Classification: (status) => {
      if (status && status.length > 0) {
        return status[0].classification || '--'
      }
      return ''
    }
  },
  props: {
    userType: String
  },
  data () {
    return {
      notSubmittable: true,
      txnProcess: false,
      saved: false,
      statusForm: {
        classification: null,
        severity: '',
      },
      userInfo: null,
      history: [],
      severitySelectionStatus: true,
    }
  },
  watch: {
    'statusForm.classification' (val) {
      const vm = this
      if (['uninfected covid-19 case', 'recovered covid-19 case', null].includes(val)) {
        vm.severitySelectionStatus = true
        vm.statusForm.severity = ''
      } else {
        vm.severitySelectionStatus = false
      }
    }
  },
  mounted () {
    this.getUserInfo()
    this.getCovid19History()
  },
  methods: {
    async getUserInfo () {
      const vm = this
      const { data } = await vm.$api.get(`/api/get-user-info/${vm.$store.state.covid19recordmanagement.user_id}/`, this.$utils.header())
      // console.log('User data: ', data)
      vm.userInfo = data
    },
    async getCovid19History () {
      const vm = this
      const { data } = await vm.$api.get(`/api/get-covid19-history/?user_id=${vm.$store.state.covid19recordmanagement.user_id}`, vm.$utils.header())
      // console.log('Covid-19 history data: ', data)
      vm.history = data
    },
    changeClassification () {
      this.notSubmittable = (this.classification !== null) ? false : true
    },
    addCovid19Status (e) {
      e.preventDefault()
      const vm = this
      vm.txnProcess = true
      vm.saved = false
      vm.statusForm.user_id = this.$store.state.covid19recordmanagement.user_id
      const payload = vm.statusForm
      vm.$api.post('/api/add-covid19-status', payload, vm.$utils.header())
        .then(res => {
          vm.saved = true
          vm.txnProcess = false
          vm.statusForm = {
            classification: null,
            severity: ''
          }
          vm.getUserInfo()
          vm.getCovid19History()
        })
        .catch(err => {
          console.log(err)
          vm.txnProcess = false
        })

    }
  }
}
</script>
