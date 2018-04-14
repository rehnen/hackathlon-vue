<template>
    <div class="graph">
        <svg height=500 width=500>
            <circle cx="250" cy="250" r="200" stroke="black" stroke-width="3" fill="yellow" />
            <circle cx="180" cy="200" r="40" stroke="black" stroke-width="3" fill="black" />
            <circle cx="320" cy="200" r="40" stroke="black" stroke-width="3" fill="black" />
            <path d="M 100 350 q 150 -300 300 0" stroke="black"
                  stroke-width="5" fill="none" />
        </svg>
        <h3>{{score}}</h3>
    </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'Graph',
  data() {
    return {
      items: [
        { text: 1 },
        { text: 2 },
        { text: 3 },
        { text: 4 },
      ],
    };
  },
  props: ['score'],
  mounted() {
    console.log(this.score);
    const line = d3.line()
      .curve(d3.curveBasis);
    d3.select('path')
      .attr('d', line([
        [120, 325],
        [250, 250 + (this.score * 1.5)],
        [380, 325],
      ]));
  },
};
</script>

<style scoped>
    .graph {
        margin: 0 auto;
    }
    svg {
        margin: 0 auto;
    }
</style>
