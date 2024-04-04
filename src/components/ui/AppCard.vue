<template>
    <SplideSlide>
        <div class = "profile__card-container">
            <div class = "profile__card-display_photo">
                <img :src="'/thumbnails/' + thumbnail">
            </div>
            <div class = "profile__card_title-container">
                <div class = "profile__card_title">
                    <span>
                        {{ name }}
                    </span>
                    <span v-if = "!done" class = "profile__card_subtitle">
                        Coming Soon
                    </span>
                </div>
                <span class = "profile__card-description">
                    {{ description }}
                </span>
            </div>
        </div>
    </SplideSlide>
</template>

<script>
import { SplideSlide } from '@splidejs/vue-splide';

export default {
    name: 'AppCard',
    props: {
        name: { required: true, type: String },
        done: { required: true, type: Boolean },
        description: { required: true, type: String },
        thumbnail: { required: true, type: String },
    },
    components: {
        SplideSlide
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.profile__card-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
}

.profile__card-display_photo {
    display: flex;
    width: 300px;
    height: 300px;
    justify-content: center;
    align-items: center;    
    overflow: hidden;
    
    background-color: var(--Gray-900);
    border-radius: 8px;
}

div.profile__card-display_photo > img {
    width: 100%;
    height: 100%;
}

.profile__card_title-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
}

.profile__card_title {
    display: flex;
    align-items: center;
    gap: 8px;
    align-self: stretch;
}

.profile__card_subtitle {
    color: var(--Gray-500) !important;
    font-size: 1.2rem !important;
    font-weight: 400 !important;
    text-transform: uppercase !important;
}

.profile__card_title > span {
    color: var(--Gray-50);
    font-size: 2.0rem;
    font-weight: 500;
}

.profile__card-description {
    color: var(--Gray-500);
    font-size: 1.6rem;
    font-weight: 400;
}
</style>
