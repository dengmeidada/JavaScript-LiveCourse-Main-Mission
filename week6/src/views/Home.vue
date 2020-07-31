<template>
  <div class="home">
      <b-navbar toggleable="lg" type="light" variant="light" sticky>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-navbar-brand><router-link to="/">mei</router-link></b-navbar-brand>
          <div class="cartItem">
            <!-- 購物車icon 始-->
            <div class="cart pr-1"  @click="openNavbarChartModal">
              <div class="cart-icon">
                  <span class="totalItems">{{this.$store.state.cartDetail.length}}</span>
                  <font-awesome-icon :icon="['fa','shopping-cart']" />
              </div>
            </div>
            <!-- 購物車icon 末-->
            <CartModal ref="cartModal" :uuid="uuid" :api-path="apiPath" :isCart.sync="isCart" v-on:carts="updatedHomeCarts"></CartModal>
          </div>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item ><router-link to="/">前台頁面</router-link></b-nav-item>
            <b-nav-item ><router-link to="/products">產品列表</router-link></b-nav-item>
            <b-nav-item ><router-link to="/cart">購物車</router-link></b-nav-item>
            <b-nav-item ><router-link to="/about">關於我們</router-link></b-nav-item>
            <b-nav-item ><router-link to="/checkout">結帳</router-link></b-nav-item>
            <b-nav-item ><router-link to="/admin">後台管理頁面</router-link></b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <router-view :uuid="uuid" :api-path="apiPath" v-on:homeCart="updatedHomeCarts"></router-view>
  </div>
</template>

<script>
// import Navbar from '@/components/Navbar.vue'
import CartModal from '../components/CartModal'
// import { }
export default {
  name: 'Home',
  components: {
    // Navbar
    CartModal
  },
  data () {
    return {
      uuid: '7f7cf697-969f-4e45-83f9-01ea57ba8ea3',
      apiPath: 'https://course-ec-api.hexschool.io',
      homeCart: {}, // 購物車資料
      isCart: false // 購物車視窗開關
    }
  },
  created () {
    // console.log('121212' + this.$store.state.cartDetail)
  },
  methods: {
    updatedHomeCarts (data) {
      console.log(data)
      this.homeCart = data
      // this.$store.commit('reCartDetail', data)
    },
    openNavbarChartModal () {
      if (!this.isCart) {
        this.isCart = true
        // 開啟購物車
        // console.log('1111:' + this.isCart)
        // this.$refs.cartModal.openCartModal()
      }
    },
    // 重新渲染購物車
    reGetCart () {
      this.$refs.cartModal.getCart()
    }
  }
}
</script>
