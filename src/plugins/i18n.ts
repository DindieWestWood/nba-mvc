import { createI18n } from 'vue-i18n'

import en from '../locales/en.json'
import fr from '../locales/fr.json'

type SupportedLocaleValue = 'en' | 'fr'

export const SUPPORTED_LOCALES: Array<{ value: SupportedLocaleValue; label: string }> = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Français' },
]

const STORAGE_KEY = 'nba-mvc-locale'

const normalizeLocale = (locale?: string | null): SupportedLocaleValue | null => {
  if (!locale) return null
  const match = SUPPORTED_LOCALES.find((option) => option.value === locale)
  return match ? match.value : null
}

export const getInitialLocale = (): SupportedLocaleValue => {
  if (typeof window === 'undefined') {
    return 'en'
  }

  const stored = window.localStorage.getItem(STORAGE_KEY)
  const saved = normalizeLocale(stored)
  if (saved) return saved

  const browserLocale = window.navigator.language?.slice(0, 2)
  const normalized = normalizeLocale(browserLocale)
  return normalized ?? 'en'
}

export const persistLocale = (locale: SupportedLocaleValue): void => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, locale)
  }

  if (typeof document !== 'undefined') {
    document.documentElement.lang = locale
  }
}

export const createAppI18n = (locale: SupportedLocaleValue = getInitialLocale()) => {
  const normalized = normalizeLocale(locale) ?? 'en'

  const i18n = createI18n({
    legacy: false,
    locale: normalized,
    fallbackLocale: 'en',
    messages: {
      en,
      fr,
    },
  })

  persistLocale(normalized)

  return i18n
}
