<template>
  <div class="a-wrapper">
    <div class="a-container">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <p class="mt-5 mb-4 h3 a-main-font a-font-b">QR CODE</p>
            <div class="a-qrcode-section">
              <qr-code :text="user_number"></qr-code>
            </div>
            <div class="mt-4 a-usernumber-section">
              <div class="py-2 a-usernumber-qrcode" style="border-radius: 22px; width: 200px; background: #F2F3F4">
                <p class="a-main-font my-0" style="font-size: 13px;">ID Number</p>
                <p class="a-main-font h4 my-0">{{ user_number }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user_number: null
    }
  },
  watch: {
    '$store.state.oauth2.usernumber' (user_number) {
      this.user_number = user_number
    }
  },
  created () {
    const vm = this
    const user_number = vm.$store.state.oauth2.usernumber
    this.user_number = user_number !== null ? user_number : vm.$route.query.user_number
  }
}
</script>
