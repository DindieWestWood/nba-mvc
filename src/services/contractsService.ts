import { z } from 'zod'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const SalarySchema = z.object({
  y1: z.number(),
  y2: z.number().nullable(),
  y3: z.number().nullable(),
  y4: z.number().nullable(),
  y5: z.number().nullable(),
  y6: z.number().nullable(),
})

const PlayerContractStatsSchema = z.object({
  gp: z.number(),
  w: z.number(),
  l: z.number(),
  w_pct: z.number(),
  min: z.number(),
  fgm: z.number(),
  fga: z.number(),
  fg_pct: z.number(),
  fg3m: z.number(),
  fg3a: z.number(),
  fg3_pct: z.number(),
  ftm: z.number(),
  fta: z.number(),
  ft_pct: z.number(),
  oreb: z.number(),
  dreb: z.number(),
  reb: z.number(),
  ast: z.number(),
  tov: z.number(),
  stl: z.number(),
  blk: z.number(),
  blka: z.number(),
  pf: z.number(),
  pfd: z.number(),
  pts: z.number(),
  plus_minus: z.number(),
  nba_fantasy_pts: z.number(),
  dd2: z.number(),
  td3: z.number(),
  wnba_fantasy_points: z.number(),
  gp_rank: z.number(),
  w_rank: z.number(),
  l_rank: z.number(),
  w_pct_rank: z.number(),
  min_rank: z.number(),
  fgm_rank: z.number(),
  fga_rank: z.number(),
  fg_pct_rank: z.number(),
  fg3m_rank: z.number(),
  fg3a_rank: z.number(),
  fg3_pct_rank: z.number(),
  ftm_rank: z.number(),
  fta_rank: z.number(),
  ft_pct_rank: z.number(),
  oreb_rank: z.number(),
  dreb_rank: z.number(),
  reb_rank: z.number(),
  ast_rank: z.number(),
  tov_rank: z.number(),
  stl_rank: z.number(),
  blk_rank: z.number(),
  blka_rank: z.number(),
  pf_rank: z.number(),
  pfd_rank: z.number(),
  pts_rank: z.number(),
  plus_minus_rank: z.number(),
  nba_fantasy_pts_rank: z.number(),
  dd2_rank: z.number(),
  td3_rank: z.number(),
  wnba_fantasy_pts_rank: z.number(),
  team_count: z.number(),
})

const PlayerContractDetailsSchema = z.object({
  score: z.number(),
  performance: z.number(),
  impact: z.number(),
  availability: z.number(),
  cost: z.number(),
  salary: SalarySchema,
  remain_gtd: z.number(),
  dollars_per_point: z.number(),
  dollars_per_rebound: z.number(),
  dollars_per_assist: z.number(),
  dollars_per_steal: z.number(),
  dollars_per_block: z.number(),
  games_pct: z.number(),
  court_pct: z.number(),
  starter_index: z.number(),
  value_per_dollar: z.number(),
})

const PlayerContractSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    nickname: z.string(),
    team_id: z.number(),
    age: z.number(),
    minutes_per_game: z.number(),
    contract: PlayerContractDetailsSchema,
    stats: PlayerContractStatsSchema,
  })
  .passthrough()

