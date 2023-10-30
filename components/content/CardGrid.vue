<template>
    <content-slot :use="$slots.root" />

    <h2 class="title">
        <content-slot :use="$slots.title" unwrap="p" />
    </h2>

    <div class="grid gap-8 sm:grid-cols-2">
        <slot />
    </div>

</template>