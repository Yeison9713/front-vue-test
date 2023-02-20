<template>
  <div class="pointer-events-none fixed inset-0 flex items-end px-4 py-6">
    <div class="flex w-full flex-col space-y-4 items-end">
      <transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="show"
          class="
            pointer-events-auto
            w-full
            max-w-sm
            overflow-hidden
            rounded-lg
            bg-white
            shadow-lg
            ring-1 ring-black ring-opacity-5
          "
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <component
                  :is="
                    data_alert.type == 'success'
                      ? CheckCircleIcon
                      : ExclamationTriangleIcon
                  "
                  :class="
                    data_alert.type == 'success'
                      ? 'h-6 w-6 text-green-400'
                      : 'h-6 w-6 text-red-400'
                  "
                  aria-hidden="true"
                />
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-gray-900">
                  {{ data_alert.title }}
                </p>
                <p class="mt-1 text-sm text-gray-500">
                  {{ data_alert.text }}
                </p>
              </div>
              <div class="ml-4 flex flex-shrink-0">
                <button
                  type="button"
                  @click="close"
                  class="
                    inline-flex
                    rounded-md
                    bg-white
                    text-gray-400
                    hover:text-gray-500
                    focus:outline-none
                    focus:ring-2
                    focus:ring-indigo-500
                    focus:ring-offset-2
                  "
                >
                  <component
                    :is="XMarkIcon"
                    :class="
                      data_alert.type == 'success'
                        ? 'h-6 w-6 text-green-400'
                        : 'h-6 w-6 text-red-400'
                    "
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/vue/24/outline";
import { XMarkIcon } from "@heroicons/vue/20/solid";

const props = defineProps({
  estado: Boolean,
  data: {
    type: String,
    title: String,
    text: String,
  },
});

const show = ref(false);
const data_alert = ref({
  type: null,
  title: null,
  text: null,
});

const emit = defineEmits(["onHide"]);

watch(
  () => props.estado,
  (val) => {
    show.value = val;

    if (!val) data_alert.value = {};
    else set_data();
  }
);

const set_data = () => {
  data_alert.value.type = props.data.type || "wrong";
  data_alert.value.title = props.data.title || "Advertencia";
  data_alert.value.text = props.data.text || "Mensaje no definido";
  setTimeout(() => close(), 3000);
};

const close = () => {
  emit("onHide", false);
};
</script>