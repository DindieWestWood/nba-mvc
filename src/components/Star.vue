<script setup lang="ts">
import { computed, useAttrs } from 'vue'

interface Props {
  size?: number
  pulseFrequency?: number
  scaleMin?: number
  scaleMax?: number
}

const props = withDefaults(
  defineProps<Props>(),
  {
    size: 40,
    pulseFrequency: 2,
    scaleMin: 0.92,
    scaleMax: 1.08,
  },
)

const attrs = useAttrs()

const starStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  '--pulse-duration': `${props.pulseFrequency}s`,
  '--scale-min': props.scaleMin,
  '--scale-max': props.scaleMax,
}))
</script>

<template>
  <svg
    v-bind="attrs"
    class="star"
    viewBox="0 0 40 40"
    xmlns="http://www.w3.org/2000/svg"
    :style="starStyle"
  >
    <path
      d="M19.833 -1.3309e-08L24.0402 15.6258L39.6659 19.833L24.0402 24.0402L19.833 39.6659L15.6258 24.0402L1.3309e-08 19.833L15.6258 15.6258L19.833 -1.3309e-08Z"
      fill="currentColor"
    />
  </svg>
</template>

<style scoped lang="scss">
.star {
  display: inline-block;
  color: var(--star-color);
  animation: pulse var(--pulse-duration) ease-in-out infinite;
  transform-origin: center;
}

@keyframes pulse {
  0% {
    transform: scale(var(--scale-min));
    opacity: 0.85;
  }

  50% {
    transform: scale(var(--scale-max));
    opacity: 1;
  }

  100% {
    transform: scale(var(--scale-min));
    opacity: 0.85;
  }
}
</style>
