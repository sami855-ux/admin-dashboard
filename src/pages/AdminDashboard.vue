<script setup>
import { ref, h, onMounted, onBeforeUnmount, watch } from "vue"
import { Bar } from "vue-chartjs"
import { useRouter } from "vue-router"
import { format } from "date-fns"
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
import MiniGraph from "../util/MiniGraph.vue"

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const router = useRouter()
const chartData = ref({
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "📈 New Customers",
      data: [50, 75, 100, 120, 200, 250],
      backgroundColor: "rgba(81, 181, 224, 0.6)", // light blue with transparency
      borderColor: "#1c6e91", // dark blue border
      borderWidth: 2,
      borderRadius: 6, // rounded bars (works with bar charts)
      barThickness: 60, // consistent bar width
      hoverBackgroundColor: "#1c6e91",
      hoverBorderColor: "#155e75",
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
  scales: {
    y: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#666",
      },
    },
    x: {
      grid: {
        color: "#eee",
      },
      ticks: {
        color: "#666",
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        color: "#333",
        font: {
          size: 14,
          weight: "bold",
        },
      },
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
    header: "Created At",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt
      const formattedDate = format(new Date(createdAt), "MMMM dd, yyyy") // Customize the format as needed

      return h("span", {}, formattedDate)
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status
      const colorClass =
        status === "pending"
          ? "text-orange-500 text-[13px] capitalize"
          : "text-green-500 text-[13px] capitalize"
      const divClass =
        status === "pending"
          ? "flex flex-row gap-2 w-28 h-fit py-1 bg-pending rounded-2xl items-center px-2"
          : "flex flex-row gap-2 w-28 h-fit py-1 bg-completed rounded-2xl items-center px-2"
      const spanClass =
        status === "pending"
          ? "w-1 h-1 rounded-full bg-orange-500"
          : "w-1 h-1 rounded-full bg-green-500"
      return h(
        "div",
        { class: divClass }, // This ensures the spans are in a row with a gap
        [
          h("span", { class: spanClass }, ""), // Second span for additional text
          h("span", { class: colorClass }, status),
        ]
      )
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

const chartDataPie = {
  labels: ["Pending", "Completed"],
  datasets: [
    {
      label: "Transactions",
      data: [8, 21], // Sample data (percentage of total)
      backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)"],
      borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
      borderWidth: 1,
    },
  ],
}

const handleModal = () => {
  console.log("hi")
  isMiniModalOpen.value = !isMiniModalOpen.value
}

const handleChangeSize = (num) => {
  console.log("hi")
  table.setPageSize(num)
}
const handleScroll = () => {
  if (isMiniModalOpen.value) {
    isMiniModalOpen.value = false
  }
}

const bodyClickHandler = (event) => {
  const el = event.target

  if (isMiniModalOpen.value) {
    const modalLayout = document.querySelector(".miniModal")
    const three = document.querySelector(".three")

    console.log(el, modalLayout)

    if (modalLayout && !modalLayout.contains(el) && el !== three) {
      isMiniModalOpen.value = false
    }
  }
}

watch(isMiniModalOpen, (newVal) => {
  if (newVal) {
    // If modal is opened, start listening for scroll
    window.addEventListener("scroll", handleScroll)
  } else {
    // Clean up if modal is closed
    window.removeEventListener("scroll", handleScroll)
  }
})

onMounted(() => {
  document.body.addEventListener("click", bodyClickHandler)
})

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll)
  document.body.removeEventListener("click", bodyClickHandler)
})
</script>

