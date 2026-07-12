import React from 'react';
import { ArrowUpRight, TrendingUp, CheckCircle2, ShieldCheck, Activity } from 'lucide-react';

export const HeroSection = ({ onNavigate }) => {
  return (
    <div className="herb-hero-wrapper">
      {/* TOP LIGHT GREEN SECTION */}
      <section id="how-we-roll" className="herb-hero-top">
        <div className="herb-hero-content">
          <h1 className="herb-title">
            THE ONLY QUANTITATIVE AI{' '}
            <span className="title-pill-highlight">RESEARCH HUB</span>{' '}
            YOU&apos;LL EVER NEED.
          </h1>

          <p className="herb-subtitle">
            Made by Quantitative Analysts who really get institutional markets. Find expert-crafted, results-driven, adversarial debate solutions that elevate your portfolio.
          </p>

          <div className="herb-actions">
            <button
              onClick={() => onNavigate('research')}
              className="btn-herb-white"
            >
              <span>Launch Research Desk</span>
              <ArrowUpRight size={18} />
            </button>

            <button
              onClick={() => onNavigate('watchlist')}
              className="btn-herb-dark"
            >
              <span>Saved Watchlist</span>
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>

        {/* FLOATING MOCKUP STAGE WITH POPUP BADGES */}
        <div className="herb-mockup-stage">
          {/* Top Center Pill Badge */}
          <div className="popup-badge-top">
            <TrendingUp size={16} style={{ color: '#047857' }} />
            <span>+347.23% Alpha Convergence</span>
          </div>

          {/* Left Floating Stat Card */}
          <div className="popup-badge-left">
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '4px' }}>
              CIO Confidence Verdict
            </div>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '28px', fontWeight: 700, color: '#11231E' }}>
              82.4 / 100
            </div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#047857', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
              <TrendingUp size={14} /> High Conviction Invest
            </div>
          </div>

          {/* Right Floating Stat Card */}
          <div className="popup-badge-right">
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '4px' }}>
              Audited Citations Ledger
            </div>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '28px', fontWeight: 700, color: '#11231E' }}>
              14 Citations
            </div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#047857', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
              <CheckCircle2 size={14} /> Zero Hallucinations
            </div>
          </div>

          {/* Center Main Dashboard Mockup Card */}
          <div className="herb-main-mockup">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #E2E8F0', paddingBottom: '16px', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#EF4444' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#F59E0B' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10B981' }}></div>
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '15px', color: '#11231E', marginLeft: '8px' }}>
                  ORION Multi-Agent Research Execution — AAPL
                </span>
              </div>
              <span style={{ backgroundColor: '#CCFF7F', color: '#11231E', fontWeight: 700, fontSize: '12px', padding: '6px 12px', borderRadius: '8px', border: '1px solid #11231E' }}>
                LIVE LANGGRAPH DESK
              </span>
            </div>

            {/* Embedded Workstation & Metrics Visual */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', textAlign: 'left' }}>
              <div style={{ backgroundColor: '#F8FAFC', border: '2px solid #E2E8F0', borderRadius: '16px', padding: '18px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                  Bullish Growth Thesis
                </div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '20px', fontWeight: 700, color: '#14532D', margin: '6px 0' }}>
                  Robust Cash Resilience
                </div>
                <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>
                  High operating margins and recurring services revenue maintain balance sheet fortification.
                </p>
              </div>

              <div style={{ backgroundColor: '#F8FAFC', border: '2px solid #E2E8F0', borderRadius: '16px', padding: '18px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                  Adversarial Bear Risk
                </div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '20px', fontWeight: 700, color: '#7E22CE', margin: '6px 0' }}>
                  Regulatory & Valuation Multiple
                </div>
                <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>
                  Elevated forward P/E warrants continuous monitoring of antitrust headwinds.
                </p>
              </div>

              <div style={{ backgroundColor: '#F8FAFC', border: '2px solid #E2E8F0', borderRadius: '16px', padding: '18px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                  Executive Synthesis
                </div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '20px', fontWeight: 700, color: '#1E293B', margin: '6px 0' }}>
                  DECISION: INVEST
                </div>
                <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>
                  Convergence score verifies downside protection against sector volatility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOWER DARK GREEN SECTION: OUR SERVICES */}
      <section id="services-section" className="herb-features-section">
        <div className="herb-features-header">
          <span style={{ backgroundColor: '#CCFF7F', color: '#11231E', fontFamily: 'Space Grotesk, sans-serif', fontSize: '12px', fontWeight: 700, padding: '6px 14px', borderRadius: '8px', display: 'inline-block', marginBottom: '14px', letterSpacing: '1px' }}>
            OUR SERVICES // MULTI-AGENT ARCHITECTURE
          </span>
          <h2 className="herb-features-title">
            If all your <span className="title-pill-green">quantitative research needs</span> and wants were a place – that&apos;s us.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '18px', maxWidth: '720px', lineHeight: 1.6 }}>
            We gathered institutional financial models, fine-tuned adversarial debate agents, and developed the ultimate quantitative blend that leaves investors asking, &quot;Do they read markets?&quot;
          </p>
        </div>

        <div className="herb-grid-container">
          {/* Card 1: White Background */}
          <div className="feature-grid-card card-bg-white">
            <div>
              <span className="feature-card-label">Multi-Agent Debate</span>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>
                Autonomous Bull vs. Bear Cross-Examination
              </h3>
              <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.6 }}>
                Independent AI agents construct adversarial investment theses and counter-arguments before presenting to an institutional CIO Judge.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '32px' }}>
              <button
                onClick={() => onNavigate('research')}
                style={{ background: 'none', border: 'none', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '15px', color: '#11231E', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                Launch Desk <ArrowUpRight size={18} />
              </button>
              <Activity size={36} style={{ color: '#11231E' }} />
            </div>
          </div>

          {/* Card 2: Light Slate/Lavender Background */}
          <div className="feature-grid-card card-bg-slate">
            <div>
              <span className="feature-card-label">CIO Judge Verdict</span>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>
                Calibrated Confidence & Kill Criteria
              </h3>
              <p style={{ fontSize: '15px', color: '#334155', lineHeight: 1.6 }}>
                Receive an actionable INVEST / PASS / WATCH verdict complete with mandatory downside kill criteria triggers.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '32px' }}>
              <button
                onClick={() => onNavigate('research')}
                style={{ background: 'none', border: 'none', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '15px', color: '#11231E', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                Inspect Verdicts <ArrowUpRight size={18} />
              </button>
              <ShieldCheck size={36} style={{ color: '#11231E' }} />
            </div>
          </div>

          {/* Card 3: Sage Green Background */}
          <div className="feature-grid-card card-bg-sage">
            <div>
              <span className="feature-card-label">Numbered Citations</span>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>
                Immutable Evidence Ledger [E1]-[E12]
              </h3>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 }}>
                Every financial metric and news catalyst is audited and numbered in an immutable ledger to eliminate hallucination.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '32px' }}>
              <button
                onClick={() => onNavigate('research')}
                style={{ background: 'none', border: 'none', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '15px', color: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                Verify Ledger <ArrowUpRight size={18} />
              </button>
              <CheckCircle2 size={36} style={{ color: '#FFFFFF' }} />
            </div>
          </div>

          {/* Card 4: Dark Charcoal Forest Background */}
          <div className="feature-grid-card card-bg-dark">
            <div>
              <span className="feature-card-label">Saved Dossiers</span>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '28px', fontWeight: 700, marginBottom: '12px' }}>
                Institutional Portfolio Watchlist
              </h3>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
                Save historical research executions in your portfolio repository and track fundamental momentum across covered equities.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '32px' }}>
              <button
                onClick={() => onNavigate('watchlist')}
                style={{ background: 'none', border: 'none', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '15px', color: '#CCFF7F', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                Open Watchlist <ArrowUpRight size={18} />
              </button>
              <TrendingUp size={36} style={{ color: '#CCFF7F' }} />
            </div>
          </div>
        </div>
      </section>

      {/* BRAND NEW HOMEPAGE SECTION: OUR COMMUNITY */}
      <section id="community-section" style={{ backgroundColor: '#F8FAFC', padding: '100px 48px', borderTop: '4px solid #11231E' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ backgroundColor: '#11231E', color: '#CCFF7F', fontFamily: 'Space Grotesk, sans-serif', fontSize: '12px', fontWeight: 700, padding: '6px 14px', borderRadius: '8px', display: 'inline-block', marginBottom: '16px', letterSpacing: '1px' }}>
              OUR COMMUNITY // ANALYST ECOSYSTEM
            </span>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '42px', fontWeight: 700, color: '#11231E', lineHeight: 1.2, marginBottom: '16px' }}>
              Built for Quantitative Desks & Portfolio Managers
            </h2>
            <p style={{ color: '#4B5563', fontSize: '18px', maxWidth: '680px', margin: '0 auto', lineHeight: 1.6 }}>
              Connect with institutional researchers, share audited evidence ledgers, and collaborate on multi-agent adversarial debate models.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '28px' }}>
            <div style={{ backgroundColor: '#FFFFFF', border: '3px solid #11231E', borderRadius: '24px', padding: '36px', boxShadow: '0 12px 30px rgba(17,35,30,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#047857', backgroundColor: '#D1FAE5', padding: '6px 12px', borderRadius: '8px' }}>
                  GLOBAL DESK NETWORK
                </span>
                <ShieldCheck size={28} style={{ color: '#11231E' }} />
              </div>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '24px', fontWeight: 700, color: '#11231E', marginBottom: '12px' }}>
                Verified Institutional Network
              </h3>
              <p style={{ color: '#4B5563', fontSize: '15px', lineHeight: 1.7, marginBottom: '24px' }}>
                Over 1,200+ quantitative researchers cross-validating financial feeds, SEC disclosures, and real-time earnings transcripts across major exchanges.
              </p>
              <div style={{ borderTop: '2px solid #F1F5F9', paddingTop: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px', fontWeight: 700, color: '#11231E' }}>
                <span>Active Research Nodes</span>
                <span style={{ color: '#047857' }}>100% Audited</span>
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', border: '3px solid #11231E', borderRadius: '24px', padding: '36px', boxShadow: '0 12px 30px rgba(17,35,30,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#7E22CE', backgroundColor: '#F3E8FF', padding: '6px 12px', borderRadius: '8px' }}>
                  PEER REPOSITORY
                </span>
                <Activity size={28} style={{ color: '#11231E' }} />
              </div>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '24px', fontWeight: 700, color: '#11231E', marginBottom: '12px' }}>
                Shared Adversarial Benchmarks
              </h3>
              <p style={{ color: '#4B5563', fontSize: '15px', lineHeight: 1.7, marginBottom: '24px' }}>
                Access community-validated kill criteria and sector-specific financial metrics tested against empirical market shifts and volatility cycles.
              </p>
              <div style={{ borderTop: '2px solid #F1F5F9', paddingTop: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px', fontWeight: 700, color: '#11231E' }}>
                <span>Verified Dossiers</span>
                <span style={{ color: '#7E22CE' }}>Live Repository</span>
              </div>
            </div>

            <div style={{ backgroundColor: '#11231E', border: '3px solid #11231E', borderRadius: '24px', padding: '36px', color: '#FFFFFF', boxShadow: '0 12px 30px rgba(17,35,30,0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#11231E', backgroundColor: '#CCFF7F', padding: '6px 12px', borderRadius: '8px' }}>
                  COMMUNITY ALPHA
                </span>
                <TrendingUp size={28} style={{ color: '#CCFF7F' }} />
              </div>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '24px', fontWeight: 700, color: '#CCFF7F', marginBottom: '12px' }}>
                Real-Time Convergence Insights
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', lineHeight: 1.7, marginBottom: '24px' }}>
                Participate in weekly consensus debates where adversarial agents evaluate institutional asset allocation and highlight market mispricings.
              </p>
              <div style={{ borderTop: '2px solid rgba(255,255,255,0.15)', paddingTop: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px', fontWeight: 700, color: '#CCFF7F' }}>
                <span>Community Conviction</span>
                <span>Top Decile Alpha</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// HeroSection v1

// Services section v2

// Community section v3
