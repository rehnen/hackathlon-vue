<template>
    <div class="splash-screen">
        <h1>Test</h1>
        <graph></graph>
    </div>
</template>

<script>
import Graph from '@/components/Graph.vue';

export default {
  name: 'splash-screen',
  components: {
    Graph,
  },
  created() {
    this.$http.get('https://api.github.com/users/rehnen/repos')
      .then(console.log);
  },
};
</script>

<style scoped lang="less">

</style>
