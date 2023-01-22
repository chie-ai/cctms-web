<template>
  <div class="container">
    <div class="row pt-4">
      <div class="col-12 text-center mt-2">
        <p class="a-main-font h1">Campus Covid-19 Tracking Management System</p>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-lg-5 col-md-8 col-sm-10 col-12 mt-4">
        <div class="a-form py-4 px-3">
          <form v-on:submit="authenticate">
            <fieldset>
              <legend class="a-main-font h2 my-0">Authentication</legend>
              <hr class="a-hr mt-5 mb-2" />
              <div class="a-error px-3 py-2 mb-2" :class="{'a-display-error': error}">
                <p class="my-0" style="display: inline-block;">Please enter your correct credentials!</p>
                <span @click="error = false" class="material-symbols-outlined a-icon-size a-va-m float-right a-pointer">
                close
                </span>
              </div>
              <div class="mb-3">
                <label for="username" class="form-label ml-2">Username</label>
                <input
                  type="text"
                  id="username"
                  class="form-control form-control-lg a-form-input a-main-font"
                  v-model="user"
                  placeholder="Username"
                  autofocus
                >
              </div>
              <div class="mb-3">
                <label for="password" class="form-label ml-2">Password</label>
                <input
                  type="password"
                  id="password"
                  class="form-control form-control-lg a-form-input a-main-font"
                  placeholder="Password"
                  v-model="pass"
                >
              </div>
              <button type="submit" class="btn btn-lg btn-block text-light a-btn-submit">Sign In</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: null,
      pass: null,
      error: false
    }
  },
  methods: {
    async authenticate (e) {
      const vm = this
      e.preventDefault()
      try {
        const oauth2 = vm.$utils.oauth2Credentials()
        const userCredentials = { 'grant_type': 'password', 'username': vm.user, 'password': vm.pass }
        const payload = new URLSearchParams(userCredentials)
        const { data } = await vm.$api.post('/o/token/', payload, oauth2)
        vm.$store.commit('oauth2/setOauth2Cookies', data)
        vm.$store.commit('oauth2/setOauth2', data)
        vm.$store.dispatch('oauth2/getUserBasicInfo')
        vm.$router.push({ path: '/dashboard' })
      } catch (err) {
        console.log(err)
        vm.pass = null
        vm.error = true
      }
    }
  }
}
</script>
