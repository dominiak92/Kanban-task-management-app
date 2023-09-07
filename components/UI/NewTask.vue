<template>
  <v-dialog
    v-model="dialog"
    light
    transition="slide-x-transition"
    width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        dark
        rounded
        color="#635FC7"
        class="addBtn"
        v-on="on"
      >
        <fa class="plus" :style="{ color: '$white' }" :icon="['fas', 'plus']" />
    </v-btn>
    </template>
    <v-card class="dialog">
        
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "NewTask",

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

.plus {
  color: $white;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
}
</style>
