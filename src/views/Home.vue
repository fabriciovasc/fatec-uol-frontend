<template>
  <div class="home container vh-100">
    <div class="row h-100">

      <div class="col-12 col-md-6 offset-md-3 my-auto">
        <FormRegistration></FormRegistration>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import FormRegistration from '@/components/FormRegistration.vue';

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
