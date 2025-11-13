import { z } from 'zod'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const ContractLeaderboardMetaSchema = z
  .object({
    minGamesPct: z.number().nullable(),
    minImpact: z.number().nullable(),
    team: z.string().nullable(),
    minMinutesPerGame: z.coerce.number(),
    date: z.union([z.coerce.number(), z.string()]),
    count: z.coerce.number(),
  })
  .passthrough()

const ContractPlayerSchema = z
  .object({
    player_id: z.string(),
    player_name: z.string(),
    team_abbreviation: z.string(),
    contract_score: z.coerce.number(),
    impact_score: z.coerce.number(),
    availability_score: z.coerce.number(),
    cost_score: z.coerce.number(),
    salary_value: z.coerce.number(),
    dollars_per_point: z.coerce.number(),
    dollars_per_rebound: z.coerce.number(),
    dollars_per_assist: z.coerce.number(),
    dollars_per_steal: z.coerce.number(),
    dollars_per_block: z.coerce.number(),
    games_pct: z.coerce.number(),
    court_pct: z.coerce.number(),
    starter_index: z.coerce.number(),
    value_per_dollar: z.coerce.number(),
    minutes_per_game: z.coerce.number(),
  })
  .passthrough()

export const ContractLeaderboardSchema = z.object({
  meta: ContractLeaderboardMetaSchema,
  data: z.array(ContractPlayerSchema),
})

export type ContractLeaderboard = z.infer<typeof ContractLeaderboardSchema>
export type ContractLeaderboardPlayer = ContractLeaderboard['data'][number]

type LeaderboardQueryPrimitive = string | number | Date | null | undefined
export type LeaderboardQueryParams = Record<string, LeaderboardQueryPrimitive>

const normalizeDateParam = (value: string | number | Date): string => {
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

/**
 * Fetches the contract leaderboard with optional query parameters.
 * Ensures minMinutesPerGame defaults to 12 to match API requirements.
 */
export async function fetchContractLeaderboard(
  params: LeaderboardQueryParams = {},
): Promise<ContractLeaderboard> {
  if (!API_BASE_URL) {
    throw new Error('Missing VITE_API_BASE_URL environment variable')
  }

  const effectiveParams: LeaderboardQueryParams = { minMinutesPerGame: 12, ...params }
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

  const payload = await response.json()
  return ContractLeaderboardSchema.parse(payload)
}
