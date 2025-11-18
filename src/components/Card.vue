<script setup lang="ts">
import { useAttrs } from 'vue';

interface Props {
  clickable?: boolean;
}

const attrs = useAttrs()
const props = withDefaults(defineProps<Props>(), {
  clickable: false,
})
</script>

<template>
  <div
    v-bind="attrs"
    class="card"
    :class="{
      clickable: props.clickable,
    }"
  >
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
  .card {
    padding: 1rem;
    border-radius: 0.75rem; 
    background: var(--card-bg);
    box-shadow: var(--card-shadow);

    transition: box-shadow 200ms ease-out;
  }

  .clickable {
    cursor: pointer;
  }

  .clickable:hover {
    box-shadow: var(--card-shadow-hover);
  }
</style>
