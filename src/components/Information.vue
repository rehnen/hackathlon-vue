<template>
    <div id="information">
        <span id="infoTitle">Välkommen till Go Swim Karlskrona</span>
        <div id="infoText">
            <span id="text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip
            </span>
        </div>
    </div>
</template>

<script>
export default {
  name: 'information',
};
</script>

<style scoped>
    #information {
        width: 300px;
        height: 250px;
        border: black 1px solid;
        margin: 1.2rem;
        color: #1B2F33;
        padding: 0.6rem;
    }
    #infoTitle{
        display: block;
        width: 100%;
        font-weight: bold;
        font-size: large;
        font-family: 'Josefin Slab', Serif;
        margin-bottom: 1.2rem;
    }
    #text{
        display: block;
    }

</style>
