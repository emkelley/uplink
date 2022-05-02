<script setup lang="ts">
import TheNavbar from "@/components/TheNavbar.vue";
import ContentBox from "@/components/ContentBox.vue";
import { NavLink } from "@/types";

const navLinks: NavLink[] = [
  { name: "Feed", url: "/feed" },
  { name: "Settings", url: "/settings" },
];
</script>

<template>
  <TheNavbar logo="Uplink" :links="navLinks" />
  <div class="container container-sm mx-auto py-12 px-4">
    <h1 class="text-3xl font-bold uppercase text-emerald-800">Settings</h1>

    <ContentBox> settings </ContentBox>
  </div>
</template>

<style scoped>
article {
  @apply border border-slate-300 bg-slate-50 mb-4 rounded-b-lg rounded-r-lg p-3 w-max;
}
input {
  @apply bg-slate-200;
}
</style>
