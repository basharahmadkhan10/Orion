import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ResearchRun } from "../models/researchRun.model.js";
import { Company } from "../models/company.model.js";
import { runResearchPipeline } from "../graph/researchGraph.js";

export const startResearchRun = asyncHandler(async (req, res) => {
  const { ticker, companyName } = req.body;

  if (!ticker) {
    throw new ApiError(400, "Ticker symbol is required");
  }

  const symbol = ticker.toUpperCase().trim();

  // Ensure company exists in DB
  await Company.findOneAndUpdate(
    { ticker: symbol },
    { $setOnInsert: { ticker: symbol, name: companyName || symbol } },
    { upsert: true, new: true }
  );

  // Create initial ResearchRun in MongoDB
  const runDoc = await ResearchRun.create({
    userId: req.user._id,
    ticker: symbol,
    status: "IN_PROGRESS",
  });

  // Execute LangGraph Adversarial Debate Pipeline
  try {
    const finalState = await runResearchPipeline({
      userId: req.user._id.toString(),
      ticker: symbol,
      companyName: companyName || symbol,
    });

    runDoc.status = "COMPLETED";
    runDoc.plannerPlan = finalState.plannerPlan || {};
    runDoc.evidenceLedger = finalState.evidenceLedger || [];
    runDoc.bullThesis = finalState.bullThesis || {};
    runDoc.bearThesis = finalState.bearThesis || {};
    runDoc.verdict = finalState.verdict || {};
    runDoc.driftSummary = finalState.driftSummary || {};
    runDoc.completedAt = new Date();

    await runDoc.save();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          runDoc,
          `Adversarial research run completed successfully for ${symbol}`
        )
      );
  } catch (err) {
    runDoc.status = "FAILED";
    await runDoc.save();
    throw new ApiError(500, `Research execution failed: ${err.message}`, [], err.stack);
  }
});

export const getResearchHistory = asyncHandler(async (req, res) => {
  const runs = await ResearchRun.find({ userId: req.user._id })
    .sort({ createdAt: -1 })
    .limit(50);

  return res
    .status(200)
    .json(
      new ApiResponse(200, runs, "Research run history fetched successfully")
    );
});

export const getResearchRunById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const run = await ResearchRun.findOne({
    _id: id,
    userId: req.user._id,
  });

  if (!run) {
    throw new ApiError(404, "Research run not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, run, "Research run details fetched successfully"));
});

// Research controller v1
