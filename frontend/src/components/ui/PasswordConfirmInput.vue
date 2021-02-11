<style lang="scss">
@use './base.scss' as b;
</style>

<template>
  <div class="input-group">
    <label for="passConfirm" class="form-label">Bekfreft Passord:</label>
    <input id="passConfirm" type="password"
    :class="{'invalid': passwordConfirmInvalid}"
    v-model="passwordConfirm"
    @blur="validatePasswordConfirm"
    @keydown="resetPasswordConfirmValidation"
    class="form-input">
    <div v-if="passwordConfirmInvalid && this.password !== ''"
    class="error">Ugyldig passord</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  data() {
    return {
      passwordConfirm: '',
      passwordConfirmInvalid: false,
    };
  },
  methods: {
    validatePasswordConfirm() {
      return this.passwordConfirm === this.password;
    },
    resetPasswordConfirmValidation() {
      this.passwordInvalid = false;
    },
  },
})
export default class PasswordConfirmInput extends Vue {
}
</script>
