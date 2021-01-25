<style lang="scss">
</style>

<template>
  <div class="home">
  <BaseHero>
    <h1>Din Personlige <span class="block">Eksamen-hjelper</span></h1>
    <p>Vi kommer med redskapene du trenger for å forbrede til matematikkeksamen! </p>
    <!-- <HelloWorld msg="hello" /> -->
    <BaseButton t="primary">Lag en gratis bruker</BaseButton>
    <BaseButton t="default">Logg inn</BaseButton>
  </BaseHero>
  <Announcement t="warning">
    <strong>OBS: </strong> Eksaminator er fortsatt under tidlig utvikling!
  </Announcement>
  <ImageAndCaptions>
  </ImageAndCaptions>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue';// @ is an alias to /src
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseHero from '@/components/ui/BaseHero.vue';
import Announcement from '@/components/ui/Announcement.vue';
import ImageAndCaptions from '@/components/ui/ImageAndCaptions.vue';

@Options({
  components: {
    HelloWorld,
    BaseButton,
    BaseHero,
    Announcement,
    ImageAndCaptions,
  },
})
export default class Home extends Vue {}
</script>
