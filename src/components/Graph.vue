<template>
    <div class="graph">
    </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'Graph',
  data() {
    return {
    };
  },
  mounted() {
    const items = [
      { text: 1 },
      { text: 2 },
      { text: 3 },
      { text: 4 },
    ];
    const p = d3.select('body')
      .selectAll('p');

    p.data(items)
      .enter()
      .append('p')
      .merge(p)
      .text(d => d.text);
    console.log(d3.selectAll('p'));
  },
};
</script>

<style scoped>
</style>
