<template>
  <div id="nav" class="navbar">
    <router-link to="/">前台頁面</router-link> |
    <router-link to="/admin">後台首頁</router-link> |
    <router-link to="/productManagement">產品列表管理</router-link> |
    <router-link to="/coupon">產品列表管理</router-link> |
    <router-link to="/order">訂單列表管理</router-link> |
    <router-link to="/images">圖片儲存列表管理</router-link>
  </div>
</template>
<script>
export default {
  name: 'BackNavbar'
}
</script>
