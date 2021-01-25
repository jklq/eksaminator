<style lang="scss">
.image-and-captions {
    display:grid;
    grid-template-columns: 50% 50%;
    margin: 10px inherit;
}
.image-and-captions h2 {
    margin: 0;
}
</style>

<template>
    <section class="image-and-captions">
        <div class="col captions">
            <h2>UltraKalkulator</h2>
        </div>
        <div class="col image">
            <img src="https://via.placeholder.com/400x225" alt="">
        </div>
    </section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    img: String,
  },
})
export default class BaseButton extends Vue {
  img!: string
}
</script>
