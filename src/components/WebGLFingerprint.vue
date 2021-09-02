<template>
  <p>WebGL Fingerprint: <br>
    {{hash}}
  </p>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';

export default class WebGLFingerprint extends Vue {
  data() {
    return {
      hash: 'xxxyyyzzz'
    }
  }
}
</script>

<style scoped lang="scss">

</style>
