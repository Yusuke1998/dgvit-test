<template>
  <div>
    <!-- Table User -->
    <table class="table table-striped table-hover table-sm table-responsive-sm my-5">
      <!-- add btn -->
      <thead class="thead-dark">
        <tr>
          <th colspan="5" class="text-right">
            <button 
              class="btn btn-sm btn-outline-info" 
              data-toggle="modal" 
              data-target="#userModal" 
              @click="make()"
            >
              Nuevo
            </button>
          </th>
        </tr>
        <tr class="text-center">
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Correo electronico</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr 
          v-for="item in allUsers" 
          :key="item.id"
        >
          <span v-text="item.id ?? 'N/A'"></span>
          <td>{{ item.first_name }}</td>
          <td>{{ item.last_name }}</td>
          <td>{{ item.email }}</td>
          <td class="text-center">
            <div class="btn-group">
              <button 
                class="btn btn-sm btn-outline-info mr-2" 
                data-toggle="modal" 
                data-target="#userModal" 
                @click="edit(item)"
              >
                editar
              </button>
              <button 
                class="btn btn-sm btn-outline-danger" 
                @click="delet(item)"
              >
                eliminar
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal User -->
    <div 
      class="modal fade" 
      id="userModal" 
      ref="userModal" 
      tabindex="-1" 
      role="dialog" 
      aria-labelledby="userModalLabel" 
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="userModalLabel">{{ titleModal }} Usuario</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="editForm">
              <div class="form-group">
                <label for="first_name">Nombre</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="first_name" 
                  v-model="form.user.first_name"
                />
              </div>
              <div class="form-group">
                <label for="last_name">Apellido</label>
                <input 
                  type="text" 
                  class="form-control" 
                  id="last_name" 
                  v-model="form.user.last_name"
                />
              </div>
              <div class="form-group">
                <label for="email">Correo electronico</label>
                <input 
                  type="email" 
                  class="form-control" 
                  id="email" 
                  :disabled="titleModal !== 'Nuevo'"
                  v-model="form.user.email"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button 
              type="button" 
              class="btn btn-secondary" 
              data-dismiss="modal"
              id="closeModal"
            >
              Cerrar
            </button>
            <button 
              v-if="titleModal !== 'Nuevo'"
              type="button" 
              class="btn btn-primary"
              @click.prevent="update"
            >
              Actualizar
            </button>
            <button 
              v-else
              type="button" 
              class="btn btn-primary"
              @click.prevent="create"
            >
              Crear
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  
  export default {
    name: 'crud',
    data() {
      return {
        titleModal: '',
        form: {
          user: {
            id: '',
            email: '',
            avatar: '',
            last_name: '',
            first_name: '',
          }
        }
      }
    },
    async created() {
      await this.fetchUsers();
    },
    methods: {
      ...mapActions({
        fetchUsers: 'fetchUsers',
        updateUser: 'updateUser',
        deleteUser: 'deleteUser',
        makeUser: 'makeUser',
      }),
      async make() {
        this.titleModal = 'Nuevo';
        this.form = {
          user: {
            email: '',
            last_name: '',
            first_name: '',
          }
        }
      },
      async create () {
        if (await this.makeUser(this.form.user)) {
          this.$notify({
            type: 'success', 
            title: 'Usuario creado!'
          });
          document.getElementById('closeModal').click();
        }
      },
      async edit(user) {
        this.titleModal = 'Editar';
        this.form.user = user;
      },
      async update() {
        if (await this.updateUser(this.form.user)) {
          this.$notify({
            type: 'success', 
            title: 'Usuario actualizado!'
          });
          document.getElementById('closeModal').click();
        }
      },
      async delet(user) {
        if (await this.deleteUser(user)) {
          this.$notify({
            type: 'error', 
            title: 'Usuario eliminado!'
          });
        }
      }
    },
    computed: {
      ...mapState({
        allUsers: state => state.users
      }),
    }
  }
</script>
