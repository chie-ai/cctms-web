<template>
  <div class="a-width-100">
    <Header />
    <Alert />
    <UserRecords userType="student" />
    <UserForm v-if="addForm" userType="student" />
    <UserProfile v-if="userProfile" />
    <Covid19RecordManagement v-if="covid19RecordManagement" userType="student"/>
    <VaccinationRecordManagement v-if="vaccinationRecordManagement" />
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'StudentPage',
  data () {
    return {
      addForm: false,
      header: null,
      userProfile: false,
      covid19RecordManagement: false,
      vaccinationRecordManagement: false
    }
  },
  middleware({ app, store, redirect }) {
    if (!store.state.oauth2.user_oauth2.refresh_token) {
      if (app.$cookies.get('access_keys')) {
        const datetime_log = app.$cookies.get('access_keys_log_datetime')
        const datetime_now = moment().unix()
        const diff = (datetime_now - datetime_log)

        if (diff > 35800) {
          store.dispatch('oauth2/getNewAccessToken')
        } else {
          const access_keys = app.$cookies.get('access_keys')
          store.commit('oauth2/setOauth2Cookies', access_keys)
          store.commit('oauth2/setOauth2', access_keys)
          store.dispatch('oauth2/getUserBasicInfo')
        }
      } else {
        return redirect('/')
      }
    }
  },
  watch: {
    '$store.state.userform.active' (status) {
      this.addForm = status
      this.header = this.$store.state.userform.header
    },
    '$store.state.covid19recordmanagement.active' (status) {
      this.covid19RecordManagement = status
    },
    '$store.state.userprofile.active' (status) {
      this.userProfile = status
    },
    '$store.state.vaccinationrecordmanagement.active' (status) {
      this.vaccinationRecordManagement = status
    }
  }
}
</script>
 