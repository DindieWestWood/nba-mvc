<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { useI18n } from 'vue-i18n'
import { useNavigation } from '@/composables/useNavigation'
import { RouterLink } from 'vue-router'

const attr = useAttrs()
const { t } = useI18n()
const { items } = useNavigation()

const activeIndex = computed(() => {
  const index = items.value.findIndex((item) => item.isActive)
  return index >= 0 ? index : 0
})

const navStyle = computed(() => ({
  '--selected-index': `${activeIndex.value}`,
}))
</script>

<template>
  <nav v-bind="attr" :style="navStyle">
    <span></span>
    <ul>
      <li v-for="item in items">
        <RouterLink
        class="nav-links__link"
        :class="{ 'nav-links__link--active': item.isActive }"
        :to="item.path"
        :aria-label="t(item.labelKey)"
        :aria-current="item.isActive ? true : undefined"
      >
        <component :is="item.icon"></component>
      </RouterLink>
      </li>  
    </ul>
  </nav>
</template>

<style scoped lang="scss">
nav {
  --nav-padding: 0.375rem;
  --links-count: 3;
  --selected-index: 0; 
  --handle-size: calc(calc(100% - calc(var(--nav-padding) * 2)) / var(--links-count)); 
  
  position: relative;
  z-index: 100;
  
  display: flex;
  width: calc(calc(2 * var(--nav-padding)) + calc(var(--links-count) * 4.5rem));
  height: calc(3rem + calc(var(--nav-padding) * 2));
  padding: var(--nav-padding);  
  
  border-radius: 999px;
  background: var(--nav-bg);
  box-shadow: var(--nav-shadow);
  
  ul {
    margin-block-start: 0;
    margin-block-end: 0;
    list-style: none;
    display: flex;
    height: 100%;
    width: 100%;
  }
  
  li {
    z-index: 1;
    flex-basis: 0;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: var(--nav-link-color);
    transition: color 0.3s ease-in-out,
                scale 0.3s ease-in-out;
    
    &[aria-current="true"] {
      color: var(--nav-link-color-active);
      transform: scale(1.05);
    }
  }
  
  span {
    --offset: calc(var(--handle-size) * var(--selected-index)); 
    z-index: 0;
    position: absolute;
    left: calc(var(--nav-padding) + var(--offset));
    height: calc(100% - calc(var(--nav-padding) * 2));
    width: var(--handle-size);
    top: var(--nav-padding);
    background: var(--nav-handle-bg);
    box-shadow: var(--nav-handle-shadow);
    border-radius: 999px;
    transition: top 200ms ease-in-out,
                left 200ms ease-in-out;
  }
}

@media screen and (min-width: 1280px) {
  nav {
    height: calc(calc(2 * var(--nav-padding)) + calc(var(--links-count) * 4.5rem));
    width: calc(3rem + calc(var(--nav-padding) * 2));

    ul {
      flex-direction: column;
    }

    span {
      left: var(--nav-padding);
      height: var(--handle-size);
      width: calc(100% - calc(var(--nav-padding) * 2));
      top: calc(var(--nav-padding) + var(--offset));
    }
  }
}
</style>
