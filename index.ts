import express from "express"
import "express-async-errors"
import cors from "cors"
import dotenv from "dotenv"

import { compareTwoUsersStars } from "./controllers/battleController.js"
import { getRanking } from "./controllers/rankingController.js"

import { battleSchema } from "./schemas/battleSchema.js"

import { validateSchema } from "./middlewares/validateSchema.js"

import { errorHandler } from "./middlewares/errorHandler.js"
import { checkDifferentUser } from "./middlewares/checkdifferentUser.js"

dotenv.config()

const App = express()
App.use(express.json())
App.use(cors())

App.post(
  "/battle",
  validateSchema(battleSchema),
  checkDifferentUser,
  compareTwoUsersStars,
)
App.get("/ranking", getRanking)

App.use(errorHandler)

const port = +process.env.PORT || 4000
App.listen(port, () => {
  console.log(`Server online and listening on port ${port}`)
})
