<template>
    <div class = "button-external">
        <span>{{ label }}</span>
        <a href = "{{ url }}">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M8.475 14.475C8.3375 14.3375 8.2655 14.1625 8.259 13.95C8.253 13.7375 8.31875 13.5625 8.45625 13.425L12.1312 9.75H3.75C3.5375 9.75 3.35925 9.678 3.21525 9.534C3.07175 9.3905 3 9.2125 3 9C3 8.7875 3.07175 8.60925 3.21525 8.46525C3.35925 8.32175 3.5375 8.25 3.75 8.25H12.1312L8.45625 4.575C8.31875 4.4375 8.253 4.2625 8.259 4.05C8.2655 3.8375 8.3375 3.6625 8.475 3.525C8.6125 3.3875 8.7875 3.31875 9 3.31875C9.2125 3.31875 9.3875 3.3875 9.525 3.525L14.475 8.475C14.55 8.5375 14.6033 8.6155 14.6348 8.709C14.6658 8.803 14.6813 8.9 14.6813 9C14.6813 9.1 14.6658 9.19375 14.6348 9.28125C14.6033 9.36875 14.55 9.45 14.475 9.525L9.525 14.475C9.3875 14.6125 9.2125 14.6812 9 14.6812C8.7875 14.6812 8.6125 14.6125 8.475 14.475Z" fill="#FAFAFA"/>
            </svg>
        </a>
    </div>
</template>

<script>
export default {
    name: 'AppButton',
    props: {
        label: { required: true, type: String },
        url: { required: false, type: String },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button-external {
    display: flex;
    padding: 16px 32px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    
    border-radius: 32px;
    background: var(--Blue-700);
}

.button-external > span {
    color: var(--Gray-50);
    text-align: center;
    font-size: 1.6rem;
    font-weight: 400;
}

.button-external a {
    width: 18px;
    height: 18px;
}
</style>
