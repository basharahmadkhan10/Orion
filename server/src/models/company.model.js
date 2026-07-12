import mongoose, { Schema } from "mongoose";

const companySchema = new Schema(
  {
    ticker: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    sector: {
      type: String,
      default: "General",
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

companySchema.index({ name: "text" });

export const Company = mongoose.model("Company", companySchema);
