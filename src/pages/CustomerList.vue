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

import pendingData from "../data/four.json"
import CustomerInput from "../util/CustomerInput.vue"

const sorting = ref([])
const filter = ref("")
const isModalOpen = ref(false)
const isEditModalOpen = ref(false)

const handleModal = () => {
  if (isEditModalOpen.value) {
    isEditModalOpen.value = false
    return
  }
  isModalOpen.value = !isModalOpen.value
}

const pendingColumns = [
  {
    accessorKey: "id",
    header: "No",
    enableSorting: false,
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "fullName",
    header: "Customer Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "sex",
    header: "sex",
  },
  {
    accessorKey: "email",
    header: "Customer Type",
  },
  {
    accessorKey: "joinedAt",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
  },
  {
    accessorKey: "joinedAt",
    header: "Remark",
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
    <div class="w-full h-10 flex justify-between items-center pr-16 mt-5">
      <p class="text-semibold text-lg py-4">Dashboard - Customer List</p>

      <button
        class="px-7 py-1 text-gray-100 bg-blue-500 border border-blue-200 rounded-md cursor-pointer"
        @click="handleModal"
      >
        Create Customer +
      </button>
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
      } w-[600px] h-screen fixed top-0  z-50 bg-white p-7 border border-gray-100  transition duration-500 ease-in-out overflow-scroll`"
    >
      <i class="pi pi-times text-xl cursor-pointer" @click="handleModal"></i>

      <h2 class="text-lg font-semibold py-1 mt-3 text-gray-700">
        Create Customer Information
      </h2>
      <CustomerInput />
    </div>
    <div
      :class="` ${
        isEditModalOpen ? 'right-0' : 'right-[-100%]'
      } w-[600px] h-screen fixed top-0  z-50 bg-white p-7 border border-gray-100  transition duration-500 ease-in-out overflow-scroll`"
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
        Edit Customer Information
      </h2>
      <CustomerInput />
    </div>
  </div>
</template>
