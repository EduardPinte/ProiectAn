<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { mechanicService } from '@/services/mechanicService'

const router = useRouter()
const isLoading = ref(false)
const message = ref('')
const messageType = ref('success')

const cars = ref([])
const parts = ref([])
const mechanics = ref([])
const workOrders = ref([])
const maintenanceLogs = ref([])
const selectedCarId = ref(null)

const carForm = reactive({
  brand: '',
  model: '',
  year: '',
  vin: '',
  plate_number: ''
})

const partForm = reactive({
  name: '',
  stock: 0,
  price: 0
})

const workOrderForm = reactive({
  carId: null,
  mechanicId: null,
  total_cost: 0,
  partId: null,
  partQuantity: 1,
  status: 'pending'
})

const statusOptions = ['pending', 'in_progress', 'completed', 'cancelled']
const canCreateWorkOrder = computed(
  () =>
    workOrderForm.carId &&
    workOrderForm.mechanicId &&
    workOrderForm.partId &&
    Number(workOrderForm.partQuantity) > 0 &&
    Number(workOrderForm.total_cost) > 0
)

const resetCarForm = () => {
  selectedCarId.value = null
  carForm.brand = ''
  carForm.model = ''
  carForm.year = ''
  carForm.vin = ''
  carForm.plate_number = ''
}

const setFeedback = (type, text) => {
  messageType.value = type
  message.value = text
}

const loadData = async () => {
  isLoading.value = true
  try {
    const [carsRes, partsRes, mechanicsRes, workOrdersRes, logsRes] = await Promise.all([
      mechanicService.getCars(),
      mechanicService.getParts(),
      mechanicService.getMechanics(),
      mechanicService.getWorkOrders(),
      mechanicService.getMaintenanceLogs()
    ])
    cars.value = carsRes.data
    parts.value = partsRes.data
    mechanics.value = mechanicsRes.data
    workOrders.value = workOrdersRes.data
    maintenanceLogs.value = logsRes.data
  } catch (error) {
    setFeedback('error', error.message)
  } finally {
    isLoading.value = false
  }
}

const getStatusBadgeClass = (status) => {
  if (status === 'completed') return 'bg-emerald-100 text-emerald-700'
  if (status === 'in_progress') return 'bg-amber-100 text-amber-700'
  if (status === 'cancelled') return 'bg-red-100 text-red-700'
  return 'bg-slate-100 text-slate-700'
}

const prefillWorkOrderForCar = (car) => {
  workOrderForm.carId = car.id
}

const submitCar = async () => {
  try {
    if (selectedCarId.value) {
      await mechanicService.updateCar(selectedCarId.value, { ...carForm, year: Number(carForm.year) || null })
      setFeedback('success', 'Masina actualizata cu succes.')
    } else {
      await mechanicService.createCar({ ...carForm, year: Number(carForm.year) || null })
      setFeedback('success', 'Masina adaugata cu succes.')
    }

    resetCarForm()
    await loadData()
  } catch (error) {
    setFeedback('error', error.message)
  }
}

const editCar = (car) => {
  selectedCarId.value = car.id
  carForm.brand = car.brand
  carForm.model = car.model
  carForm.year = car.year ?? ''
  carForm.vin = car.vin
  carForm.plate_number = car.plate_number
}

const submitPart = async () => {
  try {
    await mechanicService.createPart({
      name: partForm.name,
      stock: Number(partForm.stock),
      price: Number(partForm.price)
    })
    partForm.name = ''
    partForm.stock = 0
    partForm.price = 0
    setFeedback('success', 'Piesa adaugata cu succes.')
    await loadData()
  } catch (error) {
    setFeedback('error', error.message)
  }
}

const updatePartStock = async (part) => {
  try {
    await mechanicService.updatePartStock(part.id, Number(part.stock))
    setFeedback('success', `Stoc actualizat pentru piesa #${part.id}.`)
  } catch (error) {
    setFeedback('error', error.message)
  }
}

