<template>
  <div class="home">
  <section>
  <BaseButton t="primary">Logg inn!</BaseButton>
  </section>
  <BaseHero>
    <h1>Din Personlige <span class="block">Eksamen-hjelper</span></h1>
    <p>Vi kommer med redskapene du trenger for å forbrede deg til matteeksamen! </p>
    <BaseButton t="primary">Lag en gratis bruker</BaseButton>
    <BaseButton t="default">Logg inn</BaseButton>
  </BaseHero>
  <BaseAnnouncement t="warning">
    <strong>OBS: </strong> Eksaminator er fortsatt under tidlig utvikling!
  </BaseAnnouncement>
  <ImageAndCaptions img="https://via.placeholder.com/450x225">
      <h2>UltraKalkulator&trade;</h2>
      <p>
        Med UltraKalkulator&trade; kan du lett få svar på alle slags mattespørsmål.
        Kalkulatoren kan også bli brukt med bare tastaturet for ekstra effektivitet.
      </p>
  </ImageAndCaptions>
  <BaseCTA>
      <h2>Er du klar til å begynne?</h2>
      <BaseButton t="primary">Lag en ny bruker</BaseButton>
      <BaseButton t="default">Les mer</BaseButton>
  </BaseCTA>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue';// @ is an alias to /src
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseHero from '@/components/ui/BaseHero.vue';
import BaseAnnouncement from '@/components/ui/BaseAnnouncement.vue';
import ImageAndCaptions from '@/components/ui/ImageAndCaptions.vue';
import BaseCTA from '@/components/ui/BaseCTA.vue';

@Options({
  components: {
    HelloWorld,
    BaseButton,
    BaseHero,
    BaseAnnouncement,
    ImageAndCaptions,
    BaseCTA,
  },
})

export default class Home extends Vue {}
</script>
