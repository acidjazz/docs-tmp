<script setup lang="ts">
definePageMeta({ layout: 'changelog', })

const route = useRoute()

const { data: page } = await useAsyncData(`docs-${route.path}`, () => queryContent(route.path).findOne())
if (!page.value)
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })

const { data: surround } = await useAsyncData(`docs-${route.path}-surround`, () => queryContent()
  .where({ _extension: 'md', navigation: { $ne: false } })
  .findSurround(route.path.endsWith('/') ? route.path.slice(0, -1) : route.path),
)

const date = useDayjs()(page?.value.date).utc().format('MMMM D, YYYY')
const title = `${date} - VulnCheck Changelog`

useSeoMeta({
  title,
  ogTitle: title,
  description: page.value.title,
  ogDescription: page.value.title
})

const articles = await queryContent().where({ type: 'changelog' }).sort({ date: -1 }).find()

defineOgImage({
  component: 'Changelog',
  date,
  title: page.value.title,
})
</script>

<template>
  <UPage>
    <UPageBody prose>

      <div class="flex space-x-8 items-start">
        <div class="max-w-2xl w-full">
          <time :datetime="page?.date" class="
          text-transparent bg-clip-text bg-gradient-to-r from-logo-a via-logo-b to-logo-a
          text-4xl font-bold
        ">
        {{  date }}
          </time>
          <main class="md mt-6">
            <content-doc />
          </main>
        </div>
        <div class="hidden xl:block">
          <changelog-articles :articles="articles" :current="page?.slug" />
        </div>
      </div>
    </UPageBody>
  </UPage>
</template>
