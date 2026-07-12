import { ResearchRun } from "../../models/researchRun.model.js";

/**
 * Drift Comparator Node: Compares current verdict against user's last historical completed run in MongoDB.
 */
export const driftComparatorNode = async (state) => {
  const { userId, ticker, verdict } = state;
  console.log(`\n📈 [Drift Comparator Node] Checking historical research drift for ${ticker}...`);

  if (!userId) {
    return {
      driftSummary: {
        previousVerdict: null,
        thesisDirection: "FIRST_RUN",
        explanation: "No user ID supplied for historical comparison.",
      },
    };
  }

  try {
    // Fast O(1) index lookup using { userId: 1, ticker: 1, createdAt: -1 }
    const previousRun = await ResearchRun.findOne({
      userId,
      ticker: ticker.toUpperCase(),
      status: "COMPLETED",
    }).sort({ createdAt: -1 });

    if (!previousRun || !previousRun.verdict?.decision) {
      return {
        driftSummary: {
          previousVerdict: null,
          thesisDirection: "FIRST_RUN",
          explanation: `First historical research run for ${ticker}.`,
        },
      };
    }

    const prevDecision = previousRun.verdict.decision;
    const currDecision = verdict?.decision || "WATCH";

    let direction = "UNCHANGED";
    if (currDecision === "INVEST" && prevDecision !== "INVEST") {
      direction = "STRENGTHENED";
    } else if (currDecision !== "INVEST" && prevDecision === "INVEST") {
      direction = "WEAKENED";
    }

    return {
      driftSummary: {
        previousVerdict: prevDecision,
        thesisDirection: direction,
        explanation: `Verdict shifted from ${prevDecision} to ${currDecision} (${direction}).`,
      },
    };
  } catch (error) {
    console.error("Drift comparison error:", error?.message);
    return {
      driftSummary: {
        previousVerdict: null,
        thesisDirection: "FIRST_RUN",
        explanation: "Drift comparison skipped due to DB lookup issue.",
      },
    };
  }
};
