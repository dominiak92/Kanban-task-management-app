<template>
  <div class="registerWrapper">
    <p class="title">Register</p>
    <div class="text-center"></div>
    <div class="formWrapper">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="registrationInfo.name"
          :counter="15"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="registrationInfo.email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model="registrationInfo.password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          required
          :rules="passwordRules"
          counter
          @click:append="show1 = !show1"
        ></v-text-field>
        <v-text-field
          v-model="registrationInfo.passwordConfirmation"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show2 ? 'text' : 'password'"
          label="Confirm Password"
          required
          :rules="confirmPasswordRules"
          @click:append="show2 = !show2"
          @keyup.enter="validate"
        ></v-text-field>
        <div class="buttons">
          <v-btn
            :disabled="!valid"
            color="black"
            class="mr-4"
            @click="validate"
          >
            Submit
          </v-btn>

          <v-btn color="black" class="mr-4" @click="reset"> Reset </v-btn>
        </div>
      </v-form>
      <v-card>
        <v-snackbar
          v-model="snackbar"
          :timeout="3000"
          centered
          color="red accent-2"
        >
          The user already exists, or another error has occurred. Try again
        </v-snackbar>
      </v-card>
    </div>
    <v-progress-circular
      v-if="loading"
      class="progress"
      :size="80"
      :width="8"
      color="#7C5DFA"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      loading: false,
      show1: false,
      show2: false,
      valid: true,
      snackbar: false,
      registrationInfo: {
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      },
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 15) || "Must be less than 15 characters",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        (v) => !/\s/.test(v) || "E-mail cannot contain spaces",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) =>
          (v && v.length <= 20) || "Password must be less than 20 characters",
      ],
      confirmPasswordRules: [
        (v) => !!v || "Confirmation is required",
        (v) =>
          (v && v === this.registrationInfo.password) || "Passwords must match",
      ],
    };
  },

  methods: {
    async validate() {
      this.loading = true;
      if (this.$refs.form.validate()) {
        try {
          await this.registerUser(this.registrationInfo);
        } catch {
          this.snackbar = true;
        }
      }
      this.loading = false;
    },
    reset() {
      this.$refs.form.reset();
    },
    async registerUser(registrationInfo) {
      await this.$axios.post("/users", registrationInfo);
      this.$auth.loginWith("local", {
        data: registrationInfo,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/mixins.scss";
@import "../assets/breakpoints.scss";
.registerWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  .title {
    font-size: 34px;
    font-weight: 700;
    animation: myAnim 0.7s ease 0s 1 normal forwards;
  }
  .formWrapper {
    .buttons {
        margin-top: 1rem;
        width: 100%;
        display: flex;
        justify-content: space-evenly;
    }
    @include md {
      width: 30vw;
    }
  }
  .progress {
    position: absolute;
  }
}

@keyframes myAnim {
  0% {
    opacity: 0;
    transform: translateY(-150px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
