<script setup>
import { ref, h } from "vue"
import {
  useVueTable,
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/vue-table"

import pendingData from "../data/third.json"

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
    header: "createdAt",
  },
  {
    accessorKey: "status",
    header: "status",
    cell: ({ row }) => {
      const status = row.original.status
      const colorClass =
        status === "pending"
          ? "text-orange-500 capitalize" // 🟠 Orange for pending
          : "text-green-500 capitalize" // ✅ Green for completed

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
</script>

<template>
  <div class="w-full h-fit">
    <span
      class="w-10 cursor-pointer h-10 rounded-full flex items-center justify-center py-4 border border-gray-300 hover:bg-gray-200 transition duration-75"
    >
      <i class="pi pi-angle-left text-xl"></i>
    </span>
    <p class="text-semibold text-lg py-4">Dashboard - Completed Transaction</p>
    <div class="w-full h-10 flex justify-between items-center pr-16 mt-5">
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
          <button
            class="px-7 py-1 text-gray-500 border border-gray-200 rounded-md cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
            @click="table.setPageSize(5)"
          >
            Page size 5
          </button>
          <button
            class="px-7 py-1 text-gray-500 border border-gray-200 rounded-md cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
            @click="table.setPageSize(10)"
          >
            Page size 10
          </button>
          <button
            class="px-7 py-1 text-gray-500 border border-gray-200 rounded-md cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
            @click="table.setPageSize(20)"
          >
            Page size 20
          </button>
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
        <tr v-for="row in table.getRowModel().rows" :key="row.id">
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
</template>
