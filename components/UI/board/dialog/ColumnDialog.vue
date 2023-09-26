<template>
  <v-card class="dialog">
    <div class="titleDots">
      <h2 class="title">{{ task.title }}</h2>
      <DialogDots :column="column" :task="task" />
    </div>
    <p class="description">{{ task.description }}</p>
    <p class="subtaskCounter">{{ subtaskCounter(task) }}</p>
    <div class="checkbox" v-for="subtask in task.subtasks" :key="subtask._id">
      <v-checkbox
        v-model="isCompleted"
        hide-details
        color="#635FC7"
        dense
        :style="{ margin: '0', padding: '0' }"
        :label="subtask.title"
      ></v-checkbox>
    </div>
    <p class="subtaskCounter">Current status</p>
    <v-select v-model="task.status" :items="statuses" outlined light></v-select>
  </v-card>
</template>

<script>
import DialogDots from "./DialogDots.vue";
export default {
  name: "ColumnDialog",
  components: {
    DialogDots,
  },
  props: {
    column: {
      type: Object,
    },
    task: {
      type: Object,
    },
  },

  data() {
    return {
      dialog: false,
      isCompleted: true,
      statuses: ["Todo", "Doing", "Done"],
    };
  },

  methods: {
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
.dialog {
  padding: 1.5rem;
  .titleDots {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;

    .title {
      font-size: 1.125rem;
    }
  }

  .description {
    color: #828fa3;
    font-size: 0.8125rem;
  }
  .subtaskCounter {
    font-size: 0.75rem;
    margin-bottom: 1rem;
    color: #828fa3;
    margin-top: 1.5rem;
  }
  .checkbox {
    display: flex;
    align-items: center;
    background-color: #f4f7fd;
    border-radius: 0.25rem;
    padding: 1rem;
    margin: 0;
    margin-bottom: 0.5rem;
  }
}
</style>
