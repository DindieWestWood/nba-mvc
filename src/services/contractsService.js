const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

/**
 * Fetches the contract leaderboard with optional query parameters.
 * Ensures minMinutesPerGame defaults to 12 to match API requirements.
 *
 * @param {Object} [params]
 * @param {number} [params.minMinutesPerGame]
 * @returns {Promise<Object>} Resolved API payload.
 */
export async function fetchContractLeaderboard(params = {}) {
  if (!API_BASE_URL) {
    throw new Error('Missing VITE_API_BASE_URL environment variable')
  }

  const normalizeDateParam = (value) => {
    if (value instanceof Date) {
      return String(value.getTime())
    }

    if (typeof value === 'number' && !Number.isNaN(value)) {
      return String(value)
    }

    if (typeof value === 'string' && value.trim() !== '') {
      const asNumber = Number(value)
      if (!Number.isNaN(asNumber)) {
        return String(asNumber)
      }

      const parsed = Date.parse(value)
      if (!Number.isNaN(parsed)) {
        return String(parsed)
      }
    }

    throw new Error('Invalid date parameter. Provide a timestamp, ISO string, or Date object.')
  }

  const effectiveParams = { minMinutesPerGame: 12, ...params }
  const query = new URLSearchParams()

  Object.entries(effectiveParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      const normalizedValue = key === 'date' ? normalizeDateParam(value) : String(value)
      query.set(key, normalizedValue)
    }
  })

  const url = new URL('/leaderboard/contracts', API_BASE_URL)
  url.search = query.toString()

  const response = await fetch(url.toString())
  if (!response.ok) {
    throw new Error(`Failed to fetch leaderboard (${response.status})`)
  }

  return response.json()
}
