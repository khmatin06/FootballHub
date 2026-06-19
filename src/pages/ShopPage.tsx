import { useState, useEffect, useMemo } from 'react';
import { leagues } from '../data/data';
import type { Player } from '../types/types';
import PlayerCard from '../components/PlayerCard';
import PlayerModal from '../components/PlayerDetail';
import Input from '../components/Input';
import { getPlayerTeam } from '../utils/utils';

// Flatten all players into one big list for the shop
function getAllPlayers(): (Player & { leagueName: string; teamName: string })[] {
  const result: (Player & { leagueName: string; teamName: string })[] = [];
  for (const league of leagues) {
    for (const team of league.teams) {
      for (const player of team.players) {
        result.push({ ...player, leagueName: league.name, teamName: getPlayerTeam(player.id), }); // utils function to get team name for a player
      }
    }
  }
  return result;
}

const allPlayers = getAllPlayers();

// All unique positions from data
const allPositions = ['All', ...[...new Set(allPlayers.map(p => p.position))].sort()];
const allLeagues = ['All', ...leagues.map((l) => l.name)];

export default function ShopPage() {
  const [search, setSearch] = useState('');
  const [position, setPosition] = useState('All');
  const [leagueFilter, setLeagueFilter] = useState('All');
  const [sort, setSort] = useState('name-asc');
  const [loading, setLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  // Selected player for modal
  const [selectedPlayer, setSelectedPlayer] = useState<(Player & { teamName: string }) | null>(null);

  // Filter + sort logic
  const filtered = useMemo(() => {
    let list = [...allPlayers];

    // Search by name or country
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.country.toLowerCase().includes(q)
      );
    }

    // Position filter
    if (position !== 'All') {
      list = list.filter((p) => p.position === position);
    }

    // League filter
    if (leagueFilter !== 'All') {
      list = list.filter((p) => p.leagueName === leagueFilter);
    }

    // Sort
    switch (sort) {
      case 'name-asc':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        list.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
    }

    return list;
  }, [search, position, leagueFilter, sort]);

  const selectStyle = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.15)',
    color: 'white',
    borderRadius: '8px',
    padding: '9px 14px',
    fontSize: '0.875rem',
    fontWeight: 600,
    fontFamily: 'Nunito, sans-serif',
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Page heading */}
      <div className="mb-10">
        <h1
          style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '3rem', letterSpacing: '3px', color: '#fff' }}
        >
          Shirt <span style={{ color: '#f5c518' }}>Shop</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)' }} className="font-semibold mt-1">
          {allPlayers.length} shirts available
        </p>
      </div>

      {/* Filters bar */}
      <div
        className="rounded-2xl p-5 mb-8 flex flex-wrap gap-4 items-end"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }}
      >
        {/* Search */}
        <div className="flex-1 min-w-48">
          <Input
            label="Search player"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="e.g. Messi, Brazil..."
          />
        </div>

        {/* Position filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-white/70">Position</label>
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            style={selectStyle}
          >
            {allPositions.map((pos) => (
              <option key={pos} value={pos} style={{ background: '#0a3d0a' }}>
                {pos}
              </option>
            ))}
          </select>
        </div>

        {/* League filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-white/70">League</label>
          <select
            value={leagueFilter}
            onChange={(e) => setLeagueFilter(e.target.value)}
            style={selectStyle}
          >
            {allLeagues.map((l) => (
              <option key={l} value={l} style={{ background: '#0a3d0a' }}>
                {l}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-white/70">Sort by</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={selectStyle}
          >
            <option value="name-asc" style={{ background: '#0a3d0a' }}>Name A–Z</option>
            <option value="name-desc" style={{ background: '#0a3d0a' }}>Name Z–A</option>
            <option value="price-asc" style={{ background: '#0a3d0a' }}>Price: Low to High</option>
            <option value="price-desc" style={{ background: '#0a3d0a' }}>Price: High to Low</option>
          </select>
        </div>

        {/* Clear filters */}
        {(search || position !== 'All' || leagueFilter !== 'All') && (
          <button
            onClick={() => { setSearch(''); setPosition('All'); setLeagueFilter('All'); }}
            className="text-sm font-semibold text-yellow-400 hover:text-yellow-300 transition-colors self-end pb-2"
          >
            ✕ Clear
          </button>
        )}
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="spinner" />
        </div>
      ) : filtered.length === 0 ? (
        // Empty state
        <div className="empty-state">
          <div className="text-5xl mb-4">😔</div>
          <div className="text-lg font-bold text-white mb-2">No players found</div>
          <div className="text-sm">Try changing your search or filters</div>
        </div>
      ) : (
        <>
          <div className="text-sm font-semibold mb-5" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Showing {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </div>
          <div className="players-grid">
            {filtered.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                onClick={() => setSelectedPlayer(player)}
              />
            ))}
          </div>
        </>
      )}

      {/* Player modal */}
      {selectedPlayer && (
        <PlayerModal
          player={selectedPlayer}
          teamName={selectedPlayer.teamName}
          onClose={() => setSelectedPlayer(null)}
        />
      )}
    </div>
  );
}