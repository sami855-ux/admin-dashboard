<script setup>
import { ref, h, onMounted, onUnmounted } from "vue"
import { Bar } from "vue-chartjs"
import { useRouter } from "vue-router"
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js"
import {
  useVueTable,
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/vue-table"

import AdminCard from "../util/AdminCard.vue"
import pending from "../data/pendingTran.json"

import backup from "../data/backup.json"
import EmployeeInput from "../util/EmployeeInput.vue"

const router = useRouter()
const sorting = ref([])
const filter = ref("")
const isModalOpen = ref(false)
const isEditModalOpen = ref(false)

const handleModal = () => {
  isModalOpen.value = !isModalOpen.value
}

const pendingColumns = [
  {
    accessorKey: "id",
    header: "No",
    enableSorting: false,
  },
  {
    accessorKey: "dateCreated",
    header: "Data created",
  },
  {
    accessorKey: "createdBy",
    header: "Created by",
  },
  {
    accessorKey: "backupFileName",
    header: "Backup FileName",
  },
  {
    accessorKey: "fileSize",
    header: "File Size",
  },
  {
    accessorKey: "backupType",
    header: "Backup Type",
  },

  {
    accessorKey: "",
    header: "Action",
    cell: ({ row }) => [
      h(
        "button",
        {
          class:
            "p-button p-button-sm p-button-warning text-blue-700 mr-4 cursor-pointer",
          onClick: () => (isEditModalOpen.value = true),
        },
        [h("i", { class: "pi pi-pencil" })]
      ),
      h(
        "button",
        {
          class:
            "p-button p-button-sm p-button-danger text-orange-600 cursor-pointer",
          onClick: () => deleteRow(row.original),
        },
        [h("i", { class: "pi pi-trash" })]
      ),
    ],
  },
]

const table = useVueTable({
  data: backup,
  columns: pendingColumns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  state: {
    get sorting() {
      return sorting.value
    },
    get globalFilter() {
      return filter.value
    },
  },
  onSortingChange: (updateOrValue) => {
    sorting.value =
      typeof updateOrValue === "function"
        ? updateOrValue(sorting.value)
        : updateOrValue
  },
})

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartData = ref({
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "New Customers",
      data: [50, 75, 100, 120, 200, 250], // Replace with real data
      backgroundColor: "rgba(75, 192, 192, 0.5)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
})

const chartDatatwo = ref({
  labels: ["Users", "Orders", "Revenue", "Activity"], // Labels for the categories
  datasets: [
    {
      label: "Stats Overview",
      data: [120, 200, 150, 300], // Sample data for each category
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"], // Different colors for each bar
      borderColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      borderWidth: 1,
    },
  ],
})

const transaction = ref({
  labels: ["Completed", "Pending"], // Categories
  datasets: [
    {
      label: "Transactions",
      data: [300, 120], // Completed: 300, Pending: 120
      backgroundColor: ["#4CAF50", "#FF9800"], // Green for completed, Orange for pending
      borderWidth: 1,
    },
  ],
})

const pendingData = ref(pending)
const miniModal = ref(null)
const isMiniModalOpen = ref(false)

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
})
</script>

