<template>
  <v-dialog
    v-model="dialog"
    light
    transition="slide-x-transition"
    width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <div class="allColumnWrapper" v-on="on" v-bind="attrs">
        <div class="columnWrapper">
          <div
            class="status"
            :class="{
              blue: column.name === 'Todo',
              deepblue: column.name === 'Doing',
              green: column.name === 'Done',
            }"
          >
            <fa class="icon" :icon="['fa', 'circle']" />
            <p :style="{ color: '#828FA3' }">
              {{ column.name.toUpperCase() }} ({{ column.tasks.length }})
            </p>
          </div>
          <draggable
            group="tasks"
            :scroll="true"
            @change="onColumnChange(columnName)"
          >
            <div
              v-for="task in column.tasks"
              class="task"
              :key="task._id"
              @click="setSelectedTask(task)"
            >
              <p class="taskName">{{ task.title }}</p>
              <p class="subtaskCounter">
                {{ subtaskCounter(task) }}
              </p>
            </div>
          </draggable>
        </div></div
    ></template>
    <ColumnDialog :task="selectedTask" :column="column" />
  </v-dialog>
</template>

<script>
import VueHorizontal from "vue-horizontal";
import draggable from "vuedraggable";
import ColumnDialog from "./dialog/ColumnDialog.vue";
import { EventBus } from '~/plugins/event-bus';
export default {
  name: "TheColumn",
  components: {
    draggable,
    VueHorizontal,
    ColumnDialog,
  },
  props: {
    column: {
      type: Object,
    },
  },

  data() {
    return {
      attrs: {},
      on: {},
      dialog: false,
      selectedTask: null,
    };
  },
  computed: {},
  mounted() {
    EventBus.$on("closeParentDialog", () => {
      console.log("przed " + this.dialog);
      this.dialog = false;
      console.log("po " + this.dialog);
    });
  },
  watch: {},
  methods: {
    setSelectedTask(task) {
      this.selectedTask = task;
    },

    subtaskCounter(task) {
      let completedSubtasks = 0;

      // Sprawdzanie czy task i jego subtasks istnieją
      if (task && task.subtasks) {
        task.subtasks.forEach((subtask) => {
          if (subtask.isCompleted) {
            completedSubtasks++;
          }
        });
      }

      // Zwracanie liczby ukończonych subtasków
      return `${completedSubtasks} of ${
        task.subtasks ? task.subtasks.length : 0
      } subtasks`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./assets/breakpoints.scss";
@import "./assets/mixins.scss";

.allColumnWrapper {
  display: flex;
  flex-wrap: nowrap;
  .columnWrapper {
    min-width: 17.5rem;
    .status {
      display: flex;
      align-items: center;
      margin: 1.5rem;
      gap: 0.5rem;
      font-size: 0.75rem;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      letter-spacing: 0.15rem;
    }
    .blue {
      color: #49c4e5;
    }
    .deepblue {
      color: #8471f2;
    }
    .green {
      color: #67e2ae;
    }
    .task {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 17.5rem;
      flex-shrink: 0;
      gap: 0.5rem;
      margin-top: 1.25rem;
      margin-bottom: 1.25rem;
      padding: 1rem;
      border-radius: 0.5rem;
      background: var(--White, #fff);
      box-shadow: 0px 4px 6px 0px rgba(54, 78, 126, 0.1);
      .taskName {
        width: 100%;
        text-align: left;
        font-size: 0.9375rem;
        font-style: normal;
        font-weight: 700;
        white-space: normal;
        line-height: normal;
      }
      .subtaskCounter {
        font-family: Plus Jakarta Sans;
        width: 100%;
        text-align: left;
        font-size: 0.75rem;
        font-weight: 700;
        line-height: normal;
        color: #828fa3;
      }
    }
  }
}
</style>
