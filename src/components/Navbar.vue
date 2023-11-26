<template>
    <div id="nav">
        <router-link to="/" id="logo-url">
            <img :src="logo" :alt="alt" id="logo">
        </router-link>
        <a v-if="user.authenticated" @click="logout" style="cursor: pointer;">
            Logout
        </a>
        <router-link to="/home" v-if="user.authenticated">
            Home
        </router-link> 
        <router-link to="/pedidos" v-if="user.authenticated">
            Pedidos
        </router-link>
        <router-link to="/produtos" v-if="user.authenticated">
          Cadastrar Produto
        </router-link>
    </div>
</template>

<script>
    import auth from '@/auth/index.js'

    export default {
        name: "Navbar",
        props: ["logo", "alt"],
        data(){
            return{
                user: auth.user
            }
        },
        methods: {
            logout(){
                auth.logout();
                this.$router.push({ path: '/' });
            }
        }
    }
</script>

<style scoped>
    #nav{
       background-color: #222;
       border-bottom: 4px solid #111;
       padding: 15px 50px; 
       display: flex;
       justify-content: flex-end;
       align-items: center;
    }

    #nav #logo-url{
       margin: auto;
       margin-left: 0; 
    }

    #logo{
        width: 40px;
        height: 40px;
    }

    #nav a{
        color: #FCBA03;
        text-decoration: none;
        margin: 12px;
        transition: .5s;
    }

    #nav a:hover{
        color: #fff;
    }
</style>