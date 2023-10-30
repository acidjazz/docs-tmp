<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
})

defineProps({
  title: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <ImageBackground>
   <div class="flex flex-col items-start justify-end w-full h-full text-white">
      <div class="text-xl font-semibold uppercase mb-8 tracking-wider" style="letter-spacing: 0.1em;">vulncheck API resource</div>
      <div class="flex flex-row items-center justify-start text-white text-4xl">
        <div class="bg-opacity-20 text-2xl font-semibold text-emerald-400 border-4 border-emerald-500 rounded-xl px-4 py-2">GET</div>
        <div
          class="bg-white opacity-70 w-2 h-2 rounded-full mx-12"
          style="box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5), inset 0px 0px 2px white;"
          />
        <div>{{ title }} </div>
      </div>
      <div class="text-white text-3xl mt-12">
        {{  description }}
      </div>
    </div>
  </ImageBackground>
</template>


<style>
.og-bg-radial-vc {
  background: radial-gradient(circle, rgba(0, 200, 147, 1) 0%, rgba(102, 103, 171, 1) 10%, rgba(17, 24, 39, 0) 39%);
}
</style>
