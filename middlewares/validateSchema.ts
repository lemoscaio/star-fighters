import {Request, Response, NextFunction} from "express"

export function validateSchema(schema){
  return (validateSchema[schema] = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false })
    } catch (error) {
      return res.status(422).send(error.details.map(({ message }) => message))
    }

    next()
  })
}