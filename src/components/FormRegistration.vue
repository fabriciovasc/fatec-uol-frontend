<template>
  <div class="col-12 col-md-6 offset-md-3 d-flex align-items-center vh-100">
    <div>
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

        <div class="col-12 d-flex justify-content-end">
          <div class="card mb-4" style="max-width: 300px;">
            <div class="card-body row">
              <template v-if="!validCaptcha">
                <div class="card-title text-center">
                  <h4 class="m-0 fw-bold">{{captcha}}</h4>
                </div>
                <div class="col-12">
                  <input type="text"
                         class="form-control"
                         v-model="typedCaptcha"
                         v-bind:class="{'is-valid': this.validCaptcha, 'is-invalid': !this.validCaptcha}"
                         @keydown="keydown"
                         @keyup="keyup"
                         @focusout="stopCounter"
                         @focusin="startCounter"
                         @paste.prevent
                         autocomplete="off"
                         maxlength="6">
                </div>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-2">
                  <button type="button" class="btn btn-outline-secondary" v-on:click="generateCaptcha">Atualizar</button>
                  <button type="button" class="btn btn-secondary" v-on:click="validateCaptcha">Enviar</button>
                </div>
              </template>
              <template v-if="validCaptcha">
                <h4 class="m-0 fw-bold text-success">
                  <b-icon-check ></b-icon-check> Verificado!
                </h4>
              </template>
            </div>
          </div>
        </div>


        <div class="col-12 mb-4 text-end">
          <b-button type="submit" variant="success" >
            <b-spinner small v-if="status === 'LOADING'"></b-spinner>
            Criar e-mail
            <b-icon-chevron-right></b-icon-chevron-right>
          </b-button>
        </div>
      </b-form>
    </div>
  </div>

</template>

<script>

import {email, helpers, minLength, required, sameAs} from '@vuelidate/validators';
import {computed, reactive} from 'vue';
import useVuelidate from '@vuelidate/core';
import {detect} from 'detect-browser';
import Swal from 'sweetalert2'
import UtilService from '@/services/UtilService';
import RegistrationService from '@/services/RegistrationService';
import {getGPUTier} from 'detect-gpu'
import { v4 as uuidv4 } from 'uuid';

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
          minLength: helpers.withMessage('Mínimo 4 caracteres', minLength(4))
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
      startRegisterDate: new Date(),
      scroll_y: [],
      scroll_x: [],
      time: 0,
      lastTime: 0,
      scroll_millis: [],
      keyDowns: [],
      keyUps: [],
      captcha: '',
      validCaptcha: false,
      typedCaptcha: '',
      interval: null
    }
  },
  methods: {
    async submitForm() {
      this.status = 'LOADING';
      await this.v$.$validate();
      const [username] = this.v$.email.$model.toString()?.split('@');
      if (!this.v$.$invalid && this.validCaptcha) {
        const {ip} = await UtilService.getClientIp();
        const userAgent = navigator.userAgent;
        const {name: nameBrowser, os: system, version: versionBrowser} = browser;
        const {gpu: gpuModel} = await getGPUTier();
        const keyDowns = this.keyDowns
        const keyUps = this.keyUps
        const keyboardInput = keyDowns
            .map((k, index) => [{type: 'd', ...k}, {type: 'u', ...keyUps[index]}])
            .flat()
            .map(key => `${key.type}_${key.keyCode}_${key.currTime}`)
            .join(' ');
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
          scrollInput: '',
          keyboardInput
        }
        const {data: id, error} = await RegistrationService.create(data)
        if (!error && id) {
          this.status = 'SUCCESS';
          await Swal.fire({
            icon: 'success',
            title: 'E-mail criado com sucesso'
          })
          await this.$router.push('/registration')
        } else {
          this.status = 'ERROR';
          await Swal.fire({
            icon: 'error',
            title: 'Não foi possível criar um e-mail'
          })
        }
      } else {
        this.status = ''
        await Swal.fire({
          icon: 'warning',
          title: 'Existem campos inválidos'
        })
      }
    },
    keydown(evt) {
      const keyCode = evt?.keyCode;
      const currTime = this.time;
      this.keyDowns.push({keyCode, currTime})
    },
    keyup(evt) {
      const keyCode = evt?.keyCode;
      const currTime = this.time;
      this.keyUps.push({keyCode, currTime})
    },
    startCounter() {
      if (!this.interval) {
        this.interval = setInterval(() => {
          this.time++;
          console.log('time', this.time)
        }, 1);
      }
    },
    stopCounter() {
      if (!this.typedCaptcha.length) {
        this.typedCaptcha = ''
        this.keyDowns = []
        this.keyUps = []
        this.time = 0
      }
      if (this.interval && !this.keyUps.length && !this.keyDowns.length) {
        clearInterval(this.interval)
        this.time = 0
        this.interval = null
      }
    },
    generateCaptcha() {
      const uuid = uuidv4()
      this.captcha = uuid.replace('-', '').substr(5, 6)
    },
    validateCaptcha() {
      this.validCaptcha = this.typedCaptcha.trim() === this.captcha
      if (this.validCaptcha) {
        if (this.interval) {
          clearInterval(this.interval)
          this.interval = null
        }
      }
    }
  },
  created() {
    this.generateCaptcha()
  },
  unmounted() {
    if (this.interval) clearInterval(this.interval)
  }
}

</script>

<style scoped lang="scss">

</style>
