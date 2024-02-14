<template>
  <ProfileHeader></ProfileHeader>
  <div class="container">
    <div class = "section">
      
    </div>
  </div>
</template>

<script>
import ProfileHeader from './components/ProfileHeader.vue'

export default {
  name: 'App',
  components: {
    ProfileHeader
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
