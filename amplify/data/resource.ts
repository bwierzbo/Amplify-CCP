import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({

    User: a.model({
      id: a.id(),
      name: a.string().required(),
      email: a.email().required(),
      password: a.string().required(),
  }).authorization((allow) => [allow.publicApiKey()]),

    Customer: a.model({
      id: a.id(),
      name: a.string().required(),
      email: a.email().required(),
      image_url: a.string().required(),
    }).authorization((allow) => [allow.publicApiKey()]),

    Invoice: a.model({
      id: a.id(),
      customer_id: a.id().required(),
      amount: a.integer().required(),
      date: a.date().required(),
      status: a.string().required(),
    }).authorization((allow) => [allow.publicApiKey()]),

    Revenue: a.model({
      month: a.string().required(),
      revenue: a.integer().required(),
    }).authorization((allow) => [allow.publicApiKey()]),

    Suppliers: a.model({
      id: a.id().required(),
      name: a.string().required(),
      email: a.email().required(),
      phone: a.phone().required(),
      address: a.string().required(),
    }).authorization((allow) => [allow.publicApiKey()]),

    
    SupplierAppleVariety: a.model({
      id: a.id().required(),
      supplier_id: a.id().required(), // Foreign key linking to the Supplier table
      apple_variety_id: a.id().required(), // Foreign key linking to the AppleVarieties table
      quantity: a.integer().required(), // Quantity supplied
    }).authorization((allow) => [allow.publicApiKey()]),

    
    AppleVarieties: a.model({
      id: a.id(),
      name: a.string().required(), //Name of the apple variety.
      description: a.string().required(), //Description of the apple variety.
      harvest_season: a.string().required(), //The typical season or time period when this variety is harvested.
    }).authorization((allow) => [allow.publicApiKey()]),

    HarvestRecords: a.model({
      id: a.id(),
      apple_variety_id: a.id().required(), //Foreign key linking to the AppleVarieties table.
      quantity: a.integer().required(), //Quantity of apples harvested (in lbs buschels or bins).
      quality: a.string().required(), //Quality rating of the harvested apples (e.g., Grade A, B, C). Up to client
      harvest_date: a.date().required(), //Date when the apples were harvested.
    }).authorization((allow) => [allow.publicApiKey()]),

    OrchardPlot: a.model({
      id: a.id(),
      name: a.string().required(),
      treeIDs: a.id().array().required(),
    }).authorization((allow) => [allow.publicApiKey()]),
  
    Tree: a.model({
      id: a.id(),
      plotId: a.id().required(),
      name: a.string().required(),
      yearPlanted: a.string().required(),
      rootstock: a.string().required(),
      scionwood: a.string().required(),
    }).authorization((allow) => [allow.publicApiKey()]),

    
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
