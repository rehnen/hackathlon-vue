<template>
  <div class="home">
    <splash-screen />
  </div>
</template>

<script>
// @ is an alias to /src
import SplashScreen from '@/components/SplashScreen.vue';

export default {
  name: 'home',
  components: {
    SplashScreen,
  },
};
</script>
