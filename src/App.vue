<script setup lang="ts">
import TheNavbar from "./components/TheNavbar.vue";
import { NavLink } from "@/types";

const navLinks: NavLink[] = [
  { name: "Home", url: "/" },
  { name: "Feed", url: "/feed" },
  { name: "Login", url: "/login" },
];
</script>

<template>
  <TheNavbar logo="Uplink" :links="navLinks" />
  <router-view></router-view>
</template>

<style lang="scss"></style>
