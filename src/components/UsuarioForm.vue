<template>
  <div>
    <form id="usuario-form" @submit.prevent="createUsuario">
      <div class="input-container">
        <label for="nome">Nome</label>
        <input type="text" id="user" name="nome" v-model="nome" placeholder="Digite o seu nome:">
      </div>

      <div class="input-container">
        <label for="nome">Senha</label>
        <input type="password" id="password" name="password" v-model="password" placeholder="Digite sua senha:">
      </div>

      <div class="input-container">
        <label for="nome">Função</label>
        <select name="role" id="role" v-model="role">
          <option value="ADMINISTRADOR">Administrador</option>
          <option value="FUNCIONARIO">Usuário</option>
        </select>
      </div>


      <div class="input-container">
        <input type="submit" class="submit-btn" value="Criar">
      </div>
    </form>
  </div>
</template>

<script>
import Message from "@/components/Message.vue";
import api from "@/config/api";

export default {
  name: "Usuário",
  data() {
    return {
      user: null,
      password: null,
      role: null,
    };
  },

  methods: {
    async createUsuario(e) {
      e.preventDefault();

      const data = {
        name: this.nome,
        password: this.password,
        role: this.role
      };

      console.log(data);

      if (!this.nome || !this.password || !this.role) {
        alert('Preencha todos os campos!');
        return;
      }

      try {
        const response = await api.post(`/user`, data);

        this.msg = `Usuário ${response.data.id} cadastrado com sucesso !`;

        setTimeout(() => this.msg = "", 3000);

        this.nome = "";
        this.produtosSelecionados = [];
      } catch (error) {
        console.error('Erro ao criar o produto:', error);
      }
    },
    selectCategoria(categoria) {
      this.categoriaSelecionada = categoria;
    },
  },
  components: {Message}
};
</script>


<style scoped>
#login-form{
  max-width: 400px;
  margin: 0 auto;
}

.input-container{
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

label{
  font-weight: bold;
  margin-bottom: 15px;
  color: #222;
  padding: 5px 10px;
  border-left: 4px solid #FCBA03;
}

input,select {
  padding: 5px 10px;
  width: 300px;
}

.dropdown {
  position: relative;
  display: inline-block;
}


.submit-btn{
  background-color: #222;
  color: #FCBA03;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  font-size: 16px;
  margin: 20 auto;
  cursor: pointer;
  transition: .5s;
}

.submit-btn:hover{
  background-color: transparent;
  color: #222;
}
</style>