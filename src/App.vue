<template>
  <div id="app">
    <message/>
    <router-view></router-view>
  </div>
</template>

<script>
import Message from "./components/Message.vue";

export default {
  name: "app",
  components: {
    Message
  }
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
