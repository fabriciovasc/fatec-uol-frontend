<template>
  <template v-if="!showForm">
    <div class="col-12 text-center"
         style="background-color: #0cb3a1; height: 350px;">
      <img src="../assets/logo-bol.png">
      <div class="m-5">
        <h1 class="m-0 text-white">
          O e-mail que você conhece, agora
          com recursos incríveis
        </h1>
        <h4 class="text-white">
          Clube UOL, mais espaço no e-mail, antivírus e tudo
          o que você precisa para proteger seu celular e computador.
        </h4>
      </div>
    </div>

    <div class="col-12 text-center bg-dark">
      <div style="padding: 100px;">
        <table class="table table-light table-bordered">
          <thead>
          <tr>
            <th>#</th>
            <td>
              <div class="d-flex flex-column">
                Básico
                <button type="button" class="btn btn-warning" v-on:click="showForm = !showForm">Assinar</button>
              </div>
            </td>
            <td>
              <div class="d-flex flex-column">
                Completo
                <button type="button" class="btn btn-warning" v-on:click="showForm = !showForm">Assinar</button>
              </div>
            </td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th scope="row">Espaço para seus e-mails</th>
            <td>200 MB</td>
            <td>18 GB</td>
          </tr>
          <tr>
            <th scope="row">Aplicativo</th>
            <td>Online</td>
            <td>Offline</td>
          </tr>
          <tr>
            <th scope="row">Conteúdo</th>
            <td>******</td>
            <td>******</td>
          </tr>
          <tr>
            <th scope="row">Conteúdo</th>
            <td>******</td>
            <td>******</td>
          </tr>
          <tr>
            <th scope="row">Conteúdo</th>
            <td>******</td>
            <td>******</td>
          </tr>
          <tr>
            <th scope="row">Conteúdo</th>
            <td>******</td>
            <td>******</td>
          </tr>
          <tr>
            <th scope="row">Conteúdo</th>
            <td>******</td>
            <td>******</td>
          </tr>
          <tr>
            <th scope="row">Conteúdo</th>
            <td>******</td>
            <td>******</td>
          </tr>
          <tr>
            <th>#</th>
            <td>
              <div class="d-flex flex-column">
                Grátis
                <button type="button" class="btn btn-warning" v-on:click="showForm = !showForm">Assinar</button>
              </div>
            </td>
            <td>
              <div class="d-flex flex-column">
                Premium
                <button type="button" class="btn btn-warning" v-on:click="showForm = !showForm">Assinar</button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="col-12 text-center bg-black">
      <h2 class="text-white p-5">
        Conheça os benefícios que o plano BOL Completo oferece:
      </h2>
      <p class="text-white p-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas rutrum erat eget neque tristique, vitae malesuada tellus interdum. Praesent fringilla hendrerit vehicula. Fusce luctus, ante sed consectetur imperdiet, diam urna consectetur diam, posuere ornare neque elit scelerisque nisi. Vivamus vulputate metus ac lectus pellentesque tincidunt. Aenean tempor ligula non lacus pharetra condimentum. Vestibulum sodales eros diam, vehicula fermentum massa mollis ac. Vivamus ultrices est nec velit egestas accumsan. Vivamus eu suscipit orci, vel semper augue. Maecenas porttitor nisi ut tellus placerat, sit amet tincidunt nibh tempus. Nullam mollis augue urna, porta aliquet arcu iaculis ultricies. Praesent et est dolor. Fusce dignissim pharetra scelerisque. Sed est augue, commodo eu lorem a, scelerisque hendrerit elit. Pellentesque consectetur erat eget volutpat euismod. Etiam quis elementum nibh. Vivamus laoreet dui non luctus malesuada.

        Duis accumsan nisl eget neque laoreet, nec mattis tortor imperdiet. Nulla facilisi. Praesent luctus justo auctor venenatis viverra. Curabitur lacus ante, volutpat ut orci id, facilisis pulvinar velit. Curabitur semper nunc interdum augue elementum convallis. Etiam ultrices tincidunt nisl vitae placerat. Donec aliquam lacus id aliquam molestie.

        Nunc facilisis vitae libero quis euismod. Aenean nec mi ac nisi scelerisque egestas. Mauris et purus et sapien euismod lacinia. Fusce faucibus odio sed justo blandit venenatis. In nunc risus, commodo nec libero vel, tristique luctus nisl. Sed bibendum, ante quis porta lacinia, lacus diam gravida ligula, in vestibulum justo justo vitae purus. Cras tristique viverra lacus, quis sodales eros fringilla quis. Maecenas ut purus sem.

        Vestibulum pulvinar euismod odio, nec porttitor velit. Quisque pulvinar quam orci, ac auctor justo cursus sed. Nunc dignissim molestie felis, vitae molestie ipsum. Morbi eget interdum purus. Praesent hendrerit eu nulla eu congue. Ut porta lectus ac augue maximus pretium. Nam sed mi eu mauris finibus fermentum.

        Curabitur ut sodales nunc, id feugiat libero. Phasellus et porta ante. Maecenas aliquet ornare quam eu dapibus. Phasellus dictum lorem lectus. Sed lacus neque, ornare vitae nunc sed, vestibulum vulputate diam. Etiam accumsan diam at enim euismod tincidunt at in libero. Fusce a faucibus velit. Sed pellentesque, dolor non fringilla mattis, purus erat scelerisque lectus, sed mollis sem est ut augue. Nullam dui ipsum, vestibulum a convallis sed, pretium id purus. Cras augue nunc, ornare ut consequat ac, scelerisque hendrerit nibh. Donec tristique nulla sit amet gravida consectetur. Donec laoreet porttitor nibh vitae hendrerit. Fusce pharetra leo eros, nec sagittis ligula tempor quis. Ut consequat lacinia ligula, vel pharetra nulla molestie ac.
      </p>
    </div>
  </template>


  <div v-if="showForm" class="col-12 col-md-6 offset-md-3 d-flex align-items-center vh-100">
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
  </div>

