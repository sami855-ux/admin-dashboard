<script setup>
const { iconName, title, number, change, bg } = defineProps({
  iconName: String,
  title: String,
  number: String,
  change: {
    type: Number,
    default: 0,
  },
  bg: {
    type: String,
    default: "bg-blue-500",
  },
})
</script>

<template>
  <div
    class="w-50 lg:w-[250px] h-[130px] lg:h-[119px] card-custom rounded-xl flex-col p-2 space-x-2 hover:shadow-lg hover:cursor-pointer hover:text-custom transition-all duration-200 ease-in-out"
  >
    <div class="w-full flex">
      <span
        :class="`w-12 h-12 rounded-full border border-custom flex items-center justify-center ${bg}`"
      >
        <i :class="`pi ${iconName} text-2xl text-slate-100`"></i>
      </span>
      <div class="flex flex-col space-y-4 ml-4 pt-2">
        <p class="text-custom text-[14px]">{{ title }}</p>
        <h2 class="font-semibold text-xl">{{ number }}</h2>
      </div>
    </div>
    <div v-if="change > 0" class="w-full h-7 flex items-center">
      <i
        class="pi pi-arrow-up text-[13px] text-green-600 pt-1 mr-1"
        style="font-weight: 800"
      ></i>
      <span class="h-fit text-green-500 text-[13px] pt-2 mr-2"
        >{{ Math.abs(change) }}%
      </span>
      <span class="text-[12px] text-custom pt-2">last 30 days</span>
    </div>
    <div v-if="change < 0" class="w-full h-7 flex items-center">
      <i
        class="pi pi-arrow-down text-[13px] text-orange-700 pt-1 mr-1 font-semibold"
        style="font-weight: 800"
      ></i>
      <span class="h-fit text-orange-700 text-[13px] pt-2 mr-2"
        >{{ Math.abs(change) }}%
      </span>
      <span class="text-[12px] text-custom pt-2">last 30 days</span>
    </div>
    <div class="" v-if="change === 0"></div>
  </div>
</template>
