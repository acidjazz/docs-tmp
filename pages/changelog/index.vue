<script lang="ts" setup>
const title = 'VulnCheck Changelog'
const description = 'Recent changes to the VulnCheck API'

useSeoMeta({
  title,
  description,
})

defineOgImage({
  component: 'TitleIcon',
  title: 'Changelog',
  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="M19 5v14H5V5h14m2-2H3v18h18V3m-4 14H7v-1h10v1m0-2H7v-1h10v1m0-3H7V7h10v5Z"/></svg>',
})

const articles = await queryContent().where({ type: 'changelog' }).sort({date: -1 }).find()

</script>

<template>
  <UContainer>
    <div class="grid gap-8 sm:grid-cols-2 max-w-7xl mx-auto my-12">
    <nuxt-link v-for="article in articles" :to="`/changelog/${article.slug}`">
      <glow-card>
        <u-card :ui="{'background': ''}">
    <div class="flex flex-col space-y-4 group relative">
      <div class="flex items-center justify-between space-x-4">
        <time class="font-semibold text-gray-700 dark:text-gray-300" :datetime="article.date">{{ useDayjs()(article.date).utc().format('MMMM D, YYYY') }}</time>
        <div class="flex space-x-2">
          <u-badge v-if="article.add" color="primary" variant="soft">New Features</u-badge>
          <u-badge v-if="article.update" color="emerald" variant="soft">Improvements</u-badge>
        </div>
      </div>
      <div>
        <ol class="list-disc pl-4 text-gray-600 dark:text-gray-300 h-24">
          <li v-for="highlight in article.highlights" :key="highlight"> {{ highlight }} </li>
        </ol>
      </div>
         </div>
        </u-card>
      </glow-card>
    </nuxt-link>
    </div>
  </UContainer>
</template>
