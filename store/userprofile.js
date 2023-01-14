export const state = () => ({
  active: false,
  header: null,
  user_id: null,
  profile: null
})

export const mutations = {
  toggleUserProfileDialog (state, obj) {
    state.active = obj.status
    state.header = obj.header
    state.user_id = obj.user_id
    state.profile = obj.profile
  }
}