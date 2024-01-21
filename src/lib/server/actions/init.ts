import { ChatOpenAI } from '@langchain/openai';
import { SqlDatabase } from "langchain/sql_db";
import { SqlToolkit } from "langchain/agents/toolkits/sql";
import { Calculator } from "langchain/tools/calculator";
import { createOpenAIFunctionsAgent, AgentExecutor } from "langchain/agents";
import { DataSource } from "typeorm";
import type { ChatPromptTemplate } from "langchain/prompts";
import { pull } from "langchain/hub";
import { Pinecone } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { createRetrieverTool } from "langchain/tools/retriever";
import dotenv from 'dotenv';
dotenv.config();

export default async function init() {
    const pinecone = new Pinecone();
    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);
    const vectorStore = await PineconeStore.fromExistingIndex(
        new OpenAIEmbeddings(),
        { pineconeIndex }
    );
    const retriever = vectorStore.asRetriever();
    const retrieverTool = createRetrieverTool(retriever, {
        name: "tool_search",
        description:
            "Search for information about Tools. For any questions about specific Tools, you must use this tool!",
    });
    const db = new DataSource({
        type: "sqlite",
        database: "./src/lib/server/db/fc.db",
    });
    const sql = await SqlDatabase.fromDataSourceParams({
        appDataSource: db
    });
    const SqlToolKit = new SqlToolkit(sql);
    const sqlTools = SqlToolKit.getTools();
    const tools = [retrieverTool, new Calculator(), ...sqlTools]
    const model = new ChatOpenAI({
        temperature: 0,
        openAIApiKey: process.env.OPENAI_API_KEY,
        modelName: "gpt-3.5-turbo"
    })
    const prompt = await pull<ChatPromptTemplate>(
        "hwchase17/openai-functions-agent"
    );
    const agent = await createOpenAIFunctionsAgent({
        llm: model,
        tools,
        prompt,
    });
    const agentExecutor = new AgentExecutor({
        agent,
        tools,
        returnIntermediateSteps: true,
    });
    return agentExecutor
}
