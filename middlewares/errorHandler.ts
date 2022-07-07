import { Request, Response, NextFunction } from "express"

export function errorHandler(
  error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error.response?.status && error.response?.data) {
    return res.status(error.response.status).send(error.response.data.message)
  }

  return res.send(error)
}
