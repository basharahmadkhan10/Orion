import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ResearchDashboard } from './components/ResearchDashboard';
import { WatchlistPage } from './components/WatchlistPage';
import { AuthPage } from './components/AuthPage';
import { logoutUser } from './api/authApi';

/* ─────────────────────────────────────────────────
   ORION PRELOADER  — shows only on the very first
   page load. Dissolves away after ~2.6 s.
───────────────────────────────────────────────── */
const OrionPreloader = ({ onDone }) => {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState('enter'); // enter | hold | exit

  useEffect(() => {
    // Count up 0 → 100 in ~1.8 s
    let n = 0;
    const id = setInterval(() => {
      n += 2;
      setCount(n);
      if (n >= 100) { clearInterval(id); setPhase('exit'); }
    }, 36);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (phase === 'exit') {
      const t = setTimeout(onDone, 800); // wait for fade-out CSS
      return () => clearTimeout(t);
    }
  }, [phase, onDone]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'linear-gradient(150deg, #CCFF7F 70%, #11231E 70.2%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      opacity: phase === 'exit' ? 0 : 1,
      transition: 'opacity 0.8s cubic-bezier(0.4,0,0.2,1)',
      overflow: 'hidden',
    }}>

      {/* Radial glow */}
      <div style={{
        position: 'absolute',
        width: '600px', height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(204,255,127,0.12) 0%, transparent 70%)',
        animation: 'glowPulse 2.4s ease-in-out infinite',
      }} />

      {/* Brand wordmark */}
      <div style={{
        position: 'relative', zIndex: 2,
        textAlign: 'center',
        animation: 'fadeSlideUp 0.6s ease both',
      }}>
        <div style={{
          backgroundColor: '#11231E',
          padding: '12px 20px',
          borderRadius: '8px',
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          boxShadow: '0 4px 20px rgba(17, 35, 30, 0.2)',
          marginBottom: '32px',
        }}>
          <span style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            fontSize: '26px',
            lineHeight: 1,
            color: '#CCFF7F',
            letterSpacing: '0px',
          }}>ORION</span>
          <span style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '2.5px',
            color: '#FFFFFF',
            marginTop: '4px',
          }}>AGENCY</span>
        </div>

        <div style={{
          fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px',
          fontWeight: 700, letterSpacing: '4px', color: 'rgba(17, 35, 30, 0.8)',
          textTransform: 'uppercase', marginBottom: '48px',
        }}>
          Institutional Adversarial Research Platform
        </div>

        {/* Progress bar */}
        <div style={{
          width: '320px', height: '3px', backgroundColor: 'rgba(17, 35, 30, 0.15)',
          borderRadius: '9999px', margin: '0 auto 16px', overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${count}%`,
            background: 'linear-gradient(90deg, #11231E, #047857)',
            borderRadius: '9999px',
            transition: 'width 0.08s linear',
            boxShadow: '0 0 12px rgba(17, 35, 30, 0.3)',
          }} />
        </div>

        <div style={{
          fontFamily: 'Space Grotesk, sans-serif', fontSize: '12px',
          fontWeight: 700, color: 'rgba(17, 35, 30, 0.6)', letterSpacing: '2px',
        }}>
          INITIALISING MULTI-AGENT DESK — {count}%
        </div>
      </div>

      {/* Corner decorators */}
      {['topLeft','topRight','bottomLeft','bottomRight'].map((pos) => {
        const isTop = pos.includes('top');
        const borderColor = isTop ? 'rgba(17, 35, 30, 0.3)' : 'rgba(204, 255, 127, 0.4)';
        return (
          <div key={pos} style={{
            position: 'absolute',
            top:    isTop    ? '24px' : 'auto',
            bottom: !isTop ? '24px' : 'auto',
            left:   pos.includes('Left')   ? '24px' : 'auto',
            right:  pos.includes('Right')  ? '24px' : 'auto',
            width: '20px', height: '20px',
            borderTop:    isTop    ? `2px solid ${borderColor}` : 'none',
            borderBottom: !isTop ? `2px solid ${borderColor}` : 'none',
            borderLeft:   pos.includes('Left')   ? `2px solid ${borderColor}` : 'none',
            borderRight:  pos.includes('Right')  ? `2px solid ${borderColor}` : 'none',
          }} />
        );
      })}
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const [selectedTicker, setSelectedTicker] = useState('AAPL');
  const [showPreloader, setShowPreloader] = useState(true);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      setCurrentView('home');
    }
  };

  const handleNavigateToResearch = (ticker) => {
    if (ticker) setSelectedTicker(ticker);
    setCurrentView('research');
  };

  return (
    <div className="app-wrapper">
      {showPreloader && <OrionPreloader onDone={() => setShowPreloader(false)} />}

      <Navbar
        user={user}
        currentView={currentView}
        onNavigate={(page) => setCurrentView(page)}
        onLogout={handleLogout}
      />

      <main style={{ flex: 1, paddingBottom: '64px' }}>
        {currentView === 'home' && (
          <HeroSection onNavigate={(page) => setCurrentView(page)} />
        )}

        {currentView === 'research' && (
          <ResearchDashboard
            user={user}
            initialTicker={selectedTicker}
            onRequireAuth={() => setCurrentView('auth')}
          />
        )}

        {currentView === 'watchlist' && (
          <WatchlistPage
            user={user}
            onNavigateToResearch={handleNavigateToResearch}
          />
        )}

        {currentView === 'auth' && (
          <AuthPage
            onSuccess={(loggedInUser) => {
              setUser(loggedInUser);
              setCurrentView('research');
            }}
          />
        )}
      </main>

      <footer className="footer print-hidden">
        <div className="footer-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ backgroundColor: '#FFFFFF', color: '#11231E', padding: '4px 10px', borderRadius: '6px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '18px' }}>
              ORION
            </div>
            <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: '#CCFF7F', fontWeight: 700 }}>
              Institutional AI Research Desk
            </span>
          </div>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
            © {new Date().getFullYear()} ORION Quantitative Research AI. All Rights Reserved. Clean Architecture & LangGraph Multi-Agent Engine.
          </div>
        </div>
      </footer>
    </div>
  );
}

// App router v1

// Preloader v2
