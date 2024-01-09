export const notFound = (req, res, next) => {
  const error = new Error(`Not Found ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;
  const stack = process.env.NODE_ENV === "production" ? "📦" : err.stack;
  // Handle specific error types
  if (err.name === "ValidationError") {
    return res
      .status(400)
      .json({ error: "Validation error", details: err.errors });
  }
  //If mongoose not found error, set statuscode to 404 and change the message
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resources not found";
  }

  res.status(statusCode).json({
    message,
    stack,
  });
};
