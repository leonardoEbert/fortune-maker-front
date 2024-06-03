<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted, onBeforeUnmount } from 'vue'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()

function clearAuthStore() {
  if (!authStore.remember) {
    authStore.clearToken()
  }
}

onMounted(() => {
  window.addEventListener('beforeunload', clearAuthStore);
});

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', clearAuthStore);
});
</script>

<template>
  <RouterView />
</template>

<style>
</style>
