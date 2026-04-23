# Documentatie Tehnica Completa - Proiect Motix

## 1) Scopul aplicatiei

Aplicatia `Motix` este un sistem web pentru:
- cautare masini (VIN, numar de inmatriculare, marca/model/an),
- vizualizare informatii tehnice si istoric mentenanta,
- operatii de service (interventii, piese, work orders),
- administrare date din atelier (`Workshop Admin`).

Arhitectura este separata in:
- **Frontend**: Vue 3 + Pinia + Vue Router + Vite,
- **Backend**: Node.js + Express + Sequelize,
- **Baza de date**: MySQL.

---

## 2) Structura proiectului

### `api/` (backend)
- `api.js` - pornire server Express, middleware, conectare DB, montare rute.
- `models/` - definitiile entitatilor Sequelize si relatiile dintre ele.
- `controllers/` - logica endpoint-urilor API.
- `routes/index.js` - definirea rutelor HTTP.
- `src/db/bootstrap.js` - creaza baza de date daca nu exista.
- `src/db/seed.js` - populeaza baza cu date initiale.

### `app/` (frontend)
- `src/main.js` - bootstrap app Vue.
- `src/router/index.js` - toate rutele aplicatiei.
- `src/stores/` - stare globala Pinia (`carStore`, `authStore`).
- `src/services/` - wrapper API (`api.js`, `mechanicService.js`).
- `src/pages/` - pagini pe functionalitati (auth/search/results/user).
- `src/components/` - componente reutilizabile.

---

## 3) Backend - functionare detaliata

## 3.1 Pornirea serverului (`api/api.js`)

La start:
1. creeaza aplicatia Express;
2. aplica middleware:
   - `express.json()` pentru body JSON,
   - `cors()` pentru request-uri din frontend;
3. expune route-uri utilitare:
   - `/` (status de baza),
   - `/health` (health check);
4. monteaza API-ul principal pe prefixul `/api`;
5. conecteaza Sequelize la MySQL (`authenticate`);
6. sincronizeaza modelele (`sequelize.sync()`);
7. porneste serverul pe portul 3000 (implicit).

---

## 3.2 Modele Sequelize (`api/models`)

Entitati principale:

1. **Car**
   - campuri: `brand`, `model`, `year`, `vin`, `plate_number`.
2. **TechnicalSpec**
   - campuri: tip ulei motor, cutie, antigel etc.
3. **MaintenanceLog**
   - campuri: `carId`, `interventionId`, `date`, `mileage`, `description`.
4. **Part**
   - campuri: `name`, `stock`, `price`.
5. **Mechanic**
   - campuri: `name`, `specialization`.
6. **WorkOrder**
   - campuri: `carId`, `mechanicId`, `total_cost`, `status`.
7. **Intervention**
   - campuri: `name`, `details`.

### Relatii definite (`models/index.js`)

- **One-to-One**
  - `Car.hasOne(TechnicalSpec)`
  - `TechnicalSpec.belongsTo(Car)`

- **One-to-Many / Many-to-One**
  - `Car.hasMany(MaintenanceLog)` / `MaintenanceLog.belongsTo(Car)`
  - `Intervention.hasMany(MaintenanceLog)` / `MaintenanceLog.belongsTo(Intervention)`
  - `Car.hasMany(WorkOrder)` / `WorkOrder.belongsTo(Car)`
  - `Mechanic.hasMany(WorkOrder)` / `WorkOrder.belongsTo(Mechanic)`

---

## 3.3 Controller-e API (`api/controllers`)

### `carsController.js`
- `getCars`:
  - lista masini (cu filtre query: `vin`, `plate_number`, `brand`, `model`, `year`).
- `getCarDetails`:
  - detalii masina + specificatii tehnice (`technicalSpec`).
- `getCarMaintenanceHistory`:
  - istoric mentenanta pe masina, cu `intervention` inclus.
- `createCar`, `updateCar`.

### `technicalSpecsController.js`
- `createTechnicalSpec`, `updateTechnicalSpec`.

### `maintenanceLogsController.js`
- `getMaintenanceLogs` (lista globala logs),
- `createMaintenanceLog`,
- `updateMaintenanceMileage`,
- `deleteMaintenanceLog`.

### `partsController.js`
- `getParts`, `createPart`, `updatePartStock`.

### `mechanicsController.js`
- `getMechanics`, `deleteMechanic`.

### `workOrdersController.js`
- `getWorkOrders` (include masina + mecanic),
- `createWorkOrder` (cu tranzactie),
- `updateWorkOrderStatus`.

### `interventionsController.js`
- `getInterventions`, `createIntervention`.

---

## 3.4 Tranzactia Sequelize (punct critic)

In `createWorkOrder`:
- se deschide `sequelize.transaction(...)`;
- se verifica piesa (`Part.findByPk`);
- se calculeaza noul stock;
- daca stock-ul devine negativ -> se arunca eroare, tranzactia face rollback;
- daca totul e valid:
  - se creeaza `WorkOrder`,
  - se actualizeaza stock-ul piesei;
- commit automat la final.

Rezultat: comanda + stock sunt consistente in DB.

---

## 3.5 Rute API (`api/routes/index.js`)

Endpoint-uri existente:

- **GET**:
  - `/cars`
  - `/cars/:id/details`
  - `/cars/:id/maintenance-logs`
  - `/parts`
  - `/mechanics`
  - `/interventions`
  - `/work-orders`
  - `/maintenance-logs`

