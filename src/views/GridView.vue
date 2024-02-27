<template>
  <div class = "wrapper">
    <AppSimplifiedHeader></AppSimplifiedHeader>
  </div>
</template>

<script>
import AppSimplifiedHeader from '../components/layout/AppSimplifiedHeader.vue';
export default {
  name: 'App',
  components: {
    AppSimplifiedHeader
  },
}
</script>

<style scoped>
.wrapper {
  background-color: var(--white);
}
</style>