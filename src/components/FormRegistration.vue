<template>
  <form @submit.prevent="submitForm" class="row g-3">
    <h4 class="col-12 mb-3 text-center">
      Inscreva-se
    </h4>

    <div class="mb-2">
      <label for="email" class="form-label">Email</label>
      <div class="input-group">
        <div class="input-group-text">
          <fa icon="envelope" />
        </div>
        <input type="text" class="form-control" placeholder="fulano" :class="{'is-invalid': v$.email.$error && v$.email.$dirty, 'is-valid': !v$.email.$error && v$.email.$dirty}" id="email" v-model="v$.email.$model">
        <div class="input-group-text">
          @bol.com.br
        </div>
      </div>
      <small class="text-danger d-block" v-for="(error, index) of v$.email.$errors" :key="index">
        {{ error.$message }}
      </small>
    </div>

    <div class="mb-2">
      <label for="password" class="form-label">Senha</label>
      <div class="input-group">
        <div class="input-group-text">
          <fa icon="lock" />
        </div>
        <input type="password" class="form-control" placeholder="Insira uma senha" :class="{'is-invalid': v$.password.$error && v$.password.$dirty, 'is-valid': !v$.password.$error && v$.password.$dirty}" id="password" v-model="v$.password.$model">
      </div>
      <small class="text-danger d-block" v-for="(error, index) of v$.password.$errors" :key="index">
        {{ error.$message }}
      </small>
    </div>

    <div class="mb-2">
      <label for="fullName" class="form-label">Nome</label>
      <div class="input-group">
        <div class="input-group-text">
          <fa icon="user"></fa>
        </div>
        <input type="text" class="form-control" placeholder="Insira o nome completo" :class="{'is-invalid': v$.fullName.$invalid && v$.fullName.$dirty, 'is-valid': !v$.fullName.$invalid && v$.fullName.$dirty}" id="fullName" v-model="v$.fullName.$model">
      </div>
      <small class="invalid-feedback" v-for="(error, index) of v$.fullName.$errors" :key="index">
        {{ error.$message }}
      </small>
    </div>

    <div class="mb-2">
      <label for="cellphone" class="form-label">Telefone</label>
      <div class="input-group">
        <div class="input-group-text">
          <fa icon="phone"></fa>
        </div>
        <input type="text" class="form-control" placeholder="Insira o número do telefone" :class="{'is-invalid': v$.cellphone.$error && v$.cellphone.$dirty, 'is-valid': !v$.cellphone.$error && v$.cellphone.$dirty}" id="cellphone" v-model="v$.cellphone.$model">
      </div>
      <small class="invalid-feedback" v-for="(error, index) of v$.cellphone.$errors" :key="index">
        {{ error.$message }}
      </small>
    </div>

    <div class="col-12 mb-2 text-end">
      <button class="btn btn-success" type="submit" :disabled="v$.$invalid">
        Criar e-mail <fa icon="arrow-right"></fa>
      </button>
    </div>
  </form>

</template>

<script>

import {email, minLength, required, helpers} from '@vuelidate/validators';
import {computed, reactive} from 'vue';
import useVuelidate from '@vuelidate/core';
import RegistrationService from '@/services/RegistrationService';
import Swal from 'sweetalert2'

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
          required: helpers.withMessage('E-mail é obrigatório', required)
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
  methods: {
    async submitForm() {
      await this.v$.$validate();
      const [username] = this.v$.email.$model.toString()?.split('@');
      if (!this.v$.$error) {

        const data = {
          email: `${username}@bol.com.br`,
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
