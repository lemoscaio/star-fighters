import axios from "axios"
import { rankingServices } from "./rankingServices.js"

async function getUserData(user: string) {
  const userUrl = `http://api.github.com/users/${user}/repos`

  const userData = await axios.get(userUrl)

  return userData.data
}

function getTotalUserStars(data: []) {
  let starCount = 0
  data.forEach((repository: {}) => {
    starCount += repository["stargazers_count"]
  })

  return starCount
}

async function getStarBattleResult(firstUser: string, secondUser: string) {
  const firstUserData = await getUserData(firstUser)
  const realFirstUsername = firstUserData[0].owner.login

  const secondUserData = await getUserData(secondUser)
  const realSecondUsername = secondUserData[0].owner.login

  const firstUserStars = getTotalUserStars(firstUserData)
  const secondUserStars = getTotalUserStars(secondUserData)

  let winner: string
  let loser: string
  let draw: boolean = false

  if (firstUserStars === secondUserStars) {
    winner = null
    loser = null
    draw = true
  } else if (firstUserStars > secondUserStars) {
    winner = realFirstUsername
    loser = realSecondUsername
  } else {
    winner = realSecondUsername
    loser = realFirstUsername
  }

  const battleResult: { winner: string; loser: string; draw: boolean } = {
    winner,
    loser,
    draw,
  }

  if (draw) {
    rankingServices.registerResultOnRanking(
      realFirstUsername,
      realSecondUsername,
      draw,
    )
  } else {
    rankingServices.registerResultOnRanking(winner, loser, draw)
  }

  return battleResult
}

export const userServices = {
  getStarBattleResult,
}
