<template>
  <div class="vue-tempalte">
    <form>
      <h3>Iniciar Sesion</h3>
      <div class="form-group">
        <label>Correo Electronico</label>
        <input 
          type="email" 
          class="form-control form-control-lg"
          v-model="data.email"
        />
      </div>
      <div class="form-group">
        <label>Contraseña</label>
        <input 
          type="password" 
          class="form-control form-control-lg"
          v-model="data.password"
        />
      </div>
      <button 
        @click.prevent="loginAction" 
        class="btn btn-dark btn-lg btn-block"
      >
        Iniciar
      </button>
    </form>
  </div>
</template>
<script>
  import { mapActions } from 'vuex'
  export default {
    data() {
      return {
        valid:false,
        data: {
          email: '', //'eve.holt@reqres.in',
          password: '' //'cityslicka'
        }
      }
    },
    methods: {
      ...mapActions({
        login: 'auth/login'
      }),
      async loginAction() {
        if (await this.login(this.data)) {
          this.$notify({
            title: 'Bienvenido',
            type: 'success'
          })
          this.$router.push('/')
        } else {
          this.$notify({
            title: 'Error, verifique sus datos',
            type: 'error'
          })
        }
      }
    }
  }
</script>