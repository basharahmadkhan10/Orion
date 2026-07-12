import { fetchFinancialData } from "../tools/yahooFinance.tool.js";
import { fetchCompanyNewsAndCatalysts } from "../tools/webSearch.tool.js";


export const researchToolsNode = async (state) => {
  const { ticker, companyName } = state;
  console.log(`\n🔎 [Research Tools Node] Fetching live fundamentals & catalysts for ${ticker}...`);

  const [rawFinancialData, rawNewsData] = await Promise.all([
    fetchFinancialData(ticker),
    fetchCompanyNewsAndCatalysts(ticker, companyName),
  ]);

  return {
    rawFinancialData,
    rawNewsData,
  };
};


