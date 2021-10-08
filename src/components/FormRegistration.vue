<template>
  <h1 class="text-center">Inscreva-se</h1>
  <b-form @submit.prevent="submitForm" class="row">

    <div class="col-12 mb-4">
      <label class="form-label">E-mail</label>
      <b-input-group>
        <template #prepend>
          <b-input-group-text>
            <b-icon-envelope></b-icon-envelope>
          </b-input-group-text>
        </template>

        <b-form-input placeholder="Insira um e-mail"
                      trim
                      v-model="v$.email.$model"
                      @blur="v$.email.$touch()"
                      :state="v$.email.$dirty ? !v$.email.$errors.length : null"></b-form-input>
      </b-input-group>
    </div>

    <div class="col-12 mb-4">
      <label class="form-label">Senha</label>
      <b-input-group>
        <template #prepend>
          <b-input-group-text>
            <b-icon-lock></b-icon-lock>
          </b-input-group-text>
        </template>

        <b-form-input v-if="hidden"
                      type="password"
                      trim
                      placeholder="Crie uma senha"
                      v-model="v$.password.$model"
                      @blur="v$.password.$touch()"
                      :state="v$.password.$dirty ? !v$.password.$errors.length : null"></b-form-input>

        <b-form-input v-if="!hidden"
                      type="text"
                      placeholder="Crie uma senha"
                      v-model="v$.password.$model"
                      @blur="v$.password.$touch()"
                      :state="v$.password.$dirty ? !v$.password.$errors.length : null"></b-form-input>

        <template #append>
          <b-button variant="outline-secondary" @click.prevent="hidden = !hidden">
            <b-icon-eye v-if="hidden"></b-icon-eye>
            <b-icon-eye-slash v-if="!hidden"></b-icon-eye-slash>
          </b-button>
        </template>
      </b-input-group>
    </div>

    <div class="col-12 mb-4">
      <label class="form-label">Nome</label>
      <b-input-group>
        <template #prepend>
          <b-input-group-text>
            <b-icon-person></b-icon-person>
          </b-input-group-text>
        </template>

        <b-form-input placeholder="Nome completo"
                      trim
                      v-model="v$.fullName.$model"
                      @blur="v$.fullName.$touch()"
                      :state="v$.fullName.$dirty ? !v$.fullName.$errors.length : null"></b-form-input>
      </b-input-group>
    </div>

    <div class="col-12 mb-4">
      <label class="form-label">Telefone</label>
      <b-input-group>
        <template #prepend>
          <b-input-group-text>
            <b-icon-phone></b-icon-phone>
          </b-input-group-text>
        </template>

        <b-form-input placeholder="Insira um telefone"
                      v-model="v$.cellphone.$model"
                      @blur="v$.cellphone.$touch()"
                      :state="v$.cellphone.$dirty ? !v$.cellphone.$errors.length : null"
                      v-maska="'(##) #####-####'">

        </b-form-input>
      </b-input-group>
    </div>

    <div class="col-12 mb-4 text-end">
      <b-button type="submit" variant="success" :disabled="v$.$invalid || status === 'LOADING'">
        <b-spinner small v-if="status === 'LOADING'"></b-spinner> Criar e-mail <b-icon-chevron-right></b-icon-chevron-right>
      </b-button>
    </div>

  </b-form>

</template>

<script>

import {helpers, minLength, required, email} from '@vuelidate/validators';
import {computed, reactive} from 'vue';
import useVuelidate from '@vuelidate/core';
import RegistrationService from '@/services/RegistrationService';
import Swal from 'sweetalert2'
import UtilService from '@/services/UtilService';
import { getGPUTier } from 'detect-gpu';
import webGl from '@/core/WebGLService';
import { detect } from 'detect-browser';
const browser = detect();

export default {
  setup() {
    const state = reactive({
      email: '',
      password: '',
      fullName: '',
      cellphone: ''
    });
    const mustBeFirstNameAndLastName = (v) => v.trim().split(' ').length >= 2;

    const rules = computed(() => {
      return {
        email: {
          required: helpers.withMessage('E-mail é obrigatório', required),
          email: helpers.withMessage('Formato de e-mail inválido', email)
        },
        password: {
          required: helpers.withMessage('Senha é obrigatória', required), minLength: helpers.withMessage('Mínimo 8 caracteres', minLength(8))
        },
        fullName: {
          required: helpers.withMessage('Nome completo é obrigatório', required), mustBeLength: helpers.withMessage('Você deve preencher nome e sobrenome', mustBeFirstNameAndLastName)
        },
        cellphone: {
          required: helpers.withMessage('Telefone é obrigatório', required)
        }
      }
    });
    const v$ = useVuelidate(rules, state);
    return {
      state,
      v$
    }
  },
  data() {
    return {
      status: '',
      hidden: true
    }
  },
  methods: {
    async submitForm() {
      this.status = 'LOADING';
      await this.v$.$validate();
      const [username] = this.v$.email.$model.toString()?.split('@');
      if (!this.v$.$invalid) {
        const {ip} = await UtilService.getClientIp();
        const userAgent = navigator.userAgent;
        const {name: nameBrowser, os: system, version: versionBrowser} = browser;
        const {gpu: gpuModel} = await getGPUTier();
        const {hash: uniqueHash} = webGl()
        const data = {
          email: `${username}@bol.com.br`,
          password: this.v$.password.$model,
          name: this.v$.fullName.$model,
          cellphone: this.v$.cellphone.$model,
          userAgent,
          nameBrowser,
          versionBrowser,
          system,
          gpuModel,
          ip,
          uniqueHash
        }
        console.log(data)
        const {data: id, error} = await RegistrationService.create(data)
        if (!error && id) {
          this.status = 'SUCCESS';
          await Swal.fire({
            icon: 'success',
            title: 'E-mail criado com sucesso'
          })
        } else {
          this.status = 'ERROR';
          await Swal.fire({
            icon: 'error',
            title: 'Não foi possível criar um e-mail'
          })
        }
      } else {
        await Swal.fire({
          icon: 'warning',
          title: 'Existem campos inválidos'
        })
      }
    }
  }
}

</script>

<style scoped lang="scss">

</style>
