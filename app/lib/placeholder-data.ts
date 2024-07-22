// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '@/amplify/data/resource'
import outputs from '@/amplify_outputs.json'
import { Amplify } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid'; // Add UUID library for generating unique IDs

//in a file that needed data i would call this but just once

Amplify.configure(outputs)



const client = generateClient<Schema>();



export async function createData() {

  const user = await client.models.User.create({
    id: uuidv4(),
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
});

const customers = [
  {
    id: uuidv4(),
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: uuidv4(),
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: uuidv4(),
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: uuidv4(),
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: uuidv4(),
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: uuidv4(),
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
];
  try {
    const createCustomerPromises = customers.map(customer =>
      client.models.Customer.create(customer)
    );
    const customerResults = await Promise.all(createCustomerPromises);
    
    customerResults.forEach(({ data: newCustomer, errors }, index) => {
      if (errors) {
        console.error(`Error creating customer ${index + 1}:`, errors);
      } else {
        console.log(`Customer ${index + 1} created successfully:`, newCustomer);
      }
    });
  } catch (error) {
    console.error('Error creating multiple customers:', error);
  }
const revenues = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

try {
  const createRevenuePromises = revenues.map(revenue => 
    client.models.Revenue.create(revenue)
  );
  const results = await Promise.all(createRevenuePromises);

  results.forEach(({ data: newRevenue, errors }, index) => {
    if (errors) {
      console.error(`Error creating revenue ${index + 1}:`, errors);
    } else {
      console.log(`Revenue ${index + 1} created successfully:`, newRevenue);
    }
  });
} catch (error) {
  console.error('Error creating multiple revenues:', error);
}

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: false,
    date: '2022-12-06',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: false,
    date: '2022-11-14',
  },
  {
    customer_id: customers[4].id,
    amount: 3040,
    status: true,
    date: '2022-10-29',
  },
  {
    customer_id: customers[3].id,
    amount: 44800,
    status: true,
    date: '2023-09-10',
  },
  {
    customer_id: customers[5].id,
    amount: 34577,
    status: false,
    date: '2023-08-05',
  },
  {
    customer_id: customers[2].id,
    amount: 54246,
    status: false,
    date: '2023-07-16',
  },
  {
    customer_id: customers[0].id,
    amount: 666,
    status: false,
    date: '2023-06-27',
  },
  {
    customer_id: customers[3].id,
    amount: 32545,
    status: true,
    date: '2023-06-09',
  },
  {
    customer_id: customers[4].id,
    amount: 1250,
    status: true,
    date: '2023-06-17',
  },
  {
    customer_id: customers[5].id,
    amount: 8546,
    status: true,
    date: '2023-06-07',
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: true,
    date: '2023-08-19',
  },
  {
    customer_id: customers[5].id,
    amount: 8945,
    status: true,
    date: '2023-06-03',
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: true,
    date: '2022-06-05',
  },
]

try {
  const createInvoicePromises = invoices.map(invoice => 
    client.models.Invoice.create(invoice)
  );
  const results = await Promise.all(createInvoicePromises);

  results.forEach(({ data: newInvoice, errors }, index) => {
    if (errors) {
      console.error(`Error creating invoice ${index + 1}:`, errors);
    } else {
      console.log(`Invoice ${index + 1} created successfully:`, newInvoice);
    }
  });
} catch (error) {
  console.error('Error creating multiple invoices:', error);
}
}
 