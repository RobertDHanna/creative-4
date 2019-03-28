<template>
  <div id="app">
    <message/>
    <router-view></router-view>
    <my-footer/>
  </div>
</template>

<script>
import Message from "./components/Message.vue";
import MyFooter from "./components/Footer.vue";

export default {
  name: "app",
  components: {
    Message,
    MyFooter
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
.container {
  margin-bottom: 20px;
}
</style>
