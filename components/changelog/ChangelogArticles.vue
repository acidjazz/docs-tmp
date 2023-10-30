<script lang="ts" setup>
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

defineProps({
  articles: {
    type: Array as PropType<ParsedContent[]>,
    required: true,
  },
  current: String,
})
</script>

<template>
  <div class="max-w-3xl relative">
    <div
      class="
        absolute w-1 top-0 bottom-0 left-1/2
        highlight bg-white dark:bg-gray-800
      "
    />
    <div class="flex flex-col space-y-8 relative">
      <changelog-article
        v-for="article in articles" :key="article.date" :article="article"
        :current="current"
      />
    </div>
  </div>
</template>
