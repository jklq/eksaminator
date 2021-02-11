<style lang="scss">
    @use './base.scss' as b;
    .shadow {
        background-color: rgba($color: #fff, $alpha: 0.7);
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
    }
    .lds-ring {
      display: inline-block;
      position: absolute;
      width: 80px;
      height: 80px;
      left: calc(50vw - 40px);
      top: calc(50vh - 40px);
    }
    .lds-ring div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 72px;
      height: 72px;
      margin: 8px;
      border: 6px solid b.$primaryColor;
      border-radius: 50%;
      animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: b.$primaryColor transparent transparent transparent;
    }
    .lds-ring div:nth-child(1) {
      animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
      animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
      animation-delay: -0.15s;
    }
    @keyframes lds-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
</style>

<template>
<div class="shadow" v-if="active">
<div class="lds-ring"><div></div><div></div><div></div><div></div></div>
</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {
  },
  data() {
    return {

    };
  },
  methods: {
  },
  props: {
    active: Boolean,
  },
})
export default class BaseLoader extends Vue {
  active!: boolean
}
</script>
