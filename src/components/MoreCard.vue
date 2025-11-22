<script setup lang="ts">
import LinkCard from './LinkCard.vue'
import Tag from './Tag.vue'

interface Props {
  href: string
  headline?: string
  tagLabel?: string
  backgroundText?: string
}

defineProps<Props>()
</script>

<template>
  <LinkCard class="more-card" :href="href">
    <div class="more-card__content">
      <slot name="headline">
        <h3 v-if="headline">{{ headline }}</h3>
      </slot>
      <Tag size="small">{{ tagLabel }}</Tag>
    </div>
    <span v-if="backgroundText" class="more-card__background">
      {{ backgroundText }}
    </span>
  </LinkCard>
</template>

<style scoped lang="scss">
.more-card {
  position: relative;
  overflow: hidden;
  min-height: 160px;
  padding: 3rem 1.5rem;
}

.more-card__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.more-card__background {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -53%);
  font-family: 'Bungee Shade';
  font-size: 12rem;
  font-weight: 800;
  opacity: 0.08;
  line-height: 1;
  pointer-events: none;
}
</style>
