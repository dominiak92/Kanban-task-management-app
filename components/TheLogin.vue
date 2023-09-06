<template>
  <div class="loginWrapper">
    <p class="title">Login</p>
    <div class="formWrapper">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          required
          :rules="passwordRules"
          counter
          @click:append="show1 = !show1"
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
          :timeout="2000"
          centered
          class="alert"
          color="#7c003e"
        >
          Login failed, please try again
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
import { faAlignCenter } from '@fortawesome/free-solid-svg-icons';

export default {
  name: "Login",
  data: () => ({
    loading: false,
    show1: false,
    valid: true,
    email: "admin@gmail.com",
    snackbar: false,
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    password: "123456",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) =>
        (v && v.length <= 10) || "Password must be less than 20 characters",
    ],
  }),
  methods: {
    async validate() {
      this.loading = true;
      try {
        if (this.$refs.form.validate()) {
          await this.$auth.loginWith("local", {
            data: {
              email: this.email,
              password: this.password,
            },
          });
        }
      } catch {
        this.snackbar = true;
      }
      this.loading = false;
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/mixins.scss";
@import "../assets/breakpoints.scss";
.loginWrapper {
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
