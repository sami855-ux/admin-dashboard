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

import service from "../data/service.json"
import ServiceInput from "../util/ServiceInput.vue"

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
    accessorKey: "category",
    header: "Category Info",
  },
  {
    accessorKey: "service_code",
    header: "Service Code",
  },
  {
    accessorKey: "service_title",
    header: "Service Title",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "group",
    header: "Group",
  },
  {
    accessorKey: "update_date",
    header: "Update Date",
  },
  {
    accessorKey: "updated_by",
    header: "Updated By",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status
      const colorClass =
        status === "Pending" || status === "Inactive"
          ? "text-orange-500 text-[13px] capitalize"
          : "text-green-500 text-[13px] capitalize"
      const divClass =
        status === "Pending" || status === "Inactive"
          ? "flex flex-row gap-2 w-24 h-fit py-1 bg-pending rounded-2xl items-center px-2"
          : "flex flex-row gap-2 w-24 h-fit py-1 bg-completed rounded-2xl items-center px-2"
      const spanClass =
        status === "Pending" || status === "Inactive"
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
  data: service,
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
  table.setPageSize(num)
}
</script>

<template>
  <div class="w-full h-fit">
    <div class="w-fit h-10 flex items-center gap-3">
      <span
        class="w-8 cursor-pointer h-7 rounded-full flex items-center justify-center py-4 border border-gray-300 hover:bg-gray-200 transition duration-75"
      >
        <i class="pi pi-angle-left text-xl"></i>
      </span>
      <p class="text-semibold text-[16px] py-4">Dashboard - Service List</p>
    </div>
    <div class="w-full h-10 flex justify-end items-center lg:pr-16 mt-5">
      <button
        class="px-7 py-1 text-custom bg-blue-500 border border-custom text-[14px] rounded-md cursor-pointer"
        @click="handleModal"
      >
        Create Service +
      </button>
    </div>
    <div class="w-full h-fit">
      <div
        class="w-full min-h-10 flex items-center justify-between lg:pr-16 my-2"
      >
        <div class="">
          <input
            type="text"
            placeholder="Type for filter..."
            v-model="filter"
            class="border border-custom-two rounded-md outline-none text-[13px] focus:border-blue-600 px-7 py-1 my-1"
          />
        </div>
        <div class="h-full w-fit pl-14 lg:ml-5">
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
                class="whitespace-nowrap px-3 py-3 text-[13px] text-custom"
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
            class="text-custom w-fit h-full flex items-center gap-2 text-[13px]"
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
            class="w-7 h-7 pt-1 rounded-full text-custom border border-gray-300 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
            :disabled="!table.getCanPreviousPage()"
            @click="table.previousPage()"
          >
            <i class="pi pi-angle-left text-xl"></i>
          </button>
          <button
            class="w-7 h-7 pt-1 rounded-full text-custom border border-gray-300 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
            :disabled="!table.getCanNextPage()"
            @click="table.nextPage()"
          >
            <i class="pi pi-angle-right text-xl"></i>
          </button>
        </div>
      </div>
    </div>
    <!-- Overlay -->
    <div
      :class="` ${
        isModalOpen || isEditModalOpen
          ? 'opacity-100 visible'
          : 'opacity-0 invisible'
      } w-full h-full fixed top-0 left-0 z-50 bg-gray-700/50 transition duration-150 ease-in-out cursor-pointer`"
      @click="handleModal"
    ></div>
    <div
      :class="` ${
        isModalOpen ? 'right-0' : 'right-[-100%]'
      } w-[400px] lg:w-[600px] h-screen fixed top-0  z-100 bg-white py-5 px-10 bg-color border border-custom  transition duration-500 ease-in-out overflow-scroll`"
    >
      <i class="pi pi-times cursor-pointer" @click="handleModal"></i>

      <h2 class="text-lg font-semibold py-1 mt-3 text-custom">
        Create Service Information
      </h2>
      <ServiceInput />
    </div>
    <div
      :class="` ${
        isEditModalOpen ? 'right-0' : 'right-[-100%]'
      } w-[600px] hidden md:flex h-screen fixed top-0  z-100 bg-color p-7 border border-custom  transition duration-500 ease-in-out overflow-scroll`"
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
        Edit Service Information
      </h2>
      <ServiceInput />
    </div>
  </div>
</template>
