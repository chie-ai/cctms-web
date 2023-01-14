<template>
  <div class="a-width-100">
    <Header />
    <Alert />
    <Account />
    <UserProfile v-if="userProfile" />
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'AccountPage',
  data () {
    return {
      header: null,
      userProfile: false
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
    '$store.state.userprofile.active' (status) {
      this.userProfile = status
    }
  }
}
</script>
