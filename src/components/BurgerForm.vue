<template>
  <div>
    <Message :msg="msg" v-show="msg" />
    <div>
      <form id="burger-form" @submit="createBurger">
        <div class="input-container">
          <label for="nome">Nome do cliente</label>
          <input type="text" id="nome" name="nome" v-model="nome" placeholder="Digite o seu nome">
        </div>
        <div class="input-container">
          <label>Escolha os produtos:</label>
          <div class="checkbox-container">
            <label v-for="produto in produtos" :key="produto.id">
              <input type="checkbox" v-model="produtosSelecionados" :value="produto.nome">
              <span>{{ produto.nome }}</span>
            </label>
          </div>
        </div>
        <div class="input-container">
          <input type="submit" class="submit-btn" value="Gerar pedido">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Message from './Message.vue';
import axios from 'axios';

export default {
  name: "BurgerForm",
  data() {
    return {
      produtos: [],
      nome: null,
      produtosSelecionados: [],
      msg: null
    };
  },

  methods: {
    async getProductsByCategory(categoria) {
      try {
        const response = await axios.get(`http://localhost:3000/produtos?categoria=${categoria}`);
        this.produtos = response.data;
      } catch (error) {
        console.error(`Erro ao buscar produtos da categoria ${categoria}:`, error);
      }
    },

    async createBurger(e) {
      e.preventDefault();

      const data = {
        nome: this.nome,
        produtos: this.produtosSelecionados,
        status: "Solicitado"
      };

      try {
        const response = await axios.post("http://localhost:3000/pedidos", data);

        this.msg = `Pedido N° ${response.data.id} realizado com sucesso !`;

        setTimeout(() => this.msg = "", 3000);

        this.nome = "";
        this.produtosSelecionados = [];
      } catch (error) {
        console.error('Erro ao criar o pedido:', error);
      }
    }
  },

  mounted() {
    this.getProductsByCategory('BEBIDAS');
  },

  watch: {
    produtosSelecionados: function (novosProdutos) {
    }
  },

  components: {
    Message
  }
};
</script>

<style scoped>
    #burger-form{
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

    input, select{
        padding: 5px 10px;
        width: 300px;
    }

    .checkbox-container span,
    .checkbox-container input{
        width: auto;
    }

    .checkbox-container span{
        margin-left: 6px;
        font-weight: bold;
    }

    .submit-btn{
        background-color: #222;
        color: #FCBA03;
        font-weight: bold;
        border: 2px solid #222;
        padding: 10px;
        font-size: 16px;
        margin: 0 auto;
        cursor: pointer;
        transition: .5s;
    }

    .submit-btn:hover{
        background-color: transparent;
        color: #222;
    }
</style>