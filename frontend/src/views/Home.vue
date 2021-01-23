<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="hello" />
    <BaseButton msg="he" />
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
