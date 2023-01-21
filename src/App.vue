<template>
  <div id="app">
    <Board />
  </div>
</template>

<script>
import Board from './components/Board.vue';

export default {
  name: 'app',
  components: { Board },
  data () {
    return {
    }
  }
}
</script>

<style>
@import "../src/assets/reset.css";
#app {
  font-family: 'IBM Plex Sans KR';
  font-style: normal;
  /* -webkit-font-smoothing: antialiased; */
  /* -moz-osx-font-smoothing: grayscale; */
}

</style>
