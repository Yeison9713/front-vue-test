<template>
  <div class="flex min-h-full flex-col justify-center py-12 px-6">
    <div class="mx-auto w-full max-w-md flex">
      <img class="mx-10 h-12 w-auto" src="/vite.svg" />
      <h2 class="text-center text-3xl font-bold text-gray-900">
        Ingrese a su cuenta
      </h2>
    </div>

    <div class="mt-8 mx-auto w-full max-w-md">
      <div class="bg-white py-8 px-4 shadow rounded-lg">
        <div class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Correo</label
            >
            <div class="mt-1">
              <input
                name="email"
                type="email"
                v-model="form.email"
                class="
                  block
                  w-full
                  appearance-none
                  rounded-md
                  border border-gray-300
                  px-3
                  py-2
                  placeholder-gray-400
                  shadow-sm
                  text-sm
                "
              />
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
              >Contraseña</label
            >
            <div class="mt-1">
              <input
                name="password"
                type="password"
                v-model="form.password"
                class="
                  block
                  w-full
                  appearance-none
                  rounded-md
                  border border-gray-300
                  px-3
                  py-2
                  placeholder-gray-400
                  shadow-sm
                  text-sm
                "
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                name="remember-me"
                type="checkbox"
                v-model="form.remember"
                class="h-4 w-4 rounded border-gray-300 text-blue-600"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900"
                >Recordar me</label
              >
            </div>

            <div class="text-sm">
              <a href="#" class="font-medium text-blue-600 hover:text-blue-500"
                >Olvidaste tu contraseña?</a
              >
            </div>
          </div>

          <div>
            <button
              type="button"
              class="
                flex
                w-full
                justify-center
                rounded-md
                border border-transparent
                bg-blue-600
                py-2
                px-4
                text-sm
                font-medium
                text-white
                shadow-sm
                hover:bg-blue-700
              "
              @click="validate_form"
            >
              Ingresar
            </button>
          </div>
        </div>
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="bg-white px-2 text-gray-500">O ingrese con</span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-3 gap-3">
            <div v-for="item in options" :key="item">
              <a
                class="
                  inline-flex
                  w-full
                  justify-center
                  rounded-md
                  border border-gray-300
                  bg-white
                  py-2
                  px-4
                  text-sm
                  font-medium
                  text-gray-500
                  shadow-sm
                  hover:bg-gray-50
                "
              >
                <div className="h-6 w-6 flex-shrink-0">
                  <div
                    className="h-6 w-auto"
                    :style="{
                      'background-image': `url(${item.url})`,
                      'background-size': '100% auto',
                      'background-repeat': 'no-repeat',
                      'background-position': 'center',
                    }"
                  ></div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  setup(props, context) {
    const store = useStore();

    const form = ref({
      email: null,
      password: null,
      remember: false,
    });

    const options = [
      { url: "https://cdn-icons-png.flaticon.com/512/300/300221.png" },
      { url: "https://cdn-icons-png.flaticon.com/512/733/733579.png" },
      { url: "https://cdn-icons-png.flaticon.com/512/3536/3536505.png" },
    ];

    const validate_form = () => {
      if (!form.value.email) {
        context.emit("msj", { text: "Correo es requerido!" });
      } else if (!form.value.password) {
        context.emit("msj", { text: "Contraseña es requerida!" });
      } else save();
    };

    const save = async () => {
      try {
        const response = await store.dispatch("reqres/login", {
          ...form.value,
        });

        context.emit("msj", {
          type: "success",
          title: "Éxito!",
          text: "Usuario logueado correctamente!",
        });

        if (form.value.remember) {
          localStorage.setItem("reto_tech", JSON.stringify(response.data));
        } else {
          sessionStorage.setItem("reto_tech", JSON.stringify(response.data));
        }

        setTimeout(() => location.reload(), 3000);
      } catch (error) {
        console.log("Error ingresando: ", error);
        context.emit("msj", { text: "Usuario o contraseña invalida!" });
      }
    };

    return { form, options, validate_form, save };
  },
};
</script>