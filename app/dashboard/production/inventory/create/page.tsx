import Form from '@/app/ui/production/inventory/create-form';
import Breadcrumbs from '@/app/ui/sales/invoices/breadcrumbs';
import { fetchSuppliers } from '@/app/lib/data';

export default async function Page() {
  const suppliers = await fetchSuppliers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Inventory', href: '/dashboard/production/inventory' },
          {
            label: 'Create Item',
            href: '/dashboard/production/inventory/create',
            active: true,
          },
        ]}
      />
      <Form suppliers={suppliers} />
    </main>
  );
}