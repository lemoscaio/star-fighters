import db from "../config/db.js"

function verifyExistingUserOnRanking(user: string) {
  return db.query(`SELECT * FROM fighters WHERE fighters.username = $1`, [user])
}

function updateWins(fighter: { username: string; wins: number }) {
  const queryText = `--sql
  UPDATE fighters 
  SET wins = ${fighter.wins + 1} 
  WHERE fighters.username = $1`

  const queryParams = [fighter.username]

  return db.query(queryText, queryParams)
}

function updateLosses(fighter: { username: string; losses: number }) {
  const queryText = `--sql
  UPDATE fighters 
  SET losses = ${fighter.losses + 1} 
  WHERE fighters.username = $1`

  const queryParams = [fighter.username]

  return db.query(queryText, queryParams)
}

function insertNewFighter(
  fighter: string,
  wins: number,
  losses: number,
  draws: number,
) {
  return db.query(
    `--sql
    INSERT INTO fighters (username, wins, losses, draws) 
    VALUES ($1, $2, $3, $4)`,
    [fighter, wins, losses, draws],
  )
}

function getRanking() {
  const queryText = `--sql
  SELECT username, wins, losses, draws 
  FROM fighters 
  ORDER BY wins DESC, draws DESC`

  return db.query(queryText)
}

export const rankingRepository = {
  verifyExistingUserOnRanking,
  updateWins,
  updateLosses,
  insertNewFighter,
  getRanking,
}
