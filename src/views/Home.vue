<template>
  <div class="home container vh-100">
    <div class="row h-100">

      <div class="col-12 col-md-6 offset-md-3 my-auto">
        <h2>Fingerprint's</h2>
        <div class="card">
          <div class="card-body">
            <AudioFingerprint></AudioFingerprint>
            <CanvasFingerprint></CanvasFingerprint>
            <WebGLFingerprint></WebGLFingerprint>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import AudioFingerprint from '@/components/AudioFingerprint.vue'
import CanvasFingerprint from '@/components/CanvasFingerprint.vue'
import WebGLFingerprint from '@/components/WebGLFingerprint.vue'

@Options({
  components: {
    AudioFingerprint,
    CanvasFingerprint,
    WebGLFingerprint
  },
})

export default class Home extends Vue {
}
</script>

<style lang="scss">
</style>
