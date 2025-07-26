import { ChatOpenAI } from "@langchain/openai"
import { ChatPromptTemplate } from "@langchain/core/prompts"
import { getVectorStore } from "../db/db"

const askChatGPT = async (question: string) => {
    const vectorStore = await getVectorStore()

    const retriever = vectorStore.asRetriever({ k: 2 })
    const prompt =
        ChatPromptTemplate.fromTemplate(`Answer the question based only 
on the following context:
{context}

Question: {question}
`)

    const llm = new ChatOpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" })
    const chain = prompt.pipe(llm)
    const chunks = await retriever.invoke(question)

    return await chain.invoke({
        context: chunks,
        question,
    })
}

export default askChatGPT