<template>
  <div class="w-full h-fit">
    <span
      @click="router.back(-1)"
      class="w-10 cursor-pointer h-10 rounded-full flex items-center justify-center py-4 border border-gray-300 hover:bg-gray-200 transition duration-75"
    >
      <i class="pi pi-angle-left text-xl"></i>
    </span>

    <div class="w-full h-10 flex justify-between items-center pr-16 mt-5">
      <p class="text-semibold text-lg py-4">Dashboard - Transaction Report</p>
    </div>
    <div class="w-full h-fit pb-10">
      <div class="w-full h-[270px] flex gap-7 flex-col lg:flex-row">
        <div class="w-[90%] md:w-[500px] h-full rounded-lg">
          <Bar v-if="chartData" :data="chartData" :options="chartOptions" />
          <h2 class="text-gray-700">Customer Growth</h2>
        </div>
        <div
          class="w-fit h-full items-center md:items-start flex gap-4 flex-wrap"
        >
          <AdminCard
            title="Total Customer"
            iconName="pi-user-plus"
            number="6"
          />
          <AdminCard
            title="Total Employees"
            iconName=" pi-id-card"
            number="16"
          />
          <AdminCard
            title="Total Transaction"
            iconName="pi-chart-line"
            number="10"
          />
          <AdminCard
            title="Pending Transaction"
            iconName="pi-clock"
            number="3"
          />
          <AdminCard
            title="Completed Transaction"
            iconName="pi-check-circle"
            number="7"
          />
          <AdminCard title="Total categories" iconName="pi-tags" number="3" />
        </div>
      </div>
      <div class="w-full h-[300px] flex gap-16 flex-col lg:flex-row mt-7 px-20">
        <div class="w-[50%] md:w-[500px] h-full rounded-lg py-10">
          <Bar v-if="chartDatatwo" :data="chartDatatwo" class="h-full" />
          <h2 class="text-gray-700">Status Overview</h2>
        </div>
        <div class="w-[50%] md:w-[500px] h-full rounded-lg py-10">
          <Bar :data="transaction" :options="chartOptions" class="h-full" />
          <h2 class="text-gray-700">Transaction Overview</h2>
        </div>
      </div>
    </div>
    <div class="w-full h-10 flex justify-between items-center pr-16 my-5">
      <div class="">
        <input
          type="text"
          placeholder="Type for filter..."
          v-model="filter"
          class="border border-gray-200 rounded-md outline-none px-7 py-1"
        />
      </div>
      <div class="h-full w-fit">
        <div class="w-full flex space-x-3 items-center">
          <p class="text-gray-500 py-1">Page size</p>
          <button
            class="px-7 py-1 text-gray-500 border border-gray-200 rounded-md cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
            @click="table.setPageSize(5)"
          >
            5
          </button>
          <button
            class="px-7 py-1 text-gray-500 border border-gray-200 rounded-md cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
            @click="table.setPageSize(10)"
          >
            10
          </button>
          <button
            class="px-7 py-1 text-gray-500 border border-gray-200 rounded-md cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
            @click="table.setPageSize(20)"
          >
            20
          </button>
          <i class="pi pi-ellipsis-v pl-7 cursor-pointer" title="export"></i>
        </div>
      </div>
    </div>
    <table class="min-w-full divide-y divide-gray-200">
      <thead>
        <tr
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <th
            v-for="header in headerGroup.headers"
            :key="header.id"
            scope="col"
            class="capitalize px-3 py-3.5 text-left text-[15px] font-semibold text-gray-900"
            :class="{
              'cursor-pointer select-none': header.column.getCanSort(),
            }"
            @click="header.column.getToggleSortingHandler()?.($event)"
          >
            <FlexRender
              :render="header.column.columnDef.header"
              :props="header.getContext"
            />
            {{ { asc: "⬆", desc: "⬇" }[header.column.getIsSorted()] }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr
          v-for="row in table.getRowModel().rows"
          :key="row.id"
          class="hover:bg-gray-100 transition duration-200 ease-in-out"
        >
          <td
            v-for="cell in row.getVisibleCells()"
            :key="cell.id"
            class="whitespace-nowrap px-3 py-4 text-[15px] text-gray-500"
          >
            <FlexRender
              :render="cell.column.columnDef.cell"
              :props="cell.getContext()"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="w-full flex h-20 justify-between items-center px-14">
      <!-- Left-aligned section -->
      <section class="w-fit h-full flex items-center">
        <p class="text-gray-700 w-fit h-full flex items-center gap-2">
          Page
          <span class="font-semibold">{{
            table.getState().pagination.pageIndex + 1
          }}</span>
          out of
          {{ table.getPageCount() }} -
          {{ table.getFilteredRowModel().rows.length }} results
        </p>
      </section>

      <!-- Right-aligned pagination controls -->
      <div class="flex space-x-3 items-center">
        <button
          class="w-10 h-10 rounded-full text-gray-500 border border-gray-300 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          <i class="pi pi-angle-left text-2xl"></i>
        </button>
        <button
          class="w-10 h-10 rounded-full text-gray-500 border border-gray-300 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          <i class="pi pi-angle-right text-2xl"></i>
        </button>
      </div>
    </div>
    <!-- Overlay -->
    <div
      :class="` ${
        isModalOpen || isEditModalOpen
          ? 'opacity-100 visible'
          : 'opacity-0 invisible'
      } w-full h-full fixed top-0 left-0 z-10 bg-gray-700/50 transition duration-150 ease-in-out cursor-pointer`"
      @click="handleModal"
    ></div>
    <div
      :class="` ${
        isModalOpen ? 'right-0' : 'right-[-100%]'
      } w-[700px] h-screen fixed top-0  z-50 bg-white p-7 border border-gray-100  transition duration-500 ease-in-out overflow-scroll`"
    >
      <i class="pi pi-times text-xl cursor-pointer" @click="handleModal"></i>

      <h2 class="text-lg font-semibold py-1 mt-3 text-gray-700">
        Create Employee Information
      </h2>
      <EmployeeInput />
    </div>
    <div
      :class="` ${
        isEditModalOpen ? 'right-0' : 'right-[-100%]'
      } w-[700px] h-screen fixed top-0  z-50 bg-white p-7 border border-gray-100  transition duration-500 ease-in-out overflow-scroll`"
    >
      <i
        class="pi pi-times text-xl cursor-pointer"
        @click="
          () => {
            isEditModalOpen = false
          }
        "
      ></i>

      <h2 class="text-lg font-semibold py-1 mt-3 text-gray-700">
        Edit Employee Information
      </h2>
      <EmployeeInput />
    </div>
  </div>
</template>
