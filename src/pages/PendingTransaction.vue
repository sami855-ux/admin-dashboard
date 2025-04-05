<script setup>
import { ref, h } from "vue"
import { format } from "date-fns"
import {
  useVueTable,
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/vue-table"

import pendingData from "../data/second.json"

const sorting = ref([])
const filter = ref("")

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

const handleChangeSize = (num) => {
  console.log("hi")
  table.setPageSize(num)
}
</script>

<template>
  <div class="w-full h-fit">
    <div class="w-fit h-16 flex items-center gap-3">
      <span
        class="w-8 cursor-pointer h-7 rounded-full flex items-center justify-center py-4 border border-gray-300 hover:bg-gray-200 transition duration-75"
      >
        <i class="pi pi-angle-left text-xl"></i>
      </span>
      <p class="text-semibold text-[16px] py-4">
        Dashboard - Pending Transaction
      </p>
    </div>
    <div class="w-full h-fit">
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
          <div class="w-full flex gap-5 items-center justify-self-end">
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

            <i
              class="pi pi-ellipsis-v cursor-pointer"
              title="export"
              @click="handleModal"
            ></i>
            <!-- Mini modal -->
            <div
              v-if="isMiniModalOpen"
              class="fixed top-66 w-48 bg-custom rounded-md border border-custom h-fit p-5 right-16 transition duration-150 ease-in-out"
            >
              <p
                class="text-[14px] py-1 border-b border-gray-200 cursor-pointer mb-1"
              >
                Export csv
              </p>
              <p
                class="text-[14px] py-1 border-b border-gray-200 cursor-pointer mb-1"
              >
                Export pdf
              </p>
              <p class="text-[14px] py-1 cursor-pointer">Export xsl</p>
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
</template>
