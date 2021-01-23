<template>
    <p>{{msg}}</p>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    msg: String,
  },
})
export default class BaseButton extends Vue {
  msg!: string
}
</script>
