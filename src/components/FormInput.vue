
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
  <div class="form-group">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<style scoped>
.form-group { margin-bottom: 28px; }
label { display: block; margin-bottom: 8px; }
input { width: 100%; padding: 8px; border: 1px solid #bcb1b1; border-radius: 5px; }
</style>
