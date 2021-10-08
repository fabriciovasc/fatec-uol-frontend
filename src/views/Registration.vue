<template>
  <div class="registration container p-3">
    <div class="row">

      <h1 class="col-12">
        Cadastros
      </h1>

      <template v-if="status == 'LOADING'">
        <div class="text-center">
          <b-spinner label="Spinning"></b-spinner>
          <h4>Carregando dados...</h4>
        </div>
      </template>

      <template v-if="status == 'SUCCESS'">
        <div class="accordion-collapse mb-2" v-for="profile in profiles" :key="profile.id">
          <b-card no-body>
            <b-card-header class="d-flex justify-content-between align-items-center">
              <div class="hash">
                Identificador do perfil: <span class="fw-bold">{{profile.uniqueHash}}</span>
              </div>
              <b-button size="sm" variant="link" @click.prevent="profile.collapsed = !profile.collapsed" :aria-expanded="profile.collapsed" aria-controls="collapse">
                <b-icon-caret-down-fill v-show="!profile.collapsed"></b-icon-caret-down-fill>
                <b-icon-caret-up-fill v-show="profile.collapsed"></b-icon-caret-up-fill>
              </b-button>
            </b-card-header>
            <b-collapse id="collapse" v-model:visible="profile.collapsed" class="mt-2">
              <p class="mx-2 mb-0 text-center">Usuários cadastrados</p>
              <b-table class="mx-2" hover bordered small responsive :items="profile.registrations" style="font-size: 12px;"></b-table>
            </b-collapse>
          </b-card>
        </div>

        <div class="text-center" v-if="!profiles.length">
          <b-icon-search></b-icon-search>
          <h4>Nenhum resultado foi encontrado</h4>
        </div>

      </template>

      <template v-if="status == 'ERROR'">
        <div class="text-center text-danger">
          <h2>
            <b-icon-exclamation-circle-fill></b-icon-exclamation-circle-fill>
          </h2>
          <h4>Não foi possível conectar-se ao servidor</h4>
          <b-button size="sm" variant="outline-danger" @click.prevent="getProfiles">
            <b-icon-arrow-counterclockwise></b-icon-arrow-counterclockwise> Tentar novamente
          </b-button>
        </div>
      </template>

    </div>
  </div>
</template>

<script>

import ProfileService from '@/services/ProfileService';

export default {
  data() {
    return {
      profiles: [],
      status: ''
    }
  },
  async created() {
    this.profiles = await this.getProfiles();
    console.log(this.profiles)
  },
  methods: {
    async getProfiles() {
      this.status = 'LOADING';
      const {data, error} = await ProfileService.get();
      if (!error) {
        this.status = 'SUCCESS';
        return data
      }
      this.status = 'ERROR';
      return []
    }
  }
}
</script>

<style lang="scss">
</style>
