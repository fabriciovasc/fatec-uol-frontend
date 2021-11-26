<template>
  <div class="registration container p-3">
    <div class="row">

      <h1 class="col-12">
        Cadastros
      </h1>

      <template v-if="status === 'LOADING'">
        <div class="text-center">
          <b-spinner label="Spinning"></b-spinner>
          <h4>Carregando dados...</h4>
        </div>
      </template>

      <template v-if="status === 'SUCCESS'">
        <table class="table table-sm table-bordered">
          <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">E-mail</th>
            <th scope="col">Nome</th>
            <th scope="col">Telefone</th>
            <th scope="col">Navegador</th>
            <th scope="col">Ação</th>
          </tr>
          </thead>
          <tbody>
          <template v-for="registration in registrations" :key="registration.id">
            <tr>
              <td>{{registration.id}}</td>
              <td>{{registration.email}}</td>
              <td>{{registration.name}}</td>
              <td>{{registration.phone}}</td>
              <td>{{registration.browser}}</td>
              <td>
                <button type="button" class="btn btn-sm btn-link" v-on:click.prevent="registration.show = !registration.show; showDuplicates(registration.id)">
                  Duplicados
                  <b-icon-caret-down v-show="!registration.show"></b-icon-caret-down>
                  <b-icon-caret-up v-show="registration.show"></b-icon-caret-up>
                </button>
              </td>
            </tr>
            <tr v-if="registration.show">
              <td class="p-3" colspan="6">
                <div class="text-center" v-if="registration.status === 'loading'">
                  <b-spinner label="Spinning"></b-spinner>
                  <h4>Buscando usuários duplicados...</h4>
                </div>
                <div class="text-center text-danger" v-if="registration.status === 'error'">
                  <h4>
                    <b-icon-exclamation-circle-fill></b-icon-exclamation-circle-fill>
                  </h4>
                  <p>Não foi possível conectar-se ao serviço</p>
                  <b-button size="sm" variant="outline-danger" @click.prevent="showDuplicates(registration.id)">
                    <b-icon-arrow-counterclockwise></b-icon-arrow-counterclockwise> Tentar novamente
                  </b-button>
                </div>

                <div class="text-center" v-if="!registration.user_recognition_result?.user_duplicates?.length && registration.status === 'success'">
                  <b-icon-search></b-icon-search>
                  <h4>Nenhum resultado foi encontrado</h4>
                </div>
                <div style="font-weight: bold;" v-if="registration.user_recognition_result?.user_duplicates?.length && registration.status === 'success'">
                  <h5 style="font-weight: bold;">Score: {{registration.user_recognition_result?.accuracy}}%</h5>
                  <p>Resultados:</p>
                  <table class="table table-sm table-bordered" style="font-size: 12px;">
                    <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Nome</th>
                      <th scope="col">E-mail</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="dup in registration.user_recognition_result?.user_duplicates" :key="dup.id">
                      <td>{{dup.user_id}}</td>
                      <td>{{dup.name}}</td>
                      <td>{{dup.email}}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </template>

          </tbody>
        </table>

        <div class="text-center" v-if="!registrations.length">
          <b-icon-search></b-icon-search>
          <h4>Nenhum resultado foi encontrado</h4>
        </div>

      </template>

      <template v-if="status === 'ERROR'">
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

import RegistrationService from '@/services/RegistrationService';
import UserRecognitionService from '@/services/UserRecognitionService';

export default {
  data() {
    return {
      fields: [
          'id', 'e-mail', 'nome', 'telefone', 'navegador'
      ],
      registrations: [],
      status: ''
    }
  },
  async created() {
    this.registrations = await this.getRegistrations();
    console.log(this.registrations)
  },
  methods: {
    async getRegistrations() {
      this.status = 'LOADING';
      const {data, error} = await RegistrationService.get();
      if (!error) {
        this.status = 'SUCCESS';
        return this.transformData(data)
      }
      this.status = 'ERROR';
      return []
    },
    async showDuplicates(userId) {
      const index = this.registrations.findIndex(r => r.id === userId);
      if (this.registrations[index].show) {
        this.registrations[index].status = 'loading';
        const {data, error} = await UserRecognitionService.get(userId);
        if (!error) {
          this.registrations[index].user_recognition_result = data;
          this.registrations[index].status = 'success';
        } else {
          this.registrations[index].status = 'error';
        }
      } else {
        this.registrations[index].user_recognition_result = null;
      }
      console.log(this.registrations[index])
    },
    async transformData(data) {
      return (data || []).map(user => ({
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.cellphone,
        browser: user.nameBrowser,
        show: false,
        status: '',
        user_recognition_result: null
      }))
    }
  }
}
</script>

<style lang="scss">
</style>
