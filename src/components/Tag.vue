<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: 'small' | 'regular' | 'large'
  }>(),
  {
    size: 'regular',
  },
)
</script>

<template>
  <span class="tag" :class="`tag--${props.size}`">
    <slot />
  </span>
</template>

<style scoped>
.tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: var(--nav-handle-bg);
  box-shadow: var(--nav-handle-shadow);
  color: var(--nav-color-active);
  font-weight: bold;
}

.tag--small {
  font-size: 0.85rem;
  padding: 0.15rem 0.5rem;
}

.tag--regular {
  font-size: 1rem;
  padding: 0.25rem 0.85rem;
}

.tag--large {
  font-size: 1.25rem;
  padding: 0.35rem 1.1rem;
}
</style>
