<template>
  <div class="a-wrapper">
    <div class="a-container">
      <div class="container-fluid">
        <div class="row px-3 mt-4">
          <div class="col-12 px-2">
            <p class="a-main-font h3">
              <span class="material-symbols-outlined a-va-m mb-1">
              grid_view
              </span>
              DASHBOARD
            </p>
            <hr class="a-hr mt-0 mb-3" />
          </div>
          <div class="col-lg-4 col-md-6 col-sm-12 px-2 pb-3">
            <div class="a-dashboard-card a-covid" @click="$router.push({ path: '/covid19-cases' })">
              <div class="a-members-number">
                <div class="pl-3">
                  <p class="my-0 h5 a-dashboard-text-color a-main-font">Covid-19 Cases</p> <!-- a-color -->
                  <p class="my-0 h4 a-main-font">{{ dashboard?.covid19_case }}</p>
                </div>
              </div>
              <div class="a-icon" style="background: #fdedec; color: #f1948a;">
                <span class="material-symbols-outlined a-icon-size">
                coronavirus
                </span>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-sm-12 px-2 pb-3">
            <div class="a-dashboard-card a-covid-recovered" @click="$router.push({ path: '/recovered-covid19-cases' })">
              <div class="a-members-number">
                <div class="pl-3">
                  <p class="my-0 h5 a-dashboard-text-color a-main-font">Recovered Covid-19 Cases</p> <!-- a-color -->
                  <p class="my-0 h4 a-main-font">{{ dashboard?.recovered_covid19_case }}</p>
                </div>
              </div>
              <div class="a-icon" style="background: #e8f8f5; color: #76d7c4;">
                <span class="material-symbols-outlined a-icon-size">
                favorite
                </span>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-sm-12 px-2 pb-3">
            <div class="a-dashboard-card a-student" @click="$router.push({ path: '/students' })">
              <div class="a-members-number">
                <div class="pl-3">
                  <p class="my-0 h5 a-dashboard-text-color a-main-font">Campus Students</p> <!-- a-color -->
                  <p class="my-0 h4 a-main-font">{{ dashboard?.student }}</p>
                </div>
              </div>
              <div class="a-icon" style="background: #ebf5fb; color: #aed6f1;">
                <span class="material-symbols-outlined a-icon-size">
                person
                </span>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-sm-12 px-2 pb-3">
            <div class="a-dashboard-card a-teacher" @click="$router.push({ path: '/teachers' })">
              <div class="a-members-number">
                <div class="pl-3">
                  <p class="my-0 h5 a-dashboard-text-color a-main-font">Campus Teachers</p> <!-- a-color -->
                  <p class="my-0 h4 a-main-font">{{ dashboard?.teacher }}</p>
                </div>
              </div>
              <div class="a-icon" style="background: #f4ecf7; color: #d2b4de;">
                <span class="material-symbols-outlined a-icon-size">
                person_2
                </span>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-sm-12 px-2 pb-3">
            <div class="a-dashboard-card a-staff" @click="$router.push({ path: '/staff' })">
              <div class="a-members-number">
                <div class="pl-3">
                  <p class="my-0 h5 a-dashboard-text-color a-main-font">Campus Staff</p> <!-- a-color -->
                  <p class="my-0 h4 a-main-font">{{ dashboard?.staff }}</p>
                </div>
              </div>
              <div class="a-icon" style="background: #fef5e7; color: #f0b27a;">
                <span class="material-symbols-outlined a-icon-size">
                person
                </span>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 col-sm-12 px-2 pb-3">
            <div class="a-dashboard-card a-others" @click="$router.push({ path: '/health-care-staff' })">
              <div class="a-members-number">
                <div class="pl-3">
                  <p class="my-0 h5 a-dashboard-text-color a-main-font">Health Care Service Staff</p> <!-- a-color -->
                  <p class="my-0 h4 a-main-font">{{ dashboard?.health_care_staff }}</p>
                </div>
              </div>
              <div class="a-icon" style="background: #FEFAEC; color: #f7dc6f;">
                <span class="material-symbols-outlined a-icon-size">
                person
                </span>
              </div>
            </div>
          </div>
          <template v-if="usertype === 'admin'">
            <div class="col-lg-4 col-md-6 col-sm-12 px-2 pb-3">
              <div class="a-dashboard-card a-admin" @click="$router.push({ path: '/administrators' })">
                <div class="a-members-number">
                  <div class="pl-3">
                    <p class="my-0 h5 a-dashboard-text-color a-main-font">Administrators</p> <!-- a-color -->
                    <p class="my-0 h4 a-main-font">{{ dashboard?.admin }}</p>
                  </div>
                </div>
                <div class="a-icon" style="background: #BEC6CF; color: #34495E;">
                  <span class="material-symbols-outlined a-icon-size">
                  admin_panel_settings
                  </span>
                </div>
              </div>
            </div>
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
      dashboard: {},
      usertype: null
    }
  },
  watch: {
    '$store.state.oauth2.user_oauth2': {
      immediate: true,
      handler: function (obj) {
        this.getDashboard()
      },
      deep: true
    },
    '$store.state.oauth2.usertype' (txt) {
      this.usertype = txt
    }
  },
  mounted () {
    this.getDashboard()
  },
  methods: {
    async getDashboard() {
      try {
        const vm = this
        const { data } = await vm.$api.get('/api/get-dashboard', vm.$utils.header())
        vm.dashboard = data
        vm.usertype = vm.$store.state.oauth2.usertype
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
