<template>
    <button class="app-button" @click="$emit('click')">
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

<style scoped>
.app-button {
    background-color: #42b883;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s;
}

</style>