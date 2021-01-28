<style lang="scss">
@use './base.scss' as b;

.cta-1 {
  background-color: b.$backgroundColor;
  display: grid;
  place-items: center middle;
  text-align: center;
  padding: b.$sectionPadding;
  border-radius: b.$borderRadius;
}
.cta-1 h2 {
  color: b.$primaryColorDark;
  font-size: 1.8em;
  margin: 0;
  margin-bottom: 20px;
}
.cta-1 a {
  margin-left: 10px;
}

</style>

<template>
  <section class="cta-1">
    <div>
      <slot>
          <h2>Er du klar til å begynne?</h2>
          <BaseButton t="primary">Lag en ny bruker</BaseButton>
          <BaseButton t="default">Les mer</BaseButton>
      </slot>
    </div>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BaseButton from './BaseButton.vue';

@Options({
  props: {
    type: String,
  },
  components: {
    BaseButton,
  },
})

export default class BaseCTA extends Vue {
  type!: string
}
</script>
