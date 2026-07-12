import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

/**
 * Authentication middleware requiring explicit Authorization: Bearer <accessToken> header.
 * Never checks cookies for access token per strict instruction.
 */
export const verifyJWT = asyncHandler(async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Unauthorized request: Missing or invalid Authorization header");
  }

  const token = authHeader.replace("Bearer ", "").trim();

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET || "default_access_secret"
    );

    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid or expired access token");
  }
});

// JWT middleware v1
