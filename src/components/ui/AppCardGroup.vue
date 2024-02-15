<template>
    <div class = "profile__cards_section-container">
        <div class = "profile__cards_section_title-container">
            <span class = "profile__cards_section-title">
                {{ label }}
            </span>
            <div class = "slider__controller">
                <a href="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M8.15625 14.4749L3.20625 9.52494C3.13125 9.44994 3.078 9.36869 3.0465 9.28119C3.0155 9.19369 3 9.09994 3 8.99994C3 8.89994 3.0155 8.80619 3.0465 8.71869C3.078 8.63119 3.13125 8.54994 3.20625 8.47494L8.15625 3.52494C8.29375 3.38744 8.4655 3.31544 8.6715 3.30894C8.878 3.30294 9.05625 3.37494 9.20625 3.52494C9.35625 3.66244 9.4345 3.83419 9.441 4.04019C9.447 4.24669 9.375 4.42494 9.225 4.57494L5.55 8.24994H13.9313C14.1438 8.24994 14.322 8.32169 14.466 8.46519C14.6095 8.60919 14.6813 8.78744 14.6813 8.99994C14.6813 9.21244 14.6095 9.39044 14.466 9.53394C14.322 9.67794 14.1438 9.74994 13.9313 9.74994H5.55L9.225 13.4249C9.3625 13.5624 9.4345 13.7374 9.441 13.9499C9.447 14.1624 9.375 14.3374 9.225 14.4749C9.0875 14.6249 8.9125 14.6999 8.7 14.6999C8.4875 14.6999 8.30625 14.6249 8.15625 14.4749Z" fill="#FAFAFA"/>
                    </svg>
                </a>
                <a href="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M8.475 14.475C8.3375 14.3375 8.2655 14.1625 8.259 13.95C8.253 13.7375 8.31875 13.5625 8.45625 13.425L12.1312 9.74998H3.75C3.5375 9.74998 3.35925 9.67798 3.21525 9.53398C3.07175 9.39048 3 9.21248 3 8.99998C3 8.78748 3.07175 8.60923 3.21525 8.46523C3.35925 8.32173 3.5375 8.24998 3.75 8.24998H12.1312L8.45625 4.57498C8.31875 4.43748 8.253 4.26248 8.259 4.04998C8.2655 3.83748 8.3375 3.66248 8.475 3.52498C8.6125 3.38748 8.7875 3.31873 9 3.31873C9.2125 3.31873 9.3875 3.38748 9.525 3.52498L14.475 8.47498C14.55 8.53748 14.6033 8.61548 14.6348 8.70898C14.6658 8.80298 14.6813 8.89998 14.6813 8.99998C14.6813 9.09998 14.6658 9.19373 14.6348 9.28123C14.6033 9.36873 14.55 9.44998 14.475 9.52498L9.525 14.475C9.3875 14.6125 9.2125 14.6812 9 14.6812C8.7875 14.6812 8.6125 14.6125 8.475 14.475Z" fill="#FAFAFA"/>
                    </svg>
                </a>
            </div>
        </div>
        <div class = "profile__card_group-container">
            <div class = "overflow" >
                <AppCard v-for = "item in content" :key = "item.id" :name = "item.name" :description = "item.description"></AppCard>
            </div>
        </div>
    </div>
</template>

<script>
// import '@splidejs/vue-splide/css/core';
import AppCard from './AppCard.vue'

export default {
    name: 'AppCardGroup',
    props: {
        label: { required: true, type: String },
        content: Array
    },
    components: {
        AppCard,
    }
    
}

// new Splide( '.splide', {
    //   arrowPath: 'M18.1248 32.1666L7.12484 21.1666C6.95817 21 6.83984 20.8194 6.76984 20.625C6.70095 20.4305 6.6665 20.2222 6.6665 20C6.6665 19.7778 6.70095 19.5694 6.76984 19.375C6.83984 19.1805 6.95817 19 7.12484 18.8333L18.1248 7.83331C18.4304 7.52775 18.8121 7.36775 19.2698 7.35331C19.7287 7.33997 20.1248 7.49997 20.4582 7.83331C20.7915 8.13886 20.9654 8.52053 20.9798 8.97831C20.9932 9.4372 20.8332 9.83331 20.4998 10.1666L12.3332 18.3333H30.9582C31.4304 18.3333 31.8265 18.4928 32.1465 18.8116C32.4654 19.1316 32.6248 19.5278 32.6248 20C32.6248 20.4722 32.4654 20.8678 32.1465 21.1866C31.8265 21.5066 31.4304 21.6666 30.9582 21.6666H12.3332L20.4998 29.8333C20.8054 30.1389 20.9654 30.5278 20.9798 31C20.9932 31.4722 20.8332 31.8611 20.4998 32.1666C20.1943 32.5 19.8054 32.6666 19.3332 32.6666C18.8609 32.6666 18.4582 32.5 18.1248 32.1666V32.1666Z',
    // } ).mount();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.profile__cards_section-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    align-self: stretch;
}

.profile__cards_section_title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
}

.profile__cards_section-title {
    color: var(--Gray-50);
    font-size: 3.2rem;
    font-weight: 500;
}

.slider__controller {
    display: flex;
    padding: 16px;
    align-items: flex-start;
    gap: 16px;
}

.profile__card_group-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;

    overflow: visible;
}

.overflow {
    display: flex;
    align-items: flex-start;
    align-content: flex-start;
    gap: 16px;
} 
</style>