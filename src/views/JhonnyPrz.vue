<script setup>
  import MyCv from '@/components/MyCv.vue'
</script>

<template>
  <main>
    <div class="col-12 text-center">
      <router-link to="/jhonny-prz">
        DEV: Jhonny Prz
      </router-link> 
      /
      <router-link to="/crud">
        CRUD de Usuarios
      </router-link>
    </div>
    <div class="col-12 text-center">
      <my-cv />
    </div>
  </main>
</template>