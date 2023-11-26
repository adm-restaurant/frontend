<template>
  <div class="main-container">
    <div style="display: flex;justify-content: center;">
      <h1>Cadastrar Produto:</h1>
    </div>
    <ProductForm />
  </div>
</template>

<script>
import Banner from "../components/Banner.vue"
import ProductForm from "../components/ProductForm.vue"

export default{
  name: "Product",
  components: {
    Banner,
    ProductForm
  }
}
</script>

<style scoped>

</style>