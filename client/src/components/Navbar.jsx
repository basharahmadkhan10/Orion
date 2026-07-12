import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const Navbar = ({ user, currentView, onNavigate, onLogout }) => {
  return (
    <header className="herb-navbar print-hidden">
      {/* Brand Badge Box */}
      <button
        onClick={() => onNavigate('home')}
        className="herb-brand-box"
      >
        <span className="herb-brand-title">ORION</span>
        <span className="herb-brand-sub">AGENCY</span>
      </button>

      {/* Center Navigation Links */}
      <nav className="herb-nav-links">
        <button
          onClick={() => {
            if (currentView !== 'home') onNavigate('home');
            setTimeout(() => {
              const el = document.getElementById('how-we-roll');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 50);
          }}
          className={`herb-nav-link ${currentView === 'home' ? 'active' : ''}`}
        >
          How we Roll
        </button>

        <button
          onClick={() => {
            if (currentView !== 'home') onNavigate('home');
            setTimeout(() => {
              const el = document.getElementById('services-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 50);
          }}
          className="herb-nav-link"
        >
          Our Services
        </button>

        <button
          onClick={() => {
            if (currentView !== 'home') onNavigate('home');
            setTimeout(() => {
              const el = document.getElementById('community-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 50);
          }}
          className="herb-nav-link"
        >
          Our Community
        </button>
      </nav>

      {/* Top Right Action Button */}
      <div>
        {user ? (
          <button
            onClick={onLogout}
            className="herb-action-pill"
          >
            <span>Logout ({user.name.split(' ')[0]})</span>
            <ArrowUpRight size={16} />
          </button>
        ) : (
          <button
            onClick={() => onNavigate('auth')}
            className="herb-action-pill"
          >
            <span>Get Started</span>
            <ArrowUpRight size={16} />
          </button>
        )}
      </div>
    </header>
  );
};
