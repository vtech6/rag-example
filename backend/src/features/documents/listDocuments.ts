import { createQuery } from "../../utils/createEndpoint"
import { Express } from "express"
import { sequelize } from "../db/db"

const listDocuments = (app: Express) =>
    createQuery({
        app,
        endpoint: "files",
        resolver: async (_, res) => {
            try {
                const result = await sequelize.query(
                    "SELECT DISTINCT group_id FROM documents"
                )
                const fileNames = result[0]
                return res.json({ files: fileNames })
            } catch (e) {
                console.error(e)
                return res.status(400).send()
            }
        },
    })

export default listDocuments
