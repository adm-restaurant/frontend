<template>
  <div id="user-table">
    <Message :msg="msg" v-show="msg" />
    <div>
      <div id="user-table-heading">
        <div class="user-id">#:</div>
        <div>Nome:</div>
        <div>Função:</div>
        <div>Ações:</div>
      </div>
    </div>
    <div id="user-table-rows">
      <div class="user-table-row" v-for="user in filteredUsers" :key="user.id">
        <div class="user-number">{{ user.id }}</div>
        <div>{{ user.name }}</div>
        <div>{{ user.role }}</div>
        <div>
          <button class="delete-btn" @click="deleteUser(user.id)">Excluir</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Message from "./Message.vue";
import api from "@/config/api";
import { ref, watch } from 'vue';

const users = ref([]);
const filteredUsers = ref([]);

export default {
  name: "UserTable",
  data() {
    return {
      users: users,
      filteredUsers: filteredUsers,
      msg: null,
    };
  },
  components: {
    Message,
  },
  methods: {
    async getUsers() {
      try {
        const response = await api.get("/user");
        this.users = response.data;
        this.filterUsers();
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    },

    filterUsers() {
      this.filteredUsers = this.users.filter(user => user.role === 'administrador' || user.role === 'funcionario');
    },

    async deleteUser(id) {
      try {
        await api.delete(`/user/${id}`);
        this.msg = `Usuário removido com sucesso !`;
        setTimeout(() => (this.msg = ""), 3000);

        await this.getUsers();
      } catch (error) {
        console.error("Erro ao deletar usuário:", error);
      }
    },
  },
  mounted() {
    this.getUsers();
  },
  watch: {
    users: 'filterUsers',
  },
};
</script>

<style scoped>
#user-table {
  max-width: 800px;
  margin: 0 auto;
}

#user-table-heading,
#user-table-rows,
.user-table-row {
  display: flex;
  flex-wrap: wrap;
}

#user-table-heading {
  font-weight: bold;
  padding: 12px;
  border-bottom: 3px solid #333;
}

#user-table-heading div,
.user-table-row div {
  width: 24%;
}

.user-table-row {
  width: 100%;
  padding: 12px;
  border-bottom: 1px solid #CCC;
}

#user-table-heading .user-id,
.user-table-row .user-number {
  width: 5%;
}

.delete-btn {
  background-color: #222;
  color: #fcba03;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
}

.delete-btn:hover {
  background-color: transparent;
  color: #222;
}
</style>
