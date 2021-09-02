<template>
  <p>Canvas Fingerprint: <br>
    {{hash}}
  </p>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import canvas from '@/core/canvas-module'

export default class CanvasFingerprint extends Vue {

  getHash(): string {
    const { hash } = canvas();
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
