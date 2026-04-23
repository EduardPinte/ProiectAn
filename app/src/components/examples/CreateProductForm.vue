<script setup>
import { ref } from 'vue'
import { ecommerceService } from '@/services/ecommerceService'

const form = ref({
  categoryId: 1,
  name: '',
  description: '',
  price: 0,
  stock: 0
})

const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const submit = async () => {
  isLoading.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const payload = {
      ...form.value,
      price: Number(form.value.price),
      stock: Number(form.value.stock),
      categoryId: Number(form.value.categoryId)
    }
    const { data } = await ecommerceService.createProduct(payload)
    successMessage.value = `Produs creat cu ID ${data.id}`
    form.value = { categoryId: 1, name: '', description: '', price: 0, stock: 0 }
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <form class="max-w-lg space-y-3" @submit.prevent="submit">
    <h2 class="text-xl font-semibold">Adaugare produs</h2>

    <input v-model="form.name" type="text" placeholder="Nume produs" class="w-full rounded border p-2" />
    <textarea
      v-model="form.description"
      placeholder="Descriere"
      class="w-full rounded border p-2"
    />
    <input
      v-model.number="form.categoryId"
      type="number"
      min="1"
      placeholder="Category ID"
      class="w-full rounded border p-2"
    />
    <input
      v-model.number="form.price"
      type="number"
      min="0"
      step="0.01"
      placeholder="Pret"
      class="w-full rounded border p-2"
    />
    <input
      v-model.number="form.stock"
      type="number"
      min="0"
      placeholder="Stoc"
      class="w-full rounded border p-2"
    />

    <button
      type="submit"
      :disabled="isLoading"
      class="rounded bg-blue-600 px-4 py-2 text-white disabled:bg-blue-300"
    >
      {{ isLoading ? 'Se salveaza...' : 'Creeaza produs' }}
    </button>

    <p v-if="successMessage" class="text-green-600">{{ successMessage }}</p>
    <p v-if="errorMessage" class="text-red-600">{{ errorMessage }}</p>
  </form>
</template>
