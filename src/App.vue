<template>
  <NavBar></NavBar>
  <div class="container">
    <div class = "section">
      
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
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
