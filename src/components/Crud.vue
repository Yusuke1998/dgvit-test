<template>
  <div>
    <table class="table table-striped table-hover table-sm table-responsive-sm mt-5">
      <thead class="thead-dark">
        <tr class="text-center">
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Correo electronico</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr 
          v-for="user in users" 
          :key="user.id"
        >
          <td>{{ user.first_name }}</td>
          <td>{{ user.last_name }}</td>
          <td>{{ user.email }}</td>
          <td class="text-center">
            <!-- btn group -->
            <div class="btn-group">
              <button class="btn btn-sm btn-outline-info" @click="editUser(user)">
                editar
              </button>
              <button class="btn btn-sm btn-outline-danger" @click="deleteUser(user)">
                eliminar
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'crud',
    data() {
      return {
        users: [],
        user: {
          id: '',
          email: '',
          avatar: '',
          last_name: '',
          first_name: '',
        }
      }
    },
    created() {
      this.fetchUsers();
    },
    methods: {
      fetchUsers() {
        this.axios.get('https://reqres.in/api/users')
          .then((response) => {
            const { status, data: { data } } = response;
            if (status === 200) {
              this.users = data;
            }
          })
      },
      editUser(user) {
        this.user = user;
        console.log('edit user', user);
      },
      deleteUser(user) {
        this.axios.delete(`https://reqres.in/api/users/${user.id}`)
          .then((response) => {
            const { status } = response;
            if (status === 204) {
              console.log('User deleted');
              this.fetchUsers();
            }
          })
      }
    }
  }
</script>
