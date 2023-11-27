<template>
  <div>
    <Message :msg="msg" v-show="msg" />
    <div>
      <form id="login-form" @submit.prevent="handleLogin">
        <div class="input-container">
          <label for="nome">Nome</label>
          <input type="text" id="user" name="user" v-model="user" placeholder="Digite o seu nome">
        </div>

        <div class="input-container">
          <label for="nome">Senha</label>
          <input type="password" id="password" name="password" v-model="password" placeholder="Digite sua senha:">
        </div>

        <div class="input-container">
          <input type="submit" class="submit-btn" value="Entrar">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Message from "@/components/Message.vue";
import authService from '@/services/auth.service';
import auth from '@/auth/index.js';

export default {
  name: "LoginForm",
  data() {
    return {
      user: null,
      password: null,
    };
  },

  methods: {
    async handleLogin() {
      try {
        const response = await authService.login(this.user, this.password);
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
          localStorage.setItem('token', response.data.token);
        }

        auth.user.authenticated = true;
        auth.user.role = response.data.role;

        this.$router.push({ path: '/home' });

      } catch (error) {
        console.log(error);
        alert('Senha ou usuário incorretos!');
      }
    },

    // async createUser(e) {
    //   //To be implemented...
    // }
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