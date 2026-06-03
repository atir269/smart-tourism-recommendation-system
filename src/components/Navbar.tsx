import { Compass, Heart, Home, LogIn, LogOut, Menu, Sparkles, UserPlus, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/recommendation', label: 'Recommendation', icon: Compass },
  { to: '/favorites', label: 'Favorites', icon: Heart },
  { to: '/login', label: 'Login', icon: LogIn },
  { to: '/register', label: 'Register', icon: UserPlus },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <header className="navbar-wrap">
      <nav className="navbar">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-icon">
            <Sparkles size={20} />
          </span>
          <span>Smart Travel</span>
        </NavLink>

        <button className="icon-button mobile-toggle" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className={`nav-links ${open ? 'is-open' : ''}`}>
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
          {user && (
            <button className="nav-link nav-button" onClick={logout}>
              <LogOut size={17} />
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
