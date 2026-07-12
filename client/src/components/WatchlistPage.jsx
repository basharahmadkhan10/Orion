import React, { useState, useEffect } from 'react';
import { getResearchHistory } from '../api/researchApi';

export const WatchlistPage = ({ user, onNavigateToResearch }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customTicker, setCustomTicker] = useState('');

  useEffect(() => {
    const loadHistory = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const data = await getResearchHistory();
        setHistory(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed loading dynamic research history:', err);
      } finally {
        setLoading(false);
      }
    };
    loadHistory();
  }, [user]);

  // Combine live dynamic history from MongoDB with institutional baseline
  const dynamicItems = history.map((run) => ({
    ticker: run.ticker,
    name: run.companyName || run.ticker,
    verdict: run.verdict?.decision || 'INVEST',
    confidence: run.verdict?.confidenceScore || 80,
    driftStatus: run.driftSummary?.summary || 'Audited against previous CIO baseline',
    alertLevel:
      run.verdict?.decision === 'PASS'
        ? 'ATTENTION REQUIRED'
        : run.verdict?.decision === 'WATCH'
        ? 'MONITORING'
        : 'STABLE',
    lastRun: new Date(run.createdAt || Date.now()).toLocaleDateString(),
    isDynamic: true,
  }));

  const baselineItems = [
    {
      ticker: 'AAPL',
      name: 'Apple Inc.',
      verdict: 'INVEST',
      confidence: 82,
      driftStatus: 'Bullish Expansion (+3.4% Fundamentals)',
      alertLevel: 'STABLE',
      lastRun: 'Today',
      isDynamic: false,
    },
    {
      ticker: 'NVDA',
      name: 'NVIDIA Corporation',
      verdict: 'INVEST',
      confidence: 88,
      driftStatus: 'Strong Revenue & Capital Acceleration',
      alertLevel: 'LOW RISK',
      lastRun: 'Today',
      isDynamic: false,
    },
    {
      ticker: 'TSLA',
      name: 'Tesla, Inc.',
      verdict: 'WATCH',
      confidence: 64,
      driftStatus: 'Margin Contraction Sensitivity (-2.1%)',
      alertLevel: 'ATTENTION REQUIRED',
      lastRun: 'Yesterday',
      isDynamic: false,
    },
    {
      ticker: 'MSFT',
      name: 'Microsoft Corporation',
      verdict: 'INVEST',
      confidence: 85,
      driftStatus: 'Cloud Operating Margin Parity Maintained',
      alertLevel: 'STABLE',
      lastRun: '2 days ago',
      isDynamic: false,
    },
  ];

  // Merge dynamic user runs first, then non-duplicate baseline items
  const activeTickersSet = new Set(dynamicItems.map((item) => item.ticker));
  const filteredBaseline = baselineItems.filter(
    (b) => !activeTickersSet.has(b.ticker)
  );
  const displayList = [...dynamicItems, ...filteredBaseline];

  const handleAddTicker = (e) => {
    e.preventDefault();
    if (!customTicker.trim()) return;
    onNavigateToResearch(customTicker.toUpperCase().trim());
  };

  return (
    <section className="dashboard-section" style={{ paddingTop: '110px' }}>
      <div className="search-box-card" style={{ marginBottom: '32px' }}>
        <div className="search-header">
          <h2 className="search-title">Institutional Portfolio Watchlist</h2>
          <span className="badge-lime">MONGODB CLUSTER MONITOR</span>
        </div>
        <p className="search-description">
          Monitor historical multi-agent executions stored in your MongoDB cluster and track real-time CIO conviction scores, valuation fundamentals, and audit statuses across covered equities.
        </p>

        <form onSubmit={handleAddTicker} className="search-form" style={{ marginTop: '20px' }}>
          <input
            type="text"
            value={customTicker}
            onChange={(e) => setCustomTicker(e.target.value.toUpperCase())}
            placeholder="Add Ticker (e.g. AMZN)"
            className="input-ticker"
          />
          <button type="submit" className="btn-pill-white">
            Execute Dynamic Research
          </button>
        </form>
      </div>

      {/* Watchlist Table Card */}
      <div className="results-card">
        <div className="results-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '24px', color: '#11231E' }}>
              Active Portfolio Watchlist
            </h3>
            {user && (
              <span className="badge-lavender">
                {dynamicItems.length} Dynamic Runs Stored
              </span>
            )}
          </div>
          <button
            onClick={() => onNavigateToResearch('AAPL')}
            className="btn-pill-dark"
            style={{ padding: '10px 20px', fontSize: '13px' }}
          >
            New Research Run
          </button>
        </div>

        <div className="table-container">
          <table className="evidence-table">
            <thead>
              <tr>
                <th>Ticker</th>
                <th>Company Name</th>
                <th>CIO Verdict</th>
                <th>Confidence</th>
                <th>Fundamental Momentum</th>
                <th>Audit Status</th>
                <th>Source</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayList.map((item) => (
                <tr key={item.ticker}>
                  <td style={{ fontWeight: 700 }}>
                    <span className="badge-lime">{item.ticker}</span>
                  </td>
                  <td style={{ fontWeight: 600, color: '#11231E' }}>{item.name}</td>
                  <td>
                    <span
                      style={{
                        backgroundColor:
                          item.verdict === 'INVEST'
                            ? '#CCFF7F'
                            : item.verdict === 'WATCH'
                            ? '#FEF08A'
                            : '#FECACA',
                        color: '#11231E',
                        fontWeight: 700,
                        fontSize: '11px',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        border: '1.5px solid #11231E',
                      }}
                    >
                      {item.verdict}
                    </span>
                  </td>
                  <td style={{ fontWeight: 700, color: '#11231E' }}>{item.confidence}%</td>
                  <td style={{ color: '#4B5563', fontWeight: 600 }}>{item.driftStatus}</td>
                  <td>
                    <span
                      style={{
                        fontWeight: 700,
                        fontSize: '12px',
                        color:
                          item.alertLevel === 'ATTENTION REQUIRED'
                            ? '#B91C1C'
                            : '#047857',
                      }}
                    >
                      {item.alertLevel}
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: item.isDynamic ? '#047857' : '#6B7280',
                      }}
                    >
                      {item.isDynamic ? 'MongoDB Dynamic' : 'Institutional Baseline'}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => onNavigateToResearch(item.ticker)}
                      style={{
                        backgroundColor: '#11231E',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontWeight: 700,
                        fontSize: '12px',
                        cursor: 'pointer',
                      }}
                    >
                      Run Debate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
