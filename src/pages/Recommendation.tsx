import { Loader2, Search, SlidersHorizontal } from 'lucide-react';
import { FormEvent, useMemo, useState } from 'react';
import { api, getApiError } from '../api/client';
import PlaceCard from '../components/PlaceCard';
import { Budget, Place, Region } from '../types';

const regions: Region[] = ['North', 'South', 'East', 'West'];
const budgets: Budget[] = ['Low', 'Medium', 'High'];

const readFavorites = (): Place[] => {
  const stored = localStorage.getItem('smartTravelFavorites');
  return stored ? (JSON.parse(stored) as Place[]) : [];
};

export default function Recommendation() {
  const [region, setRegion] = useState<Region | ''>('');
  const [budget, setBudget] = useState<Budget | ''>('');
  const [places, setPlaces] = useState<Place[]>([]);
  const [favorites, setFavorites] = useState<Place[]>(readFavorites);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const favoriteIds = useMemo(() => new Set(favorites.map((place) => place._id)), [favorites]);

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setPlaces([]);

    if (!region || !budget) {
      setError('Select both region and budget to view recommendations.');
      setSearched(false);
      return;
    }

    setLoading(true);
    setSearched(true);
    try {
      const { data } = await api.get<Place[]>('/places', { params: { region, budget } });
      setPlaces(data);
    } catch (requestError) {
      setError(getApiError(requestError, 'Unable to fetch recommendations.'));
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (place: Place) => {
    const exists = favoriteIds.has(place._id);
    const nextFavorites = exists
      ? favorites.filter((favorite) => favorite._id !== place._id)
      : [...favorites, place];

    setFavorites(nextFavorites);
    localStorage.setItem('smartTravelFavorites', JSON.stringify(nextFavorites));
  };

  return (
    <section className="page-section">
      <div className="section-heading">
        <div className="eyebrow">
          <SlidersHorizontal size={16} />
          Recommendation engine
        </div>
        <h1>Find places by region and budget</h1>
        <p>Choose a travel direction and spending level, then search MongoDB for matching destinations.</p>
      </div>

      <form className="filter-panel" onSubmit={handleSearch}>
        <label>
          Region
          <select value={region} onChange={(event) => setRegion(event.target.value as Region | '')} required>
            <option value="">Select region</option>
            {regions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label>
          Budget
          <select value={budget} onChange={(event) => setBudget(event.target.value as Budget | '')} required>
            <option value="">Select budget</option>
            {budgets.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <button className="primary-button" type="submit" disabled={loading}>
          {loading ? <Loader2 className="spin" size={18} /> : <Search size={18} />}
          Search
        </button>
      </form>

      {error && <p className="form-error wide">{error}</p>}

      {loading && <div className="status-panel">Loading recommendations...</div>}

      {!loading && searched && places.length === 0 && !error && (
        <div className="status-panel">No places found for this combination.</div>
      )}

      {!searched && !error && (
        <div className="status-panel muted">Recommendation cards will appear after you select both filters and search.</div>
      )}

      <div className="card-grid">
        {places.map((place) => (
          <PlaceCard
            key={place._id}
            place={place}
            isFavorite={favoriteIds.has(place._id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </section>
  );
}
