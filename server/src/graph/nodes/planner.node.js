/**
 * Planner Node: Formulates targeted investigation areas for the ticker.
 */
export const plannerNode = async (state) => {
  const { ticker, companyName } = state;
  console.log(`\n🧠 [Planner Node] Planning investigation roadmap for ${ticker}...`);

  const plan = {
    targetTicker: ticker,
    companyName: companyName || ticker,
    focusAreas: [
      "Financial Health & Cash Flow Sustainability",
      "Valuation Multiples (PE, PB, Margin comparison)",
      "Competitive Moats & Revenue Growth Trajectory",
      "Macroeconomic & Sector Risk Factors",
    ],
    plannedAt: new Date().toISOString(),
  };

  return {
    plannerPlan: plan,
  };
};
