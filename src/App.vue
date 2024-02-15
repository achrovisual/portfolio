<template>
  <AppHeader></AppHeader>
  <div class="container">
    <div class = "section">
      
    </div>
  </div>
  <AppFooter></AppFooter>
</template>

<script>
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style>
.section {
  height: calc(100vh / 2);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
}
</style>
