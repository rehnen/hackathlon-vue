<template>
    <div id="background">
        <ul>
            <li v-for="item in items" :style="item">
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'background',
        data() {
          return {
            items: [],
          };
        },
        created(){
            for (let i=0; i<=100; i++) {
                this.items.push(`background-color: ${numberToColorHsl(i)}`);
            }
        }
    };

    function hslToRgb(h, s, l){
        let r, g, b;

        if(s === 0){
            r = g = b = l; // achromatic
        }else{
            function hue2rgb(p, q, t){
                if(t < 0) t += 1;
                if(t > 1) t -= 1;
                if(t < 1/6) return p + (q - p) * 6 * t;
                if(t < 1/2) return q;
                if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }

            let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            let p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
    }

    function numberToColorHsl(i) {
        let hue = i * 1.2 / 360;
        let rgb = hslToRgb(hue, 1, .5);
        return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
    }
</script>

<style scoped>
    li{
        display: block;
        float: left;
        width: 50px;
        height: 50px;
        margin: 2px;
    }
</style>