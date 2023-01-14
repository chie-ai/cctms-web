<template>
  <div class="a-vaccination-container">
    <div class="a-base-form a-display-flex px-3">
      <div class="a-vaccination-form bg-light my-lg-5 my-md-5 my-sm-2 my-3">
        <div class="a-userprofile-header a-display-flex py-2 px-3">
          <div class="a-display-flex" style="width: 180%;">
            <p class="h5 mt-1 mb-0 text-capitalize">
              <span class="material-symbols-outlined a-icon-size mb-1 a-va-m" style="font-size: 22px;">
              overview
              </span>
              VACCINATION RECORD MANAGEMENT & HISTORY
            </p>
          </div>
          <div class="text-right" style="width: 20%;">
            <button
              class="btn btn-sm btn-link a-shadow-none"
              @click="$store.commit('vaccinationrecordmanagement/toggleVaccinationDialog', { status: false, user_id: null })"
            >
              <span class="material-symbols-outlined a-icon-size a-va-m">
              close
              </span>
            </button>
          </div>
        </div>
        <hr class="a-hr my-0">
        <div class="a-vaccination-body p-2">
          <div v-if="saved" class="a-success px-3 py-2 mb-2">
            <p class="my-0" style="display: inline-block;">
              Vaccination period has been recorded.
            </p>
            <span @click="saved = false" class="material-symbols-outlined a-icon-size a-va-m float-right a-pointer">
            close
            </span>
          </div>
          <div class="a-body-decorator px-2 pt-2 pb-1 mb-0">
            <p class="a-main-font mt-0 mb-1 a-font-b">
              <span class="material-symbols-outlined a-icon-size mb-1 a-va-m" style="font-size: 18px;">
              docs_add_on
              </span>
              ADD VACCINATION PERIOD
            </p>
          </div>
          <hr class="a-hr my-0">
          <div class="a-body-decorator px-3 py-2 mb-2">
            <form v-on:submit="submitForm">
              <div class="row">
                <div class="col-6 px-2">
                  <label for="vaccine" class="a-main-font form-label ml-2 mb-1">
                    VACCINE BRAND
                  </label>
                  <input
                    type="text"
                    id="vaccine"
                    class="form-control form-control a-form-input a-main-font"
                    placeholder="VACCINE TYPE"
                    v-model="form.vaccine_brand"
                    required
                    autofocus
                  >
                </div>
                <div class="col-6 px-2">
                  <label for="vaccine_date" class="a-main-font form-label ml-2 mb-1">
                    DATE OF VACCINATION
                  </label>
                  <input
                    type="date"
                    id="vaccine_date"
                    class="form-control form-control a-form-input a-main-font"
                    placeholder="DATE OF VACCINATION"
                    v-model="form.vaccinated_at"
                    required
                  >
                </div>
                <div class="col-12 px-2 mt-2">
                  <label for="vaccine_decscription" class="a-main-font form-label ml-2 mb-1">
                    VACCINATION DESCRIPTION
                  </label>
                  <textarea
                    id="vaccine_decscription" 
                    class="form-control a-form-input a-main-font"
                    rows="2"
                    v-model="form.vaccine_description"
                    required
                    ></textarea>
                </div>
              </div>
              <div class="row mt-2 justify-content-end">
                <div class="col-12 px-2">
                  <button type="submit" :disabled="saving" class="btn a-btn-submit text-light px-3 float-right">
                    <template v-if="saving">
                      Saving...
                    </template>
                    <template v-else>
                      Save
                      <span class="material-symbols-outlined a-icon-size mb-1 a-va-m" style="font-size: 20px;">
                      save
                      </span>
                    </template>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="a-body-decorator px-2 pt-2 pb-1 mb-0">
            <p class="a-main-font mt-0 mb-1 a-font-b">
              <span class="material-symbols-outlined a-icon-size mb-1 a-va-m" style="font-size: 18px;">
              history
              </span>
              VACCINATION HISTORY
            </p>
          </div>
          <hr class="a-hr my-0">
          <div class="a-body-decorator px-2 py-2">
            <div class="table-responsive shadow-sm a-fixed-height">
              <table class="table table-sm table-bordered table-striped my-0 bg-light" style="border-top: none !important;">
                <thead style="position: sticky !important; top: 0 !important; border-top: none !important;">
                  <tr class="bg-light shadow-sm" style="border-top: none !important;">
                    <th class="a-main-font text-capitalize text-center px-2 a-va-m" style="border-top: none !important;" scope="col">VACCINE BRAND</th>
                    <th class="a-main-font text-capitalize text-center px-2 a-va-m" style="border-top: none !important;" scope="col">VACCINATION DESCRIPTION</th>
                    <th class="a-main-font text-capitalize text-center px-2 a-va-m" style="border-top: none !important;" scope="col">VACCINATED DATE</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="vaccineRecords.length > 0">
                    <tr v-for="(record, index) in vaccineRecords" :key="index">
                      <td class="a-main-font text-uppercase text-center px-2 a-va-m" width="40px">{{ record.vaccine_brand || '--' }}</td>
                      <td class="a-main-font text-uppercase text-center px-2 a-va-m" width="30px">{{ record.vaccine_description || '--' }}</td>
                      <td class="a-main-font text-uppercase text-center px-2 a-va-m" width="30px">{{ record.vaccinated_at | formatDate }}</td>
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
    }
  },
  data () {
    return {
      form: {
        vaccine_brand: null,
        vaccine_description: null,
        vaccinated_at: null,
      },
      saving: false,
      vaccineRecords: [],
      saved: false
    }
  },
  mounted () {
    this.getVaccinationHistory()
  },
  methods: {
    async getVaccinationHistory () {
      const vm = this
      const { data } = await vm.$api.get(`/api/get-vaccination-history/?user_id=${vm.$store.state.vaccinationrecordmanagement.user_id}`, vm.$utils.header())
      console.log('Data: ', data)
      vm.vaccineRecords = data
    },
    submitForm (e) {
      e.preventDefault()
      const vm = this
      
      vm.saving = true
      vm.form.user_id = vm.$store.state.vaccinationrecordmanagement.user_id
      // console.log('Form: ', vm.form)
      vm.$api.post('/api/record-vaccination', vm.form, vm.$utils.header())
        .then(res => {
          console.log('Result: ', res)
          vm.saved = true
          vm.saving = false
          vm.resetForm()
          vm.getVaccinationHistory()
        })
        .catch(err => {
          console.log(err)
          vm.saving = false
        })
    },
    resetForm () {
      const keys = Object.keys(this.form)
      for (let i in keys) {
        this.form[keys[i]] = null
      }
    }
  }
}
</script>
