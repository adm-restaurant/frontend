<template>
    <Banner />
  <div class="main-container" style="display: flex; align-items: center; justify-content: center; flex-direction: column;">
    <h1>Monte o pedido:</h1>
    <BurgerForm />
  </div>
</template>

<script>
  import Banner from "../components/Banner.vue"
  import BurgerForm from "../components/BurgerForm.vue"

  export default{
    name: "Home",
    components: {
      Banner,
      BurgerForm
    }
  }
</script>
