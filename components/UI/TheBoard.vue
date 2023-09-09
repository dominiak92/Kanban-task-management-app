<template>
  <div>
      <TheColumn v-for="column in board.columns" :key="column._id" :column="column" />
  </div>
</template>

<script>
import TheColumn from "./TheColumn.vue";
export default {
  name: "TheBoard",
  components: {
    TheColumn,
  },
  props: {
    board: {
      type: Object,
    },
  },

  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "./assets/breakpoints.scss";
@import "./assets/mixins.scss";
</style>
