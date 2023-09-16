<template>
  <div>
    <TheAlert
      ref="alertComponent"
      text="You have successfully logged in"
      color="#006200"
    />
    <div v-if="$auth.loggedIn">
      <TheBoard :board="singleBoard" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TheAlert from "~/components/UI/TheAlert.vue";
import TheBoard from "~/components/UI/board/TheBoard.vue";
export default {
  name: "IndexPage",
  components: { TheAlert, TheBoard },
  computed: {
    ...mapGetters("board", ["singleBoard", "allBoards", "columnsDetails", "currentBoardId"]),
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
