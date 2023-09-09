<template>
  <div>{{ column.name }}</div>
</template>

<script>
export default {
  name: "TheColumn",
  props: {
    column: {
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
