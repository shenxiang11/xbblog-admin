<template>
  <el-menu
    :router="true"
    :default-active="actived"
    background-color="#001529"
    text-color="rgba(255, 255, 255, 0.65)"
    active-text-color="#fff">
    <el-submenu index="/">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>Dashboard</span>
      </template>
      <el-menu-item index="/dashboard">分析页</el-menu-item>
    </el-submenu>
    <el-submenu index="/article">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>文章管理</span>
      </template>
      <el-menu-item index="/article/list">列表</el-menu-item>
      <el-menu-item index="/article/new">新建</el-menu-item>
    </el-submenu>
    <el-submenu index="/tag">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>标签管理</span>
      </template>
      <el-menu-item index="/tag/list">列表</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'app-menu',
  computed: {
    actived () {
      return this.$route.matched[0].path.split('/:')[0]
    }
  }
}
</script>

<style lang="scss">
.el-menu-item.is-active {
  background-color: #1890ff !important;
}
.el-menu {
  border-right: none;
}
</style>
