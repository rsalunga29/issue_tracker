<template>
  <ValidationObserver v-slot="{ invalid, validated }">
    <div class="columns is-flex is-flex-direction-column is-align-items-center">
      <div
        class="column is-4"
        style="margin-top: -3.25rem;"
      >
        <div class="card has-background-light">
          <div class="card content p-3">
            <form @submit.prevent="login">
              <ValidationProvider
                name="email"
                rules="required|email"
                immediate
              >
                <b-field
                  label="Email"
                  class="mb-4"
                  slot-scope="{ errors, valid }"
                  :type="valid ? 'is-success' : ''"
                >
                  <b-input
                    type="email"
                    v-model="email"
                    :validation-message="errors[0]"
                  />
                </b-field>
              </ValidationProvider>

              <ValidationProvider
                name="password"
                rules="required"
                immediate
              >
                <b-field
                  label="Password"
                  class="mb-4"
                  slot-scope="{ errors, valid }"
                  :type="valid ? 'is-success' : ''"
                >
                  <b-input
                    type="password"
                    v-model="password"
                    :validation-message="errors[0]"
                  />
                </b-field>
              </ValidationProvider>

              <b-button
                type="is-success is-fullwidth"
                native-type="submit"
                :disabled="invalid || !validated"
              >Login</b-button>
            </form>

            <p class="is-size-7 has-text-centered mt-2">
              Don't have an account?
              <router-link to="/auth/register">Register now</router-link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { required, email } from 'vee-validate/dist/rules';

extend('email', email);
extend('required', {
  ...required,
  message: 'This field is required.',
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },

  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    login() {
      this.$store.dispatch('auth/login', {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>
