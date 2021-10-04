<template>
  <p>WebGL Fingerprint: <br>
    {{hash}}
  </p>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import webGL from '@/core/WebGLModule'

export default class WebGLFingerprint extends Vue {

  getHash(): string {
    const { hash } = webGL();
    return hash;
  }

  data() {
    return {
      hash: this.getHash()
    }
  }
}
</script>

<style scoped lang="scss">

</style>
