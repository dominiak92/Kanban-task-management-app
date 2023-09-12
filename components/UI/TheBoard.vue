<template>
  <div class="scroll-container">
    <TheColumn
      v-for="column in board.columns"
      :key="column._id"
      :column="column"
    />
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
.scroll-container {
  display: flex;
  min-height: 100vh;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 1rem;
  overflow-x: auto;
  white-space: nowrap;
  width: 100%;
  scroll-behavior: smooth;
}
</style>
