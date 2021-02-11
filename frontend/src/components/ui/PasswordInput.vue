<style lang="scss">
@use './base.scss' as b;
</style>

<template>
  <div class="input-group">
    <label for="pass" class="form-label">Passord:</label>
    <input id="pass" type="password"
    v-model="password"
    :class="{'invalid': passwordInvalid}"
    @blur="validatePassword"
    @keydown="resetPasswordValidation"
    class="form-input">
    <div v-if="passwordInvalid && this.password !== ''"
    class="error">Ugyldig passord</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import validator from 'validator';

@Options({
  data() {
    return {
      password: '',
      passwordInvalid: false,
    };
  },
  methods: {
    validatePassword() {
      const valid = validator.isLength(this.password, { max: 35 })
        && validator.isStrongPassword(this.password, { minSymbols: 0, maxLength: 30 });

      if (valid) {
        this.passwordInvalid = false;
      } else {
        this.passwordInvalid = true;
      }
    },
    resetPasswordValidation() {
      this.passwordInvalid = false;
    },
  },
})
export default class PasswordInput extends Vue {
}
</script>
