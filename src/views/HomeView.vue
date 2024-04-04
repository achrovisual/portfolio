<template>
  <div class = "wrapper">
    <AppHeader></AppHeader>
    <div class = "container">
      <div class = "overflow_hidden">
        <div class= "padding_restrict">
          <div class = "workable_area profile__body">
            <AppCardGroup  v-for = "group in CardGroups" :key = "group.id" :label = "group.label" :content = "group.content"></AppCardGroup>
          </div>
        </div>
      </div>
    </div>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import AppHeader from '../components/layout/AppHeader.vue'
import AppFooter from '../components/layout/AppFooter.vue'
import AppCardGroup from '../components/ui/AppCardGroup.vue'
import uniqueId from "lodash.uniqueid";

import '@splidejs/vue-splide/css/core';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    AppCardGroup
  },
  data() {
    return {
      CardGroups: [
      {
        id: uniqueId("card_group-"),
        label: "Development",
        content: [
        { id: uniqueId("card-"), name: "Coins", description: "Your Budget Tracking Companion", thumbnail: "coins.png", done: false },
        // { id: uniqueId("card-"), name: "ACRVSL", description: "Reusable Web Components", thumbnail: "acrvsl.png", done: false },
        { id: uniqueId("card-"), name: "meSHM", description: "All-in-one Management Facility", thumbnail: "meshm.png", done: true },
        { id: uniqueId("card-"), name: "MVISion", description: "Secure and Scalable API", thumbnail: "mvision.png", done: true },
        { id: uniqueId("card-"), name: "Axie Finder", description: "A Discord Bot for Finding Axies", thumbnail: "axiefinder.png", done: true },
        ],
      },
      {
        id: uniqueId("card_group-"),
        label: "Design",
        content: [
        { id: uniqueId("card-"), name: "Delivery²", description: "Case Study", thumbnail: "deliverysq.png", done: true },
        { id: uniqueId("card-"), name: "Kada", description: "Case Study", thumbnail: "kada.png", done: true },
        ],
      },
      ]
      
    }
  },
  mounted() {
    var navbar = document.getElementById("navbar__container");
    navbar.classList.remove("light-mode");
  }
}
</script>

<style>
.wrapper {
  background-color: var(--black);
}

.profile__body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 64px;
}
</style>