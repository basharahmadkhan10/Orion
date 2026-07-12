import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Company } from "../models/company.model.js";

export const searchCompanies = asyncHandler(async (req, res) => {
  const { query } = req.query;

  if (!query) {
    const companies = await Company.find().limit(20);
    return res
      .status(200)
      .json(new ApiResponse(200, companies, "Companies fetched successfully"));
  }

  const companies = await Company.find({
    $or: [
      { ticker: { $regex: query, $options: "i" } },
      { name: { $regex: query, $options: "i" } },
    ],
  }).limit(20);

  return res
    .status(200)
    .json(new ApiResponse(200, companies, "Companies searched successfully"));
});
