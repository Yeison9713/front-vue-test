<template>
  <div
    class="
      border-gray-100
      lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r
      sm:border-b
    "
  >
    <router-link
      to="/"
      class="
        flex flex-shrink-0
        items-center
        px-5
        pt-6
        pb-6
        border-b
        lg:border-gray-100
      "
    >
      <img class="h-8 w-auto" src="/vite.svg" />

      <span class="pl-5 text-gray-900 font-bold">Reto Tech</span>
    </router-link>

    <div class="flex h-0 flex-1 flex-col overflow-y-auto pr-5">
      <div class="mt-5">
        <nav class="mt-6">
          <div class="space-y-1">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              :class="[
                item.href == router.path
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50',
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
              ]"
              :aria-current="item.href == router.path ? 'page' : undefined"
            >
              <component
                :is="item.icon"
                :class="[
                  item.href == router.path
                    ? 'text-blue-600'
                    : 'text-gray-400 group-hover:text-gray-500',
                  'ml-3 mr-3 flex-shrink-0 h-6 w-6',
                ]"
                aria-hidden="true"
              />
              {{ item.name }}
            </router-link>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { watch } from "vue";

import {
  UserCircleIcon,
  UserGroupIcon,
  UserPlusIcon,
  LockClosedIcon
} from "@heroicons/vue/24/outline";

export default {
  setup() {
    const router = useRoute();

    const navigation = [
      { name: "Login", href: "/login", icon: UserCircleIcon },
      {
        name: "Usuarios",
        href: "/usuarios",
        icon: UserGroupIcon,
      },
      { name: "Crear", href: "/crear", icon: UserPlusIcon },
      { name: "Cerrar sesión", href: "/logout", icon: LockClosedIcon },
    ];

    return { navigation, router };
  },
};
</script>