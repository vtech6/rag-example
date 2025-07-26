import { createQuery } from "../../utils/createEndpoint"
import { Express } from "express"

const getStatus = (app: Express) =>
    createQuery({
        app,
        endpoint: "status",
        resolver: async (_, res) => {
            const data = {
                uptime: process.uptime(),
                message: "Up and running",
                date: new Date(),
            }
            res.status(200).send(data)
        },
    })

export default getStatus
