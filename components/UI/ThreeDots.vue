<template>
  <v-dialog
    v-model="dialog"
    light
    transition="slide-x-transition"
    width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <fa
        class="dots"
        v-bind="attrs"
        v-on="on"
        :style="{ color: '#828FA3' }"
        :icon="['fa', 'ellipsis-vertical']"
      />
    </template>
    <v-card class="dialog"> </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ThreeDots",

  data() {
    return {
      dialog: false,
      valid: true,
      menu: false,
      attrs: {},
      on: {},
    };
  },
  computed: {},
  watch: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "./assets/breakpoints.scss";
@import "./assets/mixins.scss";
.dialog {
  padding: 1.2rem;
}

.dots {
  font-size: 20px;
}
</style>
