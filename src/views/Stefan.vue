<template>
    <div class="stefan">
        <h1>This is stefan</h1>
        <table>
            <tr class="header">
                <th>Date</th>
                <th>Air Temperature</th>
                <th>Wind</th>
                <th>Precipitation</th>
            </tr>
            <tr v-for="value in values" :key="value.date">
                <th>{{new Date(value.date)}}</th>
                <th>{{value.airTemp}}</th>
                <th>{{value.wind}}</th>
                <th>{{value.precipitation}}</th>
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
        result.body.value.forEach((value) => {
          this.values.push({
            date: new Date(value.date),
            airTemp: value.value,
            wind: '',
            precipitation: '',
          });
        });
      });


    this.apis.forEach((attribute) => {
      this.$http.get(attribute.url)
        .then((result) => {
          console.log(result);
          result.body.value.forEach((value, i) => {
            this.values[i][attribute.key] = value.value;
          });
        });
    });
  },
  data() {
    return {
      values: [],
      apis: [
        {
          url: 'https://opendata-download-metobs.smhi.se/api/version/latest/parameter/21/station/65090/period/latest-day/data.json',
          key: 'wind',
        },
        {
          url: 'https://opendata-download-metobs.smhi.se/api/version/latest/parameter/7/station/65090/period/latest-day/data.json',
          key: 'precipitation',
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>
