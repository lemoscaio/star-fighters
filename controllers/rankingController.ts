import { Request, Response } from "express"
import { rankingRepository } from "../repositories/rankingRepository.js"

export async function getRanking(req: Request, res: Response) {
  const rankingQuery = await rankingRepository.getRanking()

  res.send({ fighters: rankingQuery.rows })
}
