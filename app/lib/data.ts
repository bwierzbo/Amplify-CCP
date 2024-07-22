import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
} from './definitions';
import { formatCurrency } from './utils';
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '@/amplify/data/resource';
import outputs from '@/amplify_outputs.json'
import { Amplify } from 'aws-amplify';
import { createData } from '@/app/lib/placeholder-data'


Amplify.configure(outputs)
 

const client = generateClient<Schema>();




export async function fetchRevenue() {
  try {
    const { data, errors } = await client.models.Revenue.list();
    if (errors) {
      console.error('Error fetching revenue:', errors);
      throw new Error('Error fetching revenue data.');
    }
    return data.map( item => ({
      month: item.month ?? '',
      revenue: item.revenue ?? 0,
      createdAt: item.createdAt,
    }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    // Fetch invoices
    const invoiceResponse = await client.models.Invoice.list();
    const invoiceData = invoiceResponse.data;
    const invoiceErrors = invoiceResponse.errors;

    if (invoiceErrors) {
      console.error('Error fetching invoices:', invoiceErrors);
      throw new Error('Error fetching invoice data.');
    }

    // Fetch customer data for each invoice
    const latestInvoices = await Promise.all(invoiceData.map(async (invoice) => {
      const customerResponse = await client.models.Customer.get({ id: invoice.customer_id });
      const customerData = customerResponse.data;
      const customerErrors = customerResponse.errors;

      if (customerErrors || !customerData) {
        console.error(`Error fetching customer for invoice ${invoice.id}:`, customerErrors);
        throw new Error(`Error fetching customer data for invoice ${invoice.id}`);
      }

      return {
        ...invoice,
        name: customerData.name,
        image_url: customerData.image_url,
        email: customerData.email,
        amount: formatCurrency(invoice.amount),
      };
    }));

    // Sort by date and return the latest 5 invoices
    latestInvoices.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return latestInvoices.slice(0, 5);
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoices = await client.models.Invoice.list();
    const invoiceData = invoices.data;

    const customers = await client.models.Customer.list();
    const customerData = customers.data;

    // Calculate the required values
    const numberOfInvoices = invoiceData.length;
    const numberOfCustomers = customerData.length;


    const totalPaidInvoices = formatCurrency(
      invoiceData.reduce((sum, invoice) => {
        return invoice.status === true ? sum + invoice.amount : sum;
      }, 0)
    );

    const totalPendingInvoices = formatCurrency(
      invoiceData.reduce((sum, invoice) => {
        return invoice.status === false ? sum + invoice.amount : sum;
      }, 0)
    );

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(query: string, currentPage: number): Promise<InvoicesTable[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    // Fetch all invoices
    const invoiceResponse = await client.models.Invoice.list();
    const invoiceData = invoiceResponse.data;
    const invoiceErrors = invoiceResponse.errors;

    if (invoiceErrors) {
      console.error('Error fetching invoices:', invoiceErrors);
      throw new Error('Error fetching invoice data.');
    }

    // Fetch all customers
    const customerResponse = await client.models.Customer.list();
    const customerData = customerResponse.data;
    const customerErrors = customerResponse.errors;

    if (customerErrors) {
      console.error('Error fetching customers:', customerErrors);
      throw new Error('Error fetching customer data.');
    }

    // Filter invoices based on the query
    const filteredInvoices = invoiceData.filter(invoice => {
      const customer = customerData.find(cust => cust.id === invoice.customer_id);
      return (
        (customer && (
          customer.name.toLowerCase().includes(query.toLowerCase()) ||
          customer.email.toLowerCase().includes(query.toLowerCase())
        )) ||
        invoice.amount.toString().includes(query) ||
        invoice.date.toString().includes(query) ||
        invoice.status.toString().toLowerCase().includes(query.toLowerCase())
      );
    });

    // Sort invoices by date in descending order
    filteredInvoices.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Implement pagination
    const paginatedInvoices = filteredInvoices.slice(offset, offset + ITEMS_PER_PAGE);

    // Map the invoices to include customer data
    const invoicesWithCustomerData = paginatedInvoices.map(invoice => {
      const customer = customerData.find(cust => cust.id === invoice.customer_id);
      return {
        id: invoice.id as string,
        amount: invoice.amount,
        date: invoice.date,
        status: invoice.status ? 'paid' : 'pending',
        customer_id: invoice.customer_id, // Include the customer_id
        name: customer ? customer.name : '',
        email: customer ? customer.email : '',
        image_url: customer ? customer.image_url : '',
      };
    });

    return invoicesWithCustomerData as InvoicesTable[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    // Fetch all invoices
    const invoiceResponse = await client.models.Invoice.list();
    const invoiceData = invoiceResponse.data;
    const invoiceErrors = invoiceResponse.errors;

    if (invoiceErrors) {
      console.error('Error fetching invoices:', invoiceErrors);
      throw new Error('Error fetching invoice data.');
    }

    // Fetch all customers
    const customerResponse = await client.models.Customer.list();
    const customerData = customerResponse.data;
    const customerErrors = customerResponse.errors;

    if (customerErrors) {
      console.error('Error fetching customers:', customerErrors);
      throw new Error('Error fetching customer data.');
    }

    // Filter invoices based on the query
    const filteredInvoices = invoiceData.filter(invoice => {
      const customer = customerData.find(cust => cust.id === invoice.customer_id);
      return (
        (customer && (
          customer.name.toLowerCase().includes(query.toLowerCase()) ||
          customer.email.toLowerCase().includes(query.toLowerCase())
        )) ||
        invoice.amount.toString().includes(query) ||
        invoice.date.toString().includes(query) ||
        invoice.status.toString().toLowerCase().includes(query.toLowerCase())
      );
    });

    const totalPages = Math.ceil(filteredInvoices.length / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string): Promise<InvoiceForm> {
  try {
    // Fetch the invoice by ID
    const invoiceResponse = await client.models.Invoice.get({ id });
    const invoiceData = invoiceResponse.data;
    const invoiceErrors = invoiceResponse.errors;

    if (invoiceErrors || !invoiceData || !invoiceData.id) {
      console.error('Error fetching invoice:', invoiceErrors);
      throw new Error('Error fetching invoice data or invoice ID is null.');
    }

    // Convert amount from cents to dollars
    const invoice: InvoiceForm = {
      id: invoiceData.id,
      customer_id: invoiceData.customer_id,
      amount: invoiceData.amount / 100,
      status: invoiceData.status ? 'paid' : 'pending',
    };

    return invoice;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers(): Promise<CustomerField[]> {
  try {
    // Fetch all customers
    const customerResponse = await client.models.Customer.list();
    const customerData = customerResponse.data;
    const customerErrors = customerResponse.errors;

    if (customerErrors) {
      console.error('Error fetching customers:', customerErrors);
      throw new Error('Error fetching customer data.');
    }

    // Map and sort the customers by name
    const customers: CustomerField[] = customerData
      .map(customer => ({
        id: customer.id as string,
        name: customer.name,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}


export async function fetchFilteredCustomers(query: string): Promise<CustomersTableType[]> {
  try {
    // Fetch all customers
    const customerResponse = await client.models.Customer.list();
    const customerData = customerResponse.data;
    const customerErrors = customerResponse.errors;

    if (customerErrors) {
      console.error('Error fetching customers:', customerErrors);
      throw new Error('Error fetching customer data.');
    }

    // Fetch all invoices
    const invoiceResponse = await client.models.Invoice.list();
    const invoiceData = invoiceResponse.data;
    const invoiceErrors = invoiceResponse.errors;

    if (invoiceErrors) {
      console.error('Error fetching invoices:', invoiceErrors);
      throw new Error('Error fetching invoice data.');
    }

    // Filter customers based on the query
    const filteredCustomers = customerData.filter(customer => {
      return (
        customer.name.toLowerCase().includes(query.toLowerCase()) ||
        customer.email.toLowerCase().includes(query.toLowerCase())
      );
    });

    // Calculate the total invoices, total pending, and total paid for each customer
    const customers = filteredCustomers.map(customer => {
      const customerInvoices = invoiceData.filter(invoice => invoice.customer_id === customer.id);

      const totalInvoices = customerInvoices.length;
      const totalPending = customerInvoices
        .filter(invoice => invoice.status === false)
        .reduce((sum, invoice) => sum + invoice.amount, 0);
      const totalPaid = customerInvoices
        .filter(invoice => invoice.status === true)
        .reduce((sum, invoice) => sum + invoice.amount, 0);

      return {
        id: customer.id as string,
        name: customer.name,
        email: customer.email,
        image_url: customer.image_url,
        total_invoices: totalInvoices,
        total_pending: totalPending,
        total_paid: totalPaid,
      };
    });

    // Sort the customers by name
    customers.sort((a, b) => a.name.localeCompare(b.name));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}
