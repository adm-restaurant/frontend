<template>
  <div class="main-container">
    <div style="display: flex;justify-content: center;">
      <h1>Cadastrar Usuário:</h1>
    </div>
    <UsuarioForm />
  </div>
</template>

<script>
import Banner from "../components/Banner.vue"
import UsuarioForm from "@/components/UsuarioForm.vue";

export default{
  name: "Usuario",
  components: {
    Banner,
    UsuarioForm
  }
}
</script>

<style scoped>

</style>