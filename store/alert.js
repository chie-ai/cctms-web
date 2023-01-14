export const state = () => ({
  activate: false,
  header: null,
  message: null
})

export const mutations = {
  setAlertStatus (state, obj) {
    state.activate = obj.status
    state.header = obj.header
    state.message = obj.message
  } 
}