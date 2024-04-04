<template>
    <div class = "tag">
        <span>{{ label }}</span>
    </div>
</template>

<script>
export default {
    name: 'AppTag',
    props: {
        label: { required: true, type: String },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tag {
    display: flex;
    padding: 8px 16px;
    align-items: flex-start;
    
    border-radius: 32px;
    background: var(--Blue-700);
}

.tag > span {
    color: var(--Gray-50);
    text-align: center;
    font-size: 1.2rem;
    font-weight: 400;
    text-transform: uppercase;
}
</style>
