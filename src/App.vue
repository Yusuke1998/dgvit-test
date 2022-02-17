<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container">
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
      </div> 
    </div>
  </div>
</template>

