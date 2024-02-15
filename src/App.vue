<template>
  <AppHeader></AppHeader>
  <div class = "container">
    <div class = "overflow_hidden">
      <div class= "padding_restrict">
        <div class = "workable_area profile__body">
          <AppCardGroup label = "Development"></AppCardGroup>
          <AppCardGroup label = "Design"></AppCardGroup>
        </div>
      </div>
    </div>
  </div>
  <AppFooter></AppFooter>
</template>

<script>
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import AppCardGroup from './components/ui/AppCardGroup.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    AppCardGroup
  }
}
</script>

<style>
.profile__body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 64px;
}
</style>
