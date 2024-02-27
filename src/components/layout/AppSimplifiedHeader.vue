<template>
  <div class="nav">
    <div class="wordmark">
      <div></div>
      <span>Eugenio Pastoral</span>
    </div>
    <SocialsBar></SocialsBar>
  </div>
</template>

<script>
import SocialsBar from '../ui/SocialsBar.vue'

export default {
  name: 'AppSimplifiedHeader',
  props: {
    msg: String
  },
  components: {
        SocialsBar,
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav {
  display: flex;
  flex: 1 0 0;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
}

.wordmark {
  display: flex;
  align-items: center;
  gap: 8px;
}

.wordmark > div {
  width: 32px;
  height: 32px;

  border-radius: 50%;
    
  background-image: url(~@/assets/avatar.png);
  background-size: contain;
}

.wordmark span {
  font-style: normal;
  text-align: center;
  
  font-size: 1.6rem;
  line-height: 2.4rem;
  font-weight: 400;
}
.socials {
  display: flex;
  align-items: flex-start;
  gap: 24px;  
}

.socials a {
  width: 24px;
  height: 24px;
}

.glyph:hover {
  fill: #FFFFFF;
}
</style>
