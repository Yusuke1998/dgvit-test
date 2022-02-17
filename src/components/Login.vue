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
                @click="login" 
                class="btn btn-dark btn-lg btn-block"
            >
                Iniciar
            </button>
        </form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                valid:false,
                data: {
                    email: 'eve.holt@reqres.in',
                    password: 'cityslicka'
                }
            }
        },
        methods: {
            login(ev) {
                ev.preventDefault();
                this.$store.dispatch('auth/login', this.data);
            }
        }
    }
</script>