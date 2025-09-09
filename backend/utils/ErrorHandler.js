import ResponseError from "../types/ResponseError.js";

const errorHandler = (err, req, res, next) => {
  console.error("ERROR: ", err);

  if (err instanceof ResponseError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  res.status(500).json({
    success: false,
    message: err.message,
  });
};

export default errorHandler;