<template>
  <div class="w-full h-fit">
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
      <div class="w-full min-h-[270px] flex gap-10 flex-col">
        <div
          class="w-full min-h-full items-center flex gap-3 flex-wrap mx-1 md:mx-0"
        >
          <AdminCard
            title="Total Customer"
            iconName="pi-user-plus"
            number="6"
            :change="-20"
            bg="bg-[#06cf06]"
          />
          <AdminCard
            title="Total Employees"
            iconName=" pi-id-card"
            number="16"
            bg="bg-[#d53718]"
          />
          <AdminCard
            title="Total Transaction"
            iconName="pi-chart-line"
            number="25"
            :change="50"
            bg="bg-[#cd0e64]"
          />
          <AdminCard
            title="Pending Transaction"
            iconName="pi-clock"
            number="3"
            :change="-10"
            bg="bg-[#0ab044]"
          />
          <AdminCard
            title="Completed Transaction"
            iconName="pi-check-circle"
            number="7"
            :change="-5"
            bg="bg-[#102dac]"
          />
          <AdminCard
            title="Total categories"
            iconName="pi-tags"
            number="3"
            :change="5"
          />
          <AdminCard
            title="Completed Transaction"
            iconName="pi-check-circle"
            number="7"
            :change="-10"
            bg="bg-[#a70b38]"
          />
          <AdminCard
            title="Total categories"
            iconName="pi-tags"
            number="3"
            :change="15"
            bg="bg-[#0ab044]"
          />
        </div>
        <div
          class="w-full min-h-[20px] flex gap-3 items-center flex-col lg:flex-row"
        >
          <div
            class="w-[100%] lg:w-[500px] h-[280px] rounded-lg border border-custom-two p-6 shadow-md"
          >
            <Bar v-if="chartData" :data="chartData" :options="chartOptions" />
            <h2 class="text-custom text-[13px]">Customer Growth</h2>
          </div>
          <div
            class="w-[100%] lg:w-[500px] h-[280px] flex items-center justify-center flex-col rounded-lg border border-custom-two p-6 shadow-md"
          >
            <MiniGraph :chartData="chartDataPie" />
            <h2 class="text-custom text-[13px]">Transaction Status</h2>
          </div>
        </div>
      </div>

      <div class="w-full h-fit">
        <p class="py-5 text-[17px] text-custom mt-9">Transaction List</p>
        <div class="w-full min-h-10 flex items-center justify-between pr-16">
          <div class="">
            <input
              type="text"
              placeholder="Type for filter..."
              v-model="filter"
              class="border border-custom-two rounded-md outline-none text-[13px] focus:border-blue-600 px-7 py-1"
            />
          </div>
          <div class="h-full w-fit ml-5">
            <div
              class="w-full flex gap-5 items-center justify-self-end relative"
            >
              <p class="text-custom text-[14px] hidden md:block">Page size</p>
              <select
                @change="(e) => handleChangeSize(parseInt(e.target.value))"
                class="px-7 outline-none border border-custom rounded-md text-[14px] py-1 bg-custom"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </select>

              <span class="w-7 h-7 rounded-full hover:header-custom">
                <i
                  class="pi pi-ellipsis-v cursor-pointer three"
                  title="export"
                  @click="handleModal"
                ></i>
              </span>
              <!-- Mini modal -->
              <div
                v-if="isMiniModalOpen"
                class="absolute miniModal top-[35px] w-48 bg-custom rounded-md border border-custom h-fit p-5 right-0 transition duration-150 ease-in-out"
              >
                <p
                  class="text-[13px] text-custom py-1 border-b hover:bg-color border-custom cursor-pointer mb-1"
                  @click="handleModal"
                >
                  Export csv
                </p>
                <p
                  class="text-[13px] text-custom py-1 border-b hover:bg-color border-custom cursor-pointer mb-1"
                  @click="handleModal"
                >
                  Export pdf
                </p>
                <p
                  class="text-[13px] text-custom py-1 hover:bg-color cursor-pointer"
                  @click="handleModal"
                >
                  Export xsl
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="max-w-full overflow-x-scroll">
          <table
            class="w-[95%] divide-y divide-gray-200 lg:mr-1 border border-custom-two rounded-2xl"
          >
            <thead class="header-custom-bg">
              <tr
                v-for="headerGroup in table.getHeaderGroups()"
                :key="headerGroup.id"
              >
                <th
                  v-for="header in headerGroup.headers"
                  :key="header.id"
                  scope="col"
                  class="capitalize px-3 py-3 text-left text-[13.5px] font-semibold header-custom"
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
                class="hover-custom"
              >
                <td
                  v-for="cell in row.getVisibleCells()"
                  :key="cell.id"
                  class="whitespace-nowrap px-3 py-2 text-[13px] text-custom"
                >
                  <FlexRender
                    :render="cell.column.columnDef.cell"
                    :props="cell.getContext()"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="w-full flex h-20 justify-between items-center px-14">
          <!-- Left-aligned section -->
          <section class="w-fit h-full flex items-center">
            <p
              class="text-custom w-fit h-full flex items-center gap-2 text-[14px]"
            >
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
              class="w-8 h-8 rounded-full text-custom border border-gray-300 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
              :disabled="!table.getCanPreviousPage()"
              @click="table.previousPage()"
            >
              <i class="pi pi-angle-left text-xl"></i>
            </button>
            <button
              class="w-8 h-8 rounded-full text-custom border border-gray-300 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
              :disabled="!table.getCanNextPage()"
              @click="table.nextPage()"
            >
              <i class="pi pi-angle-right text-xl"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
