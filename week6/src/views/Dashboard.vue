<template>
<div class="dashboard">
     <div id="nav" class="navbar">
        <router-link to="/">前台頁面</router-link> |
        <router-link to="/admin">後台首頁</router-link> |
        <router-link to="/admin/productManagement">產品列表管理</router-link> |
        <router-link to="/admin/coupon">優惠券管理</router-link> |
        <router-link to="/admin/order">訂單列表管理</router-link> |
        <router-link to="/admin/images">圖片儲存列表管理</router-link>
        <a href="#" @click.prevent="signout">登出</a>
    </div>
    <router-view :token="token" v-if="checkSuccess"></router-view>
</div>
</template>
<script>
export default {
  name: 'Dashboard',
  data () {
    return {
      token: '',
      checkSuccess: false
    }
  },
  created () {
    this.checkLogin()
  },
  methods: {
    // 檢查是否已登入
    checkLogin () {
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')

      // 預設值
      this.axios.defaults.headers.common.Authorization = `Bearer ${this.token}`

      const apiUrl = `${process.env.VUE_APP_APIPATH}api/auth/check`

      this.axios.post(apiUrl, { api_token: this.token }).then((res) => {
        // 登入沒問題
        // console.log(res)
        if (res.data.success) {
          this.checkSuccess = true
        }
      }).catch((error) => {
        // 驗證失敗，回登入頁面
        console.error(error)
        this.$router.push('/login')
      })
    },
    signout () {
      document.cookie = 'hexToken=;expires=; '
      this.$router.push('/login')
    }
  }
}
</script>
