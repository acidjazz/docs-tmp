<script setup>
// image is a random number from 1 to 4
const url = `https://docs.vulncheck.com/gradient/vc-grad-${Math.floor(Math.random() * 3) + 1}.png`
</script>

<template>
  <div
    class="w-full h-full"
      :style="`
        background: url(${url});
        background-size: 1200px 630px;
      `"
    >
    <div
      class="w-full h-full flex flex-col justify-between items-start bg-black/30 p-20"
    >

    <LogoSvg class="text-white absolute inset-20" style="width: 200px; height: 40px;" />
    <slot />
    </div>
</div>
</template>
