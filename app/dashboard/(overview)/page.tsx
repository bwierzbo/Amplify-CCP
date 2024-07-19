"use client";

import { fetchRevenue } from '@/app/lib/data';
import outputs from "@/amplify_outputs.json";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { useState, useEffect } from "react";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function Page() {
  const [revenue, setRevenue] = useState<Array<Schema["Revenue"]["type"]>>([]);

  function listTodos() {
    client.models.Revenue.observeQuery().subscribe({
      next: (data) => setRevenue([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createRevenue() {

    client.models.Revenue.create({
      month: window.prompt("month content"),
      revenue: 500,
    });
  }

    return (
    
      <main>
      <h1>My todos</h1>
      <button onClick={createRevenue}>+ new</button>
      <ul>
        {revenue.map((revenue) => (
          <li key={revenue.id}>{revenue.month} {revenue.revenue}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
          Review next steps of this tutorial.
        </a>
      </div>
    </main>
    );
  }