const submitWorkOrder = async () => {
  try {
    await mechanicService.createWorkOrder({
      ...workOrderForm,
      carId: Number(workOrderForm.carId),
      mechanicId: Number(workOrderForm.mechanicId),
      total_cost: Number(workOrderForm.total_cost),
      partId: Number(workOrderForm.partId),
      partQuantity: Number(workOrderForm.partQuantity)
    })
    setFeedback('success', 'Comanda de lucru creata.')
    workOrderForm.carId = null
    workOrderForm.mechanicId = null
    workOrderForm.partId = null
    workOrderForm.partQuantity = 1
    workOrderForm.total_cost = 0
    workOrderForm.status = 'pending'
    await loadData()
  } catch (error) {
    setFeedback('error', error.message)
  }
}

const saveWorkOrderStatus = async (order) => {
  try {
    await mechanicService.updateWorkOrderStatus(order.id, order.status)
    setFeedback('success', `Status actualizat pentru comanda #${order.id}.`)
    await loadData()
  } catch (error) {
    setFeedback('error', error.message)
  }
}

const deleteMechanicRow = async (mechanicId) => {
  try {
    await mechanicService.deleteMechanic(mechanicId)
    setFeedback('success', `Mecanicul #${mechanicId} a fost sters.`)
    await loadData()
  } catch (error) {
    setFeedback('error', error.message)
  }
}

const saveMaintenanceMileage = async (log) => {
  try {
    await mechanicService.updateMaintenanceMileage(log.id, Number(log.mileage))
    setFeedback('success', `Kilometraj actualizat pentru log #${log.id}.`)
    await loadData()
  } catch (error) {
    setFeedback('error', error.message)
  }
}

const deleteMaintenanceLogRow = async (logId) => {
  try {
    await mechanicService.deleteMaintenanceLog(logId)
    setFeedback('success', `Interventia #${logId} a fost stearsa.`)
    await loadData()
  } catch (error) {
    setFeedback('error', error.message)
  }
}

onMounted(loadData)
</script>

