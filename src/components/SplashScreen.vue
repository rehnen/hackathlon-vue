<template>
    <div class="splash-screen">
        <graph></graph>
    </div>
</template>

<script>
import Graph from '@/components/Graph.vue';

export default {
  name: 'splash-screen',
  props: ['score'],
  data() {
    return {
      rotation: {
        transform: 'rotate(0deg)',
      },
    };
  },
  components: {
    Graph,
  },
  mounted() {
    const score = 40;
    this.rotation.transform = score > 50 ? `rotate(${this.getDegrees(90)}deg` : 'scaleY(-1)';
    this.$http.get('https://api.github.com/users/rehnen/repos')
      .then(console.log);
  },

  methods: {
    getDegrees(score) {
      return 180 - ((180 / 100) * score);
    },
  },
};

</script>

<style scoped lang="less">
    .splash-screen{
        display: block;
        width: 300px;
        height: 200px;
    }
</style>
