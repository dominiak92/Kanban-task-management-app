div
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
      <h2 class="title">Add new task</h2>
      <p class="smallTitle">Title</p>
      <v-form ref="form" v-model="valid" lazy-validation class="formWrapper">
        <v-text-field
          v-model="newTask.description"
          outlined
          :rules="rules('Task title')"
          required
        ></v-text-field>
        <p class="smallTitle">Description</p>
        <v-textarea
          v-model="newTask.title"
          clearable
          outlined
          :rules="rules('Description')"
          clear-icon="mdi-close-circle"
        ></v-textarea>
        <p class="smallTitle">Subtasks</p>

        <div
          v-for="(subtask, index) in newTask.subtasks"
          :key="index"
          class="nameList"
        >
          <div class="subTask">
            <v-text-field
              v-model="newTask.subtasks[index].title"
              outlined
              :rules="rules('Subtask name')"
              required
            ></v-text-field>
            <fa
              :style="{ cursor: 'pointer' }"
              class="removeIcon"
              :icon="['fa', 'x']"
              @click="removeSubtask(index)"
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
        <v-select :rules="rules('Status')" outlined light></v-select>
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
        >
          Create Task</v-btn
        >
      </div>
      </v-form>
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
      newTask: {
        title: "",
        description: "",
        subtasks: [
          {
            title: "",
            isCompleted: Boolean,
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  methods: {
    rules(value) {
      const baseRules = [(v) => !!v || `${value} is required`];
      return baseRules;
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    addSubtask() {
      this.newTask.subtasks.push({ title: "", isCompleted: false });
      this.$refs.form.validate();
    },
    removeSubtask(index) {
      this.newTask.subtasks.splice(index, 1);
      this.$refs.form.validate();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./assets/breakpoints.scss";
@import "./assets/mixins.scss";
.dialog {
  padding: 1.2rem;
  .subTask {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    .removeIcon {
      margin: 1.1rem;
    }
  }
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
  .btnPlus {
    border-radius: 50%;
    font-size: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    margin-left: -10px;
  }
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
