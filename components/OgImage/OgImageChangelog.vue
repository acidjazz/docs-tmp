<script lang="ts" setup>
defineOptions({ inheritAttrs: false })

defineProps({
  date: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <ImageBackground>
    <div class="flex flex-col items-start justify-end h-full">
      <div class="flex flex-row items-center justify-center space-x-4 text-white text-4xl">
        <div>Changelog </div>
        <div
          class="bg-[#00c893] w-4 h-4 rounded-full mx-6"
          style="box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5), inset 0px 0px 2px white;"
          />
        <div>{{ date }}</div>
      </div>
      <p class="text-5xl text-gray-200 leading-tight pr-10">
        {{ title }}
      </p>
    </div>
  </ImageBackground>
</template>
