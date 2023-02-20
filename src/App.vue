<template>
  <div id="main">
    <Nav></Nav>

    <div class="flex flex-col lg:pl-64 height-100">
      <main class="flex flex-1 flex-col min-h-full p-2 bg-gray-100">
        <router-view @msj="msj"></router-view>
      </main>
    </div>

    <Notifications
      :estado="data_alert.estado"
      :data="data_alert.params"
      @onHide="data_alert.estado = false"
    ></Notifications>
  </div>
</template>

<script >
import { ref } from "vue";
import Nav from "./components/Nav.vue";
import Notifications from "./components/Notifications.vue";
export default {
  components: {
    Nav,
    Notifications,
  },
  setup() {
    const data_alert = ref({
      estado: false,
      params: {
        type: "wrong",
        title: "Advertencia",
        text: null,
      },
    });

    const msj = ({ type = null, title = null, text = null } = {}) => {
      data_alert.value.estado = true;
      data_alert.value.params.type = type;
      data_alert.value.params.title = title;
      data_alert.value.params.text = text;
    };

    return { data_alert, msj };
  },
};
</script>