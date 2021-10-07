<template>
  <nav id="nav" class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <a class="navbar-brand">UOL</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link" aria-current="page">Inscreva-se</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/registration" class="nav-link" aria-current="page">Cadastros</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view/>
</template>

<script lang="ts">
export default {
  name: 'Navbar'
}
</script>

<style scoped lang="scss">
#nav {
  a {
    &.router-link-exact-active {
      color: #fff;
    }
  }
}
</style>
