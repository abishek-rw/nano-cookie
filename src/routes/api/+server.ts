import { tools } from '$lib/server/db/schema';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals, url }) => {
    const query = url.searchParams.get('query');
    if(query){
        const data = await locals.executor.execute(query);
        return json(data);
    }
	const data = await locals.db.select().from(tools);
	return json(data);
};