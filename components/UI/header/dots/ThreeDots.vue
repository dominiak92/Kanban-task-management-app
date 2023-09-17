<template>
  <v-menu
    :value="menu"
    @input="menu = $event"
    bottom
    origin="center center"
    transition="scale-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <fa
        v-bind="attrs"
        v-on="on"
        class="dots"
        :style="{ color: '#828FA3' }"
        :icon="['fa', 'ellipsis-vertical']"
      />
    </template>
    <v-card class="mx-auto" width="300" tile>
      <v-list light rounded>
        <div class="btns">
          <DeleteBoard @update:dialog="menu = $event" />
          <EditBoard />
        </div>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import DeleteBoard from "./DeleteBoard.vue";
import EditBoard from "./EditBoard.vue";

export default {
  name: "ThreeDots",
  components: {
    DeleteBoard,
    EditBoard,
  },

  data() {
    return {
      valid: true,
      menu: false,
      attrs: {},
      on: {},
    };
  },
  computed: {},
  watch: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "/assets/breakpoints.scss";
@import "/assets/mixins.scss";
.dialog {
  padding: 1.2rem;
}
.dotBtn {
  min-width: 0.5rem;
  height: 0.5rem;
  .dots {
    box-sizing: content-box;
    padding: 0.3rem;
    font-size: 20px;
  }
}

.btns {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
