<template>
  <div class="main-container" style="display: flex;justify-content: center; flex-direction: column; align-items: center;">
    <div>
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