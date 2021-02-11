<template>
  <div class="login">
      <RegisterForm></RegisterForm>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import RegisterForm from '@/components/ui/RegisterForm.vue';

@Options({
  components: {
    RegisterForm,
  },
})

export default class Home extends Vue {}
</script>
