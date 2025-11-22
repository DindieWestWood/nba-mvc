<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { RouterLink } from 'vue-router'
import Card from './Card.vue'

interface Props {
  href?: string
  target?: string
  rel?: string
}

const attrs = useAttrs()
const props = withDefaults(defineProps<Props>(), {
  href: '#',
})

const relValue = computed(() => {
  if (props.rel) return props.rel
  if (props.target === '_blank') return 'noreferrer noopener'
  return undefined
})

const resolvedHref = computed(() => props.href || '#')
</script>

<template>
  <Card v-bind="attrs" clickable class="link-card">
    <RouterLink
      class="link-card__overlay"
      :to="resolvedHref"
      :target="props.target"
      :rel="relValue"
    >
      <slot />
    </RouterLink>
  </Card>
</template>

<style scoped>
.link-card {
  position: relative;
  padding: 0;
}

.link-card__overlay {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 1.25rem;
  text-decoration: none;
  color: inherit;
}
</style>
