<template>
    <router-link :to = "url" class = "navbar__link-container">
        <span>
            {{ label }}
        </span>
    </router-link>
</template>

<script>
export default {
    name: 'AppNavBarLink',
    props: {
        label: { required: true, type: String },
        url: { required: true, type: String },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar__link-container {
    display: flex;
    padding: 12px 16px;
    align-items: flex-start;
    
    border-radius: 32px;

    text-decoration: none;
}

.navbar__link-container > span {
    color: var(--Gray-50);
    text-align: center;
    font-size: 1.3rem;
    font-weight: 400;
}

.navbar__link-container:hover, .router-link-active, .router-link-exact-active {
    border-radius: 32px;
    background: var(--Gray-800);
}
</style>