const TeamSchema = z
  .object({
    id: z.number(),
    league_id: z.string(),
    season_id: z.number(),
    city: z.string(),
    name: z.string(),
    slug: z.string(),
    conference: z.union([z.literal('West'), z.literal('East')]),
    conference_record: z.string(),
    playoff_rank: z.number(),
    clinch_indicator: z.null(),
    division: z.string(),
    division_record: z.string(),
    division_rank: z.number(),
    wins: z.number(),
    losses: z.number(),
    win_pct: z.number(),
    league_rank: z.null(),
    record: z.string(),
    home: z.string(),
    road: z.string(),
    l10: z.string(),
    last10_home: z.string(),
    last10_road: z.string(),
    ot: z.string(),
    three_pts_or_less: z.string(),
    ten_pts_or_more: z.string(),
    long_home_streak: z.number(),
    str_long_home_streak: z.number().nullable(),
    long_road_streak: z.number(),
    str_long_road_streak: z.number().nullable(),
    long_win_streak: z.number(),
    long_loss_streak: z.number(),
    current_home_streak: z.number(),
    str_current_home_streak: z.number().nullable(),
    current_road_streak: z.number(),
    str_current_road_streak: z.number().nullable(),
    current_streak: z.number(),
    str_current_streak: z.null(),
    conference_games_back: z.number(),
    division_games_back: z.number(),
    clinched_conference_title: z.string().nullable(),
    clinched_division_title: z.string().nullable(),
    clinched_playoff_birth: z.string().nullable(),
    clinched_play_in: z.number(),
    eliminated_conference: z.string().nullable(),
    eliminated_division: z.string().nullable(),
    ahead_at_half: z.string(),
    behind_at_half: z.string(),
    tied_at_half: z.string(),
    ahead_at_third: z.string(),
    behind_at_third: z.string(),
    tied_at_third: z.string(),
    score100pts: z.string(),
    opp_score100pts: z.string(),
    opp_over_500: z.string(),
    lead_in_fgpct: z.string(),
    lead_in_reb: z.string(),
    fewer_turnovers: z.string(),
    points_pg: z.number(),
    opp_points_pg: z.number(),
    diff_points_pg: z.number(),
    vs_east: z.string().nullable(),
    vs_atlantic: z.string().nullable(),
    vs_central: z.string().nullable(),
    vs_southeast: z.string().nullable(),
    vs_west: z.string().nullable(),
    vs_northwest: z.string().nullable(),
    vs_pacific: z.string().nullable(),
    vs_southwest: z.string().nullable(),
    jan_record: z.string(),
    feb_record: z.string(),
    mar_record: z.string(),
    apr_record: z.string(),
    may_record: z.string(),
    jun_record: z.string(),
    jul_record: z.string(),
    aug_record: z.string(),
    sep_record: z.string(),
    oct_record: z.string(),
    nov_record: z.string(),
    dec_record: z.string(),
    score_80_plus: z.string(),
    opp_score_80_plus: z.string(),
    score_below_80: z.string(),
    opp_score_below_80: z.string(),
    total_points: z.number(),
    opp_total_points: z.number(),
    diff_total_points: z.number(),
    league_games_back: z.number(),
    playoff_seeding: z.string().nullable(),
    clinched_post_season: z.number(),
    neutral: z.string().nullable(),
  })
  .passthrough()

export const ContractDataSchema = z.object({
  meta: z.object({
    date: z.number(),
    counts: z.object({
      players: z.number(),
      teams: z.number(),
    }),
  }),
  players: z.array(PlayerContractSchema),
  teams: z.array(TeamSchema),
})

export type ContractData = z.infer<typeof ContractDataSchema>
export type PlayerContract = z.infer<typeof PlayerContractSchema>

const shouldUseDevProxy = (): boolean => {
  if (typeof window === 'undefined') {
    return false
  }

  if (typeof API_BASE_URL !== 'string') {
    return false
  }

  return window.location.origin.includes('localhost') && API_BASE_URL.includes('localhost')
}

export async function fetchContractData(): Promise<ContractData> {
  if (!API_BASE_URL) {
    throw new Error('Missing VITE_API_BASE_URL environment variable')
  }

  const useProxy = shouldUseDevProxy()

  const requestUrl = useProxy
    ? '/api/data'
    : (() => {
        const url = new URL('/data', API_BASE_URL)
        return url.toString()
      })()

  const response = await fetch(requestUrl)
  if (!response.ok) {
    throw new Error(`Failed to fetch contract data (${response.status})`)
  }

  const payload = await response.json()
  return ContractDataSchema.parse(payload)
}
