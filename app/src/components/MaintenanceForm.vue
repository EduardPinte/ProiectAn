<script setup>
import { onMounted, ref } from 'vue'
import { mechanicService } from '@/services/mechanicService'

const props = defineProps({
  carId: {
    type: Number,
    default: null
  },
  carLabel: {
    type: String,
    default: ''
  }
})

const form = ref({
  interventionId: '',
  date: '',
  mileage: '',
  description: ''
})

const loading = ref(false)
const interventions = ref([])
const successMessage = ref('')
const errorMessage = ref('')

const loadInterventions = async () => {
  try {
    const response = await mechanicService.getInterventions()
    interventions.value = response.data
  } catch (error) {
    errorMessage.value = error.message
  }
}

const submit = async () => {
  loading.value = true
  successMessage.value = ''
  errorMessage.value = ''

  if (!props.carId) {
    errorMessage.value = 'Selecteaza mai intai o masina.'
    loading.value = false
    return
  }

  try {
    await mechanicService.createMaintenanceLog({
      carId: Number(props.carId),
      interventionId: form.value.interventionId ? Number(form.value.interventionId) : null,
      date: form.value.date,
      mileage: Number(form.value.mileage),
      description: form.value.description
    })
    successMessage.value = 'Interventia a fost salvata cu succes.'
    form.value = { interventionId: '', date: '', mileage: '', description: '' }
  } catch (error) {
    errorMessage.value = error.message
  } finally {
    loading.value = false
  }
}

onMounted(loadInterventions)
</script>

<template>
  <form class="max-w-xl space-y-3 rounded bg-white p-5 shadow" @submit.prevent="submit">
    <h2 class="text-xl font-semibold">Adauga Interventie Service</h2>
    <p class="text-sm text-slate-600">
      Masina selectata:
      <span class="font-medium">{{ carLabel || 'Neselectata' }}</span>
    </p>
    <select v-model="form.interventionId" class="w-full rounded border p-2">
      <option value="">Selecteaza interventie</option>
      <option v-for="intervention in interventions" :key="intervention.id" :value="intervention.id">
        {{ intervention.name }}
      </option>
    </select>

    <input v-model="form.date" type="date" required class="w-full rounded border p-2" />
    <input
      v-model.number="form.mileage"
      type="number"
      min="0"
      required
      class="w-full rounded border p-2"
      placeholder="Kilometraj"
    />
    <textarea
      v-model="form.description"
      required
      class="w-full rounded border p-2"
      placeholder="Descriere interventie"
    />

    <button :disabled="loading || !carId" class="rounded bg-blue-600 px-4 py-2 text-white disabled:bg-blue-300">
      {{ loading ? 'Se salveaza...' : 'Salveaza interventia' }}
    </button>

    <p v-if="successMessage" class="text-green-600">{{ successMessage }}</p>
    <p v-if="errorMessage" class="text-red-600">{{ errorMessage }}</p>
  </form>
</template>
