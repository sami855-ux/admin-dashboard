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

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const router = useRouter()
const chartData = ref({
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "New Customers",
      data: [50, 75, 100, 120, 200, 250],
      backgroundColor: "rgba(45, 107, 192,0.75)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
})

const pendingData = ref(pending)
const sorting = ref([])
const filter = ref("")
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

const pendingColumns = [
  {
    accessorKey: "id",
    header: "No",
    enableSorting: false,
  },
  {
    accessorKey: "customerName",
    header: "customer Name",
  },
  {
    accessorKey: "customerPhone",
    header: "customer Phone",
  },
  {
    accessorKey: "customerSex",
    header: "customer Sex",
  },
  {
    accessorKey: "service",
    header: "service",
  },
  {
    accessorKey: "price",
    header: "price",
  },
  {
    accessorKey: "createdAt",
    header: "createdAt",
  },
  {
    accessorKey: "status",
    header: "status",
    cell: ({ row }) => {
      const status = row.original.status
      const colorClass =
        status === "pending"
          ? "text-orange-500 capitalize"
          : "text-green-500 capitalize"

      return h("span", { class: colorClass }, status)
    },
  },
]

const table = useVueTable({
  data: pendingData,
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

const handleModal = () => {
  isMiniModalOpen.value = !isMiniModalOpen.value
}
</script>

<template>
  <div class="w-[80vw] h-fit">
    <div class="w-fit h-fit flex items-center space-x-3">
      <span
        @click="router.back(-1)"
        class="w-8 cursor-pointer h-7 rounded-full flex items-center justify-center py-4 border border-gray-300 hover:bg-gray-200 transition duration-75"
      >
        <i class="pi pi-angle-left"></i>
      </span>
      <p class="text-semibold text-[16px] py-4">Dashboard - Home</p>
    </div>
    <div class="w-full min-h-screen">
      <div class="w-full min-h-[270px] flex gap-7 flex-col lg:flex-row">
        <div
          class="w-fit min-h-full items-center md:items-start flex gap-4 flex-wrap mx-3 md:mx-0"
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
        <div class="w-[90%] lg:w-[500px] h-[270px] rounded-lg">
          <Bar v-if="chartData" :data="chartData" :options="chartOptions" />
          <h2 class="text-gray-700">Customer Growth</h2>
        </div>
      </div>

      <div class="w-full h-fit">
        <p class="py-8 text-lg text-gray-800 mt-9">Transaction List</p>
        <div class="w-full h-10 flex justify-between items-center pr-16">
          <div class="">
            <input
              type="text"
              placeholder="Type for filter..."
              v-model="filter"
              class="border border-gray-200 rounded-md outline-none px-7 py-1"
            />
          </div>
          <div class="h-full w-fit">
            <div class="w-full flex space-x-3 items-center relative">
              <p class="text-gray-700">Page size</p>
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
              <i
                class="pi pi-ellipsis-v pl-7 cursor-pointer"
                title="export"
                @click="handleModal"
              ></i>
              <!-- Mini modal -->
              <div
                v-if="isMiniModalOpen"
                ref="miniModal"
                class="absolute top-9 w-48 bg-white rounded-md border border-gray-200 h-fit p-2 right-5 transition duration-150 ease-in-out"
              >
                <p
                  class="text-[15px] py-1 border-b border-gray-200 cursor-pointer mb-1"
                >
                  Export csv
                </p>
                <p
                  class="text-[15px] py-1 border-b border-gray-200 cursor-pointer mb-1"
                >
                  Export pdf
                </p>
                <p class="text-[15px] py-1 cursor-pointer">Export xsl</p>
              </div>
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
              class="hover:bg-gray-100"
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
      </div>
    </div>
  </div>
</template>
