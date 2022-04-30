<script setup lang="ts">
import { PropType } from "vue";
import { NavLink } from "@/types";

const props = defineProps({
  logo: {
    type: String,
    default: "Uplink",
  },
  links: {
    type: Array as PropType<NavLink[]>,
    default: () => [],
  },
});
</script>

<template>
  <nav>
    <section
      class="font-black uppercase tracking-widest select-none flex flex-row items-center text-2xl"
    >
      {{ props.logo }}
    </section>
    <section class="flex flex-row items-center">
      <router-link
        v-for="link in props.links"
        :key="link.url"
        :to="link.url"
        class="pl-6 uppercase font-black text-sm hover:cursor-pointer hover:text-emerald-400"
      >
        {{ link.name }}
      </router-link>
    </section>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  @apply w-full  bg-teal-800 text-slate-200 p-3 flex flex-row justify-between;
}
</style>
