import { Request, Response, NextFunction } from "express"

export function checkDifferentUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.body.firstUser === req.body.secondUser)
    return res.status(422).send("The fighters must be 2 different users")

  next()
}
