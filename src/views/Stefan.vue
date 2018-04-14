<template>
    <div class="stefan">
        <h1>This is stefan</h1>
        <table>
            <tr class="header">
                <th>Date</th>
                <th>Air Temperature</th>
                <th>Wind</th>
                <th>Precipitation</th>
                <th>Ocean Temperature</th>
                <th>Score</th>
            </tr>
            <tr v-for="value in values" :key="value.date">
                <th>{{new Date(value.date)}}</th>
                <th>{{value.airTemp}}</th>
                <th>{{value.wind}}</th>
                <th>{{value.precipitation}}</th>
                <th>{{value.oceanTemp}}</th>
                <th>{{value.score}}</th>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
  name: 'stefan',
  created() {
    this.$http.get('https://opendata-download-metobs.smhi.se/api/version/latest/parameter/1/station/65090/period/latest-day/data.json')
      .then((result) => {
        result.data.value.forEach((value) => {
          this.values.push({
            date: value.date,
            airTemp: value.value,
            wind: '',
            precipitation: '',
            oceanTemp: '',
            score: '',
          });
        });
        this.apis.forEach((attribute) => {
          this.$http.get(attribute.url)
            .then((res) => {
              res.data.value.forEach((value, i) => {
                this.values[i][attribute.key] = value.value;
              });
            });
        });
        this.calculateScore();
      });
  },
  data() {
    return {
      values: [],
      apis: [
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
    };
  },
  methods: {
    formatDate(date) {
      return new Date(date);
    },
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

      this.values.forEach((value, i) => {
        let finalScore = 0;
        let airTempScore = (25 / (airTemp.max - airTemp.min))
            * (value.airTemp - airTemp.min);
        airTempScore = airTempScore > 25 ? 25 : airTempScore;

        let windScore = (25 / (wind.min - wind.max))
            * (wind.min - value.wind) * wind.weight;
        windScore = windScore > 25 ? 25 : windScore;

        let precipitationScore = (25 / (precipitation.max - precipitation.min))
            * (precipitation.min - value.precipitation) * precipitation.weight;
        precipitationScore = precipitationScore > 25 ? 25 : precipitationScore;

        let oceanTempScore = (25 / (oceanTemp.max - oceanTemp.min))
            * (value.oceanTemp - oceanTemp.min) * oceanTemp.weight;
        oceanTempScore = oceanTempScore > 25 ? 25 : oceanTempScore;

        if (value.airTemp >= airTemp.min && value.wind <= wind.min
              && value.precipitation <= precipitation.min && value.oceanTemp >= oceanTemp.min) {
          finalScore = (airTempScore + windScore + precipitationScore + oceanTempScore) /
                (airTemp.weight + wind.weight + precipitation.weight + oceanTemp.weight);
        }

        this.values[i].score = finalScore;
      });
    },
  },
};
</script>

<style scoped>

</style>
