import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.issues,
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

export default errorMiddleware;
