<script lang="ts" setup>
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import type { PropType } from 'vue'
defineProps({
  articles: {
    type: Array as PropType<ParsedContent[]>,
    required: true,
  },
})
</script>

<template>
  <ul class="divide-y divide-gray-200 dark:divide-gray-700 -my-5 -mx-4">
    <li v-for="article in articles" :key="article.date">
      <changelog-list-item :article="article" />
    </li>
  </ul>
</template>
