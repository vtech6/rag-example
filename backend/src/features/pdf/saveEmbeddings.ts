import { Document } from "@langchain/core/documents"

import { getVectorStore } from "../db/db"

const saveEmbeddings = async (documents: Document[]) => {
    const vectorStore = await getVectorStore()
    await vectorStore.addDocuments(documents)
}

export default saveEmbeddings
