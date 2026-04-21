
<script setup>
const props = defineProps({
  label: String,
  type: { type: String, default: 'text' },
  modelValue: [String, Number],
  id: String,
  placeholder: String,
  required: Boolean
})
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="mb-6">
    <label :for="id" class="block mb-2 font-medium text-gray-700">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
</template>
