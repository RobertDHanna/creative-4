<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
html {
  overflow: hidden;
}
.hero-body {
  overflow: auto;
  height: 100px;
}
</style>
