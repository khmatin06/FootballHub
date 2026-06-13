import { Link } from 'react-router-dom';
import { leagues } from '../data/data';

export default function LeaguesPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-14">
      {/* Page header */}
      <div className="mb-12 text-center">
        <h1
          className="text-white mb-3"
          style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '3.3rem', letterSpacing: '3px' }}
        >
          All <span style={{ color: '#f5c518' }}>Leagues</span>
        </h1>
        <p className="font-semibold" style={{ color: 'rgba(255,255,255,0.5)' }}>
          {leagues.length} competitions · {leagues.reduce((s, l) => s + l.teams.length, 0)} teams
        </p>
      </div>

      {/* All Leagues */}
      <div className="grid gap-6 md:grid-cols-2">
        {leagues.map((league) => (
          <Link
            key={league.id}
            to={`/leagues/${league.id}`}
            className="glass-card p-6 flex items-center gap-5"
            style={{ textDecoration: 'none' }}
          >
            {/* League logo */}
            <div className="flex-shrink-0" style={{ width: 80 }}>
              <img
                src={league.logo}
                alt={league.name}
                className="w-full h-16 object-contain"
                style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))' }}
              />
            </div>

            {/* Information */}
            <div className="flex-1">
              <div
                className="text-white font-bold"
                style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '1.4rem', letterSpacing: '1px' }}
              >
                {league.name}
              </div>
              <div className="text-sm font-semibold mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                📍 {league.country}
              </div>
              {/* Show team count */}
              <div className="flex gap-2 mt-2 flex-wrap">
                {league.teams.slice(0, 3).map((team) => (
                  <span
                    key={team.id}
                    className="text-xs font-semibold px-2 py-1 rounded"
                    style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.65)' }}
                  >
                    {team.name}
                  </span>
                ))}
                {league.teams.length > 3 && (
                  <span
                    className="text-xs font-semibold px-2 py-1 rounded"
                    style={{ background: 'rgba(245,197,24,0.1)', color: '#f5c518' }}
                  >
                    +{league.teams.length - 3} more
                  </span>
                )}
              </div>
            </div>

            <div className="text-white/30 text-2xl">→</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
