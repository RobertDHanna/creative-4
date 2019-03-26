import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import Home from "./components/Main.vue";
import BlogControls from "./components/BlogControls";
import BlogView from "./components/BlogView";

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home, name: "home" },
  { path: "/edit/:id", component: BlogControls, name: "edit" },
  { path: "/:id", component: BlogView, name: "blog" }
];

const router = new VueRouter({ routes });

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
