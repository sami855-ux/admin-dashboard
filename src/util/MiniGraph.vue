<template>
  <div>
    <canvas ref="canvas" class="w-[250px] h-[250px]"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue"

import {
  Chart as ChartJS,
  Chart, // <- This is the class you use to create a chart
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PieController,
} from "chart.js"

// Register necessary components
ChartJS.register(Title, Tooltip, Legend, ArcElement, PieController)

const props = defineProps({
  chartData: {
    type: Object,
    required: true,
  },
})

const canvas = ref(null)

onMounted(() => {
  // ✅ Use Chart (not ChartJS) here to create the chart instance
  new Chart(canvas.value, {
    type: "pie",
    data: props.chartData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
    },
  })
})
</script>
