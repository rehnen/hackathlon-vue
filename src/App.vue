<template>
    <div id="app">
        <div id="top">
            <span id="title">Plan 2 - Bath app</span>
        </div>
        <div id="main">
            <router-view/>
        </div>
    </div>
</template>

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
