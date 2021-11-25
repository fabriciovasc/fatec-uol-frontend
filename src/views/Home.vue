<template>
  <div class="home vh-100 container">
    <div class="row h-100">

      <div>
        <FormRegistration></FormRegistration>
      </div>

    </div>
  </div>
</template>

<script lang="js">

import {Options, Vue} from 'vue-class-component';
import FormRegistration from '@/components/FormRegistration';

@Options({
  components: {
    FormRegistration
  },
})

export default class Home extends Vue {
}
</script>

<style lang="scss">
</style>
