import { rankingRepository } from "../repositories/rankingRepository.js"

async function registerResultOnRanking(
  winner: string,
  loser: string,
  draw: boolean,
) {
  const { rows: winnerRows } =
    await rankingRepository.verifyExistingUserOnRanking(winner)
  const existingWinner = winnerRows[0]

  if (existingWinner) {
    await rankingRepository.updateWins(existingWinner)
  } else if (!existingWinner && !draw) {
    await rankingRepository.insertNewFighter(winner, 1, 0, 0)
  } else {
    await rankingRepository.insertNewFighter(winner, 0, 0, 1)
  }

  const { rows: loserRows } =
    await rankingRepository.verifyExistingUserOnRanking(loser)
  const existingLoser = loserRows[0]

  if (existingLoser) {
    await rankingRepository.updateLosses(existingLoser)
  } else if (!existingLoser && !draw) {
    await rankingRepository.insertNewFighter(loser, 0, 1, 0)
  } else {
    await rankingRepository.insertNewFighter(loser, 0, 0, 1)
  }
}

export const rankingServices = {
  registerResultOnRanking,
}
