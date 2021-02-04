<style lang="scss">
@use './base.scss' as b;

.btn {
  box-sizing: border-box !important;
  display: inline-block;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 7px;
  transition: 100ms;
  cursor: pointer;
}
.btn-default {
  padding: 8px 12px;
  color: b.$primaryColor;
  text-decoration: underline;
}
.btn-default:hover {
  background-color: b.$secondaryHoverColor;
}

.btn-primary {
  background-color: b.$primaryColor;
  color: #fff;
}
.btn-primary:hover {
  background-color: b.$primaryHoverColor;
}
</style>

<template>
    <a
    @click="changeRoute()"
    class="btn"
    :class="['btn-' + t]"> <slot>Button!</slot> </a>
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
export default class BaseButton extends Vue {
  t!: string

  value!: string
}
</script>
