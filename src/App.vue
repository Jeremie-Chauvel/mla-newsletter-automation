<template>
  <div>
    <img alt="Maison des lanceurs d'alerte logo" src="./assets/logo.png" />
    <h1>Outil d'automatisation de la newsletter</h1>
    <BlockGenerator />
  </div>
</template>

<script>
import BlockGenerator from './components/BlockGenerator.vue';
export default {
  components: {
    BlockGenerator,
  },
  setup() {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
