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
        <p class="btnText">{{ currentBoardName ? currentBoardName : selectedBoard }}</p>
      </v-btn>
    </template>
    <v-card class="mx-auto" width="300" tile>
      <v-list light rounded>
        <v-list-item-group color="primary">
          <v-list-item
            @click="selectBoard(item)"
            v-for="(item, i) in allBoards"
            :key="i"
          >
            <v-list-item-content>
              <v-list-item-title
                ><v-icon left> mdi-developer-board</v-icon
                >{{ item.name }}</v-list-item-title
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
import { mapGetters } from "vuex";
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
    selectedBoard: null,
  }),

  computed: {
    ...mapGetters("board", ["allBoards", "currentBoardName"]),
  },
  mounted() {
    if (this.allBoards.length > 0) {
      this.selectedBoard = this.allBoards[0].name;

      // Jeżeli potrzebujesz wywołać też akcję ze store dla tego boarda
      //   this.$store.dispatch("board/getBoard", this.allBoards[0]._id);
    }
  },
  watch: {
    allBoards: {
      immediate: true, // uruchomienie metody od razu po inicjalizacji komponentu
      handler(newValue) {
        if (newValue.length > 0) {
          this.selectedBoard = newValue[0].name;
          this.$store.dispatch("board/getBoard", newValue[0]._id);
          this.$store.dispatch("board/setCurrentBoardId", newValue[0]._id);
          if (Array.isArray(newValue[0].columns)) {
            newValue[0].columns.forEach(async (column) => {
              await this.$store.dispatch("board/setColumnDetails", {
                name: column.name,
                id: column._id,
              });
            });
          }
        }
      },
    },
  },
  methods: {
    async selectBoard(item) {
      await this.$store.dispatch("board/selectBoard", item);
    },
  },
};
</script>

<style lang="scss" scoped>
.ellipsed-button {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
}
</style>
