export const state = () => ({
  active: false,
  user_id: null
})

export const mutations = {
  toggleVaccinationDialog (state, obj) {
    state.active = obj.status
    state.user_id = obj.user_id
  }
}
