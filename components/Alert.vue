<template>
  <div class="a-alert-container py-1 px-lg-3 px-md-3 px-sm-3 px-3" :class="[isActivated ? 'a-animate-display' : 'a-hide-popup', { 'a-display-none': isHidden }]">
    <div class="a-alert a-main-font mt-2">
      <div class="a-alert-header p-3 pac-fs-sm">
        <p class="h4 my-0 py-0 abc-font text-light">
          {{ $store.state.alert.header }}
        </p>
        <button class="btn btn-link text-light btn-sm py-0 px-1" @click="closePopup" style="z-index: 10000; box-shadow: none !important;">
          <span class="material-symbols-outlined">
          close
          </span>
        </button>
      </div>
      <div class="a-alert-body p-3 pac-fs-xs abc-font">
        <p class="my-0 py-0">
          {{ $store.state.alert.message }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isActivated: false,
      isHidden: true,
      popUp: null
    }
  },
  watch: {
    '$store.state.alert.activate' (status) {
      this.isActivated = status
      this.isHidden = !status
      this.hidePopupAfter(8000)
    }
  },
  mounted () {
    this.isActivated = this.$store.state.alert.activate
  },
  methods: {
    hidePopupAfter (seconds) {
      clearTimeout(this.popUp)
      this.popUp = setTimeout(() => {
        this.closePopup()
      }, seconds)
    },
    closePopup () {
      this.isActivated = false
      setTimeout(() => {
        const popup = { status: false, header: null, message: null }
        this.$store.commit('alert/setAlertStatus', popup)
      }, 1000)
    }
  }
}
</script>

