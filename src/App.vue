<template>
    <div id="app">
        <link href="https://fonts.googleapis.com/css?family=Josefin+Slab" rel="stylesheet">
        <div id="top">
            <span id="title">Bada.nu | Karlskrona</span>
        </div>
        <div id="main">
            <information/>
        </div>
        <router-view/>
    </div>
</template>

<script>
// @ is an alias to /src
import Information from './components/Information.vue';

export default {
  name: 'home',
  components: {
    Information,
  },
};
</script>

<style lang="less">
    body, html {
        padding: 0;
        margin: 0;
    }
    #top{
        display: inline-block;
        background-color:#F0FBFF;
        height: 50px;
        width: 100%;
        border-bottom: #BDF5FF 1px solid;
    }
    #title{
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
    }
</style>
