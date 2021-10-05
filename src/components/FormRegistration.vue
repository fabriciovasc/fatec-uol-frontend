<template>
  <form @submit.prevent="submitForm" class="row g-3">
    <h4 class="col-12 mb-3 text-center">
      Inscreva-se
    </h4>

    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input type="text" class="form-control" id="email" required v-model="v$.email.$model">
      <small class="input-errors text-danger" v-for="(error, index) of v$.email.$errors" :key="index">
        {{ error.$message }}
      </small>
    </div>

    <div class="mb-3">
      <label for="password" class="form-label">Senha</label>
      <input type="password" class="form-control" id="password" required v-model="v$.password.$model">
      <small class="input-errors text-danger" v-for="(error, index) of v$.password.$errors" :key="index">
        {{ error.$message }}
      </small>
    </div>

    <div class="mb-3">
      <label for="fullName" class="form-label">Nome</label>
      <input type="text" class="form-control" id="fullName" required v-model="v$.fullName.$model">
      <small class="input-errors text-danger" v-for="(error, index) of v$.fullName.$errors" :key="index">
        {{ error.$message }}
      </small>
    </div>

    <div class="mb-3">
      <label for="cellphone" class="form-label">Telefone</label>
      <input type="text" class="form-control" id="cellphone" required v-model="v$.cellphone.$model">
      <small class="input-errors text-danger" v-for="(error, index) of v$.cellphone.$errors" :key="index">
        {{ error.$message }}
      </small>
    </div>

    <div class="col-12 mb-3 text-end">
      <button class="btn btn-success" type="submit" :disabled="v$.$errors.length">Criar e-mail</button>
    </div>
  </form>

</template>

<script>

import {email, minLength, required, helpers} from '@vuelidate/validators';
import {computed, reactive} from 'vue';
import useVuelidate from '@vuelidate/core';
import RegistrationService from '@/services/RegistrationService';
import {Registration} from '@/models/RegistrationModel';
import Swal from 'sweetalert2'

export default {
  setup() {
    const state = reactive({
      email: '',
      password: '',
      fullName: '',
      cellphone: ''
    });

    const mustBeFirstNameAndLastName = (v) => v.split('').length >= 2;

    const rules = computed(() => {
      return {
        email: {
          required: helpers.withMessage('E-mail é obrigatório', required), email: helpers.withMessage('E-mail inválido', email)
        },
        password: {
          required: helpers.withMessage('Senha é obrigatória', required), email: helpers.withMessage('Mínimo 8 caracteres', minLength(8))
        },
        fullName: {
          required: helpers.withMessage('Nome completo é obrigatório', required), email: helpers.withMessage('Você deve preencher nome e sobrenome', mustBeFirstNameAndLastName)
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
  methods: {
    async submitForm() {
      await this.v$.$validate();
      if (!this.v$.$error) {
        const data = {
          email: this.v$.email.$model,
          password: this.v$.password.$model,
          name: this.v$.fullName.$model,
          cellphone: this.v$.cellphone.$model,
          audioHash: '1234',
          canvasHash: '1234',
          webGLHash: '1234',
          fonts: 'arial,black-sparrow',
          userAgent: 'Chrome',
        }
        const res = await RegistrationService.create(data) || {}
        if (res?.data) {
          await Swal.fire({
            icon: 'success',
            title: 'E-mail criado com sucesso'
          })
        } else {
          await Swal.fire({
            icon: 'error',
            title: 'Não foi possível criar um e-mail'
          })
        }
      }
    }
  }
}

</script>

<style scoped lang="scss">

</style>
