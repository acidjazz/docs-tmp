<script lang="ts" setup>
const title = 'VulnCheck Docs'
const description = 'Explore our guides and examples to learn about and integrate VulnCheck'

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
})

defineOgImage({
  component: 'TitleIcon',
  title: 'VulnCheck Docs',
  icon: '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="M17.5 14.33c.79 0 1.63.08 2.5.24v1.5c-.62-.16-1.46-.24-2.5-.24c-1.9 0-3.39.33-4.5.99v-1.69c1.17-.53 2.67-.8 4.5-.8M13 12.46c1.29-.53 2.79-.79 4.5-.79c.79 0 1.63.07 2.5.23v1.5c-.62-.16-1.46-.24-2.5-.24c-1.9 0-3.39.34-4.5.99m4.5-3.65c-1.9 0-3.39.32-4.5 1V9.84c1.23-.56 2.73-.84 4.5-.84c.79 0 1.63.08 2.5.23v1.55c-.74-.19-1.59-.28-2.5-.28m3.5 8V7c-1.04-.33-2.21-.5-3.5-.5c-2.05 0-3.88.5-5.5 1.5v11.5c1.62-1 3.45-1.5 5.5-1.5c1.19 0 2.36.16 3.5.5m-3.5-14c2.35 0 4.19.5 5.5 1.5v14.56c0 .12-.05.24-.16.35c-.11.09-.23.17-.34.17c-.11 0-.19-.02-.25-.05c-1.28-.69-2.87-1.03-4.75-1.03c-2.05 0-3.88.5-5.5 1.5c-1.34-1-3.17-1.5-5.5-1.5c-1.66 0-3.25.36-4.75 1.07c-.03.01-.07.01-.12.03c-.04.01-.08.02-.13.02c-.11 0-.23-.04-.34-.12a.475.475 0 0 1-.16-.35V6c1.34-1 3.18-1.5 5.5-1.5c2.33 0 4.16.5 5.5 1.5c1.34-1 3.17-1.5 5.5-1.5Z"/></svg>'
})
</script>

<template>
  <span class="gradient" />
  <ULandingHero direction="horizontal" :ui="{ container: 'flex lg:gap-2' }">
    <doc-animation json="data-management" />
    <template #title>
      Documentation for the <span class="text-primary-400">VulnCheck API</span>
    </template>
    <template #description>
      Explore our guides and examples to learn about and integrate VulnCheck
    </template>
    <template #links>
      <div class="w-full flex lg:ml-6 justify-center lg:justify-start">
        <UButton to="/getting-started/introduction" icon="i-mdi-rocket-launch" size="xl">
          Get Started
        </UButton>
      </div>
    </template>
    </ULandingHero>
    <div class="grid gap-8 sm:grid-cols-3 max-w-7xl mx-auto mb-12">
      <card icon="i-mdi-database-search" to="/exploit-and-vulnerability-intelligence/introduction">
        <template #title>
          Exploit and Vulnerability Intelligence
        </template>
        <template #description>
          Help organizations enrich their existing vulnerability reporting and solve the vulnerability prioritization challenge.
        </template>
      </card>
      <card icon="i-mdi-door-open" to="/initial-access-intelligence/introduction">
        <template #title>
          Initial Access Intelligence
        </template>
        <template #description>
          Leverage Initial Access Intelligence detection artifacts to detect & respond to remote code execution (RCE) vulnerabilities.
        </template>
      </card>
      <card icon="i-mdi-post-outline" to="/changelog">
        <template #title>
          Changelog
        </template>
        <template #description>
          Stay up to date with the latest changes to the VulnCheck API.
          </template>
      </card>
      <Card icon="i-mdi-key-chain" to="/getting-started/api-tokens">
        <template #title>
          API Tokens
        </template>
        <template #description>
          Learn how to issue and use tokens to access the VulnCheck API.
        </template>
      </card>
      <card icon="i-mdi-code-json" to="/api">
        <template #title>
          API Resources
        </template>
        <template #description>
          Browse all of the available V3 endpoints
        </template>
      </card>
      <card icon="i-mdi-database-search" to="/indices/intro">
        <template #title>
          Indices
        </template>
        <template #description>
          Browse all the different indices available in the VulnCheck API.
        </template>
      </card>
    </div>
</template>


<style scoped>
.gradient {
  position: fixed;
  top: 10rem;
  width: 100%;
  height: 40vh;
  background: radial-gradient(50% 50% at 50% 50%, #6667ab 0%, rgba(0, 220, 130, 0) 100%);
  filter: blur(180px);
  opacity: 0.7;
  z-index: -1;
  animation: colorChange 5s infinite alternate;
}
</style>