<template>
  <div class="min-h-screen bg-slate-100 p-4 md:p-6">
    <div class="mx-auto max-w-7xl space-y-5">
      <div class="rounded-lg bg-white p-5 shadow">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <h1 class="text-2xl font-bold text-slate-800">Workshop Admin</h1>
          <div class="flex gap-2">
            <button class="rounded bg-slate-700 px-4 py-2 text-white hover:bg-slate-800" @click="router.push('/maintain')">
              Back to Maintain
            </button>
            <button class="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700" @click="router.push('/home')">
              Home
            </button>
          </div>
        </div>
      </div>

      <div class="grid gap-3 md:grid-cols-5">
        <div class="rounded-lg bg-white p-4 shadow">
          <p class="text-xs text-slate-500">Cars</p>
          <p class="text-2xl font-bold text-slate-800">{{ cars.length }}</p>
        </div>
        <div class="rounded-lg bg-white p-4 shadow">
          <p class="text-xs text-slate-500">Parts</p>
          <p class="text-2xl font-bold text-slate-800">{{ parts.length }}</p>
        </div>
        <div class="rounded-lg bg-white p-4 shadow">
          <p class="text-xs text-slate-500">Mechanics</p>
          <p class="text-2xl font-bold text-slate-800">{{ mechanics.length }}</p>
        </div>
        <div class="rounded-lg bg-white p-4 shadow">
          <p class="text-xs text-slate-500">Work Orders</p>
          <p class="text-2xl font-bold text-slate-800">{{ workOrders.length }}</p>
        </div>
        <div class="rounded-lg bg-white p-4 shadow">
          <p class="text-xs text-slate-500">Maintenance Logs</p>
          <p class="text-2xl font-bold text-slate-800">{{ maintenanceLogs.length }}</p>
        </div>
      </div>

      <div
        v-if="message"
        class="rounded border px-4 py-3 text-sm"
        :class="messageType === 'error' ? 'border-red-300 bg-red-50 text-red-700' : 'border-green-300 bg-green-50 text-green-700'"
      >
        {{ message }}
      </div>

      <div class="grid gap-5 lg:grid-cols-2">
        <section class="rounded-lg bg-white p-5 shadow">
          <h2 class="text-lg font-semibold">1) Cars</h2>
          <p class="mt-1 text-xs text-slate-500">Adauga masina noua sau editeaza una existenta.</p>
          <form class="mt-3 grid gap-3" @submit.prevent="submitCar">
            <input v-model="carForm.brand" required class="rounded border p-2" placeholder="Brand" />
            <input v-model="carForm.model" required class="rounded border p-2" placeholder="Model" />
            <input v-model.number="carForm.year" type="number" min="1900" max="2100" class="rounded border p-2" placeholder="Year" />
            <input v-model="carForm.vin" required class="rounded border p-2" placeholder="VIN" />
            <input v-model="carForm.plate_number" required class="rounded border p-2" placeholder="Plate Number" />
            <div class="flex gap-2">
              <button class="rounded bg-blue-600 px-3 py-2 text-white">{{ selectedCarId ? 'Update Car' : 'Create Car' }}</button>
              <button v-if="selectedCarId" type="button" class="rounded bg-slate-500 px-3 py-2 text-white" @click="resetCarForm">Cancel</button>
            </div>
          </form>
        </section>

        <section class="rounded-lg bg-white p-5 shadow">
          <h2 class="text-lg font-semibold">2) Parts</h2>
          <p class="mt-1 text-xs text-slate-500">Creeaza piese si actualizeaza stocul mai jos.</p>
          <form class="mt-3 grid gap-3" @submit.prevent="submitPart">
            <input v-model="partForm.name" required class="rounded border p-2" placeholder="Part name" />
            <div class="grid grid-cols-2 gap-2">
              <input v-model.number="partForm.stock" type="number" min="0" class="rounded border p-2" placeholder="Stock" />
              <input v-model.number="partForm.price" type="number" min="0" step="0.01" class="rounded border p-2" placeholder="Price" />
            </div>
            <button class="rounded bg-emerald-600 px-3 py-2 text-white">Create Part</button>
          </form>
        </section>
      </div>

      <section class="rounded-lg bg-white p-5 shadow">
        <h2 class="mb-1 text-lg font-semibold">3) Create Work Order</h2>
        <p class="mb-3 text-xs text-slate-500">Selecteaza masina, mecanic, piesa si seteaza statusul initial.</p>
        <form class="grid gap-3 md:grid-cols-3" @submit.prevent="submitWorkOrder">
          <select v-model.number="workOrderForm.carId" class="rounded border p-2">
            <option :value="null">Select car</option>
            <option v-for="car in cars" :key="car.id" :value="car.id">{{ car.brand }} {{ car.model }} - {{ car.plate_number }}</option>
          </select>
          <select v-model.number="workOrderForm.mechanicId" class="rounded border p-2">
            <option :value="null">Select mechanic</option>
            <option v-for="mechanic in mechanics" :key="mechanic.id" :value="mechanic.id">{{ mechanic.name }}</option>
          </select>
          <input v-model.number="workOrderForm.total_cost" type="number" min="0" step="0.01" class="rounded border p-2" placeholder="Total Cost" />
          <select v-model.number="workOrderForm.partId" class="rounded border p-2">
            <option :value="null">Select part</option>
            <option v-for="part in parts" :key="part.id" :value="part.id">{{ part.name }} (stock: {{ part.stock }})</option>
          </select>
          <input v-model.number="workOrderForm.partQuantity" type="number" min="1" class="rounded border p-2" placeholder="Part Qty" />
          <select v-model="workOrderForm.status" class="rounded border p-2">
            <option v-for="status in statusOptions" :key="status" :value="status">{{ status }}</option>
          </select>
          <button :disabled="!canCreateWorkOrder" class="rounded bg-indigo-600 px-3 py-2 text-white disabled:bg-indigo-300">Create Work Order</button>
        </form>
      </section>

      <section class="rounded-lg bg-white p-5 shadow">
        <div class="mb-3 flex items-center justify-between">
          <h2 class="text-lg font-semibold">Cars / Parts / Mechanics / Work Orders / Maintenance Logs</h2>
          <button class="rounded bg-slate-100 px-3 py-1 text-sm hover:bg-slate-200" @click="loadData">Refresh</button>
        </div>
        <p v-if="isLoading" class="text-sm text-slate-500">Loading...</p>
        <div class="grid gap-4 md:grid-cols-5">
          <div>
            <h3 class="mb-2 font-medium">Cars</h3>
            <ul class="space-y-2 text-sm">
              <li v-for="car in cars" :key="car.id" class="rounded border p-2">
                <div>#{{ car.id }} {{ car.brand }} {{ car.model }} {{ car.year ? `(${car.year})` : '' }}</div>
                <div class="mt-1 text-xs text-slate-500">{{ car.plate_number }} | {{ car.vin }}</div>
                <div class="mt-2 flex gap-2">
                  <button class="rounded bg-amber-500 px-2 py-1 text-xs text-white" @click="editCar(car)">Edit</button>
                  <button class="rounded bg-indigo-600 px-2 py-1 text-xs text-white" @click="prefillWorkOrderForCar(car)">Use in Order</button>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="mb-2 font-medium">Parts (stock update)</h3>
            <ul class="space-y-2 text-sm">
              <li v-for="part in parts" :key="part.id" class="rounded border p-2">
                <div>#{{ part.id }} {{ part.name }}</div>
                <div class="mt-1 flex gap-2">
                  <input v-model.number="part.stock" type="number" class="w-24 rounded border p-1" />
                  <button class="rounded bg-blue-600 px-2 py-1 text-xs text-white" @click="updatePartStock(part)">Save</button>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="mb-2 font-medium">Mechanics</h3>
            <ul class="space-y-2 text-sm">
              <li v-for="mechanic in mechanics" :key="mechanic.id" class="rounded border p-2">
                <div>#{{ mechanic.id }} {{ mechanic.name }}</div>
                <button class="mt-2 rounded bg-red-600 px-2 py-1 text-xs text-white" @click="deleteMechanicRow(mechanic.id)">Delete</button>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="mb-2 font-medium">Work Orders (status)</h3>
            <ul class="space-y-2 text-sm">
              <li v-for="order in workOrders" :key="order.id" class="rounded border p-2">
                <div class="flex items-center justify-between gap-2">
                  <div>#{{ order.id }} - {{ order.car?.brand }} {{ order.car?.model }}</div>
                  <span class="rounded px-2 py-1 text-xs font-medium" :class="getStatusBadgeClass(order.status)">{{ order.status }}</span>
                </div>
                <div class="mt-1 text-xs text-slate-500">Mechanic: {{ order.mechanic?.name }} | Cost: {{ order.total_cost }}</div>
                <div class="mt-1 flex gap-2">
                  <select v-model="order.status" class="rounded border p-1 text-xs">
                    <option v-for="status in statusOptions" :key="status" :value="status">{{ status }}</option>
                  </select>
                  <button class="rounded bg-blue-600 px-2 py-1 text-xs text-white" @click="saveWorkOrderStatus(order)">Save</button>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="mb-2 font-medium">Maintenance Logs</h3>
            <ul class="space-y-2 text-sm">
              <li v-for="log in maintenanceLogs" :key="log.id" class="rounded border p-2">
                <div>#{{ log.id }} | Car: {{ log.carId }}</div>
                <div class="mt-1 text-xs text-slate-500">{{ log.date }} - {{ log.description }}</div>
                <div class="mt-1 flex gap-2">
                  <input v-model.number="log.mileage" type="number" class="w-24 rounded border p-1 text-xs" />
                  <button class="rounded bg-blue-600 px-2 py-1 text-xs text-white" @click="saveMaintenanceMileage(log)">Save km</button>
                  <button class="rounded bg-red-600 px-2 py-1 text-xs text-white" @click="deleteMaintenanceLogRow(log.id)">Delete</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
