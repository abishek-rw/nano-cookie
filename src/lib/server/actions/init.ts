import type { OpenAI, OpenAICallOptions } from '@langchain/openai';
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { SqlDatabase } from "langchain/sql_db";
import { createSqlAgent, SqlToolkit } from "langchain/agents/toolkits/sql";

export default async function init(
	db: BetterSQLite3Database<Record<string, never>>,
	model: OpenAI<OpenAICallOptions>
) {
    const sql = await SqlDatabase.fromDataSourceParams({
        appDataSource: db
    });
    const toolkit = new SqlToolkit(sql);
    const agentExecutor = createSqlAgent(model, toolkit);
    return agentExecutor;
}
