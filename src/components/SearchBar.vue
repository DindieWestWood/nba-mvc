<script setup lang="ts">
import { Search, X } from 'lucide-vue-next'

const props = withDefaults(
  defineProps<{
    placeholder?: string
    autofocus?: boolean
  }>(),
  {
    placeholder: 'Search players…',
    autofocus: false,
  },
)

const model = defineModel<string>({ default: '' });
</script>

<template>
  <div class="search-bar" role="search">
    <Search class="search-bar__icon" :size="24" aria-hidden="true" />
    <input
      v-model="model"
      type="search"
      class="search-bar__input"
      :placeholder="props.placeholder"
      :autofocus="props.autofocus"
    />
    <button class="search-bar__button" v-if="model">
      <X
        class="search-bar__clear"
        :size="24"
        aria-label="Clear search"
        @click.prevent="model = ''"
      />
    </button>
  </div>
</template>

<style scoped lang="scss">
.search-bar {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 999px;
  background: var(--card-bg);
  box-shadow: var(--card-shadow);
}

.search-bar__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary-color);
  width: 24px;
  height: 24px;
  margin: 10px;
}

.search-bar__input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: var(--color-text-primary);
  min-height: 44px;

  font-family: var(--font-family-base);
}

.search-bar__input::placeholder {
  color: var(--text-secondary-color);
}

.search-bar__input::-webkit-search-decoration,
.search-bar__input::-webkit-search-cancel-button,
.search-bar__input::-webkit-search-results-button,
.search-bar__input::-webkit-search-results-decoration {
  display: none;
}

.search-bar__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  color: var(--search-button-color);
  background: transparent;
  transition: background-color 0.2s ease-in-out,
              color 0.2s ease-in-out;
}

.search-bar__button:hover {
  background: var(--search-button-hover-bg);
  color: var(--search-button-hover-color);
}

.search-bar__button:active {
  background: var(--search-button-active-bg);
  color: var(--search-button-active-color);
}
</style>
