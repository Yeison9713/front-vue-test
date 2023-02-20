<template>
  <div class="flex justify-center px-6 lg:px-8 mt-5">
    <div class="w-full">
      <div class="flex items-center">
        <div class="flex-auto">
          <h1 class="text-xl font-semibold text-gray-900">Crear usuario</h1>
        </div>
      </div>

      <div class="mt-8">
        <div class="-my-2 -mx-6 overflow-x-auto lg:-mx-8">
          <div
            class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
          >
            <div
              class="
                overflow-hidden
                shadow
                ring-1 ring-black ring-opacity-5
                sm:rounded-lg
              "
            >
              <div class="p-2 bg-white">
                <div class="pt-1.5 pb-3.5">
                  <h3 class="text-lg font-medium leading-6 text-gray-900">
                    Informacion personal
                  </h3>
                </div>

                <div class="space-y-6 sm:space-y-5">
                  <div
                    class="flex justify-around border-t border-gray-200 pt-5"
                  >
                    <div class="flex items-center justify-around w-full px-3">
                      <div class="w-full">
                        <label
                          for="first-name"
                          class="block text-sm font-medium text-gray-700 mr-2"
                          >Primer nombre:
                        </label>
                      </div>
                      <input
                        type="text"
                        name="first-name"
                        v-model="form.first_name"
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
                    <div class="flex items-center justify-around w-full">
                      <div class="w-full">
                        <label
                          for="last-name"
                          class="block text-sm font-medium text-gray-700 mr-2"
                          >Segundo nombre:
                        </label>
                      </div>
                      <input
                        type="text"
                        name="last-name"
                        v-model="form.last_name"
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
                  <div
                    class="flex justify-around border-t border-gray-200 pt-5"
                  >
                    <div class="flex items-center justify-around w-full px-3">
                      <div class="w-full">
                        <label
                          for="surnames"
                          class="block text-sm font-medium text-gray-700 mr-2"
                          >Apellidos:
                        </label>
                      </div>
                      <input
                        type="text"
                        name="surnames"
                        v-model="form.surnames"
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
                    <div class="flex items-center justify-around w-full">
                      <div class="w-full">
                        <label
                          for="email"
                          class="block text-sm font-medium text-gray-700 mr-2"
                          >Correo:
                        </label>
                      </div>
                      <input
                        type="text"
                        name="email"
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
                </div>
                <div class="pt-5">
                  <div class="flex justify-end border-t pt-5">
                    <button
                      type="button"
                      class="
                        rounded-md
                        border border-gray-300
                        bg-white
                        py-2
                        px-4
                        text-sm
                        font-medium
                        text-gray-700
                        shadow-sm
                        hover:bg-gray-50
                      "
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      class="
                        ml-3
                        inline-flex
                        justify-center
                        rounded-md
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
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
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
      first_name: null,
      last_name: null,
      surnames: null,
      email: null,
    });

    const validate_form = () => {
      if (!form.value.first_name) {
        context.emit("msj", { text: "Primer nombre es requerido!" });
      } else if (!form.value.last_name) {
        context.emit("msj", { text: "Segundo nombre es requerido!" });
      } else if (!form.value.surnames) {
        context.emit("msj", { text: "Apellidos son requeridos!" });
      } else if (!form.value.email) {
        context.emit("msj", { text: "Correo es requerido!" });
      } else save();
    };

    const save = async () => {
      try {
        await store.dispatch("reqres/create_user", {
          ...form.value,
        });

        context.emit("msj", {
          type: "success",
          title: "Éxito!",
          text: "Guardado correctamente!",
        });

        setTimeout(() => {
          location.reload();
        }, 5000);
      } catch (error) {
        console.log("Error guardando: ", error);
        context.emit("msj", { text: "Ocurrio un error guardando" });
      }
    };

    return { form, validate_form, save };
  },
};
</script>