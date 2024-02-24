<template>
  <AppNavBar v-for = "item in Pages" :key = "item.id" :pages = "item.content"></AppNavBar>
  <router-view/>
</template>
<script>
import AppNavBar from './components/ui/AppNavBar.vue';
import uniqueId from "lodash.uniqueid";

export default {
  name: 'App',
  components: {
    AppNavBar
  },
  data() {
    return {
      Pages: [
      {
        id: uniqueId("pages-"),
        content: [
        { id: uniqueId("page-"), label: "Work", url: "/" },
        { id: uniqueId("page-"), label: "Photography", url: "/about" }
        ]
      },
      ]
    }
  }
}
</script>
<style>
</style>
