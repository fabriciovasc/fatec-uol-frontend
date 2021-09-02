<template>
  <p>Audio Fingerprint: <br>
    {{hash}}
  </p>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import audio from '@/core/audio-module'

export default class AudioFingerprint extends Vue {

  hash = '';

  beforeCreate() {
    audio()
        .then((data: any) => this.hash = data?.hash || '')
  }

  data() {
    return {
      hash: this.hash
    }
  }
}
</script>

<style scoped lang="scss">

</style>
