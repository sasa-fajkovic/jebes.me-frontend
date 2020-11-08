<template>
  <app-navigation></app-navigation>
  <router-view />
</template>

<script>
import Navigation from "./views/Navigation.vue";

export default {
  name: "App",
  components: {
    appNavigation: Navigation,
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: sans-serif;
  background-color: burlywood;
}
</style>