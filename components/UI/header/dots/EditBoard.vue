<template>
  <v-dialog
    v-model="dialog"
    light
    transition="slide-x-transition"
    width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="#8471f2"
        v-bind="attrs"
        :style="{ color: '#ffffff' }"
        v-on="on"
        block
        elevation="2"
        raised
        rounded
      >
        <v-icon left> mdi-text-box-edit-outline</v-icon>edit board</v-btn
      >
    </template>
    <v-card class="dialog">
      <h2 class="title">Edit board</h2>
      <p class="smallTitle">Board Name</p>
      <v-form ref="form" v-model="valid" lazy-validation class="formWrapper">
        <v-text-field
          v-model="editedBoard.name"
          :rules="rules('Board name')"
          outlined
          required
        ></v-text-field>
        <p class="smallTitle" :style="{ color: '#777F98' }">Board Columns</p>
        <div
          v-for="(item, index) in editedBoard.columns"
          :key="index"
          class="nameList"
        >
          <div class="boardColumnNames">
            <v-select
              :items="statuses"
              v-model="item.name"
              :rules="rules('Status')"
              outlined
              light
            ></v-select>
            <!-- <fa
              v-if="editedBoard.columns.length > 1"
              :style="{ cursor: 'pointer' }"
              class="removeIcon"
              :icon="['fa', 'x']"
              @click="removeColumn(index)"
            /> -->
            <EditWarning
              v-if="editedBoard.columns.length > 1"
              :columnName="item.name"
              :removeColumn="() => removeColumn(index)"
            />
          </div>
        </div>
        <v-btn
          v-if="editedBoard.columns.length < 3"
          class="addNewItem"
          v-bind="attrs"
          light
          rounded
          block
          @click="addColumn"
          :style="{ color: '#635FC7', fontWeight: '700' }"
          v-on="on"
        >
          <fa class="plus" :icon="['fa', 'plus']" />
          Add New Column</v-btn
        >
      </v-form>
      <div class="actions">
        <v-btn
          class="btn"
          v-bind="attrs"
          :disabled="!valid"
          light
          rounded
          block
          @click="sendEditedBoard"
          :style="{ color: '#FFFFFF', fontWeight: '700' }"
          color="#635FC7"
          v-on="on"
        >
          Edit board</v-btn
        >
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import _ from "lodash";
import EditWarning from "./EditWarning.vue";
import { mapGetters } from "vuex";
export default {
  name: "EditBoard",
  components: {
    EditWarning,
  },

  data() {
    return {
      dialog: false,
      valid: true,
      menu: false,
      attrs: {},
      on: {},
      statuses: ["Todo", "Doing", "Done"],
      name: "",
      editedBoard: { _id: "", name: "", columns: [] },
    };
  },
  computed: {
    ...mapGetters("board", [
      "currentBoardName",
      "columnsDetails",
      "currentBoardId",
    ]),
  },
  watch: {
    columnsDetails: {
      handler(newVal) {
        if (newVal && newVal.length > 0) {
          this.editedBoard.columns = _.cloneDeep(newVal);
        }
      },
      deep: true,
    },
    dialog: {
      immediate: true,
      handler(newVal) {
        if (newVal && this.currentBoardId) {
          this.fetchCurrentBoardDetails();
        }
      },
    },
    currentBoardId: {
      immediate: true,
      handler(newVal, oldVal) {
        console.log("Zmiana currentBoardId z", oldVal, "na", newVal);
        if (newVal && newVal.length > 0) {
          this.editedBoard._id = newVal;
        }
      },
    },
    currentBoardName: {
      handler(newVal) {
        if (newVal) {
          this.editedBoard.name = newVal;
        }
      },
    },
  },
  mounted() {
    this.$store.dispatch(`board/fetchBoards`);
    this.editedBoard.name = this.currentBoardName;
    this.editedBoard.columns = _.cloneDeep(this.columnsDetails);
  },
  methods: {
    rules(value) {
      const baseRules = [(v) => !!v || `${value} is required`];
      baseRules.push(this.isUniqueStatus);
      return baseRules;
    },
    isUniqueStatus(value) {
      const count = this.editedBoard.columns.filter(
        (column) => column.name === value
      ).length;
      return count <= 1 || "You already have such a column";
    },
    addColumn() {
      this.editedBoard.columns.push({ name: "" });
      this.$refs.form.validate();
    },
    removeColumn(index) {
      this.editedBoard.columns.splice(index, 1);
      this.$refs.form.validate();
    },
    async fetchCurrentBoardDetails() {
      await this.$store.dispatch("board/getBoard", this.currentBoardId);
    },
    async sendEditedBoard() {
      if (this.$refs.form.validate()) {
        const priorities = {
          Todo: 1,
          Doing: 2,
          Done: 3,
        };
        // Sortowanie kolumn na podstawie mapy priorytetów
        this.editedBoard.columns.sort((a, b) => {
          return (priorities[a.name] || 0) - (priorities[b.name] || 0);
        });
        await this.$store.dispatch(
          "board/editBoardAndColumns",
          JSON.stringify(this.editedBoard)
        );
        console.log("Po wysłaniu, stan columnDetails:", JSON.stringify(this.columnsDetails));
        // await this.$store.dispatch("board/selectBoard", this.editedBoard);
        await this.$store.dispatch("board/getBoard", this.currentBoardId);
        await this.$store.dispatch(`board/fetchBoards`);
        this.dialog = false;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/breakpoints.scss";
@import "/assets/mixins.scss";
.dialog {
  padding: 1.2rem;
  .title {
    font-family: $font;
    font-weight: 700;
    font-size: 1.125rem;
    margin-bottom: 1.5rem;
  }
  .smallTitle {
    color: $mediumgrey;
    margin-bottom: 0.5rem;
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 0.9375rem; /* 100% */
    letter-spacing: -0.01563rem;
  }
  .formWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .nameList {
      .boardColumnNames {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        .removeIcon {
          margin: 1.1rem;
        }
      }
    }
    .addNewItem {
      align-self: center;
      margin-bottom: 2rem;
    }
  }
  .actions {
    display: flex;
    justify-content: space-between;
    gap: 0.5 rem;
    .btn {
      @include md {
        width: 10rem;
        font-size: 0.9rem;
      }
    }
  }
}
.plus {
  border-radius: 50%;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  margin-left: -10px;
}
</style>
