import { ArrowRight, CloudSun, Database, MapPinned, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="hero-section">
      <div className="hero-media" aria-hidden="true" />
      <div className="hero-content">
        <div className="eyebrow">
          <MapPinned size={16} />
          India travel intelligence
        </div>
        <h1>Smart Travel Recommendation System</h1>
        <p>
          Discover curated destinations by region and budget, check live weather instantly, and open each place directly in Google Maps.
        </p>
        <div className="hero-actions">
          <Link className="primary-button" to="/recommendation">
            Start exploring
            <ArrowRight size={18} />
          </Link>
          <Link className="secondary-button" to="/register">
            Create account
          </Link>
        </div>
      </div>

      <div className="feature-strip">
        <div>
          <Database size={20} />
          <span>MongoDB recommendations</span>
        </div>
        <div>
          <CloudSun size={20} />
          <span>Real-time weather</span>
        </div>
        <div>
          <ShieldCheck size={20} />
          <span>Secure auth flow</span>
        </div>
      </div>
    </section>
  );
}
