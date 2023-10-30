<script lang="ts" setup>
// https://codesandbox.io/p/github/lepikhinb/example-nuxt-studio-gradient/master?file=/src/components/BaseCard.vue:7,1
import { useMouse, useScroll } from '@vueuse/core'

defineProps({full: Boolean})
const { x: mouseX, y: mouseY } = useMouse()
const { y: scrollY } = useScroll(process.client ? window : undefined)

const element = ref<HTMLElement|undefined>(undefined)
const container = ref<HTMLElement|undefined>(undefined)


const center = () => {
  if (!container.value || !element.value) return

  const containerRect = container.value.getBoundingClientRect()
  const elementRect = element.value.getBoundingClientRect()

  const x = mouseX.value - containerRect.left - elementRect.width / 2
  const y = mouseY.value - containerRect.top - elementRect.height / 2 - scrollY.value

  element.value.style.transform = `translate(${x}px, ${y}px)`
}


onMounted(() => {
  if (!process.client) return
  watch([mouseX, mouseY, scrollY], center)
  document.addEventListener('scroll', center)
})

onUnmounted(() => {
  if (!process.client) return
  document.removeEventListener('scroll', center)
})


</script>

<template>
  <section
    ref="container" class="flex flex-col
      isolate relative overflow-hidden rounded-2xl
      bg-gray-white dark:bg-gray-900
      hover:shadow-xl transition-shadow duration-500
    "
    :class="{'flex-1': full}"
  >
    <div ref="element" class="absolute transform-gpu w-256 h-256 bg-radial-vc rounded-full" />
    <div class="bg-white dark:bg-gray-900 relative m-[1px] rounded-2xl overflow-hidden flex flex-col" :class="{'flex-1': full}">
      <div
        class="
          isolate relative overflow-hidden bg-white dark:bg-gray-800/50 h-full
          hover:dark:bg-gray-800/75 transition-colors duration-500
          "
      >
        <slot />
      </div>
    </div>
  </section>
</template>

<style>
.bg-radial-vc {
  background: rgb(0, 200, 147);
  background: radial-gradient(circle, rgba(0, 200, 147, 1) 0%, rgba(156, 154, 227, 1) 10%, rgba(243, 244, 246, 0) 39%);
}
.dark .bg-radial-vc {
  background: radial-gradient(circle, rgba(0, 200, 147, 1) 0%, rgba(102, 103, 171, 1) 10%, rgba(17, 24, 39, 0) 39%);
}
</style>
