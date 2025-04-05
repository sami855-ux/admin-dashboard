<template>
  <div>
    <canvas ref="canvas" class="w-[250px] h-[250px]"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue"
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js"

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const props = defineProps({
  chartData: {
    type: Object,
    required: true,
  },
})

const canvas = ref(null)

onMounted(() => {
  new ChartJS(canvas.value, {
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
