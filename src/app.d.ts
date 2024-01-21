// See https://kit.svelte.dev/docs/types#app

import type { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: BetterSQLite3Database<Record<string, never>>
			model: OpenAI<OpenAICallOptions>
			executor: AgentExecutor
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
