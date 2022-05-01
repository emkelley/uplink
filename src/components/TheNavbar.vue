<script setup lang="ts">
import { PropType, onBeforeMount, ref } from "vue";
import { NavLink } from "@/types";
import { getUserState, logout } from "@/firebase";
import { useRouter } from "vue-router";

let userState = ref();
const router = useRouter();

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

const signOut = async () => {
  logout();
  router.push("/login");
};
onBeforeMount(async () => {
  userState.value = await getUserState();
});
</script>

<template>
  <nav>
    <section
      class="font-black uppercase tracking-widest select-none flex flex-row items-center text-2xl"
    >
      <p><i class="fa-duotone fa-satellite-dish mr-2" />{{ props.logo }}</p>
    </section>
    <section class="flex flex-row items-center">
      <router-link
        v-for="link in props.links"
        :key="link.url"
        :to="link.url"
        class="nav-link"
      >
        {{ link.name }}
      </router-link>
      <p @click="signOut" class="nav-link">Logout</p>
    </section>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  @apply w-full bg-teal-800 text-slate-200 p-3 flex flex-row justify-between;
}
.nav-link {
  @apply pl-6 uppercase font-black text-sm hover:cursor-pointer text-slate-200 hover:text-emerald-400 transition;
}
</style>
