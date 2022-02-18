<script setup>
  import { RouterView } from 'vue-router';
</script>

<template>
  <div class="container">
    <nav 
        class="navbar navbar-light bg-light justify-content-between">
      <a class="navbar-brand">DGVIT</a>
      <form class="form-inline">
        <button 
          v-if="$store.getters.isLoggedIn"
          @click.prevent="$store.dispatch('auth/logout')"
          class="btn btn-outline-success my-2 my-sm-0"
        >
          Cerrar Sesion
        </button>
      </form>
    </nav>
    <div class="row">
      <div class="col-12 text-center mb-4">
        <img 
          alt="Vue logo" 
          class="logo mb-1" 
          src="@/assets/logo.svg" 
          width="80" 
          height="80" 
        />
      </div>
      <div class="col-12 mt-2 text-center">
        <RouterView />
        <notifications />
      </div> 
    </div>
  </div>
</template>

