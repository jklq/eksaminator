<template>
<div class="panel">
  <h1>{{ `Hei, ${user.username}!` || 'Hei Sveis!'}}</h1>
</div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import LoginForm from '@/components/ui/LoginForm.vue';
import { isLoggedIn, getUser } from '../auth';

@Options({
  beforeCreate() {
    if (!isLoggedIn()) {
      this.$router.push('/login');
    }
  },
  components: {
    LoginForm,
  },
  data() {
    return {

    };
  },
  computed: {
    user() {
      return getUser() || false;
    },
  },
})

export default class Home extends Vue {}
</script>
