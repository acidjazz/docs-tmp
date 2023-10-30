<template>
  <div class="w-full h-full flex flex-col justify-between items-start bg-gray-900 p-20">
    <div
      class="absolute inset-0 flex items-end justify-end"
      style="
      background:
        linear-gradient(#6667ab, transparent),
        linear-gradient(90deg, #6667AB, transparent),
        linear-gradient(25deg, #00c893, transparent),
        linear-gradient(-90deg, #6667AB, transparent);
      background-blend-mode: screen;
      "
    />
    <LogoSvg class="text-white absolute inset-20" style="width: 200px; height: 40px;" />
    <slot />
</div>
</template>

<style>
 /* https://codepen.io/chilliconcode/pen/OWxqYR */
.radial-gradient-gold {
  background:
    radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%),
    radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%);
}

.radial-gradient-gpt {
  background:
    radial-gradient(ellipse farthest-corner at right bottom, #6667AB 0%, #665FAB 8%, #664DAB 30%, #6643AB 40%, transparent 80%),
    radial-gradient(ellipse farthest-corner at left top, #6667AB 0%, #6667AB 8%, #6667AB 25%, #6667AB 62.5%, #6667AB 100%);
}

.radial-gradient-slow {
  background:
    radial-gradient(ellipse farthest-corner at right bottom, #535473 0%, #6364A8 8%, #636598 30%, #636596 40%, transparent 80%),
    radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #9A9BFF 8%, #7F80D5 25%, #5E5F9F 62.5%, #5E5F9F 100%);
}


.radial-gradient-gpt {
  background:
    radial-gradient(ellipse farthest-corner at right bottom, #6667AB 0%, #665FAB 8%, #664DAB 30%, #6643AB 40%, transparent 80%),
    radial-gradient(ellipse farthest-corner at left top, #6667AB 0%, #6667AB 8%, #6667AB 25%, #6667AB 62.5%, #6667AB 100%);
}

.radial-gradient-bard {
  background:
  radial-gradient(ellipse farthest-corner at right bottom, #6667AB 0%, #55558C 8%, #45446F 30%, #353452 40%, transparent 80%),
  radial-gradient(ellipse farthest-corner at left top, #6667AB 0%, #6667AB 8%, #6667AB 25%, #6667AB 62.5%, #6667AB 100%);
}
</style>
