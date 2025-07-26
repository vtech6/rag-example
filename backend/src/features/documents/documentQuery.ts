import { createMutation } from "../../utils/createEndpoint"
import { Express } from "express"
import askChatGPT from "../rag/askChatGPT"

const documentQuery = (app: Express) =>
    createMutation({
        app,
        endpoint: "query",
        method: "POST",
        resolver: async (req, res) => {
            const body = req.fields as any
            if (!body) {
                return res.status(400).send()
            }
            const { question } = body
            if (!question) {
                return res.status(400).send()
            }

            try {
                const answer = await askChatGPT(question)
                console.log(answer)
                return res.json({ answer: answer })
            } catch (e) {
                console.error(e)
                return res.status(400).send()
            }
        },
    })

export default documentQuery
