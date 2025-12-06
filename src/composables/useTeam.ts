export default function useTeam() {
  const TEAMS = [
    { id: 1610612737, abbr: 'ATL', name: 'Atlanta Hawks' },
    { id: 1610612738, abbr: 'BOS', name: 'Boston Celtics' },
    { id: 1610612739, abbr: 'BKN', name: 'Brooklyn Nets' },
    { id: 1610612740, abbr: 'CHA', name: 'Charlotte Hornets' },
    { id: 1610612741, abbr: 'CHI', name: 'Chicago Bulls' },
    { id: 1610612742, abbr: 'CLE', name: 'Cleveland Cavaliers' },
    { id: 1610612743, abbr: 'DAL', name: 'Dallas Mavericks' },
    { id: 1610612744, abbr: 'DEN', name: 'Denver Nuggets' },
    { id: 1610612745, abbr: 'DET', name: 'Detroit Pistons' },
    { id: 1610612746, abbr: 'GSW', name: 'Golden State Warriors' },
    { id: 1610612747, abbr: 'HOU', name: 'Houston Rockets' },
    { id: 1610612748, abbr: 'IND', name: 'Indiana Pacers' },
    { id: 1610612749, abbr: 'LAC', name: 'Los Angeles Clippers' },
    { id: 1610612750, abbr: 'LAL', name: 'Los Angeles Lakers' },
    { id: 1610612751, abbr: 'MEM', name: 'Memphis Grizzlies' },
    { id: 1610612752, abbr: 'MIA', name: 'Miami Heat' },  
    { id: 1610612753, abbr: 'MIL', name: 'Milwaukee Bucks' },
    { id: 1610612754, abbr: 'MIN', name: 'Minnesota Timberwolves' },
    { id: 1610612755, abbr: 'NOP', name: 'New Orleans Pelicans' },
    { id: 1610612756, abbr: 'NYK', name: 'New York Knicks' },
    { id: 1610612757, abbr: 'OKC', name: 'Oklahoma City Thunder' },
    { id: 1610612758, abbr: 'ORL', name: 'Orlando Magic' },
    { id: 1610612759, abbr: 'PHI', name: 'Philadelphia 76ers' },
    { id: 1610612760, abbr: 'PHX', name: 'Phoenix Suns' },
    { id: 1610612761, abbr: 'POR', name: 'Portland Trail Blazers' },
    { id: 1610612762, abbr: 'SAC', name: 'Sacramento Kings' },
    { id: 1610612763, abbr: 'SAS', name: 'San Antonio Spurs' },
    { id: 1610612764, abbr: 'TOR', name: 'Toronto Raptors' },
    { id: 1610612765, abbr: 'UTA', name: 'Utah Jazz' },
    { id: 1610612766, abbr: 'WAS', name: 'Washington Wizards' },
  ]

  const getTeamById = (id: number) => {
    return TEAMS.find(team => team.id === id) || null
  }

  return {};
}