<template>
    <div class="splash-screen">
        <h1>Test</h1>
    </div>
</template>

<script>
export default {
  name: 'splash-screen',
  created() {
    this.$http.get('https://api.github.com/users/rehnen/repos')
      .then((result) => {
        console.log(result);
      });
  },
};
</script>

<style scoped lang="less">

</style>
