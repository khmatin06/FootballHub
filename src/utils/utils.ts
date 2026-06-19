import { leagues } from '../data/data';

// find the team name for a given player id
export function getPlayerTeam(playerId: string): string {
  for (const league of leagues) {
    for (const team of league.teams) {
      const found = team.players.find(p => p.id === playerId);
      if (found) return team.name;
    }
  }
  return '';
}