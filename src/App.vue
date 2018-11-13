<template>
  <router-view :key="$route.fullPath" />
</template>

<script>
export default {
  name: 'app',
  mounted () {
    this.$store.dispatch('getCategories')
  }
}
</script>

<style lang="scss">
body {
  background-color: #f0f2f5;
}
</style>
