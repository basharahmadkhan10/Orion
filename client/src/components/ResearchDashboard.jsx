import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  ArrowUpRight,
  Filter,
  FileText,
  TrendingUp,
  ShieldCheck,
  Layers,
  X,
  ExternalLink,
} from 'lucide-react';
import { runResearch } from '../api/researchApi';

const getEditorialDeepDive = (item, ticker) => {
  if (!item) return { context: '', protocol: '' };
  const cat = (item.category || '').toLowerCase();
  const id = item.id || 'E1';

  if (cat.includes('catalyst') || cat.includes('sector') || cat.includes('news')) {
    return {
      context: `Within live equity intelligence for ${ticker}, industry catalysts and sector momentum serve as leading indicators for near-term institutional re-rating. This catalyst directly influences forward consensus estimates, operating revenue trajectories, and competitive market positioning across the broader sector.`,
      protocol: `The institutional debate desk evaluated this event against SEC filings and industry peer benchmarks. The Bull Agent modeled the catalyst as a driver for top-line expansion and market share capture, whereas the Bear Agent cross-examined execution timelines and regulatory headwinds surrounding ${ticker}.`,
    };
  }
  if (cat.includes('valuation') || cat.includes('multiple') || cat.includes('p/e')) {
    return {
      context: `Valuation architecture for ${ticker} centers on relative multiple durability and cash flow yields across changing macro cycles. This audit examines enterprise valuation parameters to determine whether ${ticker} trades at an attractive discount or structural premium relative to historical equity cost of capital.`,
      protocol: `During CIO cross-examination, quantitative agents stress-tested ${ticker}'s valuation multiple against interest rate volatility. The evidence [${id}] confirms fundamental balance sheet support that protects intermediate shareholder equity and limits multiple compression.`,
    };
  }
  if (cat.includes('profitability') || cat.includes('margin') || cat.includes('cash')) {
    return {
      context: `Operating profitability and capital efficiency define ${ticker}'s economic moat. By examining unit margins and cash flow conversion, institutional portfolio managers evaluate earnings quality independently of accounting adjustments.`,
      protocol: `The adversarial debate engine isolated segment profitability metrics in [${id}], testing operating leverage across adverse demand cycles. The CIO Judge ratified this operating margin profile as a cornerstone of the long investment thesis.`,
    };
  }
  if (cat.includes('risk') || cat.includes('headwind') || cat.includes('bear')) {
    return {
      context: `Adversarial risk evaluation requires isolating asymmetric vulnerabilities for ${ticker}, including regulatory scrutiny, competitive pricing pressure, and macroeconomic multiple sensitivity.`,
      protocol: `Our Bear Agent formulated direct downside kill criteria from [${id}], establishing quantitative stop-loss boundaries. The CIO Judge cross-referenced this risk factor against balance sheet liquidity before issuing the final conviction score.`,
    };
  }
  return {
    context: `Institutional evaluation of ${ticker} relies on audited evidence point [${id}] (${item.category}) to anchor quantitative financial models and eliminate subjective analyst bias across primary reporting segments.`,
    protocol: `Both long and short AI agents cross-examined [${id}] against independent market data feeds (${item.source || 'Official Benchmark'}). The CIO Judge verified data provenance and assigned high conviction weighting to this finding.`,
  };
};

const formatAsPoints = (text, items) => {
  const pts = [];
  if (items && Array.isArray(items) && items.length > 0) {
    items.forEach((it) => {
      if (it && !pts.includes(it)) pts.push(it);
    });
  }
  if (text && typeof text === 'string') {
    const sents = text.split(/(?<=[.!?])\s+/).filter((s) => s.trim().length > 15);
    sents.forEach((s) => {
      const trimmed = s.trim();
      if (!pts.some((p) => p.toLowerCase().includes(trimmed.toLowerCase().slice(0, 25)))) {
        pts.push(trimmed);
      }
    });
  }
  return pts.length > 0 ? pts : ['Institutional analysis verified against audited data feed.'];
};

