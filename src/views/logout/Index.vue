<template>
  <div class="flex min-h-full flex-col justify-center items-center py-12 px-6">
    {{ msg }}
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const msg = ref("Cerrando sesión...");
    const store = useStore();

    onMounted(() => {
      const token = store.getters["reqres/get_token"];
      if (token) setTimeout(() => logout(), 300);
      else msg.value = "Sesión cerrada";
    });

    const logout = () => {
      localStorage.removeItem("reto_tech", "");
      sessionStorage.removeItem("reto_tech", "");

      window.location.reload();
    };

    return { msg };
  },
};
</script>