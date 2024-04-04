<template>
    <div class = "padding_restrict header__container">
        <div class = "workable_area">        
            <div class = "profile__container-name">
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
            <div class = "profile__container-description">
                <span class = "profile__description">
                    With my extensive experience in UI/UX design and web development, combined with my broad skill set encompassing areas like network and cloud engineering, I can turn engaging ideas from design to code. This diverse background makes me a versatile developer capable of crafting elegant and captivating digital experiences.
                </span>
                <div class = "profile__tags-container">
                    <AppTag label="Software Engineering"></AppTag>
                    <AppTag label="Network Engineering"></AppTag>
                    <AppTag label="UI/UX Design"></AppTag>
                    <AppTag label="Branding"></AppTag>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import SocialsBar from '../ui/SocialsBar.vue'
import AppTag from '../ui/AppTag.vue'

export default {
    name: 'AppHeader',
    components: {
        SocialsBar,
        AppTag
    }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header__container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    align-self: stretch;
    gap: 64px;
}

.profile__container-name {
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

.profile__container-description {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    align-self: stretch;
}

.profile__description {
    color: var(--Gray-50);
    font-size: 1.6rem;
    font-weight: 400;
}

.profile__tags-container {
    display: flex;
    align-items: flex-start;
    gap: 16px;
}
</style>