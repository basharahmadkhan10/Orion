import React, { useState } from 'react';
import { loginUser, registerUser } from '../api/authApi';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';

export const AuthPage = ({ onSuccess, onNavigate }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const result = await loginUser(email, password);
        onSuccess(result.user);
      } else {
        await registerUser(name, email, password);
        const result = await loginUser(email, password);
        onSuccess(result.user);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Authentication failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: '140px 24px 80px',
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(108deg, #11231E 0%, #11231E 52%, #CCFF7F 52.1%, #CCFF7F 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Angled Watermarks */}
      <div
        style={{
          position: 'absolute',
          top: '120px',
          left: '40px',
          color: 'rgba(204, 255, 127, 0.15)',
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '3px',
          pointerEvents: 'none',
        }}
      >
        ORION // INSTITUTIONAL ADVERSARIAL PLATFORM
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          right: '40px',
          color: 'rgba(17, 35, 30, 0.25)',
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '3px',
          pointerEvents: 'none',
        }}
      >
        MULTI-AGENT AUDIT DESK // VERIFIED
      </div>

      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '4px solid #11231E',
          borderRadius: '32px',
          padding: '48px',
          maxWidth: '520px',
          width: '100%',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.45)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <span style={{ backgroundColor: '#11231E', color: '#CCFF7F', fontFamily: 'Space Grotesk, sans-serif', fontSize: '12px', fontWeight: 700, padding: '6px 14px', borderRadius: '8px', letterSpacing: '1px' }}>
            ORION AGENCY // AUTH
          </span>
          <ShieldCheck size={28} style={{ color: '#11231E' }} />
        </div>

        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '32px', color: '#11231E', marginBottom: '8px', letterSpacing: '-0.5px' }}>
          {isLogin ? 'Sign In to ORION' : 'Create ORION Account'}
        </h2>

        <p style={{ color: '#4B5563', fontSize: '15px', marginBottom: '32px', lineHeight: 1.5 }}>
          {isLogin
            ? 'Access institutional multi-agent research runs, CIO verdicts, and audited evidence ledgers.'
            : 'Register to execute adversarial debate analysis on any equity.'}
        </p>

        {error && (
          <div style={{ backgroundColor: '#FEF2F2', border: '2px solid #EF4444', color: '#991B1B', padding: '16px', borderRadius: '16px', marginBottom: '24px', fontSize: '14px', fontWeight: 600 }}>
            Error: {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {!isLogin && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '13px', color: '#11231E', textTransform: 'uppercase' }}>
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Mercer"
                style={{ padding: '14px 18px', borderRadius: '14px', border: '2px solid #E2E8F0', fontSize: '15px', outline: 'none', color: '#11231E', fontWeight: 500 }}
              />
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '13px', color: '#11231E', textTransform: 'uppercase' }}>
              Institutional Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="analyst@fund.com"
              style={{ padding: '14px 18px', borderRadius: '14px', border: '2px solid #E2E8F0', fontSize: '15px', outline: 'none', color: '#11231E', fontWeight: 500 }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '13px', color: '#11231E', textTransform: 'uppercase' }}>
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ padding: '14px 18px', borderRadius: '14px', border: '2px solid #E2E8F0', fontSize: '15px', outline: 'none', color: '#11231E', fontWeight: 500 }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-pill-dark"
            style={{ width: '100%', justifyContent: 'center', marginTop: '12px', padding: '16px' }}
          >
            <span>{loading ? 'Authenticating...' : isLogin ? 'Sign In to ORION' : 'Create Account'}</span>
            <ArrowUpRight size={18} />
          </button>
        </form>

        <div style={{ marginTop: '28px', textAlign: 'center', fontSize: '14px', color: '#4B5563', borderTop: '2px solid #F1F5F9', paddingTop: '24px' }}>
          <span>
            {isLogin ? "Don't have an account?" : 'Already registered?'}
          </span>{' '}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            style={{ background: 'transparent', border: 'none', fontWeight: 700, textDecoration: 'underline', color: '#11231E', cursor: 'pointer', marginLeft: '6px', fontSize: '14px' }}
          >
            {isLogin ? 'Create Account' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
};
