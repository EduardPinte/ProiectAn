<script setup>
import { ref, computed } from 'vue'
import { useCarStore } from '@/stores/carStore'

const vin = ref('')
const store = useCarStore()

// COMPUTED
const isVinValid = computed(() => vin.value.length === 17)

function search() {
  store.searchByVIN(vin.value)
}
</script>

<template>
  <div>
    <h2>Search by VIN</h2>
    <input v-model="vin" placeholder="Enter VIN" />
    <button :disabled="!isVinValid" @click="search">
      Search
    </button>
  </div>
</template>
