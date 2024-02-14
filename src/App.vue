<template>
  <PortfolioHeader></PortfolioHeader>
  <div class="container">
    <div class = "section">
      
    </div>
  </div>
</template>

<script>
import PortfolioHeader from './components/PortfolioHeader.vue'

export default {
  name: 'App',
  components: {
    PortfolioHeader
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
