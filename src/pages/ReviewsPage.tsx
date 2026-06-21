import { useState } from 'react';
import { leagues } from '../data/data';
import type { Review } from '../types/types';
import Input from '../components/Input';
import Button from '../components/Button';

// Get all player names for the dropdown
const playerOptions: { id: string; name: string; team: string }[] = [];

leagues.forEach((league) => {
  league.teams.forEach((team) => {
    team.players.forEach((player) => {
      playerOptions.push({
        id: player.id,
        name: player.name,
        team: team.name
      });
    });
  });
});

// Some reviews
const initialReviews: Review[] = [
  {
    id: '1',
    playerName: 'Lionel Messi',
    userName: 'FootballFan99',
    email: 'fan@example.com',
    position: 'Forward',
    comment: 'The Messi shirt arrived super fast and the quality is absolutely amazing. Worth every penny! I wear it to every match.',
    createdAt: '2026-11-15',
  },
  {
    id: '2',
    playerName: 'Erling Haaland',
    userName: 'NorwayFan',
    email: 'norway@example.com',
    position: 'Striker',
    comment: 'Got the Haaland City shirt and honestly it looks even better in person than in the photos. The fabric is really good.',
    createdAt: '2026-12-01',
  },
  {
    id: '3',
    playerName: 'Kylian Mbappé',
    userName: 'ParisBlue',
    email: 'paris@example.com',
    position: 'Forward',
    comment: 'Great shirt, shipped quickly. Only minor complaint is sizing runs slightly small, so maybe go one size up.',
    createdAt: '2026-12-10',
  },
];

// Simple form state
interface FormData {
  playerName: string;
  userName: string;
  email: string;
  position: string;
  comment: string;
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState<FormData>({
    playerName: '',
    userName: '',
    email: '',
    position: '',
    comment: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Check if all fields are filled correctly
  function validate(): boolean {
    if (!form.playerName) {
      alert('Please select a player');
      return false;
    }
    if (!form.userName.trim()) {
      alert('Name is required');
      return false;
    }
    if (form.userName.trim().length < 2) {
      alert('Name must be at least 2 characters');
      return false;
    }
    if (!form.email.trim()) {
      alert('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      alert('Invalid email format');
      return false;
    }
    if (!form.comment.trim()) {
      alert('Please write a review');
      return false;
    }
    if (form.comment.trim().length < 10) {
      alert('Review must be at least 10 characters');
      return false;
    }
    return true;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    // Add the review to the list
    const newReview: Review = {
      id: Date.now().toString(),
      ...form,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setReviews((prev) => [newReview, ...prev]);
    setSubmitted(true);
    setShowForm(false);

    // Reset form
    setForm({ playerName: '', userName: '', email: '', position: '', comment: '' });

    // Hide success message after 4 seconds
    setTimeout(() => setSubmitted(false), 4000);
  }

  const selectStyle = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.15)',
    color: 'white',
    borderRadius: '8px',
    padding: '10px 14px',
    fontSize: '0.875rem',
    fontWeight: 600,
    width: '100%',
    fontFamily: 'Nunito, sans-serif',
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Page header */}
      <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
        <div>
          <h1
            style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '3rem', letterSpacing: '3px', color: '#fff' }}
          >
            Player <span style={{ color: '#f5c518' }}>Reviews</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)' }} className="font-semibold">
            {reviews.length} reviews from our customers
          </p>
        </div>
        <Button variant="gold" onClick={() => setShowForm(!showForm)}>
          {showForm ? '✕ Cancel' : '✍️ Write a Review'}
        </Button>
      </div>

      {/* Success message */}
      {submitted && (
        <div
          className="mb-6 p-4 rounded-xl flex items-center gap-3 font-semibold animate-slide-in"
          style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)', color: '#86efac' }}
        >
          ✅ Your review was submitted! Thank you for sharing your feedback.
        </div>
      )}

      {/* Review form */}
      {showForm && (
        <div
          className="rounded-2xl p-6 mb-10 animate-slide-in"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <h2
            className="mb-6"
            style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '1.6rem', letterSpacing: '1.5px', color: '#f5c518' }}
          >
            Share Your Experience
          </h2>

          <form onSubmit={handleSubmit} noValidate>
            <div className="grid gap-5 md:grid-cols-2">
              {/* Player select */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-sm font-semibold text-white/70">
                  Player <span className="text-yellow-400">*</span>
                </label>
                <select
                  name="playerName"
                  value={form.playerName}
                  onChange={handleChange}
                  style={selectStyle}
                >
                  <option value="" style={{ background: '#0a3d0a' }}>— Select a player —</option>
                  {playerOptions.map((p) => (
                    <option key={p.id} value={p.name} style={{ background: '#0a3d0a' }}>
                      {p.name} ({p.team})
                    </option>
                  ))}
                </select>
              </div>

              {/* Name */}
              <Input
                label="Your Name"
                name="userName"
                value={form.userName}
                onChange={handleChange}
                placeholder="Your display name"
                required
              />

              {/* Email */}
              <Input
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />

              {/* Position / category */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-sm font-semibold text-white/70">Category</label>
                <select
                  name="position"
                  value={form.position}
                  onChange={handleChange}
                  style={selectStyle}
                >
                  <option value="" style={{ background: '#0a3d0a' }}>— Select type —</option>
                  {['Forward', 'Midfielder', 'Defender', 'Goalkeeper', 'Winger', 'Striker'].map((pos) => (
                    <option key={pos} value={pos} style={{ background: '#0a3d0a' }}>
                      {pos}
                    </option>
                  ))}
                </select>
              </div>

              {/* Review text */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-sm font-semibold text-white/70">
                  Your Review <span className="text-yellow-400">*</span>
                </label>
                <textarea
                  name="comment"
                  value={form.comment}
                  onChange={handleChange}
                  placeholder="Tell us about the shirt quality, delivery, etc..."
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-lg text-white text-sm font-medium resize-none transition-colors"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    fontFamily: 'Nunito, sans-serif',
                  }}
                />
              </div>
            </div>

            <div className="mt-6">
              <Button type="submit" variant="gold" size="lg">
                Submit Review →
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews list */}
      <div className="flex flex-col gap-4">
        {reviews.map((review) => (
          <div key={review.id} className="glass-card p-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="font-bold text-white text-sm">
                  {review.userName}
                </div>
                <div className="text-xs font-semibold mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Reviewed: <span style={{ color: '#f5c518' }}>{review.playerName}</span>
                  {review.position && ` · ${review.position}`}
                </div>
              </div>
              <div>
                <span className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.35)' }}>
                  {review.createdAt}
                </span>
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {review.comment}
            </p>
          </div>
        ))}
      </div>

      {/* Empty state if there are no reviews */}
      {reviews.length === 0 && (
        <div className="empty-state">
          <div className="text-5xl mb-4">📝</div>
          <div className="text-white font-bold mb-2">No reviews yet</div>
          <div>Be the first to share your experience!</div>
        </div>
      )}
    </div>
  );
}