<template>
  <v-dialog
    v-model="dialog"
    light
    transition="slide-x-transition"
    width="300px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        color="#ED4337"
        :style="{ color: '#ffffff' }"
        block
        elevation="2"
        raised
        rounded
      >
        <v-icon left> mdi-text-box-remove-outline</v-icon>delete board</v-btn
      >
    </template>
    <v-card class="dialog">
      <v-card-title class="text-h5 grey lighten-2">
        Confirm Deletion
      </v-card-title>

      <v-card-text>
        Are you sure you want to delete board
        <strong>{{ currentBoardName }}</strong
        >? This action cannot be undone.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          v-bind="attrs"
          :style="{ color: '#7E88C3', marginRight: '1rem' }"
          light
          rounded
          color="#F9FAFE"
          large
          v-on="on"
          @click="dialog = false"
        >
          cancel</v-btn
        >
        <v-btn @click="deleteBoard" v-bind="attrs" dark rounded color="#EC5757" large v-on="on">
          delete</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "DeleteBoard",

  data() {
    return {
      dialog: false,
      attrs: {},
      on: {},
    };
  },
  computed: {
    ...mapGetters("board", ["currentBoardName", "currentBoardId"]),
  },
  methods: {
    async deleteBoard() {
      await this.$store.dispatch("board/deleteBoard", this.currentBoardId);
      await this.$store.dispatch("board/fetchBoards");
      this.dialog = false;
      this.$emit('update:dialog', this.dialog);

    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/breakpoints.scss";
@import "/assets/mixins.scss";
</style>
