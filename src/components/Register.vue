<template>
    <div class="vue-tempalte">
        <form>
            <h3>Sign Up</h3>
            <div class="form-group">
                <label>Nombre</label>
                <input type="text" class="form-control form-control-lg"/>
            </div>
            <div class="form-group">
                <label>Apellido</label>
                <input type="text" class="form-control form-control-lg"/>
            </div>
            <div class="form-group">
                <label>Correo Electronico</label>
                <input type="email" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <label>Contraseña</label>
                <input type="password" class="form-control form-control-lg" />
            </div>
            <button type="submit" class="btn btn-dark btn-lg btn-block">Registrar</button>
            <p class="forgot-password text-right">
                Ya tienes un usuario?
                <router-link :to="{name: 'login'}">Inicia sesion?</router-link>
            </p>
        </form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                
            }
        }
    }
</script>