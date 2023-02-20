<template>
  <div class="px-6 lg:px-8 mt-5">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Usuarios</h1>
      </div>
    </div>
    <div class="mt-8">
      <div class="-my-2 -mx-6 overflow-x-auto lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div
            class="
              overflow-hidden
              shadow
              ring-1 ring-black ring-opacity-5
              sm:rounded-lg
            "
          >
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="
                      py-3.5
                      pl-6
                      pr-3
                      text-left text-sm
                      font-semibold
                      text-gray-900
                    "
                  >
                    Profile
                  </th>
                  <th
                    scope="col"
                    class="
                      px-3
                      py-3.5
                      text-left text-sm
                      font-semibold
                      text-gray-900
                    "
                  >
                    First name
                  </th>
                  <th
                    scope="col"
                    class="
                      px-3
                      py-3.5
                      text-left text-sm
                      font-semibold
                      text-gray-900
                    "
                  >
                    Last name
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="item in users" :key="item">
                  <td
                    className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                  >
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div
                          className="h-10 w-auto"
                          :style="{
                            'background-image': `url(${item.avatar})`,
                            'background-size': '100% auto',
                            'background-repeat': 'no-repeat',
                            'background-position': 'center',
                          }"
                        ></div>
                      </div>
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">
                          {{ item.email }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ item.first_name }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {{ item.last_name }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const users = ref();
    const store = useStore();

    onMounted(async () => {
      try {
        const response = await store.dispatch("reqres/get_users");

        users.value = response.data.data;
      } catch (error) {
        console.log("Ocurrio un error cargando la informacion: ", error);
      }
    });

    return { users };
  },
};
</script>