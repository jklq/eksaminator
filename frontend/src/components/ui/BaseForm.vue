<style lang="scss">
    @use './base.scss' as b;
    .form {
        font-family: Arial, Helvetica, sans-serif !important;
        max-width: 700px;
        color: b.$textColor;
    }
    .form-title {
        font-size: 2em;
    }
    .form-label {
        display:block;
        padding-bottom: 4px;
        color: #001141;
        font-weight: bold;
    }
    .form-input {
        padding: 6px 5px;
        border-radius: b.$secondaryBorderRadius;
        border: #dfdff0 2px solid;
        font-size: 1em;
        width: 100%;
    }
    .input-group {
        margin-bottom: 15px;
    }

    @media (min-width: 30rem) {
        .form-split {
            display: grid;
            grid-auto-flow: column;
            column-gap: 20px;
        }
    }
</style>

<template>
    <div class="form">
    <slot>
        <form action="">
        <div class="input-group">
            <label for="username" class="form-label">Brukernavn:</label>
            <input id="username" type="text" class="form-input">
        </div>
        <div class="input-group">
           <label for="email" class="form-label">E-post</label>
            <input id="email" type="email" class="form-input">
        </div>
        <div class="input-group">
            <label for="pass" class="form-label">Nytt passord:</label>
            <input id="pass" type="password" class="form-input">
        </div>
        <div class="input-group">
            <label for="pass-confirm" class="form-label">Bekreft passord:</label>
            <input id="pass-confirm" type="password"  class="form-input">
        </div></form>
    </slot>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  data() {
    return {

    };
  },
  props: {
    t: String,
    value: String,
  },
})
export default class BaseForm extends Vue {
  t!: string

  value!: string
}
</script>
