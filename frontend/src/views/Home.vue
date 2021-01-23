<style lang="scss">
.red {
  color: rgb(180, 0, 0);
}
</style>

<template>
  <div class="home">
    <h1><span class="red">Eksiminator</span> - Vær klar for eksamen</h1>
    <!-- <HelloWorld msg="hello" /> -->
    <BaseButton t="primary">Lag en gratis bruker</BaseButton>
    <BaseButton t="default">Logg inn</BaseButton>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue';// @ is an alias to /src
import BaseButton from '@/components/ui/BaseButton.vue';

@Options({
  components: {
    HelloWorld,
    BaseButton,
  },
})
export default class Home extends Vue {}
</script>
