<template>
    <div class="login">
        <div class="container">
            <form class="form-signin" @submit.prevent="signin" @keycode.13="signin">
                <h1 class="h3 mb-3 font-weight-normal">
                    請先登入
                </h1>
                <div class="form-group">
                  <label for="inputEmail" class="sr-only">Email address</label>
                  <input id="inputEmail" v-model="user.email" type="email" class="form-control" placeholder="請輸入email" required autofocus>
                </div>
                <div class="form-group">
                  <label for="inputPassword" class="sr-only">密碼</label>
                  <input id="inputPassword" v-model="user.password" type="password" class="form-control" placeholder="請輸入密碼" required>
                </div>
                <button class="btn btn-lg btn-primary btn-block" type="submit">
                  登入
                </button>
            </form>
        </div>
    </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      token: ''
    }
  },
  methods: {
    signin () {
      const api = `${process.env.VUE_APP_APIPATH}api/auth/login`
      this.axios.post(api, this.user).then((response) => {
        const { token } = response.data
        const { expired } = response.data
        // 寫入 cookie token
        // expires 設置有效時間
        document.cookie = `hexToken=${token};expires=${new Date(expired * 1000)};`
        this.$router.push('/admin/productManagement')
      }).catch((error) => {
        console.log(error)
      })
    },

    signout () {
      document.cookie = 'hexToken=;expires=; '
    //   console.log('token 已清除')
    }
  }

}
</script>
<style lang="scss">
    .login .container{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh
    }
    @media (min-width: 576px){
        .container {
            max-width: 540px;
        }
    }
</style>
