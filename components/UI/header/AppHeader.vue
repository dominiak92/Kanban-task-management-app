<template>
  <div class="AppHeader">
    <img src="../../../assets/logo-mobile.svg" alt="logo" />
    <div v-if="$auth.loggedIn" class="menu">
      <BoardSelector />
      <NewTask />
      <ThreeDots />
    </div>
    <p class="entryHeader" v-else>Kanban Task Management App</p>
    <LoginRegister />
  </div>
</template>


<script>
import LoginRegister from "../LoginRegister.vue";
import BoardSelector from "./selector/BoardSelector.vue"
import NewTask from "./NewTask.vue";
import ThreeDots from "./dots/ThreeDots.vue";
export default {
  components: { NewTask, ThreeDots, LoginRegister, BoardSelector },
  data() {
    return {
      showAlert: false,
    };
  },
  name: "AppHeader",
  mounted() {},
};
</script>

<style lang="scss" scoped>
.AppHeader {
  width: 100%;
  height: 4rem;
  padding: 1rem;
  background-color: $white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .entryHeader {
    font-weight: 700;
    font-size: 0.9rem;
    color: #464e58;
    margin-left: 1rem;
    margin-right: auto;
  }
  .menu {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: space-around;
  }
}
</style>
