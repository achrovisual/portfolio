<template>
    <Splide :has-track="false" class = "profile__cards_section-container" :options="options">
        <div class = "profile__cards_section_title-container">
            <span class = "profile__cards_section-title">
                {{ label }}
            </span>
            <div class = "slider__controller splide__arrows">
                <div class = "splide__arrow--prev">
                    <button class = "splide__arrow splide__arrow--prev"></button>
                </div>
                <div class = "splide__arrow--next">
                    <button class = "splide__arrow splide__arrow--next"></button>
                </div>
            </div>
        </div>
        <SplideTrack class = "profile__card_group-container overflow">
            <AppCard v-for = "item in content" :key = "item.id" :name = "item.name" :description = "item.description" :done = "item.done"></AppCard>
        </SplideTrack>

        <ul class="splide__pagination"></ul>
    </Splide>
    
</template>

<script>
import AppCard from './AppCard.vue'
import { Splide, SplideTrack } from '@splidejs/vue-splide';

export default {
    name: 'AppCardGroup',
    props: {
        label: { required: true, type: String },
        content: Array
    },
    components: {
        AppCard,
        Splide,
        SplideTrack,
    },
    data() {
        return {
            options: {
                drag: 'free',
                snap: true,
                gap: '16px',
                autoWidth: true,
                width: '100%',
            }
        }
    }
    
}

// new Splide( '.splide', {
    //   arrowPath: 'M18.1248 32.1666L7.12484 21.1666C6.95817 21 6.83984 20.8194 6.76984 20.625C6.70095 20.4305 6.6665 20.2222 6.6665 20C6.6665 19.7778 6.70095 19.5694 6.76984 19.375C6.83984 19.1805 6.95817 19 7.12484 18.8333L18.1248 7.83331C18.4304 7.52775 18.8121 7.36775 19.2698 7.35331C19.7287 7.33997 20.1248 7.49997 20.4582 7.83331C20.7915 8.13886 20.9654 8.52053 20.9798 8.97831C20.9932 9.4372 20.8332 9.83331 20.4998 10.1666L12.3332 18.3333H30.9582C31.4304 18.3333 31.8265 18.4928 32.1465 18.8116C32.4654 19.1316 32.6248 19.5278 32.6248 20C32.6248 20.4722 32.4654 20.8678 32.1465 21.1866C31.8265 21.5066 31.4304 21.6666 30.9582 21.6666H12.3332L20.4998 29.8333C20.8054 30.1389 20.9654 30.5278 20.9798 31C20.9932 31.4722 20.8332 31.8611 20.4998 32.1666C20.1943 32.5 19.8054 32.6666 19.3332 32.6666C18.8609 32.6666 18.4582 32.5 18.1248 32.1666V32.1666Z',
    // } ).mount();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.profile__cards_section-container {
    /* width: 100%; */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    align-self: stretch;
    
    overflow: visible;
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
    /* width: calc(100% + 5); */
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
    
    overflow: visible;
}

.overflow {
    width: var(--working-width);
    display: block;
    gap: 16px;
} 

.splide {
    width: 100% !important;
}

.splide__track {
    width: 100% !important;
    cursor: grab;
}

.splide__arrow {
    width: 18px;
    height: 18px;
    background: url(~@/assets/arrow.svg);
    border: none;
    outline: inherit;
    cursor: pointer;
}

.splide__arrow--prev {
    transform: rotate(90deg);
}

.splide__arrow--prev, .splide__arrow--next {
    width: 18px;
    height: 18px;
}

.splide:not(.is-overflow) .splide__arrows {
    display: none;
}

.splide__pagination {
    visibility: hidden;
}
</style>