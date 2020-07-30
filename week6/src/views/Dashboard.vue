<template>
<div class="dashboard">
    <BackNavbar></BackNavbar>
    <router-view></router-view>
</div>
</template>
<script>
import BackNavbar from '../components/dashboard/BackNavbar'
export default {
  name: 'Dashboard',
  components: {
    BackNavbar
  }
}
</script>
