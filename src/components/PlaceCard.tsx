import { CloudSun, ExternalLink, Heart, Loader2, MapPin } from 'lucide-react';
import { useMemo, useState } from 'react';
import { api, getApiError } from '../api/client';
import { Place, Weather } from '../types';

interface PlaceCardProps {
  place: Place;
  isFavorite: boolean;
  onToggleFavorite: (place: Place) => void;
}

export default function PlaceCard({ place, isFavorite, onToggleFavorite }: PlaceCardProps) {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [error, setError] = useState('');
  const fallbackImage = `https://placehold.co/1200x820/12343b/f7fbfb?text=${encodeURIComponent(place.name)}`;

  const mapsUrl = useMemo(
    () => `https://www.google.com/maps/search/${encodeURIComponent(place.location)}`,
    [place.location],
  );

  const fetchWeather = async () => {
    setLoadingWeather(true);
    setError('');
    try {
      const { data } = await api.get<Weather>('/weather', {
        params: { location: place.location },
      });
      setWeather(data);
    } catch (requestError) {
      setError(getApiError(requestError, 'Weather is unavailable for this location.'));
    } finally {
      setLoadingWeather(false);
    }
  };

  return (
    <article className="place-card">
      <div className="image-wrap">
        <img
          src={place.image}
          alt={place.name}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = fallbackImage;
          }}
        />
        <button
          className={`favorite-button ${isFavorite ? 'saved' : ''}`}
          onClick={() => onToggleFavorite(place)}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="card-body">
        <div className="card-topline">
          <span>{place.region}</span>
          <span>{place.budget}</span>
        </div>
        <h3>{place.name}</h3>
        <p>{place.description}</p>
        <div className="location-line">
          <MapPin size={16} />
          <span>{place.location}</span>
        </div>

        {weather && (
          <div className="weather-box">
            <CloudSun size={20} />
            <div>
              <strong>{weather.temperature}°C</strong>
              <span>{weather.condition}</span>
            </div>
          </div>
        )}

        {error && <p className="inline-error">{error}</p>}

        <div className="card-actions">
          <button className="primary-button compact" onClick={fetchWeather} disabled={loadingWeather}>
            {loadingWeather ? <Loader2 className="spin" size={17} /> : <CloudSun size={17} />}
            Weather
          </button>
          <a className="secondary-button compact" href={mapsUrl} target="_blank" rel="noreferrer">
            <ExternalLink size={17} />
            Google Maps
          </a>
        </div>
      </div>
    </article>
  );
}
