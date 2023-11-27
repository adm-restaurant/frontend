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
      <div class="burger-table-row" v-for="burger in burgers" :key="burger.id">
        <div class="order-number">{{ burger.id }}</div>
        <div>{{ burger.clientName }}</div>
        <div>
          <li v-for="produto in burger.solicitationProducts.filter(produto => produto.product.category == 'ALIMENTACAO')"
            :key="produto.id">
            {{ produto.product.name ?? 'nome não encontrado' }}
          </li>
        </div>
        <div>
          <li v-for="produto in burger.solicitationProducts.filter(produto => produto.product.category == 'BEBIDAS')"
            :key="produto.id">
            {{ produto.product.name ?? 'nome não encontrado' }}
          </li>
        </div>
        <div>
          <select name="status" class="status" @change="updateBurger($event, burger.id)">
            <option value="">Selecione:</option>
            <option v-for="s in status" :key="s.id" :value="s.tipo" :selected="burger.status == s.tipo">
              {{ s.tipo }}
            </option>
          </select>
          <button class="delete-btn" @click="deleteBurger(burger.id)">Cancelar</button>
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
        await api.get(`/solicitation/${id}`);
        this.msg = `Pedido removido com sucesso !`;
        setTimeout(() => (this.msg = ""), 3000);

        await this.getPedidos();
        console.log(id)
      } catch (error) {
        console.error("Erro ao deletar pedido:", error);
      }
    },

    async updateBurger(event, id) {
      try {
        const option = event.target.value;
        const response = await api.patch(`/product/${id}`, { status: option });

        this.msg = `O pedido N° ${response.data.id} foi atualizado para ${response.data.status} !`;
        setTimeout(() => (this.msg = ""), 3000);
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
