<template>
  <div class="main-container">
    <div style="display: flex;justify-content: center; padding-right: 75px">
      <h1>Bem-vindo:</h1>
    </div>
    <LoginForm />
  </div>
</template>

<script>
import Banner from "../components/Banner.vue"
import LoginForm from "@/components/LoginForm.vue";


export default{
  name: "Login",
  components: {
    Banner,
    LoginForm
  }
}
</script>

<style scoped>

</style>

