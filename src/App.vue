<script setup>
</script>

<template>
  <div class="app">
    <!-- router-view afișează componenta corespunzătoare rutei curente -->
    <router-view />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #B2EBF2;
}
</style>