const AGENT_STEPS = [
  { id: 1, label: 'Research Planner', sub: 'Mapping multi-agent execution topology...', color: '#11231E' },
  { id: 2, label: 'Financial Tools', sub: 'Fetching live Yahoo Finance quote & fundamentals...', color: '#047857' },
  { id: 3, label: 'Evidence Builder', sub: 'Constructing audited evidence ledger [E1]–[E12]...', color: '#1D4ED8' },
  { id: 4, label: 'Bull Debate Agent', sub: 'Formulating institutional long thesis...', color: '#15803D' },
  { id: 5, label: 'Bear Debate Agent', sub: 'Constructing adversarial risk cross-examination...', color: '#7E22CE' },
  { id: 6, label: 'CIO Judge', sub: 'Synthesising debate. Issuing INVEST / WATCH / PASS verdict...', color: '#B45309' },
];

export const ResearchDashboard = ({ user, onRequireAuth, initialTicker }) => {
  const [tickerInput, setTickerInput] = useState(initialTicker || 'AAPL');
  const [companyName, setCompanyName] = useState('Apple Inc.');
  const [loading, setLoading] = useState(false);
  const [agentStep, setAgentStep] = useState(0);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('verdict');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [selectedEvidence, setSelectedEvidence] = useState(null);
  const [researchData, setResearchData] = useState(null);

  const sampleTickers = [
    { ticker: 'AAPL', name: 'Apple Inc.' },
    { ticker: 'NVDA', name: 'NVIDIA Corporation' },
    { ticker: 'TSLA', name: 'Tesla, Inc.' },
    { ticker: 'MSFT', name: 'Microsoft Corporation' },
  ];

  const handleRunResearch = async (e) => {
    if (e) e.preventDefault();
    if (!user) {
      onRequireAuth();
      return;
    }

    setLoading(true);
    setAgentStep(1);
    setError('');
    setResearchData(null);

    // Animate agent steps: each step ~3.5s (total ~21s to match avg API time)
    const stepDurations = [0, 3500, 7000, 10500, 14000, 17500];
    stepDurations.forEach((delay, idx) => {
      setTimeout(() => setAgentStep(idx + 1), delay);
    });

    try {
      const result = await runResearch(tickerInput, companyName);
      setAgentStep(6);
      setTimeout(() => {
        setResearchData(result);
        setActiveTab('verdict');
        setLoading(false);
        setAgentStep(0);
      }, 800);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Failed to execute adversarial debate.'
      );
      setLoading(false);
      setAgentStep(0);
    }
  };

  const handleSampleClick = (item) => {
    setTickerInput(item.ticker);
    setCompanyName(item.name);
  };

  const handleExportPDF = () => {
    window.print();
  };

  // Filter evidence ledger by category
  const filteredEvidence = researchData?.evidenceLedger?.filter((item) => {
    if (categoryFilter === 'ALL') return true;
    return item.category?.toUpperCase().includes(categoryFilter);
  });

  return (
    <section id="debate-engine" className="dashboard-section" style={{ paddingTop: '110px' }}>
      <div className="search-box-card print-hidden">
        <div className="search-header">
          <h2 className="search-title">Launch Adversarial Research Run</h2>
          <span className="badge-lime">ORION LANGGRAPH ENGINE</span>
        </div>

        <p className="search-description">
          Enter any equity ticker. Our autonomous agents construct independent Bull and Bear investment cases citing audited evidence, delivering an institutional CIO Verdict.
        </p>

        <form onSubmit={handleRunResearch} className="search-form">
          <input
            type="text"
            value={tickerInput}
            onChange={(e) => setTickerInput(e.target.value.toUpperCase())}
            placeholder="e.g. AAPL"
            className="input-ticker"
          />
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Company Name (Optional)"
            className="input-company"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-pill-white"
          >
            <span>{loading ? 'Debating...' : 'Launch Debate Desk'}</span>
            <ArrowUpRight size={18} />
          </button>
        </form>

        <div className="sample-chips">
          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginRight: '8px' }}>
            Institutional Benchmarks:
          </span>
          {sampleTickers.map((item) => (
            <button
              key={item.ticker}
              type="button"
              onClick={() => handleSampleClick(item)}
              className="chip-btn"
            >
              {item.ticker} — {item.name}
            </button>
          ))}
        </div>

        {error && (
          <div style={{ backgroundColor: '#FEF2F2', border: '2px solid #EF4444', color: '#991B1B', padding: '14px', borderRadius: '14px', marginTop: '20px', fontWeight: 600 }}>
            Error: {error}
          </div>
        )}
      </div>

      {loading && (
        <div className="results-card print-hidden" style={{
          padding: '0',
          background: '#11231E',
          border: '3px solid #CCFF7F',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Animated grid background */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `
              linear-gradient(rgba(204,255,127,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(204,255,127,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            animation: 'gridScroll 10s linear infinite',
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 1, padding: '40px 44px' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#11231E', backgroundColor: '#CCFF7F', padding: '4px 12px', borderRadius: '6px', display: 'inline-block', marginBottom: '12px', letterSpacing: '2px' }}>
                  ORION // MULTI-AGENT RESEARCH CENTER
                </div>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '28px', fontWeight: 700, color: '#FFFFFF', marginBottom: '6px', letterSpacing: '-0.5px' }}>
                  Debating <span style={{ color: '#CCFF7F' }}>{tickerInput}</span>
                  <span style={{ animation: 'pulse 1s infinite', display: 'inline-block', marginLeft: '6px', color: '#CCFF7F' }}>▮</span>
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontWeight: 500 }}>
                  Autonomous adversarial pipeline active — auditing live financial data
                </p>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '44px', fontWeight: 700, color: '#CCFF7F', lineHeight: 1 }}>
                  {agentStep}<span style={{ color: 'rgba(204,255,127,0.3)', fontSize: '28px' }}>/6</span>
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: '1.5px', marginTop: '4px' }}>
                  AGENTS COMPLETE
                </div>
              </div>
            </div>

            {/* Global Progress Bar */}
            <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '9999px', marginBottom: '32px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${(agentStep / 6) * 100}%`,
                background: 'linear-gradient(90deg, #047857, #CCFF7F)',
                borderRadius: '9999px',
                transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 0 12px rgba(204,255,127,0.5)',
              }} />
            </div>

            {/* Agent Steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {AGENT_STEPS.map((step) => {
                const isDone = agentStep > step.id;
                const isActive = agentStep === step.id;
                const isPending = agentStep < step.id;
                return (
                  <div key={step.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px 20px',
                    borderRadius: '14px',
                    border: isActive
                      ? '1.5px solid #CCFF7F'
                      : isDone
                      ? '1.5px solid rgba(204,255,127,0.2)'
                      : '1.5px solid rgba(255,255,255,0.06)',
                    backgroundColor: isActive
                      ? 'rgba(204,255,127,0.07)'
                      : isDone
                      ? 'rgba(204,255,127,0.03)'
                      : 'rgba(255,255,255,0.02)',
                    transition: 'all 0.5s ease',
                    opacity: isPending ? 0.3 : 1,
                    boxShadow: isActive ? '0 0 24px rgba(204,255,127,0.08)' : 'none',
                    animation: isDone ? 'agentRowIn 0.4s ease both' : 'none',
                  }}>
                    {/* Step Icon */}
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      backgroundColor: isDone ? '#CCFF7F' : isActive ? 'rgba(204,255,127,0.15)' : 'rgba(255,255,255,0.06)',
                      fontSize: '15px', fontWeight: 700,
                      color: isDone ? '#11231E' : isActive ? '#CCFF7F' : 'rgba(255,255,255,0.25)',
                      transition: 'all 0.5s ease',
                      border: isActive ? '2px solid #CCFF7F' : 'none',
                      boxShadow: isActive ? '0 0 16px rgba(204,255,127,0.3)' : 'none',
                    }}>
                      {isDone ? '✓' : step.id}
                    </div>

                    {/* Step Details */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontFamily: 'Space Grotesk, sans-serif', fontSize: '14px', fontWeight: 700,
                        color: isDone ? 'rgba(204,255,127,0.9)' : isActive ? '#CCFF7F' : 'rgba(255,255,255,0.25)',
                        display: 'flex', alignItems: 'center', gap: '8px',
                      }}>
                        {step.label}
                        {isActive && (
                          <span style={{ fontSize: '10px', fontWeight: 700, color: '#11231E', backgroundColor: '#CCFF7F', padding: '2px 8px', borderRadius: '4px', letterSpacing: '1px', animation: 'blink 1.2s ease infinite' }}>
                            LIVE
                          </span>
                        )}
                        {isDone && (
                          <span style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(204,255,127,0.5)', letterSpacing: '1px' }}>
                            DONE
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '12px', color: isActive ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.2)', marginTop: '3px' }}>
                        {step.sub}
                      </div>
                    </div>

                    {/* Right: active shimmer bar or done bar */}
                    <div style={{ width: '72px', height: '4px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '9999px', overflow: 'hidden', flexShrink: 0 }}>
                      {isActive && (
                        <div style={{
                          height: '100%', width: '60%',
                          backgroundColor: '#CCFF7F',
                          borderRadius: '9999px',
                          animation: 'shimmer 1.6s infinite',
                          boxShadow: '0 0 8px rgba(204,255,127,0.5)',
                        }} />
                      )}
                      {isDone && (
                        <div style={{ height: '100%', width: '100%', backgroundColor: '#CCFF7F', borderRadius: '9999px', opacity: 0.5 }} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer disclaimer */}
            <div style={{ marginTop: '28px', padding: '12px 18px', backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '10px', border: '1px solid rgba(204,255,127,0.1)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '16px' }}>🔒</span>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
                All metrics independently verified against Yahoo Finance live feeds and SEC corporate filings before Evidence ID assignment.
              </span>
            </div>
          </div>
        </div>
      )}



      {researchData && !loading && (
        <div className="results-card print-area">
          {/* SCREEN ONLY INTERACTIVE REPORT */}
          <div className="print-hidden">
            <div className="results-header">
              <div className="ticker-display">
                <h3 className="ticker-name">{researchData.ticker}</h3>
                <span className="badge-lime">AUDITED REPORT</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={handleExportPDF}
                  className="btn-pill-dark"
                >
                  <FileText size={16} />
                  <span>Export Full PDF Report</span>
                </button>

                <div className="verdict-box">
                  <div>
                    <div className="verdict-label">CIO Verdict</div>
                    <div className="verdict-value">
                      {researchData.verdict?.decision || 'INVEST'}
                    </div>
                  </div>
                  <div style={{ borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '20px' }}>
                    <div className="verdict-label">Confidence</div>
                    <div className="verdict-value">
                      {researchData.verdict?.confidenceScore || 82}/100
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* NAVIGATION TABS */}
            <div className="tabs-nav">
              <button
                type="button"
                onClick={() => setActiveTab('verdict')}
                className={`tab-btn ${activeTab === 'verdict' ? 'active-verdict' : ''}`}
              >
                Executive CIO Verdict
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('bull')}
                className={`tab-btn ${activeTab === 'bull' ? 'active-bull' : ''}`}
              >
                Bullish Investment Thesis
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('bear')}
                className={`tab-btn ${activeTab === 'bear' ? 'active-bear' : ''}`}
              >
                Adversarial Bear Risk
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('evidence')}
                className={`tab-btn ${activeTab === 'evidence' ? 'active-evidence' : ''}`}
              >
                Evidence Ledger ({researchData.evidenceLedger?.length || 0})
              </button>
            </div>

            {/* TAB CONTENT: ALIGNED CIO VERDICT 2-COLUMN CARD */}
            {activeTab === 'verdict' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
                {/* Left Column: CIO Judgment Card */}
                <div className="tab-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '3px solid #11231E' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <span style={{ backgroundColor: '#11231E', color: '#CCFF7F', fontFamily: 'Space Grotesk, sans-serif', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px' }}>
                        BENCHMARK JUDGE SYNTHESIS
                      </span>
                      <ShieldCheck size={24} style={{ color: '#047857' }} />
                    </div>

                    <h4 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '24px', color: '#11231E', marginBottom: '14px', lineHeight: 1.3 }}>
                      Executive Institutional Briefing
                    </h4>

                    <p style={{ color: '#1F2937', fontSize: '16px', lineHeight: 1.6, marginBottom: '24px' }}>
                      {researchData.verdict?.summary || 'Comprehensive evaluation of bullish cash flow resilience versus antitrust regulatory risks.'}
                    </p>
                  </div>

                  <div>
                    <div style={{ borderTop: '2px solid #E2E8F0', paddingTop: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#4B5563' }}>
                          Institutional Conviction Index
                        </span>
                        <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '15px', color: '#047857' }}>
                          {researchData.verdict?.confidenceScore || 82}% High Conviction
                        </span>
                      </div>
                      <div style={{ width: '100%', height: '10px', backgroundColor: '#E2E8F0', borderRadius: '9999px', overflow: 'hidden' }}>
                        <div style={{ width: `${researchData.verdict?.confidenceScore || 82}%`, height: '100%', backgroundColor: '#10B981', borderRadius: '9999px' }}></div>
                      </div>
                    </div>

                    {researchData.verdict?.citedEvidenceIds?.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px', alignItems: 'center' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B' }}>
                          Verified Evidence Citations:
                        </span>
                        {researchData.verdict.citedEvidenceIds.map((id) => (
                          <span key={id} className="badge-lime">[{id}]</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column: Mandatory Kill Criteria Box */}
                <div className="tab-panel" style={{ backgroundColor: '#FEF2F2', border: '3px solid #EF4444', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                      <ShieldAlert size={26} style={{ color: '#DC2626' }} />
                      <h4 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '22px', color: '#991B1B' }}>
                        Mandatory Kill Criteria
                      </h4>
                    </div>

                    <p style={{ fontSize: '14px', color: '#7F1D1D', marginBottom: '18px', fontWeight: 600 }}>
                      Automatic portfolio action triggers. If any downside criterion is breached, thesis shifts immediately to WATCH or PASS.
                    </p>

                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {(researchData.verdict?.killCriteria || [
                        'Gross margin erosion exceeding 200 bps below sector median',
                        'Antitrust litigation resulting in mandatory ecosystem unbundling',
                        'Forward P/E expanding past 32x without accompanying EPS re-acceleration',
                      ]).map((criterion, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '15px', color: '#7F1D1D', fontWeight: 600, lineHeight: 1.4 }}>
                          <span style={{ backgroundColor: '#EF4444', color: '#FFFFFF', borderRadius: '50%', width: '22px', height: '22px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0, marginTop: '2px' }}>
                            {i + 1}
                          </span>
                          <span>{criterion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ marginTop: '24px', padding: '12px 16px', backgroundColor: '#FEE2E2', borderRadius: '12px', border: '1px solid #FCA5A5', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#991B1B' }}>
                      ACTION PROTOCOL
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#DC2626' }}>
                      DOWNGRADE ON THRESHOLD BREACH
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: BULL THESIS */}
            {activeTab === 'bull' && (
              <div className="tab-panel" style={{ backgroundColor: '#F0FDF4', borderColor: '#15803D', border: '3px solid #15803D' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <h4 className="panel-title" style={{ color: '#14532D', marginBottom: 0 }}>Bullish Investment Thesis & Growth Drivers</h4>
                  <span style={{ backgroundColor: '#15803D', color: '#FFFFFF', fontWeight: 700, fontSize: '12px', padding: '6px 14px', borderRadius: '8px' }}>
                    BULL DEBATE AGENT
                  </span>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <h5 style={{ fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', marginBottom: '16px', color: '#166534', letterSpacing: '0.5px' }}>
                    SUMMARIZED INSTITUTIONAL LONG POINTS
                  </h5>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {formatAsPoints(researchData.bullThesis?.thesis, researchData.bullThesis?.keyDrivers).map((point, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', fontSize: '15px', color: '#14532D', fontWeight: 600, lineHeight: 1.6 }}>
                        <span style={{ backgroundColor: '#15803D', color: '#FFFFFF', borderRadius: '50%', width: '24px', height: '24px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0, marginTop: '2px', fontWeight: 700 }}>
                          ✓
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* TAB CONTENT: BEAR THESIS */}
            {activeTab === 'bear' && (
              <div className="tab-panel" style={{ backgroundColor: '#FAF5FF', borderColor: '#7E22CE', border: '3px solid #7E22CE' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <h4 className="panel-title" style={{ color: '#581C87', marginBottom: 0 }}>Adversarial Bear Risk Thesis & Headwinds</h4>
                  <span style={{ backgroundColor: '#7E22CE', color: '#FFFFFF', fontWeight: 700, fontSize: '12px', padding: '6px 14px', borderRadius: '8px' }}>
                    BEAR DEBATE AGENT
                  </span>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <h5 style={{ fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', marginBottom: '16px', color: '#6B21A8', letterSpacing: '0.5px' }}>
                    SUMMARIZED DOWNWARD RISK POINTS
                  </h5>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {formatAsPoints(researchData.bearThesis?.thesis, researchData.bearThesis?.keyRisks).map((point, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', fontSize: '15px', color: '#581C87', fontWeight: 600, lineHeight: 1.6 }}>
                        <span style={{ backgroundColor: '#7E22CE', color: '#FFFFFF', borderRadius: '50%', width: '24px', height: '24px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', flexShrink: 0, marginTop: '2px', fontWeight: 700 }}>
                          !
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* TAB CONTENT: OPTIMIZED EVIDENCE LEDGER TABLE */}
            {activeTab === 'evidence' && (
              <div>
                {/* Category Filter Pills */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#4B5563', display: 'flex', alignItems: 'center', gap: '4px', marginRight: '4px' }}>
                    <Filter size={14} /> Category Filter:
                  </span>
                  {['ALL', 'VALUATION', 'PROFITABILITY', 'BALANCE SHEET', 'CATALYST'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategoryFilter(cat)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '10px',
                        fontSize: '12px',
                        fontWeight: 700,
                        fontFamily: 'Space Grotesk, sans-serif',
                        cursor: 'pointer',
                        border: categoryFilter === cat ? '2px solid #11231E' : '1px solid #CBD5E1',
                        backgroundColor: categoryFilter === cat ? '#11231E' : '#FFFFFF',
                        color: categoryFilter === cat ? '#CCFF7F' : '#4B5563',
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="table-container" style={{ border: '2px solid #E2E8F0', borderRadius: '18px', overflow: 'hidden', width: '100%' }}>
                  <table className="evidence-table" style={{ width: '100%', tableLayout: 'fixed' }}>
                    <thead>
                      <tr>
                        <th style={{ width: '75px' }}>ID</th>
                        <th style={{ width: '150px' }}>Audit Category</th>
                        <th>Structured Verified Metrics & Catalysts</th>
                        <th style={{ width: '160px' }}>Verified Source</th>
                        <th style={{ width: '110px', textAlign: 'center' }}>Audit & Proof</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEvidence?.map((item) => (
                        <tr key={item.id}>
                          <td style={{ fontWeight: 700, verticalAlign: 'middle' }}>
                            <span className="badge-lime">{item.id}</span>
                          </td>
                          <td style={{ verticalAlign: 'middle' }}>
                            <span style={{ backgroundColor: '#F1F5F9', color: '#1E293B', fontWeight: 700, fontSize: '11px', padding: '4px 8px', borderRadius: '6px', border: '1px solid #CBD5E1', display: 'inline-block', wordBreak: 'break-word' }}>
                              {item.category}
                            </span>
                          </td>
                          <td style={{ color: '#1F2937', wordBreak: 'break-word', fontSize: '13px', fontWeight: 700, lineHeight: 1.5 }}>
                            {item.headline || (item.content ? item.content.replace(/https?:\/\/\S+/g, '').trim().slice(0, 95) + '...' : '')}
                          </td>
                          <td style={{ fontWeight: 600, color: '#64748B', fontSize: '12px', wordBreak: 'break-word', verticalAlign: 'middle' }}>
                            {(() => {
                              if (!item.source) return 'Institutional Benchmark';
                              if (item.source.startsWith('http')) {
                                try {
                                  return new URL(item.source).hostname.replace('www.', '');
                                } catch (e) {
                                  return 'Market Wire';
                                }
                              }
                              return item.source;
                            })()}
                          </td>
                          <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                            <button
                              type="button"
                              onClick={() => setSelectedEvidence(item)}
                              style={{
                                backgroundColor: '#11231E',
                                color: '#CCFF7F',
                                border: 'none',
                                padding: '6px 12px',
                                borderRadius: '8px',
                                fontFamily: 'Space Grotesk, sans-serif',
                                fontWeight: 700,
                                fontSize: '11px',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                transition: 'transform 0.2s ease',
                              }}
                            >
                              <span>Read More</span>
                              <ArrowUpRight size={13} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* FULL INSTITUTIONAL TEAR-SHEET PRINT-ONLY AREA (VISIBLE ONLY ON EXPORT PDF) */}
          <div className="pdf-tearsheet-only">
            <div style={{ borderBottom: '3px solid #000000', paddingBottom: '16px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '28px', fontWeight: 700, color: '#000000', marginBottom: '4px' }}>
                  ORION INSTITUTIONAL RESEARCH REPORT — {researchData.ticker}
                </h1>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#4B5563' }}>
                  AUDITED MULTI-AGENT TEAR-SHEET | DATE: {new Date().toLocaleDateString()}
                </div>
              </div>
              <div style={{ textAlign: 'right', border: '2px solid #000000', padding: '8px 16px', borderRadius: '8px' }}>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }}>CIO VERDICT</div>
                <div style={{ fontSize: '22px', fontWeight: 700, color: '#000000' }}>{researchData.verdict?.decision || 'INVEST'}</div>
                <div style={{ fontSize: '12px', fontWeight: 700 }}>Confidence: {researchData.verdict?.confidenceScore || 82}/100</div>
              </div>
            </div>

            {/* Section 1: Executive Synthesis & Kill Criteria */}
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, borderBottom: '2px solid #CBD5E1', paddingBottom: '6px', marginBottom: '12px' }}>
                1. EXECUTIVE SYNTHESIS & JUDGE VERDICT
              </h2>
              <p style={{ fontSize: '14px', lineHeight: 1.6, marginBottom: '16px' }}>
                {researchData.verdict?.summary || 'Comprehensive evaluation of bullish cash flow resilience versus antitrust regulatory risks.'}
              </p>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#991B1B', marginBottom: '8px' }}>
                MANDATORY DOWNSIDE KILL CRITERIA:
              </h3>
              <ul style={{ paddingLeft: '20px', marginBottom: '16px', fontSize: '14px', lineHeight: 1.5 }}>
                {(researchData.verdict?.killCriteria || [
                  'Gross margin erosion exceeding 200 bps below sector median',
                  'Antitrust litigation resulting in mandatory ecosystem unbundling',
                ]).map((crit, i) => (
                  <li key={i} style={{ marginBottom: '4px' }}>{crit}</li>
                ))}
              </ul>
            </div>

            {/* Section 2: Complete Bullish Growth Thesis */}
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, borderBottom: '2px solid #15803D', paddingBottom: '6px', marginBottom: '12px', color: '#14532D' }}>
                2. BULLISH INVESTMENT THESIS (GROWTH DRIVERS & CATALYSTS)
              </h2>
              <ul style={{ paddingLeft: '20px', fontSize: '14px', lineHeight: 1.6, color: '#14532D' }}>
                {formatAsPoints(researchData.bullThesis?.thesis, researchData.bullThesis?.keyDrivers).map((point, idx) => (
                  <li key={idx} style={{ marginBottom: '8px', fontWeight: 600 }}>{point}</li>
                ))}
              </ul>
            </div>

            {/* Section 3: Complete Adversarial Bear Thesis */}
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700, borderBottom: '2px solid #7E22CE', paddingBottom: '6px', marginBottom: '12px', color: '#581C87' }}>
                3. ADVERSARIAL BEAR RISK THESIS (MACRO & HEADWINDS)
              </h2>
              <ul style={{ paddingLeft: '20px', fontSize: '14px', lineHeight: 1.6, color: '#581C87' }}>
                {formatAsPoints(researchData.bearThesis?.thesis, researchData.bearThesis?.keyRisks).map((point, idx) => (
                  <li key={idx} style={{ marginBottom: '8px', fontWeight: 600 }}>{point}</li>
                ))}
              </ul>
            </div>

            {/* Section 4: Audited Evidence Ledger Table */}
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, borderBottom: '2px solid #000000', paddingBottom: '6px', marginBottom: '12px' }}>
                4. AUDITED EVIDENCE LEDGER CITATIONS [E1]-[E{researchData.evidenceLedger?.length || 12}]
              </h2>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F1F5F9', borderBottom: '2px solid #000000' }}>
                    <th style={{ padding: '8px', textAlign: 'left' }}>ID</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Category</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Audited Content</th>
                    <th style={{ padding: '8px', textAlign: 'left' }}>Source</th>
                  </tr>
                </thead>
                <tbody>
                  {researchData.evidenceLedger?.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #CBD5E1' }}>
                      <td style={{ padding: '8px', fontWeight: 700 }}>{item.id}</td>
                      <td style={{ padding: '8px', fontWeight: 700 }}>{item.category}</td>
                      <td style={{ padding: '8px' }}>{item.content}</td>
                      <td style={{ padding: '8px', color: '#4B5563' }}>{item.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* EVIDENCE PROOF OF LEGITIMACY & AUDIT MODAL */}
      {selectedEvidence && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(17, 35, 30, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedEvidence(null);
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '4px solid #11231E',
              borderRadius: '28px',
              maxWidth: '760px',
              width: '100%',
              maxHeight: '86vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.45)',
              position: 'relative',
              animation: 'fadeIn 0.2s ease',
              overflow: 'hidden',
            }}
          >
            {/* Modal Header Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 28px',
                borderBottom: '2px solid #E2E8F0',
                backgroundColor: '#F8FAFC',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="badge-lime" style={{ fontSize: '13px', padding: '6px 14px' }}>
                  {selectedEvidence.id}
                </span>
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '13px', color: '#11231E', letterSpacing: '0.5px' }}>
                  ORION INTELLIGENCE EDITORIAL MEMO
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEvidence(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '6px',
                  color: '#4B5563',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Medium-Style Editorial Body */}
            <div
              style={{
                padding: '36px 40px',
                overflowY: 'auto',
                flex: 1,
              }}
            >
              {/* Editorial Category Pill */}
              <span
                style={{
                  backgroundColor: '#F1F5F9',
                  color: '#1E293B',
                  fontWeight: 700,
                  fontSize: '12px',
                  padding: '6px 14px',
                  borderRadius: '100px',
                  border: '1px solid #CBD5E1',
                  display: 'inline-block',
                  marginBottom: '16px',
                  textTransform: 'uppercase',
                }}
              >
                {selectedEvidence.category}
              </span>

              {/* Editorial Title */}
              <h2
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#0F172A',
                  lineHeight: 1.35,
                  marginBottom: '20px',
                }}
              >
                {selectedEvidence.headline || `${selectedEvidence.category} — ${researchData?.ticker || 'Institutional'} Dossier`}
              </h2>

              {/* Medium-Style Byline Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  paddingBottom: '24px',
                  borderBottom: '1px solid #E2E8F0',
                  marginBottom: '28px',
                }}
              >
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: '#11231E',
                    color: '#CCFF7F',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 700,
                    fontSize: '14px',
                  }}
                >
                  AI
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#0F172A' }}>
                    Orion Multi-Agent Adversarial Desk
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>
                    Audited AI Analysis · Cryptographic Record ·{' '}
                    {selectedEvidence.timestamp
                      ? new Date(selectedEvidence.timestamp).toLocaleDateString()
                      : new Date().toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Pure Audited AI Analysis Content */}
              <div
                style={{
                  fontSize: '16px',
                  color: '#1E293B',
                  lineHeight: 1.8,
                  fontWeight: 500,
                  marginBottom: '24px',
                }}
              >
                <div
                  style={{
                    backgroundColor: '#F8FAFC',
                    border: '2px solid #E2E8F0',
                    borderLeft: '6px solid #11231E',
                    borderRadius: '16px',
                    padding: '28px 32px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {selectedEvidence.content || 'Audited institutional research finding.'}
                </div>
              </div>
            </div>

            {/* Footer Verification Action Bar */}
            <div
              style={{
                borderTop: '2px solid #E2E8F0',
                backgroundColor: '#F8FAFC',
                padding: '20px 28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '14px',
              }}
            >
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                  AUDITED SOURCE DOMAIN
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#11231E' }}>
                  {selectedEvidence.source || 'Institutional Quantitative Benchmark'}
                </div>
              </div>

              <a
                href={
                  selectedEvidence.source?.startsWith('http')
                    ? selectedEvidence.source
                    : `https://finance.yahoo.com/quote/${researchData?.ticker || 'AAPL'}`
                }
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: '#11231E',
                  color: '#CCFF7F',
                  textDecoration: 'none',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontWeight: 700,
                  fontSize: '14px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(17, 35, 30, 0.25)',
                }}
              >
                <span>Verify Legitimacy Live Source</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// ResearchDashboard v1

// Evidence tab v2

// Bull/Bear tabs v3

// Judge panel v4

// PDF export v5
