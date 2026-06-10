import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { leagues } from '../data/data';
import type { Player } from '../types/types';
import PlayerCard from '../components/PlayerCard';
import PlayerModal from '../components/PlayerDetail';

export default function LeagueDetailPage() {
  const { leagueId } = useParams<{ leagueId: string }>();

  // Find the league
  const league = leagues.find((l) => l.id === leagueId);
  if (!league) return <Navigate to="/leagues" />;

  // Currently selected team (default: first)
  const [activeTeamId, setActiveTeamId] = useState(league.teams[0].id);
  const activeTeam = league.teams.find((t) => t.id === activeTeamId)!;

  // Modal state
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm font-semibold mb-8" style={{ color: 'rgba(255,255,255,0.45)' }}>
        <Link to="/leagues" className="hover:text-yellow-400 transition-colors">Leagues</Link>
        <span>›</span>
        <span className="text-white">{league.name}</span>
      </div>

      {/* League header */}
      <div className="flex items-center gap-6 mb-10">
        <img
          src={league.logo}
          alt={league.name}
          className="h-20 object-contain"
          style={{ filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.5))' }}
        />
        <div>
          <h1
            style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '2.8rem', letterSpacing: '2px', color: '#fff' }}
          >
            {league.name}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)' }} className="font-semibold">
            {league.country} · {league.teams.length} clubs
          </p>
        </div>
      </div>

      {/* Team tabs */}
      <div className="flex gap-3 flex-wrap mb-8">
        {league.teams.map((team) => (
          <button
            key={team.id}
            onClick={() => setActiveTeamId(team.id)}
            className="px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200"
            style={
              activeTeamId === team.id
                ? { background: 'rgba(245,197,24,0.2)', color: '#f5c518', border: '1px solid rgba(245,197,24,0.4)' }
                : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.1)' }
            }
          >
            {team.name}
          </button>
        ))}
      </div>

      {/* Active team's players */}
      <div className="mb-4">
        <h2
          style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '1.8rem', letterSpacing: '2px', color: '#f5c518' }}
        >
          {activeTeam.name}
          <span
            className="ml-3 text-base"
            style={{ fontFamily: 'Nunito, sans-serif', color: 'rgba(255,255,255,0.4)', letterSpacing: 'normal' }}
          >
            {activeTeam.players.length} players
          </span>
        </h2>
      </div>

      <div className="players-grid">
        {activeTeam.players.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            onClick={() => setSelectedPlayer(player)}
          />
        ))}
      </div>

      {/* Player detail modal */}
      {selectedPlayer && (
        <PlayerModal
          player={selectedPlayer}
          teamName={activeTeam.name}
          onClose={() => setSelectedPlayer(null)}
        />
      )}
    </div>
  );
}
