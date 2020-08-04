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

          </div>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item ><router-link to="/">前台頁面</router-link></b-nav-item>
            <b-nav-item ><router-link to="/products">產品列表</router-link></b-nav-item>
            <b-nav-item ><router-link to="/cart">購物車</router-link></b-nav-item>
            <b-nav-item ><router-link to="/about">關於我們</router-link></b-nav-item>
            <b-nav-item ><router-link to="/checkout">結帳</router-link></b-nav-item>
            <b-nav-item ><router-link to="/admin/productManagement">後台產品列表管理</router-link></b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <router-view></router-view>
      <!-- 購物車 Modal -->
      <CartModal ref="cartModal" :isCart.sync="isCart" ></CartModal>
  </div>
</template>

<script>

import CartModal from '../components/CartModal'
// import { }
export default {
  name: 'Home',
  components: {
    CartModal
  },
  data () {
    return {
      isCart: false // 購物車視窗開關
    }
  },
  methods: {
    openNavbarChartModal () {
      if (!this.isCart) {
        this.isCart = true
      }
    },
    // 重新渲染購物車
    reGetCart (success) {
      this.$refs.cartModal.getCart(success)
    }
  }
}
</script>
