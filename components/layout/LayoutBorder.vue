<script lang="ts" setup>
defineProps({ to: String, hidden: Boolean, noPadding: Boolean, clickable: Boolean })
</script>

<template>
  <nuxt-link
    v-if="to" :to="to" class="
    bg-white dark:bg-gray-800 sm:rounded-lg highlight
    hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-100
    "
    :class="{ 'overflow-hidden': hidden, 'px-4 py-5': !noPadding }"
  >
    <slot />
  </nuxt-link>
  <div
    v-else
    class="bg-white dark:bg-gray-800 sm:rounded-lg highlight"
    :class="{
      'overflow-hidden': hidden,
      'px-4 py-5': !noPadding,
      'hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer': clickable,
    }"
  >
    <slot />
    <div class="md:rounded-b-md md:overflow-hidden">
      <slot name="submit" />
    </div>
  </div>
</template>
