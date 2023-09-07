<template>
  <v-menu bottom origin="center center" transition="scale-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="ellipsed-button"
        max-width="200"
        plain
        small
        color="white"
        light
        v-bind="attrs"
        v-on="on"
      >
        <v-icon dark> mdi-menu-down </v-icon>
        <p class="btnText">{{ selectedBoard }}</p>
      </v-btn>
    </template>
    <v-card class="mx-auto" width="300" tile>
      <v-list light rounded>
        <v-list-item-group color="primary">
          <v-list-item
            @click="selectBoard(item)"
            v-for="(item, i) in items"
            :key="i"
          >
            <v-list-item-content>
              <v-list-item-title
                ><v-icon left> mdi-developer-board</v-icon
                >{{ item }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <NewBoardDialog />
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import NewBoardDialog from "./NewBoardDialog.vue";
export default {
  name: "BoardSelector",
  components: {
    NewBoardDialog,
  },

  data: () => ({
    dialog: false,
    valid: true,
    menu: false,
    attrs: {},
    on: {},
    items: [
      "Platform Launchhhhhh",
      "Platform Launch1",
      "Platform Launch2",
      "Platform Launch3",
    ],
  }),
  methods: {
    selectBoard(item) {
      this.selectedBoard = item;
    },
  },
};
</script>

<style lang="scss" scoped>
.ellipsed-button {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px; // Możesz dostosować tę wartość do swoich potrzeb
}
</style>
