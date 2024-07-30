import { Amplify  } from 'aws-amplify';
import { Supplier } from '@/app/lib/definitions'; // Make sure the Supplier model is correctly imported
import awsconfig from '@/amplify_outputs.json'; // Adjust the path according to your project structure
import { type Schema } from '@/amplify/data/resource';
import { generateClient } from 'aws-amplify/data';

Amplify.configure(awsconfig);

const client = generateClient<Schema>();


export async function createExampleSuppliers() {
  try {
    const supplier1 = await client.models.Suppliers.create({
        name: 'Supplier One',
        email: 'supplier1@example.com',
        phone: '123-456-7890',
        address: '123 Main St, Hometown, USA',
      });

    const supplier2 = await client.models.Suppliers.create({
        name: 'Supplier Two',
        email: 'supplier2@example.com',
        phone: '098-765-4321',
        address: '456 Elm St, Another Town, USA',
      });
    console.log('Suppliers created successfully:', supplier1, supplier2);
  } catch (error) {
    console.error('Error creating suppliers:', error);
  }
}

createExampleSuppliers();