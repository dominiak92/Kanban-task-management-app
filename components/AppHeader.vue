<template>
  <div class="AppHeader">
    <img src="../assets/logo-mobile.svg" alt="logo" />
    <BoardSelector />
    <NewTask />
    <ThreeDots/>
    <LoginRegister/>
  </div>
</template>

<script>
import BoardSelector from './UI/BoardSelector.vue';
import LoginRegister from './UI/LoginRegister.vue';
import NewTask from "./UI/NewTask.vue";
import ThreeDots from "./UI/ThreeDots.vue";
export default {
  components: { NewTask, ThreeDots, LoginRegister, BoardSelector },
  name: "AppHeader",
  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.AppHeader {
  width: 100%;
  height: 4rem;
  background-color: $white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
</style>


  mounted() {},

  methods: {},
};
</script>

<st