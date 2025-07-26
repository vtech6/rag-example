import { createMutation } from "../../utils/createEndpoint"
import { Express } from "express"
import parsePdf from "../pdf/parsePdf"
import { getVectorManager, getVectorStore } from "../db/db"
import { index } from "langchain/indexes"
import checkIfExists from "../pdf/checkIfExists"

const upload = (app: Express) =>
    createMutation({
        app,
        endpoint: "upload",
        method: "POST",
        resolver: async (req, res) => {
            const files = req.files
            if (!files) {
                return res.status(400).send()
            }

            try {
                const file = files.file as any
                const name = file.name
                const alreadyExists = await checkIfExists(name)
                if (alreadyExists) {
                    return res.status(400).send()
                }
                const pdf = await parsePdf(file.path)
                const pdfsWithName = pdf.map((document) => ({
                    ...document,
                    metadata: { ...document.metadata, source: name },
                }))

                const vectorManager = getVectorManager()
                const vectorStore = await getVectorStore()

                const attempt = await index({
                    docsSource: pdfsWithName,
                    recordManager: vectorManager,
                    vectorStore,
                    options: {
                        cleanup: "incremental",
                        sourceIdKey: "source",
                    },
                })
                console.log(attempt)
                // Only returning for test purposes
                return res
                    .json({
                        pdfsWithName,
                    })
                    .status(200)
                    .send()
            } catch (e) {
                console.error(e)
                return res.status(400).send()
            }
        },
    })

export default upload
