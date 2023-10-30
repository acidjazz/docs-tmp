<script lang="ts" setup>
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
defineProps({
  article: {
    type: Object as PropType<ParsedContent>,
    required: true,
  },
})
</script>

<template>
  <nuxt-link
    class="flex flex-col space-y-4 px-4 py-5
      hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-100
      "
    :to="`/changelog/${useDayjs()(article.date).utc().format('YYYY-MM-DD')}`"
  >
    <div class="overflow-hidden overflow-ellipsis">
      {{ article.title }}
    </div>
    <div class="flex items-center justify-between text-sm font-medium text-gray-500">
      <div> {{ useDayjs()(article.date).utc().format('MMMM D, YYYY') }} </div>
      <div class="flex space-x-2">
        <layout-tag v-if="article.add" theme="emerald">New Features</layout-tag>
        <layout-tag v-if="article.update">Improvements</layout-tag>
      </div>
    </div>
  </nuxt-link>
</template>
