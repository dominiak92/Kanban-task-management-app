<template>
  <div>
    <TheAlert
      ref="alertComponent"
      text="You have successfully logged in"
      color="#006200"
    />
    <div v-if="$auth.loggedIn"></div>
      <TheBoard :board="singleBoard" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TheAlert from "~/components/UI/TheAlert.vue";
import TheBoard from "~/components/UI/TheBoard.vue";
export default {
  name: "IndexPage",
  components: { TheAlert, TheBoard },
  computed: {
    ...mapGetters("board", ["singleBoard"]),
  },
  watch: {
    "$auth.loggedIn"(loggedIn) {
      if (loggedIn) {
        this.$refs.alertComponent.show();
      }
    },
  },
  async mounted() {
    await this.$store.dispatch("board/fetchBoards");
  },
};
</script>
<style lang="scss" scoped></style>
