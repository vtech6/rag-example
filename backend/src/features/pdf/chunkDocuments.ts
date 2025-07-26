import { Document } from "@langchain/core/documents"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"

const chunkDocuments = async (documents: Document[]) => {
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    })
    return await splitter.splitDocuments(documents)
}

export default chunkDocuments
