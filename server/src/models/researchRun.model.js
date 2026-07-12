import mongoose, { Schema } from "mongoose";

const researchRunSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    ticker: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "IN_PROGRESS", "COMPLETED", "FAILED"],
      default: "PENDING",
    },
    plannerPlan: {
      type: Schema.Types.Mixed,
      default: {},
    },
    evidenceLedger: [
      {
        id: String,
        category: String,
        headline: String,
        source: String,
        content: String,
        timestamp: Date,
      },
    ],
    bullThesis: {
      thesis: String,
      keyDrivers: [String],
      citedEvidenceIds: [String],
    },
    bearThesis: {
      thesis: String,
      keyRisks: [String],
      citedEvidenceIds: [String],
    },
    verdict: {
      decision: {
        type: String,
        enum: ["INVEST", "PASS", "WATCH"],
      },
      confidenceScore: Number,
      summary: String,
      killCriteria: [String],
      citedEvidenceIds: [String],
    },
    driftSummary: {
      previousVerdict: String,
      thesisDirection: {
        type: String,
        enum: ["STRENGTHENED", "WEAKENED", "UNCHANGED", "FIRST_RUN"],
        default: "FIRST_RUN",
      },
      explanation: String,
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);


researchRunSchema.index({ userId: 1, ticker: 1, createdAt: -1 });

export const ResearchRun = mongoose.model("ResearchRun", researchRunSchema);


