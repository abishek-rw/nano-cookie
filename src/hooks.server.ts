import type { Handle } from '@sveltejs/kit';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { OpenAI } from "@langchain/openai";
import init from '$lib/server/actions/init';

export const handle: Handle = async ({ event, resolve }) => {
	const sqlite = new Database('./src/lib/server/db/fc.db');
	const db = drizzle(sqlite);
	event.locals.db = db;
	const model = new OpenAI({ temperature: 0 });
	event.locals.model = model;
	const executor = await init(db, model);
	event.locals.executor = executor;
	const response = await resolve(event);
	return response;
};
