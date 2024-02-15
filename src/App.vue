<template>
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
</template>

<script>
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'
import AppCardGroup from './components/ui/AppCardGroup.vue'
import uniqueId from "lodash.uniqueid";


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
        { id: uniqueId("card-"), name: "Coins", description: "Your Budget Tracking Companion" },
        { id: uniqueId("card-"), name: "ACRVSL", description: "Reusable Web Components" },
        { id: uniqueId("card-"), name: "meSHM", description: "All-in-one Management Facility" },
        { id: uniqueId("card-"), name: "MVISion", description: "Secure and Scalable API" },
        { id: uniqueId("card-"), name: "Axie Finder", description: "A Discord Bot for Finding Axies" },
        ],
      },
      {
        id: uniqueId("card_group-"),
        label: "Design",
        content: [
        { id: uniqueId("card-"), name: "Delivery²", description: "Case Study" },
        { id: uniqueId("card-"), name: "Kada", description: "Case Study" },
        ],
      },
      ]
      
    }
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
