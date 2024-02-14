<template>
    <div class = "header__container">
        <div class = "profile__container">
            <div class = "profile__header-container">
                <div class = "profile__title-container">
                    <span class = "profile__title">
                        Eugenio Pastoral
                    </span>
                    
                    <span class="profile__subtitle">
                        Developer and product designer based in Manila
                    </span>
                </div>
                <SocialsBar></SocialsBar>
            </div>
            <div class = "profile__display_photo">
            </div>
        </div>
    </div>
</template>

<script>
import SocialsBar from './SocialsBar.vue'

export default {
    name: 'ProfileHeader',
    props: {
        msg: String
    },
    components: {
        SocialsBar
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header__container {
    display: flex;
    padding: 64px 270px;
    flex-direction: column;
    align-items: flex-start;
    gap: 64px;
    /* background-color: white; */
}

.profile__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
}

.profile__header-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
}

.profile__title-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
}

.profile__title {
    color: var(--Gray-50);
    font-size: 3.6rem;
    font-weight: 600;
}

.profile__subtitle {
    color: var(--Gray-400);
    font-size: 2.4rem;
    font-weight: 400;
}

.profile__display_photo {
    width: 210px;
    height: 210px;
    
    border-radius: 50%;

    background-image: url(~@/assets/avatar.png);
    background-size: contain;
}
</style>
