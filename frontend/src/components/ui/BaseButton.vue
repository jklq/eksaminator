<style lang="scss">
@use './vars.scss' as vars;

.btn {
  box-sizing: border-box !important;
  display: inline-block;
  text-decoration: none;
  padding: 8px 22px;
  border-radius: 8px;
  font-size: 1.45em;
  transition: 100ms;
  cursor: pointer;
  border-style: solid;
  border-width: 2px;
}
.btn-default {
  color: #000;
}
.btn-default:hover {
  background-color: vars.$secondaryHoverColor;
}
.btn-primary {
  border-color:  rgb(165, 0, 0);
  background-color: vars.$primaryColor;
  color: #fff;
}
.btn-primary:hover {
  background-color: vars.$primaryHoverColor;
}
</style>

<template>
    <a
    class="btn"
    :class="['btn-' + t]"> <slot></slot> </a>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    t: String,
    value: String,
  },
})
export default class BaseButton extends Vue {
  t!: string

  value!: string
}
</script>
