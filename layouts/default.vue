<template>
  <div class="App" data-app>
    <TheBackground/>
    <nuxt />
  </div>
</template>
<script>

import TheBackground from '~/components/UI/TheBackground.vue';
export default {
  components: { TheBackground },
}
</script>
<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@500;700&display=swap');
@import '../assets/breakpoints.scss';
@import '../assets/mixins.scss';
.App {
  font-family: 'League Spartan', sans-serif;
  height: 100%;
  @include xl {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  
}
</style>
