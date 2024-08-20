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
      id: a.id(),
      name: a.string().required(),
      email: a.email().required(),
      phone: a.phone().required(),
      address: a.string().required(),
      type: a.string().array().required(),
    }).authorization((allow) => [allow.publicApiKey()]),


    Item: a.model({
      id: a.id(),
      name: a.string().required(),
      supplier_type: a.string(),
      supplier_id: a.id(),
      quantity: a.integer().required(),
      uom: a.string().required(), // Unit of Measurement
      price: a.float(),
    }).authorization((allow) => [allow.publicApiKey()]),

    AppleItemDetails: a.model({
      id: a.id(),
      item_id: a.id().required(), // Foreign key to Item table
      organic_grown: a.boolean().required(),
      pesticides_used: a.boolean().required(),
      pesticide_type: a.string(),
      last_pesticide_date: a.date(),
      animals_in_orchard: a.boolean().required(),
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


    Plot: a.model({
      id: a.id(),
      name: a.string().required(),
      rows: a.integer().required(),
      columns: a.integer().required(),
    }).authorization((allow) => [allow.publicApiKey()]),

    Tree: a.model({
      id: a.id(),
      variety: a.string().required(),
      rootstock: a.string().required(),
      scionwood: a.string().required(),
      yearPlanted: a.integer().required(),
      row: a.integer().required(),
      column: a.integer().required(),
      status: a.enum(['healthy', 'diseased', 'treated', 'removed']),
      lastPruned: a.date(),
      lastFertilized: a.date(),
      lastPesticide: a.date(),
      notes: a.string(),
      yield: a.float(),
      lastHarvestDate: a.date(),
      // Timestamps
      createdAt: a.datetime(),
      updatedAt: a.datetime(),
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
