import Form from '@/app/ui/suppliers/create-form';
import Breadcrumbs from '@/app/ui/sales/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Suppliers', href: '/dashboard/production/suppliers' },
          {
            label: 'Create Supplier',
            href: '/dashboard/production/suppliers/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}