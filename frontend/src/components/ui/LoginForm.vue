<style lang="scss">
    @use './base.scss' as b;

    .error {
       color: rgb(255, 55, 55);
       max-width: 500px;
       display: inline-block;
       margin-top: 6px;
       font-weight: bold;
    }
    .login-form {
        max-width: 400px;
        display: block;
    }
    .button {
        margin-right: 10px;
    }
    .email-invalid, .password-invalid {
      border-color: red;
    }
</style>

<template>
    <div class="login-form">
        <BaseForm>
            <EmailInput />
            <PasswordInput />
            <BaseButton class="button"
            @click="login" t="submit">Logg Inn!</BaseButton>
            <BaseButton t="default" href="/register">Registrer deg</BaseButton>
            <div class="error">{{error}}</div>
            <BaseLoader :active='loading' />
        </BaseForm>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import axios from 'axios';
import BaseForm from './BaseForm.vue';
import BaseButton from './BaseButton.vue';
import BaseLoader from './BaseLoader.vue';
import EmailInput from './EmailInput.vue';
import PasswordInput from './PasswordInput.vue';
import { saveToken, isLoggedIn } from '../../auth';

@Options({
  beforeCreate() {
    if (isLoggedIn()) {
      this.$router.push('/panel');
    }
  },
  mounted() {
    const loginFunction = this.login;
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Enter') loginFunction();
    });
  },
  components: {
    BaseForm,
    BaseButton,
    BaseLoader,
    EmailInput,
    PasswordInput,
  },
  data() {
    return {
      loading: false,
      email: '',
      password: '',
      res: null,
      error: null,
    };
  },
  methods: {
    login() {
      this.validateEmail();
      this.validatePassword();

      if (!this.passwordInvalid && !this.emailInvalid) {
        this.loading = true;

        axios.post(`http://localhost:7071/api/Login?email=${encodeURIComponent(this.email)}&password=${encodeURIComponent(this.password)}`).then((res) => {
          saveToken(res.data);
          this.loading = false;
          this.$router.push('/panel');
        }).catch((err) => {
          console.log('YOOOO');
          this.error = 'Feil passord eller e-post!';
          this.loading = false;
        });
      }
    },
  },
  props: {
    t: String,
    value: String,
  },
})
export default class LoginForm extends Vue {
  t!: string

  value!: string
}
</script>
