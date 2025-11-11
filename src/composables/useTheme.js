import { computed, ref, watch } from 'vue'

const STORAGE_KEY = 'nba-mvc-theme'
const SUPPORTED_THEMES = ['light', 'dark']
const mediaQuery =
  typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)') : null

function getInitialTheme() {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (SUPPORTED_THEMES.includes(stored)) {
    return stored
  }

  return mediaQuery?.matches ? 'dark' : 'light'
}

const theme = ref(getInitialTheme())

function applyTheme(value) {
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.theme = value
  }
}

watch(
  theme,
  (value) => {
    applyTheme(value)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, value)
    }
  },
  { immediate: true }
)

export function useTheme() {
  function setTheme(value) {
    if (SUPPORTED_THEMES.includes(value)) {
      theme.value = value
    }
  }

  function toggleTheme() {
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  const isDark = computed(() => theme.value === 'dark')

  return {
    theme,
    isDark,
    setTheme,
    toggleTheme,
  }
}
