import moment from 'moment'

export const state = () => ({
  user_oauth2: {
    access_token: null,
    token_type: null,
    expires_in: null,
    refresh_token: null,
    scope: null
  },
  username: null,
  usertype: null,
  usernumber: null
})

export const mutations = {
  setOauth2 (state, access_keys) {
    const oauth2 = Object.keys(state.user_oauth2)
    for (let i in oauth2) { 
      state.user_oauth2[oauth2[i]] = access_keys[oauth2[i]]
    }
  },
  setOauth2Cookies ({}, access_keys) {
    $nuxt.$cookies.set('access_keys', access_keys, { maxAge: 36000 })
    $nuxt.$cookies.set('access_keys_log_datetime', moment().unix())
  },
  setUserInfo (state, obj) {
    state.username = obj.username
    state.usertype = obj.usertype
    state.usernumber = obj.user_number
  }
}

export const actions = {
  async getNewAccessToken ({ commit }) {
    const { refresh_token } = $nuxt.$cookies.get('access_keys')
    const client_id = $nuxt.$config.OAUTH_TOOLKIT_CLIENT_ID
    const client_secret = $nuxt.$config.OAUTH_TOOLKIT_CLIENT_SECRET
    const credentials = `grant_type=refresh_token&refresh_token=${refresh_token}&client_id=${client_id}&client_secret=${client_secret}`
    const header = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    const { data } = await $nuxt.$api.post('/o/token/', credentials, header)
    commit('setOauth2Cookies', data)
    commit('setOauth2', data)
  },
  async getUserBasicInfo ({ commit }) {
    const { data } = await $nuxt.$api.get('/api/get-current-user-information', $nuxt.$utils.header())
    // console.log('Data: ', data)
    commit('setUserInfo', data)
  }
}
