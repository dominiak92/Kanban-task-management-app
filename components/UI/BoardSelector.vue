<template>
  <v-select
    class="boardSelector"
    v-model="items[0]"
    :items="items"
    solo
    flat
    hide-details
  ></v-select>
</template>

<script>
export default {
  name: "BoardSelector",

  data: () => ({
    items: ["Platform Launch", "Platform Launch1", "Platform Launch2", "Platform Launch3"],
  }),
};
</script>

<style lang="scss" scoped>
.boardSelector {
  margin: 0;
  padding: 0;
  max-width: 13rem;
  font-family: $font;
  font-weight: 700;
}
</style>
