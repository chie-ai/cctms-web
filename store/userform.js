export const state = () => ({
  active: false,
  header: null,
  user_id: null
})

export const mutations = {
  activateForm (state, form) {
    state.active = form.status
    state.header = form.header
    state.user_id = form.user_id
  }
}