<template>
  <div class="App" data-app>
    <TheBackground />
    <AppHeader />
    <nuxt />
  </div>
</template>
<script>
import TheBackground from "~/components/UI/TheBackground.vue";
import AppHeader from "~/components/UI/header/AppHeader.vue";
export default {
  components: { TheBackground, AppHeader },
};
</script>
<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700&display=swap");
@import "../assets/breakpoints.scss";
@import "../assets/mixins.scss";
.App {
  font-family: $font;
  height: 100vh;
  @include xl {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
}
</style>
