<style lang="scss">
@use './base.scss' as b;

.image-and-captions {
    display:grid;
    grid-template-columns: auto auto;
    margin-top: 50px;
    margin-bottom: 50px;
}
.image-and-captions h2 {
    margin: 0;
}
.image-and-captions .captions {
  display: grid;
  place-items: center;
  padding: 0 b.$sectionPadding/2;
}
.image-and-captions img {
  float:right;
  border-radius: b.$borderRadius;
}
</style>

<template>
    <section class="image-and-captions">
        <div class="col captions">
          <div>
            <slot>
              <h2>Section Title</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Temporibus ipsum minus vero, dolore perspiciatis ratione accusantium
                rem omnis iure eum und
              </p>
            </slot>
          </div>
        </div>
        <div class="col image">
            <img :src="img || 'https://via.placeholder.com/450x220'" alt="">
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
export default class ImageAndCaptions extends Vue {
  img!: string
}
</script>
