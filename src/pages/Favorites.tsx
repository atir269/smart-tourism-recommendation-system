import { Heart } from 'lucide-react';
import { useMemo, useState } from 'react';
import PlaceCard from '../components/PlaceCard';
import { Place } from '../types';

const readFavorites = (): Place[] => {
  const stored = localStorage.getItem('smartTravelFavorites');
  return stored ? (JSON.parse(stored) as Place[]) : [];
};

export default function Favorites() {
  const [favorites, setFavorites] = useState<Place[]>(readFavorites);
  const favoriteIds = useMemo(() => new Set(favorites.map((place) => place._id)), [favorites]);

  const toggleFavorite = (place: Place) => {
    const nextFavorites = favorites.filter((favorite) => favorite._id !== place._id);
    setFavorites(nextFavorites);
    localStorage.setItem('smartTravelFavorites', JSON.stringify(nextFavorites));
  };

  return (
    <section className="page-section">
      <div className="section-heading">
        <div className="eyebrow">
          <Heart size={16} />
          Saved places
        </div>
        <h1>Your favorites</h1>
        <p>Keep the destinations you want to compare later in one place.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="status-panel muted">No favorites saved yet.</div>
      ) : (
        <div className="card-grid">
          {favorites.map((place) => (
            <PlaceCard
              key={place._id}
              place={place}
              isFavorite={favoriteIds.has(place._id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </section>
  );
}
