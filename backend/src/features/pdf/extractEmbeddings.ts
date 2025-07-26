import { Document } from "@langchain/core/documents"
import { OpenAIEmbeddings } from "@langchain/openai"
const extractEmbeddings = async (documents: Document[]) => {
    const embeddingModel = new OpenAIEmbeddings()
    const embeddings = await embeddingModel.embedDocuments(
        documents.map((document) => document.pageContent)
    )
}

export default extractEmbeddings
