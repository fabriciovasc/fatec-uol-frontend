<template>
  <Navbar></Navbar>
</template>

<script lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css'
import {Vue, Options} from 'vue-class-component';
import Navbar from '@/components/Navbar.vue'

@Options({
  components: {
    Navbar
  }
})

export default class App extends Vue {
  //
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
