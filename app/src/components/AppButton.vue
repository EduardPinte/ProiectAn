<template>
    <button @click="$emit('click')" class="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors duration-300">
        {{ label }}
    </button>
</template>

<script setup>
const props = defineProps({
    label: {
        label: String,
    }
})
</script>