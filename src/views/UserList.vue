<template>
  <div class="main-container">
    <div style="display: flex;justify-content: center; padding-right: 75px">
      <h1>Listar Usuários:</h1>
    </div>
    <UserListForm />
  </div>
</template>

<script>

import {defineComponent} from "vue";
import UserListForm from "@/components/UserListForm.vue";
import Banner from "@/components/Banner.vue";

export default defineComponent({
  name: "UserList",
  components: {
    Banner,
    UserListForm
  }
})
</script>

<style scoped>

</style>