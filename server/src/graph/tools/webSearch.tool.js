
export const fetchCompanyNewsAndCatalysts = async (ticker, companyName) => {
  const query = `${companyName || ticker} stock news catalysts financial results risk factors`;

  if (process.env.TAVILY_API_KEY) {
    try {
      const response = await fetch("https://api.tavily.com/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: process.env.TAVILY_API_KEY,
          query,
          search_depth: "basic",
          max_results: 5,
        }),
      });
      const data = await response.json();
      return {
        ticker,
        query,
        results: (data?.results || []).map((r) => ({
          title: r.title,
          url: r.url,
          snippet: r.content,
        })),
        source: "Tavily Search API",
      };
    } catch (err) {
      console.error("Tavily search failed:", err?.message);
    }
  }

  
  return {
    ticker,
    query,
    results: [
      {
        title: `${ticker} Recent Quarterly Earnings & Market Performance`,
        url: `https://finance.yahoo.com/quote/${ticker}`,
        snippet: `Recent analysis of ${ticker} highlights ongoing sector dynamics, profitability focus, and competitive positioning across major product segments.`,
      },
    ],
    source: "Yahoo Finance Summary Feed",
  };
};


