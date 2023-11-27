<template>
  <div>
    <Message :msg="msg" v-show="msg" />
    <div>
      <form id="burger-form" @submit="createBurger">
        <div class="input-container">
          <label for="nome">Nome do cliente</label>
          <input type="text" id="nome" name="nome" v-model="nome" placeholder="Digite o nome do cliente">
        </div>
        <div class="input-container">
          <label>Escolha a categoria:</label>
          <div>
            <span class="submit-btn"
                  style="margin-right: 10px"
                  v-for="categoria in categorias" :key="categoria"
                  @click="() => selectCategoria(categoria)"
            >
              {{ categoria }}
            </span>
          </div>
        </div>
        <div class="input-container">
          <label>Escolha os produtos:</label>
          <div class="checkbox-container">
            <label v-for="produto in produtos" :key="produto.id" class="checkbox-input">
              <input type="checkbox" v-model="produtosSelecionados" :value="produto">
              <span>{{ produto.name }}</span>
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
import api from "@/config/api";

export default {
  name: "BurgerForm",
  data() {
    return {
      categorias: ['BEBIDAS', 'ALIMENTACAO'],
      categoriaSelecionada: 'ALIMENTACAO',
      produtos: [],
      nome: null,
      produtosSelecionados: [],
      msg: null
    };
  },

  methods: {
    async loadProducts() {
      try {
        const response = await api.get(`/product/${this.categoriaSelecionada}`)
        this.produtos = response.data;
      } catch (error) {
        console.error(`Erro ao buscar produtos da categoria ${this.categoriaSelecionada}:`, error);
      }
    },

    selectCategoria(categoria) {
      this.categoriaSelecionada = categoria;
      this.loadProducts();
    },

    async createBurger(e) {
      e.preventDefault();

      const data = {
        clientName: this.nome,
        solicitationProducts: this.produtosSelecionados.map(product => {
          return {
            product,
            quantity: 1
          }
        }),
        status: "Solicitado"
      };

      try {
        const response = await api.post(`/solicitation`, data);

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
    this.loadProducts();
  },

  watch: {
    categoriaSelecionada: function (novaCategoria) {
      this.loadProducts();
    },
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
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-left: 80px;
    }

    .input-container{
        display: flex;
        flex-direction: column;
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

    .checkbox-container {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      flex: 1;
      gap: 10px;
    }

    .checkbox-input {
      display: flex;
      margin-right: auto;
      align-items: center;
      width: 150px;
    }
    .checkbox-input input {
      display: flex;
      width: 40px;
      height: 20px;
      min-width: 40px;
      min-height: 20px;
    }

    .submit-btn{
        background-color: #222;
        color: #FCBA03;
        font-weight: bold;
        border: 2px solid #222;
        padding: 10px;
        font-size: 16px;
        margin: 30 auto;
        cursor: pointer;
        transition: .5s;
    }

    .submit-btn:hover{
        background-color: transparent;
        color: #222;
    }
</style>