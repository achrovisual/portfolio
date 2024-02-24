<template>
    <div class = "navbar__container">
        <AppNavBarLink v-for = "item in pages" :key = "item.id" :label = "item.label" :url = "item.url"></AppNavBarLink>
    </div>
</template>

<script>
import AppNavBarLink from './AppNavBarLink.vue'

export default {
    name: 'AppNavBar',
    props: {
        pages: Array
    },
    components: {
        AppNavBarLink
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar__container {
    width: fit-content;
    display: flex;
    padding: 4px;
    align-items: flex-start;
    gap: 4px;

    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 82px;
    z-index: 1;
    
    border-radius: 32px;
    background: var(--Gray-900);
    box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.10);
    backdrop-filter: blur(50px);
}
</style>
