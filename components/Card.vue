<script lang="ts" setup>
defineProps<{icon: string, to: string}>()
</script>

<template>
  <nuxt-link :to="to">
    <glow-card>
      <u-card :ui="{'background': ''}">
        <div>
            <UIcon :name="icon" class="w-10 h-10" />
        </div>
        <slot />
        <div>
          <h3 class="title text-bolder text-xl mb-4">
            <ContentSlot :use="$slots.title" unwrap="p">
              Card title
            </ContentSlot>
          </h3>
          <p class="description text-gray-400 h-20">
            <ContentSlot :use="$slots.description" unwrap="p">
              Card description
            </ContentSlot>
          </p>
        </div>
      </u-card>
    </glow-card>
  </nuxt-link>
</template>
