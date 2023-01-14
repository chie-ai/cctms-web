<template>
  <div>
    <Authentication />
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'AuthenticationPage',
  middleware({ app, store, redirect }) {
    if (!store.state.oauth2.user_oauth2.refresh_token) {
      if (app.$cookies.get('access_keys')) {
        console.log('ACCESS KEYS: ', app.$cookies.get('access_keys'))
        const datetime_log = app.$cookies.get('access_keys_log_datetime')
        const datetime_now = moment().unix()
        const diff = (datetime_now - datetime_log)

        if (diff > 35800) {
          store.dispatch('oauth2/getNewAccessToken')
        } else {
          store.commit('oauth2/setOauth2', app.$cookies.get('access_keys'))
          store.dispatch('oauth2/getUserBasicInfo')
        }
        return redirect('/')
      }
    }
  }
}
</script>
