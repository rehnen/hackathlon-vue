<template>
    <div id="app" :style="bgc">
        <link href="https://fonts.googleapis.com/css?family=Josefin+Slab" rel="stylesheet">
        <div id="top">
            <span id="title">Bada.nu | Karlskrona</span>
        </div>
        <div id="main">
            <graph id="graph" :score="value.score"></graph>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Graph from '@/components/Graph.vue';

    export default {
        name: 'home',
        created() {
            console.log(this.$route.query);
            if(Object.keys(this.$route.query).length === 0) {
                this.apis.forEach((attribute) => {
                    this.$http.get(attribute.url)
                        .then((res) => {
                            const value = res.data.value;
                            this.value[attribute.key] = parseInt(value[value.length - 1].value);
                        });
                });
                this.calculateScore();
            }
        },
        components: {
          Graph
        },
        data(){
            return {
                value: {
                    airTemp: this.$route.query.airTemp ? parseInt(this.$route.query.airTemp) : 0,
                    oceanTemp: this.$route.query.oceanTemp ? parseInt(this.$route.query.oceanTemp) : 0,
                    precipitation: this.$route.query.precipitation ? parseInt(this.$route.query.precipitation) : 0,
                    score: 0,
                    wind: this.$route.query.wind ? parseInt(this.$route.query.wind) : 0,
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
            }
        },
        computed: {
            bgc() {
                return {
                    'background-color': numberToColorHsl(this.calculateScore())
                }
            },
        },
        methods: {
            calculateScore() {
                const airTemp = {
                    max: 25,
                    min: 10,
                    weight: 6,
                };
                const wind = {
                    max: 3,
                    min: 10,
                    weight: 4,
                };
                const precipitation = {
                    max: 0,
                    min: 5,
                    weight: 8,
                };

                const oceanTemp = {
                    max: 20,
                    min: 10,
                    weight: 12,
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
                return finalScore;
            },
        }
    };

    function hslToRgb(h, s, l) {
        let r, g, b;

        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            function hue2rgb(p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            }

            let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            let p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
    }

    function numberToColorHsl(i) {
        let hue = i * 1.2 / 360;
        let rgb = hslToRgb(hue, 1, .5);
        return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
    }
</script>

<style lang="less">
    html{
        height: 100%;
    }
    body, html {
        height: 100%;
        padding: 0;
        margin: 0;
    }

    #top {
        display: inline-block;
        background-color: #F0FBFF;
        height: 50px;
        width: 100%;
        border-bottom: #BDF5FF 1px solid;
        text-align: center;
    }

    #title {
        display: inline-block;
        margin-left: 2.4rem;
        padding-top: 15px;
        color: #1B2F33;
        font-weight: bold;
        font-size: large;
        font-family: 'Josefin Slab', Serif;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        display: block;
        margin-top: 0;
        width: 100%;
        height: 100%;
    }

    #main {
        height: calc(100% - 50px);
        width: 100%;
        display: inline-block;
        vertical-align: middle;
    }

    #graph {
        position: fixed;
        top: 50%;
        left: 51%;
        /* bring your own prefixes */
        transform: translate(-51%, -50%);
    }
</style>
