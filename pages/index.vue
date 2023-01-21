<template>
  <div>
    <Authentication />
  </div>
</template>

<script>
export default {
  name: 'AuthenticationPage',
  middleware({ app, store, redirect }) {
    if (!store.state.oauth2.user_oauth2.refresh_token) {
      if (app.$cookies.get('access_keys')) {
        return redirect('/dashboard')
      }
    }
  }
}
</script>
