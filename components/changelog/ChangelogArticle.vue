<script lang="ts" setup>
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
const props = defineProps({
  article: {
    type: Object as PropType<ParsedContent>,
    required: true,
  },
  current: String,
})
const isCurrent = computed(() => {
  return props.current === props.article.slug
})
</script>

<template>
  <nuxt-link :to="`/changelog/${useDayjs()(article.date).utc().format('YYYY-MM-DD')}`" class="hover:border-none">
  <glow-card>
    <div class="flex flex-col space-y-4 group relative px-4 py-5">
      <div class="flex items-center justify-between space-x-4">
        <time class="font-semibold text-gray-700 dark:text-gray-300" :datetime="article.date">{{ useDayjs()(article.date).utc().format('MMMM D, YYYY') }}</time>
        <div class="flex space-x-2">
          <u-badge v-if="article.add" color="primary" variant="soft">New Features</u-badge>
          <u-badge v-if="article.update" color="emerald" variant="soft">Improvements</u-badge>
        </div>
      </div>
      <div>
        <ol class="list-disc pl-4 text-gray-600 dark:text-gray-300">
          <li v-for="highlight in article.highlights" :key="highlight"> {{ highlight }} </li>
        </ol>
      </div>
      <div v-if="!current" class="flex items-end justify-end text-sm group-hover:text-logo-b">
          Read More
      </div>
      <div
        v-if="isCurrent"
        class="
          absolute transform-gpu rotate-45 w-4 h-4 -left-6 top-0 transition-colors duration-100
        bg-white group-hover:bg-gray-50 dark:bg-gray-800 dark:group-hover:bg-gray-700
        "
      />
    </div>
  </glow-card>
  </nuxt-link>
</template>
