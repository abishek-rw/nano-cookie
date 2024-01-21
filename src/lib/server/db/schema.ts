import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const tools = sqliteTable('tools',{
    id: integer('id').primaryKey(),
    tool_name: text('tool_name'),
    website: text('website'),
    tool_function: text('tool_function'),
    business_function: text('business_function'),
    industries_served: text('industries_served'),
    years_in_operation: integer('years_in_operation'),
    twitter: text('twitter'),
    num_twitter: text('num_twitter'),
    linkenin: text('linkenin'),
    num_linkedin: text('num_linkedin'),
    num_employees: text('num_employees'),
    revenue: text('revenue'),
    hq_location_city: text('hq_location_city'),
    hq_location_state: text('hq_location_state'),
    hq_location_country: text('hq_location_country'),
    key_clients: text('key_clients'),
    overview: text('overview'),
    users: text('users'),
    pricing_1: text('pricing_1'),
    pricing_2: text('pricing_2'),
    tool_features: text('tool_features'),
    integrations: text('integrations'),
    tech_details: text('tech_details'),
    pricing_json: text('pricing_json'),
    logo: text('logo'),
});

export {
    tools,
}