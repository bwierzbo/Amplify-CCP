import Form from '@/app/ui/sales/customers/create-form';
import Breadcrumbs from '@/app/ui/sales/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
  const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customers', href: '/dashboard/sales/customers' },
          {
            label: 'Create Customer',
            href: '/dashboard/sales/customers/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}