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
        <v-icon left> mdi-view-dashboard-edit-outline </v-icon>edit task</v-btn
      >
    </template>
    <v-card class="dialog">
        <h2 class="title">Edit task</h2>
      <p class="smallTitle">Title</p>
        <v-form ref="form" v-model="valid" lazy-validation class="formWrapper">
        <v-text-field
          outlined
          :rules="rules('Task title')"
          required
        ></v-text-field>
        <p class="smallTitle">Description</p>
        <v-textarea
          clearable
          outlined
          :rules="rules('Description')"
          clear-icon="mdi-close-circle"
        ></v-textarea>
        <p class="smallTitle">Subtasks</p>

        <div

          class="nameList"
        >
          <div class="subTask">
            <v-text-field

              outlined
              :rules="rules('Subtask name')"
              required
            ></v-text-field>
            <fa
              :style="{ cursor: 'pointer' }"
              class="removeIcon"
              :icon="['fa', 'x']"
            />
          </div>
        </div>
        <v-btn
          class="addNewItem"
          v-bind="attrs"
          light
          rounded
          block
          :style="{ color: '#635FC7', fontWeight: '700' }"
          v-on="on"
          @click="addSubtask"
        >
          <fa class="btnPlus" :icon="['fa', 'plus']" />
          Add new subtask</v-btn
        >
        <p class="smallTitle">Status</p>
        <v-select
          :rules="rules('Status')"
          :items="columnsDetails"
          item-text="name"
          item-value="id"
          v-model="selectedStatusId"
          @change="handleStatusChange"
          outlined
          light
        ></v-select>
        <div class="actions">
          <v-btn
            class="btn"
            v-bind="attrs"
            :disabled="!valid"
            light
            @click="sendNewTask"
            rounded
            block
            :style="{ color: '#FFFFFF', fontWeight: '700' }"
            color="#635FC7"
            v-on="on"
          >
            Edit Task</v-btn
          >
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import _ from "lodash";
import { mapGetters } from "vuex";
export default {
  name: "EditTask",

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
        console.log(
          "Po wysłaniu, stan columnDetails:",
          JSON.stringify(this.columnsDetails)
        );
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
