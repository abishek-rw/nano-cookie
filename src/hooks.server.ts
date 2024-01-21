import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import init from '$lib/server/actions/init';

export const handle = async ({ event, resolve }) => {
	const sqlite = new Database('./src/lib/server/db/fc.db');
	const db = drizzle(sqlite);
	event.locals.db = db;
	const executor = await init();
	event.locals.executor = executor;
	const response = await resolve(event);
	return response;
};
