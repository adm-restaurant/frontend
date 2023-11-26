<template>
  <div>
    <Message :msg="msg" v-show="msg" />
    <div>
      <form id="login-form" @submit="createLogin">
        <div class="input-container">
          <label for="nome">Usuário</label>
          <input type="text" id="user" name="user" v-model="user" placeholder="Digite o seu usuário">
        </div>

        <div class="input-container">
          <label for="nome">Senha</label>
          <input type="text" id="password" name="password" v-model="password" placeholder="Digite sua senha:">
        </div>

        <div class="input-container">
          <input type="submit" class="submit-btn" value="Entrar">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Message from "@/components/Message.vue";

export default {
  name: "LoginForm",
  data() {
    return {
      user: null,
      password: null,
    };
  },

  methods: {
    async getUser() {
      try {
        const response = await axios.post('http://localhost:8080/api/auth/login', {
          user: this.user,
          password: this.password,
        });
        if (response.status === 200) {
          console.log('Login bem-sucedido');
        } else {
          this.$refs.message.showMessage('Informações inválidas. Tente novamente.');
        }
      } catch (error) {
        console.error('Erro na solicitação getUser:', error);
        this.$refs.message.showMessage('Erro ao entrar. Tente novamente mais tarde.');
      }
    },

    // async createUser(e) {
    //   //To be implemented...
    // }
  },

  mounted() {
    this.getUser();
  },

  components: {
    Message,
  }
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

  input{
    padding: 5px 10px;
    width: 300px;
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