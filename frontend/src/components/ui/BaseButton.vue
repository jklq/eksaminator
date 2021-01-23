<style lang="scss">
.btn {
  text-decoration: none;
  padding: 8px 22px;
  border-radius: 8px;
  font-size: 1.45em;
  transition: 100ms;
  cursor: pointer;
}
.btn-primary {
  border:  rgb(165, 0, 0) solid 2px;
  background-color: rgb(180, 0, 0);
  color: #fff;
}
.btn-primary:hover {
  background-color: rgb(161, 0, 0);
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
