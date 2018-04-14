<template>
    <div class="stefan">{{value.score}}</div>
</template>

<script>
export default {
  name: 'stefan',
  created() {
    this.apis.forEach((attribute) => {
      this.$http.get(attribute.url)
        .then((res) => {
          const value = res.data.value;
          this.value[attribute.key] = parseInt(value[value.length - 1].value);
        });
    });
    this.calculateScore();

    // this.rotateData(0);
  },
  data() {
    return {
      value: {
        // airTemp: 18,
        // oceanTemp: 18,
        // precipitation: 0.5,
        // score: 0,
        // wind: 2,
        airTemp: 0,
        oceanTemp: 0,
        precipitation: 0,
        score: 0,
        wind: 0,
      },
      apis: [
        {
          url: 'https://opendata-download-metobs.smhi.se/api/version/latest/parameter/1/station/65090/period/latest-day/data.json',
          key: 'airTemp',
        },
        {
          url: 'https://opendata-download-metobs.smhi.se/api/version/latest/parameter/4/station/65090/period/latest-day/data.json',
          key: 'wind',
        },
        {
          url: 'https://opendata-download-metobs.smhi.se/api/version/latest/parameter/7/station/65090/period/latest-day/data.json',
          key: 'precipitation',
        },
        {
          url: 'https://opendata-download-ocobs.smhi.se/api/version/latest/parameter/5/station/2088/period/latest-day/data.json',
          key: 'oceanTemp',
        },
      ],
      mockData: [
        {
          airTemp: 18,
          oceanTemp: 18,
          precipitation: 0.5,
          score: 0,
          wind: 2,
        },
        {
          airTemp: 25,
          oceanTemp: 19,
          precipitation: 0,
          score: 0,
          wind: 5,
        },
        {
          airTemp: 17,
          oceanTemp: 17,
          precipitation: 3,
          score: 0,
          wind: 1,
        },
        {
          airTemp: 26,
          oceanTemp: 20,
          precipitation: 0,
          score: 0,
          wind: 7,
        },
        {
          airTemp: 30,
          oceanTemp: 21,
          precipitation: 0,
          score: 0,
          wind: 9,
        },
      ],
    };
  },
  methods: {
    calculateScore() {
      const airTemp = {
        max: 25,
        min: 10,
        weight: 1,
      };
      const wind = {
        max: 3,
        min: 10,
        weight: 1,
      };
      const precipitation = {
        max: 0,
        min: 5,
        weight: 1,
      };

      const oceanTemp = {
        max: 20,
        min: 10,
        weight: 1,
      };

      let finalScore = 0;
      let airTempScore = (25 / (airTemp.max - airTemp.min))
            * (this.value.airTemp - airTemp.min);
      airTempScore = airTempScore > 25 ? 25 : airTempScore;

      let windScore = (25 / (wind.min - wind.max))
            * (wind.min - this.value.wind);
      windScore = windScore > 25 ? 25 : windScore;

      let precipitationScore = (25 / (precipitation.min - precipitation.max))
            * (precipitation.min - this.value.precipitation);
      precipitationScore = precipitationScore > 25 ? 25 : precipitationScore;

      let oceanTempScore = (25 / (oceanTemp.max - oceanTemp.min))
            * (this.value.oceanTemp - oceanTemp.min);
      oceanTempScore = oceanTempScore > 25 ? 25 : oceanTempScore;

      if (this.value.airTemp >= airTemp.min && this.value.wind <= wind.min
            && this.value.precipitation <= precipitation.min
            && this.value.oceanTemp >= oceanTemp.min) {
        finalScore = 4
              * (((airTempScore * airTemp.weight)
              + (windScore * wind.weight)
              + (precipitationScore * precipitation.weight)
              + (oceanTempScore * oceanTemp.weight))
              / (airTemp.weight + wind.weight + precipitation.weight + oceanTemp.weight));
      }

      console.log(finalScore);
      this.value.score = finalScore;
    },
    rotateData(index) {
      this.value = this.mockData[index];
      if (index !== 4) {
        setTimeout(() => {
          this.calculateScore();
          this.rotateData(index + 1);
        }, 1000);
      }
    },
  },
};
</script>

<style scoped>
    .stefan {
        font-size: 80px;
    }
</style>
