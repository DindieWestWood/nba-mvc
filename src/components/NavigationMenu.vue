<script setup>
import { RouterLink } from 'vue-router'
import { useNavigation } from '../composables/useNavigation'

const { items, navigate } = useNavigation()

function handleSelect(id) {
  navigate(id)
}
</script>

<template>
  <nav class="primary-nav" aria-label="Primary">
    <ul class="primary-nav__list">
      <li v-for="item in items" :key="item.id" class="primary-nav__item">
        <RouterLink
          class="primary-nav__link"
          :class="{ 'primary-nav__link--active': item.isActive }"
          :to="item.path"
          :aria-current="item.isActive ? 'page' : undefined"
          @click="handleSelect(item.id)"
        >
          <span class="primary-nav__text">{{ item.label }}</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.primary-nav {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: #fff;
}

.primary-nav__list {
  list-style: none;
  margin: 0;
  padding: 0.5rem;
  display: flex;
  gap: 0.75rem;
}

.primary-nav__item {
  flex: 1;
}

.primary-nav__link {
  display: block;
  padding: 0.75rem 1rem;
  border-radius: 999px;
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  color: #1f2937;
  border: 2px solid transparent;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.primary-nav__link:hover {
  border-color: rgba(17, 24, 39, 0.2);
}

.primary-nav__link:focus-visible {
  outline: 3px solid #3b82f6;
  outline-offset: 3px;
}

.primary-nav__link--active {
  background: #111827;
  color: #f9fafb;
}
</style>
