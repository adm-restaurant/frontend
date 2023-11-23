<template>
   <div>
        <Message :msg="msg" v-show="msg" />
        <div>
            <form id="burger-form" @submit="createBurger">
                <div class="input-container">
                    <label for="nome">Nome do cliente</label>
                    <input type="text" id="nome" name="nome" v-model="nome" placeholder="Digite o seu nome:">
                </div>
                <div class="input-container">
                    <label for="bruger">Escolha o burger:</label>
                    <select name="burger" id="burger" v-model="burger">
                        <option value="">Selecione o burger</option>
                        <option v-for="pao in paes" :key="pao.id" :value="pao.tipo">
                            {{ pao.tipo }}
                        </option>
                    </select>
                </div>
                <div class="input-container">
                    <label for="carne">Escolha a bebida:</label>
                    <select name="bebida" id="bebida" v-model="bebida">
                        <option value="">Selecione a bebida</option>
                        <option v-for="carne in carnes" :key="carne.id" :value="carne.tipo">
                            {{ carne.tipo }}
                        </option>
                    </select>
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
    export default{
        name: "BurgerForm",
        data(){
            return {
                paes: null,
                carnes: null,
                opcionaisdata: null,
                nome: null,
                pao: null,
                carne: null,
                opcionais: [],
                msg: null
            }
        },

        methods: {
            // "Puxa" as informações do back dentro do form:
            async getIngredients(){
                const req = await fetch("http://localhost:3000/ingredientes");
                const data = await req.json();
                
                this.paes = data.paes;
                this.carnes = data.carnes;
                this.opcionaisdata = data.opcionais;
            },

            // Insere informações no back/banco na criação do burger:
            async createBurger(e) {
                e.preventDefault();

                const data = {
                    nome: this.nome,
                    carne: this.carne,
                    pao: this.pao,
                    opcionais: Array.from(this.opcionais),
                    status: "Solicitado"
                };

                const dataJson =    JSON.stringify(data);

                const req = await fetch("http://localhost:3000/burgers",{
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: dataJson
                });

                const res = await req.json();

                // Mensagem do sistema:
                this.msg = `Pedido N° ${res.id} realizado com sucesso !`;

                // Limpa a mensagem:
                setTimeout(() => this.msg = "", 3000);

                // Limpar campos:
                this.nome = "";
                this.carne = "";
                this.pao = "";
                this.opcionais = "";
            }
        },

        mounted(){
            this.getIngredients();
        },

        components:{
            Message
        }
    }
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