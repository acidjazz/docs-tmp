<script lang="ts" setup>
import type { AnimationItem } from 'lottie-web'
const props = defineProps({
  json: String,
  delay: {
    type: Number,
    required: false,
    default: 300,
  },
})
const { sleep } = useUtils()

let animation: undefined | AnimationItem

if (getCurrentInstance())
  onMounted(async () => {
    if (!process.client || !window.lottie || animation) return
    await sleep(props.delay)
    animation = window.lottie.loadAnimation({
      container: document.getElementById('docAnimation') as Element,
      path: `/json/${props.json}.json`,
      loop: true,
      autoplay: true,
    })
  })

onUnmounted(() => {
  if (animation) animation.destroy()
})
</script>

<template>
  <div class="hidden lg:block w-[600px] h-[300px] flex-shrink-0">
    <div class="w-full flex flex-col -mt-[135px] items-center justify-center">
      <div id="docAnimation" />
    </div>
  </div>
</template>
