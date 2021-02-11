<style lang="scss">
@use './base.scss' as b;
</style>

<template>
  <div class="input-group">
    <label for="email" class="form-label">E-post:</label>
    <input id="email" type="email"
     v-model="email"
     :class="{'invalid': emailInvalid}"
     @blur="validateEmail"
     @keydown="resetEmailValidation"
     class="form-input">
    <span v-if="emailInvalid && this.email !== ''"
    class="error">Ugyldig epost</span>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import validator from 'validator';

@Options({
  data() {
    return {
      email: '',
      emailInvalid: false,
    };
  },
  methods: {
    validateEmail() {
      if (validator.isEmail(this.email)) {
        this.emailInvalid = false;
      } else {
        this.emailInvalid = true;
      }
    },
    resetEmailValidation() {
      this.emailInvalid = false;
    },
  },
})
export default class EmailInput extends Vue {
}
</script>
