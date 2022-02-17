<template>
    <div class="vue-tempalte">
        <form>
            <h3>Iniciar Sesion</h3>
            <div class="form-group">
                <label>Correo Electronico</label>
                <input type="email" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <label>Contraseña</label>
                <input type="password" class="form-control form-control-lg" />
            </div>
            <button type="submit" class="btn btn-dark btn-lg btn-block">Iniciar</button>
        </form>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        }
    }
</script>