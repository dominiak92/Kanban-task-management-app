<template>
  <div>
    <v-dialog
      v-model="dialog"
      light
      transition="slide-x-transition"
      width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <fa
          v-if="$auth.loggedIn"
          class="dots"
          v-bind="attrs"
          @click="logout"
          :style="{ color: '$mediumgrey' }"
          :icon="['fa', 'right-from-bracket']"
        />

        <fa
          v-else
          class="dots"
          v-bind="attrs"
          v-on="on"
          :style="{ color: '$mediumgrey' }"
          :icon="['fa', 'right-to-bracket']"
        />
      </template>
      <v-card class="dialog">
        <component :is="activeComponent"></component>
        <v-btn
          v-if="!activeComponent"
          @click="showLogin"
          class="btn"
          block
          color="accent"
          elevation="6"
          large
          plain
          raised
          ><fa class="icon" :icon="['fa', 'right-to-bracket']" />Login
        </v-btn>
        <v-btn
          v-if="!activeComponent"
          @click="showRegister"
          class="btn"
          block
          color="accent"
          elevation="6"
          large
          plain
          raised
          ><fa class="icon" :icon="['fa', 'list-check']" />Register</v-btn
        >
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import TheLogin from "../TheLogin.vue";
import TheRegister from "../TheRegister.vue";
export default {
  name: "LoginRegister",
  components: {
    TheLogin,
    TheRegister,
  },

  data() {
    return {
      dialog: false,
      valid: true,
      menu: false,
      activeComponent: null,
      attrs: {},
      on: {},
    };
  },
  computed: {},
  watch: {
    dialog(newVal) {
      if (!newVal) {
        setTimeout(() => {
          this.resetActiveComponent();
        }, "500");
      }
    },
    "$auth.loggedIn"(loggedIn) {
      if (loggedIn) {
        this.dialog = false;
      } else {
        this.dialog = false;
      }
    },
  },

  methods: {
    showLogin() {
      this.activeComponent = "the-login";
    },
    showRegister() {
      this.activeComponent = "the-register";
    },
    resetActiveComponent() {
      this.activeComponent = null;
    },
    ...mapActions("user", ["logout"]),
  },
};
</script>

<style lang="scss" scoped>
@import "./assets/breakpoints.scss";
@import "./assets/mixins.scss";
.dialog {
  padding: 1.2rem;
  .btn {
    font-family: $font;
    font-weight: 700;
    .icon {
      margin-right: 0.5rem;
    }
  }
}
.loggedIn {
  position: absolute;
}

.dots {
  font-size: 20px;
}
</style>
