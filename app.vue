<script setup lang="ts">

const links = [{
  label: 'Documentation',
  icon: 'i-heroicons-book-open-solid',
  to: '/getting-started/introduction',
},
{
  label: 'API',
  icon: 'i-mdi-code-json',
  to: '/api',

},
{
  label: 'Changelog',
  icon: 'i-mdi-post-outline',
  to: '/changelog',
}]

const { data: files } = useLazyFetch('/api/search.json', {
  default: () => [],
  server: false,
})
const { data: navigation } = await useAsyncData('navigation', () => fetchContentNavigation())
const filtered = computed(() => navigation.value?.filter(i => i.title !== 'Changelog'))

useHead({
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

provide('navigation', filtered)
provide('filtered', filtered)
provide('files', files)
</script>

<template>
  <div>
    <UHeader :links="links">
      <template #logo>
        <Logo class="w-auto h-6" />
      </template>

      <template #right>
        <UColorModeButton />

        <UButton icon="i-simple-icons-x" to="https://x.com/vulncheckai" target="_blank" class="hidden lg:inline-flex" color="gray" variant="ghost" />
        <UButton icon="i-mdi-mastodon" to="https://infosec.exchange/@vulncheck" target="_blank" class="hidden lg:inline-flex" color="gray" variant="ghost" />
        <UButton icon="i-simple-icons-linkedin" to="https://www.linkedin.com/company/vulncheck" target="_blank" class="hidden lg:inline-flex" color="gray" variant="ghost" />
      </template>
      <!-- Mobile panel -->
      <template #panel>
        <LazyUDocsSearchButton size="md" class="w-full mb-4" />
        <LazyUNavigationTree v-if="navigation" :links="mapContentNavigation(navigation)" default-open :multiple="false" />
      </template>
    </UHeader>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <div class="w-full h-px bg-gray-800 flex items-center justify-center">
      <div class="bg-white dark:bg-gray-900 px-4">
        <img src="/icon-white.svg" class="hidden dark:block w-5 h-5" />
        <img src="/icon.svg" class="dark:hidden w-4 h-4" />
      </div>
    </div>
    <UFooter :links="links">
    <template #left>
      <span class="text-sm">
        © 2023 VulnCheck Inc.
      </span>
    </template>
    <template #right>
      <UColorModeButton />
      <UButton icon="i-simple-icons-x" to="https://x.com/vulncheckai" target="_blank" class="hidden lg:inline-flex" color="gray" variant="ghost" />
      <UButton icon="i-mdi-mastodon" to="https://infosec.exchange/@vulncheck" target="_blank" class="hidden lg:inline-flex" color="gray" variant="ghost" />
      <UButton icon="i-simple-icons-linkedin" to="https://www.linkedin.com/company/vulncheck" target="_blank" class="hidden lg:inline-flex" color="gray" variant="ghost" />
    </template>
  </UFooter>
   <ClientOnly>
      <LazyUDocsSearch v-if="navigation" :files="files" :navigation="navigation" />
    </ClientOnly>
  </div>
</template>
