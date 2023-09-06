<template>
  <TheAlert
    ref="alertComponent"
    text="You have successfully logged in"
    color="#006200"
  />
</template>

<script>
import TheAlert from "~/components/UI/TheAlert.vue";
export default {
  name: "IndexPage",
  components: { TheAlert },
  watch: {
    "$auth.loggedIn"(loggedIn) {
      if (loggedIn) {
        this.$refs.alertComponent.show();
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
