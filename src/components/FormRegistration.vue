<template>
  <div v-on:wheel="onWheel($event)" class="col-12 text-center rounded mb-5"
       style="background-color: #0cb3a1; height: 500px;">
    <img src="../assets/logo-bol.png">
    <div class="h-100 d-flex flex-column justify-content-evenly">
      <h2 class="m-0 px-2 text-black">
        Inscreva-se grátis agora mesmo e tenha os melhores benefícios :)
      </h2>
      <b-button class="mb-2" variant="dark" size="lg" v-on:click="showForm = !showForm; showedRegisterDate = new Date()">
        Quero me inscrever
        <b-icon-caret-down-fill></b-icon-caret-down-fill>
      </b-button>
    </div>
  </div>

  <div v-if="showForm" class="col-12 col-md-6 offset-md-3">
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

      <div class="col-12">
        <b-form-radio v-model="v$.terms.$model" v-on:click="acceptedTermsDate = new Date()">Ao continuar, declaro que estou ciente e aceito os termos de uso</b-form-radio>
      </div>

      <div class="col-12 mb-4 text-end">
        <b-button type="submit" variant="success">
          <b-spinner small v-if="status === 'LOADING'"></b-spinner>
          Criar e-mail
          <b-icon-chevron-right></b-icon-chevron-right>
        </b-button>
      </div>

    </b-form>
  </div>

</template>

<script>

import {email, helpers, minLength, required, sameAs} from '@vuelidate/validators';
import {computed, reactive} from 'vue';
import useVuelidate from '@vuelidate/core';
import {detect} from 'detect-browser';

const browser = detect();

export default {
  setup() {
    const state = reactive({
      email: '',
      password: '',
      fullName: '',
      cellphone: '',
      terms: false
    });
    const mustBeFirstNameAndLastName = (v) => v.trim().split(' ').length >= 2;

    const rules = computed(() => {
      return {
        email: {
          required: helpers.withMessage('E-mail é obrigatório', required),
          email: helpers.withMessage('Formato de e-mail inválido', email)
        },
        password: {
          required: helpers.withMessage('Senha é obrigatória', required),
          minLength: helpers.withMessage('Mínimo 8 caracteres', minLength(8))
        },
        fullName: {
          required: helpers.withMessage('Nome completo é obrigatório', required),
          mustBeLength: helpers.withMessage('Você deve preencher nome e sobrenome', mustBeFirstNameAndLastName)
        },
        cellphone: {
          required: helpers.withMessage('Telefone é obrigatório', required)
        },
        terms: required
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
      hidden: true,
      startRegisterDate: new Date().getTime(),
      acceptedTermsDate: '',
      showForm: false,
      wheel: {
        am: 0,
        time: new Date().getTime(),
        lastTime: 0,
        milis: [],
        deltas: []
      }
    }
  },
  methods: {
    async submitForm() {
      console.log(this.wheel)
      console.log('start', this.showedRegisterDate)
      const endRegisterDate = new Date()
      console.log('duration', Math.abs(endRegisterDate - this.startRegisterDate))
      console.log('terms', this.acceptedTermsDate)
      // this.status = 'LOADING';
      // await this.v$.$validate();
      // const [username] = this.v$.email.$model.toString()?.split('@');
      // if (!this.v$.$invalid) {
      //   const endRegisterDate = new Date().getTime() / 1000
      //   const registerDuration = Math.abs(endRegisterDate - this.startRegisterDate)
      //   const {ip} = await UtilService.getClientIp();
      //   const userAgent = navigator.userAgent;
      //   const {name: nameBrowser, os: system, version: versionBrowser} = browser;
      //   const {gpu: gpuModel} = await getGPUTier();
      //   const {hash: uniqueHash} = webGl()
      //   const data = {
      //     email: `${username}@bol.com.br`,
      //     password: this.v$.password.$model,
      //     name: this.v$.fullName.$model,
      //     cellphone: this.v$.cellphone.$model,
      //     userAgent,
      //     nameBrowser,
      //     versionBrowser,
      //     system,
      //     gpuModel,
      //     ip,
      //     uniqueHash,
      //     maxTimestamp,
      //     minTimestamp: this.maxTimestamp,
      //     registerDuration
      //   }
      //   console.log(data)
      //   const {data: id, error} = await RegistrationService.create(data)
      //   if (!error && id) {
      //     this.status = 'SUCCESS';
      //     await Swal.fire({
      //       icon: 'success',
      //       title: 'E-mail criado com sucesso'
      //     })
      //   } else {
      //     this.status = 'ERROR';
      //     await Swal.fire({
      //       icon: 'error',
      //       title: 'Não foi possível criar um e-mail'
      //     })
      //   }
      // } else {
      //   await Swal.fire({
      //     icon: 'warning',
      //     title: 'Existem campos inválidos'
      //   })
      // }
    },
    onWheel(evt) {
      this.wheel.am++;
      const cmilis = this.wheel.time - this.wheel.lastTime;
      if (this.wheel.lastTime) {
        this.wheel.milis.push(cmilis);
      }

      this.wheel.lastTime = this.wheel.time;

      this.wheel.deltas.push(Math.max(evt.deltaX, evt.deltaY, evt.deltaZ));
    },
    initInterval() {
      setInterval(() => {
        this.wheel.time++;
      }, 1);
    }
  },
  created() {
    this.initInterval();
  }
}

</script>

<style scoped lang="scss">

</style>
