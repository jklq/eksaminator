<style lang="scss">
@use './base.scss' as b;

.btn {
  box-sizing: border-box !important;
  display: inline-block;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: b.$secondaryBorderRadius;
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

.btn-primary, .btn-submit {
  background-color: b.$primaryColor;
  color: #fff;
}
.btn-primary:hover, .btn-submit:hover {
  background-color: b.$primaryHoverColor;
}
.btn-submit {
  text-align: center;
  padding: 10px 30px;
}
</style>

<template>
    <a
    @click="changeRoute(href)"
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
  methods: {
    changeRoute(route) {
      if (route) {
        this.$router.push({ path: route });
      }
    },
  },
  props: {
    href: String,
    t: String,
    value: String,
  },
})
export default class BaseButton extends Vue {
  t!: string

  href: string

  value!: string
}
</script>
