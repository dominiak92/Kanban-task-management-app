<template>
  <v-dialog
    v-model="dialog"
    light
    transition="slide-x-transition"
    width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" block elevation="2" raised rounded>
        <v-icon left> mdi-plus-box-outline</v-icon>create new board</v-btn
      >
    </template>
    <v-card class="dialog">
      <h2 class="title">Add new board</h2>
      <p class="smallTitle">Board Name</p>
      <v-form ref="form" v-model="valid" lazy-validation class="formWrapper">
        <v-text-field
          v-model="newBoard.name"
          outlined
          :rules="rules('Board name')"
          required
        ></v-text-field>
        <p class="smallTitle" :style="{ color: '#777F98' }">Board Columns</p>
        <div
          v-for="(item, index) in newBoard.columns"
          :key="index"
          class="nameList"
        >
          <div class="boardColumnNames">
            <v-select
              :items="statuses"
              v-model="newBoard.columns[index].name"
              :rules="rules('Status')"
              outlined
              light
            ></v-select>
            <fa
              v-if="index > 0"
              :style="{ cursor: 'pointer' }"
              class="removeIcon"
              :icon="['fa', 'x']"
              @click="removeColumn(index)"
            />
          </div>
        </div>
        <v-btn
          v-if="newBoard.columns.length < 3"
          class="addNewItem"
          v-bind="attrs"
          light
          rounded
          block
          :style="{ color: '#635FC7', fontWeight: '700' }"
          v-on="on"
          @click="addColumn"
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
          :style="{ color: '#FFFFFF', fontWeight: '700' }"
          color="#635FC7"
          v-on="on"
          @click="sendNewBoard"
        >
          Create new board</v-btn
        >
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "NewBoardDialog",

  data() {
    return {
      dialog: false,
      valid: true,
      menu: false,
      attrs: {},
      on: {},
      statuses: ["Todo", "Doing", "Done"],
      newBoard: {
        name: "",
        columns: [
          {
            name: "",
          },
        ],
      },
    };
  },
  computed: {
    ...mapGetters("board", ["currentBoardId"]),
  },
  methods: {
    rules(value) {
      const baseRules = [(v) => !!v || `${value} is required`];
      baseRules.push(this.isUniqueStatus);
      return baseRules;
    },
    removeColumn(index) {
      if (index !== 0) {
        this.newBoard.columns.splice(index, 1);
        this.$refs.form.validate();
      }
    },
    addColumn() {
      this.newBoard.columns.push({ name: "" });
      this.$refs.form.validate();
    },
    isUniqueStatus(value) {
      const count = this.newBoard.columns.filter(
        (column) => column.name === value
      ).length;
      return count <= 1 || "You already have such a column";
    },

    async sendNewBoard() {
      if (this.$refs.form.validate()) {
        const priorities = {
          Todo: 1,
          Doing: 2,
          Done: 3,
        };
        // Sortowanie kolumn na podstawie mapy priorytetów
        this.newBoard.columns.sort((a, b) => {
          return (priorities[a.name] || 0) - (priorities[b.name] || 0);
        });
        await this.$store.dispatch(
          "board/postBoardAndColumns",
          JSON.stringify(this.newBoard)
        );
        await this.$store.dispatch("board/getBoard", this.currentBoardId);
        // await this.$store.dispatch(`board/fetchBoards`);

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
@import "../../assets/breakpoints.scss";
@import "../../assets/mixins.scss";
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
