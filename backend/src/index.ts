import express, { Express, json } from "express"
import "dotenv/config"
import cors from "cors"
import { toNodeHandler } from "better-auth/node"
import "reflect-metadata"
import { auth } from "./utils/auth"
import getStatus from "./features/status/getStatus"

const app: Express = express()

app.all(
    "/api/auth/*",
    cors({ credentials: true, origin: true }),
    toNodeHandler(auth)
)
app.use(cors({ credentials: true, origin: true }))
app.options("*", cors({ credentials: true, origin: true }))
app.use(json())

getStatus(app)

app.listen(process.env.BETTER_AUTH_PORT, () => {
    console.log(`App is listening on port ${process.env.BETTER_AUTH_PORT}`)
})

export default app