</template>

<script>

import {email, helpers, minLength, required, sameAs} from '@vuelidate/validators';
import {computed, reactive} from 'vue';
import useVuelidate from '@vuelidate/core';
import {detect} from 'detect-browser';
import scroll from 'scroll-speed'
import Swal from 'sweetalert2'
import UtilService from '@/services/UtilService';
import RegistrationService from '@/services/RegistrationService';
import {getGPUTier} from 'detect-gpu'

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
      startRegisterDate: new Date(),
      showForm: false,
      scroll_y: [],
      scroll_x: [],
      time: 0,
      lastTime: 0,
      scroll_millis: [],
      keyDowns: [],
      keyUps: []
    }
  },
  methods: {
    async submitForm() {
      // this.status = 'LOADING';
      await this.v$.$validate();
      const [username] = this.v$.email.$model.toString()?.split('@');
      if (!this.v$.$invalid) {
        const {ip} = await UtilService.getClientIp();
        const userAgent = navigator.userAgent;
        const {name: nameBrowser, os: system, version: versionBrowser} = browser;
        const {gpu: gpuModel} = await getGPUTier();
        const scroll_y = this.scroll_y
        const scroll_millis = this.scroll_millis
        const scrollInput = scroll_y.map((a, index) => [a, scroll_millis[index]]).filter(([a, b]) => a && b).map(([a, b]) => `y_${a}_${b}`).join(' ');
        const keyDowns = this.keyDowns
        const keyUps = this.keyUps
        const keyboardInput = keyDowns.map((k, index) => [{type: 'd', ...k}, {type: 'u', ...keyUps[index]}]).flat().map(key => `${key.type}_${key.keyCode}_${key.currTime}`).join(' ');
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
          scrollInput,
          keyboardInput
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
    }
  },
  created() {
    setInterval(() => {
      this.time++;
    }, 1);
    this.scroll_speed = scroll()
    this.scroll_speed.on('scroll', ({0: horizontal, 1: vertical}) => {
      const cmillis = this.time - this.lastTime;
      if (this.lastTime) this.scroll_millis.push(cmillis)
      this.lastTime = this.time;
      this.scroll_x.push(horizontal);
      this.scroll_y.push(vertical);
    })
    document.onkeydown = this.keydown
    document.onkeyup = this.keyup
  }
}

</script>

<style scoped lang="scss">

</style>
