<template>
    <b-navbar toggleable="lg" type="light" variant="light" >
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-navbar-brand><router-link to="/">mei</router-link></b-navbar-brand>
      <div class="cartItem">
        <!-- 購物車icon 始-->
        <div class="cart pr-1"  @click="openModal('cart')">
          <div class="cart-icon">
              <!-- <span class="totalItems">{{carts.length}}</span> -->
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
        <b-nav-item ><router-link to="/admin">後台管理頁面</router-link></b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script>
export default {
  name: 'Navbar'
}
</script>
