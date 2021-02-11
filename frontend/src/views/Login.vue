<template>
  <div class="login">
      <LoginForm></LoginForm>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import LoginForm from '@/components/ui/LoginForm.vue';

@Options({
  components: {
    LoginForm,
  },
})

export default class Home extends Vue {}
</script>
