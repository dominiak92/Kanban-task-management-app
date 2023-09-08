<template>
  <div>
    <TheAlert
      ref="alertComponent"
      text="You have successfully logged in"
      color="#006200"
    />
    {{ singleBoard }}
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TheAlert from "~/components/UI/TheAlert.vue";
export default {
  name: "IndexPage",
  components: { TheAlert },
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
    await this.$store.dispatch('board/fetchBoards')
  },
};
</script>
<style lang="scss" scoped></style>
