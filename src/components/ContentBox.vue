<script setup lang="ts"></script>

<template>
  <div class="content-box">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.content-box {
  @apply bg-white rounded p-6 mt-6 border-emerald-700 border;
}
</style>
