<template>
  <el-container>
    <el-aside width="256px" class="aside">
      <router-link to="/" class="logo">

      </router-link>
      <app-menu />
    </el-aside>
    <el-container>
      <el-header>
        <app-header />
      </el-header>
      <el-main>
        <slot />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppHeader from '@/components/header'
import AppMenu from '@/components/menu'

export default {
  name: '',
  components: {
    AppHeader,
    AppMenu
  }
}
</script>

<style lang="scss" scoped>
.aside {
  height: 100vh;
  color: rgba(255, 255, 255, 0.65);
  background: #001529;
  position: sticky;
  top: 0;
}

.logo {
  height: 60px;
  display: block;
  background-color: #002140;
}
</style>
