<template>
  <div class="registration container vh-100">
    <div class="row">

      <h1 class="col-12">
        Cadastros
      </h1>

      <table class="table table-bordered">
        <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Hash identificador</th>
        </tr>
        </thead>

        <tbody>
        <template v-for="profile in profiles" :key="profile.id">
          <tr>
            <th>{{ profile.uuid }}</th>
            <td>{{ profile.uniqueHash }}</td>
          </tr>
          <tr>
            <td colspan="2">
              <table class="table table-bordered">
                <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">E-mail</th>
                  <th scope="col">Nome</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="registration in getRegistrations" :key="registration.id">
                  <th>{{ profile?.id }}</th>
                  <td>{{ profile?.email }}</td>
                  <td>{{ profile?.name }}</td>
                </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </template>

        </tbody>

      </table>

    </div>



  </div>
</template>

<script>

import ProfileService from '@/services/ProfileService';

export default {
  data() {
    return {
      profiles: [],
      teste: ''
    }
  },
  computed: {
    getRegistrations() {
      return this.profiles.map(p => p.registrations)
    }
  },
  created() {
    ProfileService.get().then(res => {
      console.log(res)
      this.profiles = res;
    })
  }
}
</script>

<style lang="scss">
</style>
