<script lang="ts" setup>
defineOptions({
  inheritAttrs: false,
})

defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <ImageBackground>
   <div class="flex flex-col items-center justify-center w-full h-full">
      <div class="flex flex-row items-center justify-center text-white text-7xl">
        <div v-html="icon" class="w-24 h-24 mr-8" />
        <div>{{ title}} </div>
      </div>
    </div>
  </ImageBackground>
</template>


<style>
.og-bg-radial-vc {
  background: radial-gradient(circle, rgba(0, 200, 147, 1) 0%, rgba(102, 103, 171, 1) 10%, rgba(17, 24, 39, 0) 39%);
}
</style>
