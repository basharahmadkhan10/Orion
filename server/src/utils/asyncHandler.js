/**
 * Higher-order async handler wrapper around route controllers.
 * Eliminates repetitive try-catch blocks across controllers.
 */
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };

// asyncHandler utility
