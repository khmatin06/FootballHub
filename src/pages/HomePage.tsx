import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { leagues } from '../data/data';
import Button from '../components/Button';

export default function HomePage() {
  // Loading simulation so we can show a loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="spinner mx-auto mb-4" />
          <p className="text-white/50 font-semibold">Loading FootballHub...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* HERO SECTION */}
      <section
        className="relative overflow-hidden pitch-lines"
        style={{
          minHeight: '88vh',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(160deg, #082e08 0%, #0a3d0a 40%, #0d5c0d 100%)',
        }}
      >
        {/* Decorative pitch lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle 300px at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%),
              repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(255,255,255,0.025) 80px, rgba(255,255,255,0.025) 82px)
            `,
          }}
        />

        {/* Ball 1 - top right one */}
        <div
          className="absolute float-ball-1 pointer-events-none"
          style={{ top: '8%', right: '6%', opacity: 0.5 }}
        >
          <img
            src="/footballBalls/football-ball-1.jpg"
            alt="ball"
            style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover' }}
          />
        </div>

        {/* Ball 2 - bottom left one */}
        <div
          className="absolute float-ball-2 pointer-events-none"
          style={{ bottom: '10%', left: '5%', opacity: 0.35 }}
        >
          <img
            src="/footballBalls/football-ball-2.jpg"
            alt="ball"
            style={{ width: 90, height: 90, borderRadius: '50%', objectFit: 'cover' }}
          />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
          <div
            className="inline-block mb-4 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest"
            style={{ background: 'rgba(245,197,24,0.15)', color: '#f5c518', border: '1px solid rgba(245,197,24,0.3)' }}
          >
            ⚽ Official Jersey Collection
          </div>

          <h1
            className="text-white mb-6"
            style={{
              fontFamily: 'Bebas Neue, cursive',
              fontSize: 'clamp(3.5rem, 9vw, 7rem)',
              letterSpacing: '4px',
              lineHeight: 1,
              textShadow: '0 4px 20px rgba(0,0,0,0.4)',
            }}
          >
            The World's Best
            <br />
            <span style={{ color: '#f5c518' }}>Football Shirts</span>
          </h1>

          <p
            className="mx-auto mb-10 font-semibold"
            style={{
              color: 'rgba(255,255,255,0.65)',
              fontSize: '1.15rem',
              maxWidth: '520px',
              lineHeight: 1.6,
            }}
          >
            Shop authentic shirts from 8 leagues, 40 teams, and 120 of the biggest
            stars in the game. Find your favourite player today.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/shop">
              <Button variant="gold" size="lg">👕 Shop Now</Button>
            </Link>
            <Link to="/leagues">
              <Button variant="secondary" size="lg">🏆 Browse Leagues</Button>
            </Link>
          </div>

          {/* Quick stats */}
          <div className="flex gap-8 justify-center mt-14 flex-wrap">
            {[
              { num: '8', label: 'Leagues' },
              { num: '40', label: 'Teams' },
              { num: '120', label: 'Players' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '2.5rem', color: '#f5c518', letterSpacing: '2px' }}
                >
                  {stat.num}
                </div>
                <div className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leagues */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2
            className="text-white mb-3"
            style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '2.8rem', letterSpacing: '3px' }}
          >
            Browse by <span style={{ color: '#f5c518' }}>League</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)' }} className="font-semibold">
            Pick your favourite competition and start shopping
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {leagues.map((league) => (
            <Link
              key={league.id}
              to={`/leagues/${league.id}`}
              className="glass-card p-5 flex flex-col items-center gap-3 text-center group"
              style={{ textDecoration: 'none' }}
            >
              <img
                src={league.logo}
                alt={league.name}
                className="h-16 object-contain"
                style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))' }}
              />
              <div>
                <div
                  className="font-bold text-white group-hover:text-yellow-400 transition-colors"
                  style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '1.1rem', letterSpacing: '1px' }}
                >
                  {league.name}
                </div>
                <div className="text-xs font-semibold mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {league.country} • {league.teams.length} teams
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Football balls */}
      <section
        className="py-20 px-6"
        style={{ background: 'rgba(0,0,0,0.2)' }}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Two balls side by side */}
          <div className="flex gap-6 flex-shrink-0">
            <div className="float-ball-1">
              <img
                src="/footballBalls/football-ball-1.jpg"
                alt="football"
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
                  border: '3px solid rgba(245,197,24,0.3)',
                }}
              />
            </div>
            <div className="float-ball-2 self-end">
              <img
                src="/footballBalls/football-ball-2.jpg"
                alt="football"
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
                  border: '3px solid rgba(34,197,94,0.3)',
                }}
              />
            </div>
          </div>

          <div>
            <div
              className="text-white mb-4"
              style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '2.5rem', letterSpacing: '2px' }}
            >
              Why Shop with <span style={{ color: '#f5c518' }}>Us?</span>
            </div>
            <div className="grid gap-3">
              {[
                { icon: '✅', text: 'Authentic official shirts from every major league' },
                { icon: '🚚', text: 'Fast worldwide delivery to your door' },
                { icon: '⭐', text: 'Top-rated by thousands of football fans' },
                { icon: '💳', text: 'Secure checkout and easy returns' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  <span className="text-base">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link to="/shop">
                <Button variant="primary" size="md">Start Shopping</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
