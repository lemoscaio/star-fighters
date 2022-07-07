import { Request, Response } from "express"
import { userServices } from "../services/userServices.js"

export async function compareTwoUsersStars(req: Request, res: Response) {
  const { firstUser, secondUser }: { firstUser: string; secondUser: string } =
    req.body

  const battleResult = await userServices.getStarBattleResult(
    firstUser,
    secondUser,
  )

  return res.send(battleResult)
}
