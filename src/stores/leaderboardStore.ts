import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  ContractLeaderboardSchema,
  fetchContractLeaderboard,
  type ContractLeaderboard,
} from '../services/contractsService'

const STORAGE_KEY = 'nba_contract_leaderboard'
const isBrowser = typeof window !== 'undefined'

const toDate = (value: Date | number | string | null | undefined): Date | null => {
  if (value instanceof Date) return value
  if (typeof value === 'number') return new Date(value)

  if (typeof value === 'string') {
    const numericValue = Number(value)
    if (!Number.isNaN(numericValue)) {
      return new Date(numericValue)
    }

    const parsed = Date.parse(value)
    if (!Number.isNaN(parsed)) {
      return new Date(parsed)
    }
  }

  return null
}

const isSameDay = (date: unknown): boolean => {
  const target = toDate(date as Date | number | string | null | undefined)
  if (!target || Number.isNaN(target.valueOf())) return false

  const today = new Date()
  return (
    target.getFullYear() === today.getFullYear() &&
    target.getMonth() === today.getMonth() &&
    target.getDate() === today.getDate()
  )
}

export const useLeaderboardStore = defineStore('leaderboard', () => {
  const leaderboardData = ref<ContractLeaderboard | null>(null)
  const isLoading = ref(false)
  const error = ref<Error | null>(null)

  const readCache = (): ContractLeaderboard | null => {
    if (!isBrowser) return null

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (!raw) return null

      const parsed = JSON.parse(raw)
      const result = ContractLeaderboardSchema.safeParse(parsed)
      if (result.success && result.data.meta?.date && isSameDay(result.data.meta.date)) {
        leaderboardData.value = result.data
        return result.data
      }
    } catch (err) {
      console.warn('Failed to parse leaderboard cache', err)
    }

    return null
  }

  const writeCache = (payload: ContractLeaderboard): void => {
    if (!isBrowser) return

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    } catch (err) {
      console.warn('Failed to write leaderboard cache', err)
    }
  }

  const fetchRemote = async (): Promise<ContractLeaderboard> => {
    isLoading.value = true
    error.value = null

    try {
      const payload = await fetchContractLeaderboard({ date: Date.now() })
      leaderboardData.value = payload
      writeCache(payload)
      return payload
    } catch (err) {
      error.value = err instanceof Error ? err : new Error('Unknown leaderboard error')
      throw error.value
    } finally {
      isLoading.value = false
    }
  }

  const ensureLeaderboardData = async (): Promise<ContractLeaderboard> => {
    const cached = readCache()
    if (cached) return cached
    return fetchRemote()
  }

  return {
    leaderboardData,
    isLoading,
    error,
    ensureLeaderboardData,
  }
})
