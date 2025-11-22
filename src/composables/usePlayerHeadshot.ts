export type HeadshotSize = 'small' | 'medium' | 'large'

const SIZE_MAP: Record<HeadshotSize, string> = {
  small: '260x190',
  medium: '520x380',
  large: '1040x760',
}

const DEFAULT_PLAYER_ID = 5

export function usePlayerHeadshot() {
  const getHeadshotUrl = (size: HeadshotSize, id?: number | null): string => {
    const sizedPath = SIZE_MAP[size] ?? SIZE_MAP.large
    const targetId = id ?? DEFAULT_PLAYER_ID
    return `https://cdn.nba.com/headshots/nba/latest/${sizedPath}/${targetId}.png`
  }

  return {
    getHeadshotUrl,
  }
}
