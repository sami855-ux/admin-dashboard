<script setup>
import { ref } from "vue"
import { Bar } from "vue-chartjs"
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js"

import AdminCard from "../util/AdminCard.vue"

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
  <div class="w-[80vw] h-fit">
    <span
      class="w-10 cursor-pointer h-10 rounded-full flex items-center justify-center py-4 border border-gray-300 hover:bg-gray-200 transition duration-75"
    >
      <i class="pi pi-angle-left text-xl"></i>
    </span>
    <p class="text-semibold text-lg py-4">Dashboard - Home</p>
    <div class="w-full min-h-screen">
      <div class="w-full h-[270px] flex gap-7 flex-col lg:flex-row">
        <div class="w-[90%] md:w-[400px] h-full rounded-lg">
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

      <div class="w-full h-fit">
        <p class="py-8 text-lg text-gray-800 mt-7">Pending Transaction List</p>
      </div>
    </div>
  </div>
</template>
