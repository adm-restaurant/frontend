<template>
  <div>
    <Message :msg="msg" v-show="msg" />
    <div>
      <form id="product-form" @submit="createProduct">
        <div class="input-container">
          <label for="nome">Nome do Produto</label>
          <input type="text" id="nome" name="nome" v-model="nome" placeholder="Digite o nome do produto">
        </div>
        <div class="input-container">
          <label>Escolha a categoria:</label>
          <div>
            <button class="submit-btn" style="margin-right: 10px" v-for="categoria in categorias" :key="categoria" @click="selectCategoria(categoria)">
              {{ categoria }}
            </button>
          </div>
        </div>
        <div class="input-container">
          <input type="submit" class="submit-btn" value="Cadastrar Produto">
        </div>
      </form>
    </div>
  </div>
</template>

<script>

import {defineComponent} from "vue";
import Message from "@/components/Message.vue";
import api from "@/config/api";

export default defineComponent({
  data(){
    return{
      categorias: ['BEBIDAS', 'ALIMENTACAO'],
      nome: null,
      msg: null
    };
  },

  methods: {
    async createProduct(e) {
      e.preventDefault();

      const data = {
        nome: this.nome,
      };

      try {
        const response = await api.post(`/api/product`, data);

        this.msg = `Produto ${response.data.id} cadastrado com sucesso !`;

        setTimeout(() => this.msg = "", 3000);

        this.nome = "";
        this.produtosSelecionados = [];
      } catch (error) {
        console.error('Erro ao criar o produto:', error);
      }
    }
  },

  selectCategoria(categoria) {
    this.categoriaSelecionada = categoria;
    this.createProduct();
  },

  components: {Message}
})
</script>

<style scoped>
#product-form{
  max-width: 400px;
  margin: 0 auto;
}

.input-container{
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  margin-left: 60px;
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
  margin: 30 auto;
  cursor: pointer;
  transition: .5s;
}

.submit-btn:hover{
  background-color: transparent;
  color: #222;
}
</style>