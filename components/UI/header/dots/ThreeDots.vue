<template>
  <v-menu :value="menu" @input="menu = $event" bottom origin="center center" transition="scale-transition">
    <template v-slot:activator="{ on, attrs }">
      <fa
        class="dots"
        v-bind="attrs"
        v-on="on"
        :style="{ color: '#828FA3' }"
        :icon="['fa', 'ellipsis-vertical']"
      />
    </template>
    <v-card class="mx-auto" width="300" tile>
      <v-list light rounded>

          <DeleteBoard @update:dialog="menu = $event"/>
          <EditBoard/>

      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import DeleteBoard from './DeleteBoard.vue';
import EditBoard from './EditBoard.vue';


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

.dots {
  font-size: 20px;
}


</style>
