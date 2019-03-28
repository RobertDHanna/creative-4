<template>
  <div class="Message" v-if="message.length > 0">{{message}}</div>
</template>

<script>
import { setTimeout, clearTimeout } from "timers";
export default {
  created: function() {
    this.$router.app.$on("error-message", this.sendErrorMessage);
  },
  data: function() {
    return {
      message: ""
    };
  },
  methods: {
    sendErrorMessage: function(message) {
      clearTimeout(this.timeout);
      this.message = message;
      this.timeout = setTimeout(() => {
        this.message = "";
      }, 5000);
    }
  }
};
</script>

<style scoped>
.Message {
  height: 50px;
  width: 250px;
  background-color: #ffbaba;
  color: #d8000c;
  position: fixed;
  right: 10px;
  top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 10px;
}
</style>

