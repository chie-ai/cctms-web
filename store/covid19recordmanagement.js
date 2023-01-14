export const state = () => ({
  active: false,
  user_id: null
})

export const mutations = {
  toggleCovid19RecordManagementDialog (state, manage) {
    state.active = manage.status
    state.user_id = manage.user_id
  }
}