<template>
    <div class = "padding_restrict footer__container">
        <div class = "workable_area">  
            <div class = "footer__cta">
                <div class = "cta__message-container">
                    <span class = "footer__title">
                        Work with Me
                    </span>
                    <span class = "footer__subtitle">
                        Want to work with me? I'd love to hear from you.
                    </span>
                </div>
                <ExternalButton label = "Get in touch"></ExternalButton>
            </div>
            <div class = "footer__copyright">
                <SocialsBar></SocialsBar>
                <span class = "footer__subtitle">
                    © 2024
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import SocialsBar from './SocialsBar.vue'
import ExternalButton from './ExternalButton.vue'

export default {
    name: 'PortfolioHeader',
    components: {
        SocialsBar,
        ExternalButton
    }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer__container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 64px;
    align-self: stretch;
    
    background: var(--Gray-900, #212121);
}

.footer__cta {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    align-self: stretch;
}

.cta__message-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    align-self: stretch;
}

.footer__title {
    align-self: stretch;
    color: var(--Gray-50);
    font-size: 3.2rem;
    font-weight: 400;
}

.footer__subtitle {
    align-self: stretch;
    color: var(--Gray-50);
    font-size: 2.0rem;
    font-weight: 400;
}

.footer__copyright {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    align-self: stretch;
}
</style>