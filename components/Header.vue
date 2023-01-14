<template>
  <div class="a-header-wrapper a-display-flex">
    <div class="a-project-name a-display-flex a-align-center pl-lg-4 pl-md-4 pl-3 pb-3">
      <p class="my-0 h2 py-0 a-main-font-sm">CCTMS</p>
      <p class="my-0 h2 py-0 a-main-font-lg">Campus Covid-19 Tracking and Management System</p>
    </div>
    <div class="a-nav-link a-display-flex a-align-center a-va-m pr-lg-4 pr-md-4 pr-2">
      <!-- <span class="mr-3">{{ $store.state.oauth2.username }}</span> -->
      <div class="px-2 py-0 a-menu-open text-light" @click="() => { menuStatus = !menuStatus }">
        MENU
        <span class="material-symbols-outlined my-0">
        menu_open
        </span>
      </div>
    </div>
    <div v-if="menuStatus" class="a-menu-container" @click="() => { menuStatus = !menuStatus }" />
    <div class="a-menu bg-light" :class="{'a-menu-visible': menuStatus}">
      <div class="py-2 a-menu-header">
        <p class="px-3 my-0 a-main-font a-font-b a-va-m h5 a-menu-header-text">
          <span class="material-symbols-outlined my-0 a-va-m mr-1">
          reorder
          </span>
          MENU
        </p>
        <button class="btn a-btn-close-menu btn-sm p-0" @click="menuStatus = !menuStatus">
          <span class="material-symbols-outlined my-0 a-va-m">
          close
          </span>
        </button>
      </div>
      <div class="a-menu-list">
        <NuxtLink v-if="usertype === 'admin'" to="verify-health-condition" class="a-menu-link my-0 py-2 px-3 a-main-font" :class="{'a-active-menu': $route.path === '/verify-health-condition'}">
          VERIFY HEALTH CONDITION
        </NuxtLink>
        <NuxtLink to="dashboard" class="a-menu-link my-0 py-2 px-3 a-main-font" :class="{'a-active-menu': $route.path === '/dashboard'}">
          DASHBOARD
        </NuxtLink>
        <NuxtLink to="covid19-cases" class="a-menu-link my-0 py-2 px-3 a-main-font" :class="{'a-active-menu': $route.path === '/covid19-cases'}">
          COVID-19 CASES
        </NuxtLink>
        <NuxtLink to="recovered-covid19-cases" class="a-menu-link my-0 py-2 px-3 a-main-font" :class="{'a-active-menu': $route.path === '/recovered-covid19-cases'}">
          RECOVERED COVID-19 CASES
        </NuxtLink>
        <NuxtLink to="students" class="a-menu-link my-0 py-2 px-3 a-main-font" :class="{'a-active-menu': $route.path === '/students'}">
          CAMPUS STUDENTS
        </NuxtLink>
        <NuxtLink to="teachers" class="a-menu-link my-0 py-2 px-3 a-main-font" :class="{'a-active-menu': $route.path === '/teachers'}">
          CAMPUS TEACHERS
        </NuxtLink>
        <NuxtLink to="staff" class="a-menu-link my-0 py-2 px-3 a-main-font" :class="{'a-active-menu': $route.path === '/staff'}">
          CAMPUS STAFFS
        </NuxtLink>
        <NuxtLink v-if="['admin', 'health care staff'].includes(usertype)" to="health-care-staff" class="a-menu-link my-0 py-2 px-3 a-main-font" :class="{'a-active-menu': $route.path === '/health-care-staff'}">
          HEALTH CARE STAFFS
        </NuxtLink>
        <NuxtLink v-if="usertype === 'admin'" to="administrators" class="a-menu-link my-0 py-2 px-3 a-main-font" :class="{'a-active-menu': $route.path === '/administrators'}">
          ADMINISTRATORS
        </NuxtLink>
        <NuxtLink to="account" class="a-menu-link my-0 py-2 px-3 a-main-font" :class="{'a-active-menu': $route.path === '/account'}">
          ACCOUNT
        </NuxtLink>
        <template v-if="usertype !== 'health care staff'">
          <NuxtLink :to="{ path: 'user-qrcode', query: { user_number: user_number } }" class="a-menu-link my-0 py-2 px-3 a-main-font" :class="{'a-active-menu': $route.path === '/user-qrcode'}">
            QRCODE
          </NuxtLink>
        </template>
        <p class="my-0 py-2 a-logout text-center text-light" @click="logout">
          <span class="material-symbols-outlined a-icon-size mb-1 a-va-m" style="font-size: 20px">
          logout
          </span>
          LOGOUT
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menuStatus: false,
      usertype: null,
      user_number: null
    }
  },
  watch: {
    '$store.state.oauth2.usertype' (txt) {
      this.usertype = txt
    },
    '$store.state.oauth2.usernumber' (num) {
      this.user_number = num
    }
  },
  mounted () {
    this.usertype = this.$store.state.oauth2.usertype
    this.user_number = this.$store.state.oauth2.usernumber
  },
  methods: {
    async logout () {
      const vm = this
      const keys = vm.$utils.oauth2HeaderKeys()
      await vm.$api.post('/o/revoke_token/', keys)
      const access_keys = { access_token: null, token_type: null, expires_in: null, refresh_token: null, scope: null }
      vm.$store.commit('oauth2/setOauth2', access_keys)
      vm.$cookies.removeAll()
      vm.$router.push({ path: '/' })
    }
  }
}
</script>
