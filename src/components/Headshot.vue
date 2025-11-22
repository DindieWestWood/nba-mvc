<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { usePlayerHeadshot } from '@/composables/usePlayerHeadshot'

interface Props {
  playerId?: number | null
  size?: 'small' | 'medium' | 'large'
  alt?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'small',
  alt: '',
})

const attrs = useAttrs()

const { getHeadshotUrl } = usePlayerHeadshot()
const headshotSrc = computed(() => getHeadshotUrl(props.size, props.playerId ?? undefined))
</script>

<template>
  <img class="headshot" v-bind="attrs" :src="headshotSrc" :alt="alt" loading="lazy" />
</template>

<style scoped>
.headshot {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid var(--separator-color);
  background: #d6d3d1;
}
</style>
