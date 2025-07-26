import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { Document } from "@langchain/core/documents"
import chunkDocuments from "./chunkDocuments"

const parsePdf = async (
    file: File
): Promise<Document<Record<string, any>>[]> => {
    const loader = new PDFLoader(file)
    const documents = await loader.load()

    return await chunkDocuments(documents)
}

export default parsePdf
