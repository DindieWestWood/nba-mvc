<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: 'small' | 'regular' | 'large'
    colorSheme?: 'accent' | 'stone'
  }>(),
  {
    size: 'regular',
    colorSheme: 'accent',
  },
)
</script>

<template>
  <span class="tag" :class="[`tag--${props.size}`, `tag--${props.colorSheme}`]">
    <slot />
  </span>
</template>

<style scoped>
.tag {
  --tag-bg: var(--nav-handle-bg);
  --tag-shadow: var(--nav-handle-shadow);
  --tag-color: var(--nav-link-color-active);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: var(--tag-bg);
  box-shadow: var(--tag-shadow);
  color: var(--tag-color);
  font-weight: bold;
}

.tag--small {
  font-size: 0.85rem;
  padding: 0.15rem 0.5rem;
}

.tag--regular {
  padding: 0.25rem 0.85rem;
}

.tag--large {
  font-size: 1.25rem;
  padding: 0.35rem 1.1rem;
}

.tag--accent {
  --tag-bg: var(--nav-handle-bg);
  --tag-shadow: var(--nav-handle-shadow);
  --tag-color: var(--nav-link-color-active);
}

.tag--stone {
  --tag-bg: linear-gradient(45deg, var(--stone-200) 0%, var(--stone-100) 100%);
  --tag-shadow: var(--card-shadow);
  --tag-color: var(--stone-700);
}
</style>
