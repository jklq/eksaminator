<style lang="scss">

.announcement {
  background-color: #a7f0ba;
  text-align: center;
  font-weight: 500;
  padding: 1rem 4rem;
  text-align: center;
  border-radius: 0 0 10px 10px;
}
.warning {
  background-color: #eff0a7;
}
.danger {
    background-color: #f0a7a7;
}
</style>

<template>
  <section class="announcement" :class="[t]">
    <div class="captions">
      <slot></slot>
    </div>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    t: String,
  },
})
export default class BaseAnnouncement extends Vue {
  t!: string
}
</script>