- **POST**:
  - `/cars`
  - `/technical-specs`
  - `/maintenance-logs`
  - `/parts`
  - `/work-orders`
  - `/interventions`

- **PUT**:
  - `/cars/:id`
  - `/parts/:id/stock`
  - `/work-orders/:id/status`
  - `/technical-specs/:id`
  - `/maintenance-logs/:id/mileage`

- **DELETE**:
  - `/maintenance-logs/:id`
  - `/mechanics/:id`

---

## 3.6 Seed si bootstrap DB

### `bootstrap.js`
- verifica existenta bazei de date;
- daca lipseste, o creeaza.

### `seed.js`
- `sync({ force: true })` -> recreeaza schema;
- insereaza:
  - masini,
  - interventii,
  - specificatii tehnice,
  - mentenante,
  - piese,
  - mecanici,
  - work orders.

---

## 4) Frontend - functionare detaliata

## 4.1 Initializare

### `app/src/main.js`
- creeaza aplicatia Vue;
- injecteaza Pinia;
- injecteaza Router;
- monteaza in DOM.

### `app/src/App.vue`
- contine `router-view`, deci randarea paginilor este facuta dinamic pe ruta activa.

---

## 4.2 Routing (`app/src/router/index.js`)

Paginile principale:
- auth: login/signup/forgot/check/reset;
- functional: `Home`, `SelectCar`, `SearchVIN`, `SearchLicense`, `SelectBMY`, `ResultPage`, `History`, `Maintain`, `WorkshopAdmin`, `Profile`.

---

## 4.3 Servicii API frontend

### `services/api.js`
- configureaza axios (`baseURL`: `VITE_API_URL` sau `http://localhost:3000/api`);
- interceptor pentru erori API.

### `services/mechanicService.js`
- centralizeaza apelurile API pentru masini, mentenanta, piese, mecanici, comenzi, interventii.
- include metode de tip GET/POST/PUT/DELETE folosite in pagini.

---

## 4.4 Store-uri Pinia

### `stores/authStore.js`
- gestioneaza parola de login in localStorage;
- metode de set/check password.

### `stores/carStore.js`
- stare pentru masina curenta, istoric cautari, cache masini;
- cautare masina prin API (`searchByVIN`, `searchByLicense`, `searchByModel`);
- normalizare date pentru UI (`licensePlate` etc.);
- getter pentru informatii de mentenanta teoretice (`maintenanceInfo`).

---

## 4.5 Pagini si fluxuri

### A) Flux user de cautare
1. `Home` -> `SelectCar`.
2. User alege:
   - `SearchVIN`,
   - `SearchLicense`,
   - `SelectBMY`.
3. Cautarea apeleaza store-ul (`carStore`) care apeleaza API-ul.
4. Rezultatul merge in `ResultPage`.
5. Din `ResultPage` se poate merge in `History` sau inapoi la cautare.

### B) `Maintain` (flux mentenanta pe masina)
- filtreaza masini din tabela `cars`;
- selecteaza masina;
- afiseaza istoricul de mentenanta pentru masina selectata;
- formularul `MaintenanceForm` adauga interventie noua (`POST /maintenance-logs`) cu interventie aleasa din `interventions`.

### C) `WorkshopAdmin` (flux administrare atelier)
Structurat in pasi:
1. **Cars**:
   - creare/actualizare masina.
2. **Parts**:
   - creare piesa,
   - update stock.
3. **Create Work Order**:
   - select car, mechanic, part, qty, cost, status.
4. **Management operational**:
   - update status work order,
   - delete mechanic,
   - update mileage maintenance log,
   - delete maintenance log.

---

## 5) Cum comunica frontend cu backend-ul

Exemplu concret (work order):
1. User completeaza formularul in `WorkshopAdmin.vue`.
2. Se apeleaza `mechanicService.createWorkOrder(payload)`.
3. Axios trimite `POST /api/work-orders`.
4. Backend ruleaza controller-ul cu tranzactie.
5. Raspunsul este folosit pentru feedback si refresh lista.

Exact acelasi pattern este folosit pentru toate operatiile CRUD.

---

## 6) Acoperirea cerintelor de laborator (rezumat)

- Entitati Sequelize: **>= 6** (ai 7).
- Tranzactii: **>= 1** (work order + update stock).
- Relatii: one-to-one + many-to-one: **indeplinite**.
- Endpoint-uri API pe DB:
  - GET: **8**
  - POST: **6**
  - PUT: **5**
  - DELETE: **2**
- Apel din Vue al metodelor care modifica DB:
  - create/update/delete pe masini, piese, mentenanta, mecanici, work orders: **indeplinit**.

---

## 7) Comenzi utile de rulare

Din radacina proiectului:

```bash
# reset schema + seed date
npm --prefix api run seed

# pornire backend
npm --prefix api run dev
```

Frontend:

```bash
cd app
yarn dev
```

Aplicatia frontend porneste pe:
- `http://localhost:5174`

Backend API:
- `http://localhost:3000/api`

---

## 8) Observatii de mentenanta cod

- `FLOW_DOCUMENTATION.md` din `app/` este util, dar contine parti vechi (inainte de mutarea unor fluxuri pe API real).
- Documentatia curenta (`DOCUMENTATIE_PROIECT.md`) reflecta starea actuala a codului.
- Pentru prezentare, recomadat:
  1. rulezi seed,
  2. demonstrezi in `WorkshopAdmin` operatii POST/PUT/DELETE,
  3. demonstrezi cautare + istoric in `Maintain`/`History`.

