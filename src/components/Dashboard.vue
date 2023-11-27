<template>
  <div id="burger-table">
    <Message :msg="msg" v-show="msg" />
    <div>
      <div id="burger-table-heading">
        <div class="order-id">#:</div>
        <div>Cliente:</div>
        <div>Burger:</div>
        <div>Bebida:</div>
        <div>Ações:</div>
      </div>
    </div>
    <div id="burger-table-rows">
      <div class="burger-table-row" v-for="solicitation in burgers" :key="solicitation.id">
        <div class="order-number">{{ solicitation.id }}</div>
        <div>{{ solicitation.clientName }}</div>
        <div>
          <li v-for="produto in solicitation.solicitationProducts.filter(produto => produto.product.category == 'ALIMENTACAO')"
            :key="produto.id">
            {{ produto.product.name ?? 'Nome não encontrado' }}
          </li>
          <li v-if="solicitation.solicitationProducts.filter(produto => produto.product.category == 'ALIMENTACAO').length == 0">
            Não possui
          </li>
        </div>
        <div>
          <li v-for="produto in solicitation.solicitationProducts.filter(produto => produto.product.category == 'BEBIDAS')"
            :key="produto.id">
            {{ produto.product.name ?? 'Nome não encontrado' }}
          </li>
          <li v-if="solicitation.solicitationProducts.filter(produto => produto.product.category == 'BEBIDAS').length == 0">
            Não possui
          </li>
        </div>
        <div>
          <select name="status" class="status" @change="updateBurger($event, solicitation)">
            <option value="">Selecione:</option>
            <option value="PRODUCT_PREPARATION">Preparando</option>
            <option value="DONE">Pronto</option>
          </select>
          <button class="delete-btn" @click="deleteBurger(solicitation.id)">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Message from "./Message.vue";
import api from "@/config/api";
import { ref } from 'vue';

const burgers = ref([]);

export default {
  name: "BurgerTable",
  data() {
    return {
      burgers: burgers,
      status: [],
      msg: null,
    };
  },
  components: {
    Message,
  },
  methods: {
    async getPedidos() {
      try {
        const response = await api.get("/solicitation");
        this.burgers = response.data;  
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      }
    },

    async deleteBurger(id) {
      try {
        await api.delete(`/solicitation/${id}`);
        this.msg = `Pedido removido com sucesso !`;
        setTimeout(() => (this.msg = ""), 3000);

        this.getPedidos();
      } catch (error) {
        console.error("Erro ao deletar pedido:", error);
      }
    },

    async updateBurger(event, solicitation) {
      try {
        const option = event.target.value;
        const solicitationWithNewStatus = { ...solicitation, solicitationStatus: option };
        const response = await api.put('/solicitation', solicitationWithNewStatus);

        this.msg = `O pedido N° ${response.data.id} foi atualizado para ${response.data.solicitationStatus} !`;
      } catch (error) {
        console.error("Erro ao atualizar pedido:", error);
      }
    },
  },
  mounted() {
    this.getPedidos();
  },
};
</script>

<style scoped>
#burger-table {
  max-width: 1200px;
  margin: 0 auto;
}

#burger-table-heading,
#burger-table-rows,
.burger-table-row {
  display: flex;
  flex-wrap: wrap;
}

#burger-table-heading {
  font-weight: bold;
  padding: 12px;
  border-bottom: 3px solid #333;
}

#burger-table-heading div,
.burger-table-row div {
  width: 19%;
}

.burger-table-row {
  width: 100%;
  padding: 12px;
  border-bottom: 1px solid #CCC;
}

#burger-table-heading .order-id,
.burger-table-row .order-number {
  width: 5%;
}

select {
  padding: 12px 6px;
  margin-right: 12px;
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
