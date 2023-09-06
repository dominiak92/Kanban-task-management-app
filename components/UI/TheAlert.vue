<template>
  <v-card>
    <v-snackbar
      class="alert"
      v-model="showAlert"
      :timeout="2000"
      rounded="pill"
      shaped
      centered
      :color="color"
    >
      <p class="alert">{{ text }}</p>
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  name: "TheAlert",
  props: {
    text: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showAlert: false,
    };
  },
  methods: {
    show() {
      this.showAlert = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.alert {
  text-align: center;
}
</style>
