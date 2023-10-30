<script setup lang="ts">
definePageMeta({
  layout: 'docs',
})
const route = useRoute()

const { data: page } = await useAsyncData(`docs-${route.path}`, () => queryContent(route.path).findOne())
if (!page.value)
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })

const { data: surround } = await useAsyncData(`docs-${route.path}-surround`, () => queryContent()
  .where({ _extension: 'md', navigation: { $ne: false } })
  .findSurround(route.path.endsWith('/') ? route.path.slice(0, -1) : route.path),
)

useSeoMeta({
  titleTemplate: '%s - VulnCheck Docs',
  title: page.value.title,
  ogTitle: `${page.value.title} - VulnCheck Docs}`,
  ogImage: '/og-vc-docs.png',
  description: page.value.description,
  ogDescription: page.value.description
})

useContentHead(page)

if (page.value.resource)
  defineOgImage({
    component: 'Resource',
    title: page.value.title,
    method: page.value.method,
    description: page.value.description,
  })
const headline = computed(() => findPageHeadline(page.value))
</script>

<template>
  <UPage>
    <UPageHeader :title="page.title" :description="page.description" :links="page.links" :headline="headline">
    <template v-if="page.resource" #headline>
      API Resources
    </template>
    <template v-if="page.resource" #title>
      <div class="flex items-center justify-center space-x-4">
        <u-badge color="emerald" variant="outline"> {{ page.method }} </u-badge>
        <div class="w-0.5 h-0.5 rounded-full bg-gray-500" />
        <div class="text-xl"> {{ page.title }} </div>
      </div>
    </template>
  </UPageHeader>
    <UPageBody prose>
      <ContentRenderer v-if="page.body" :value="page" />
      <hr v-if="surround?.length" class="my-8">
      <UDocsSurround :surround="surround" />
    </UPageBody>
    <template v-if="page.body?.toc?.links?.length" #right>
      <UDocsToc :links="page.body.toc.links" />
    </template>
  </UPage>
</template>
