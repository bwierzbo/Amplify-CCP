import Form from '@/app/ui/production/inventory/edit-form';
import Breadcrumbs from '@/app/ui/sales/invoices/breadcrumbs';
import { fetchItemById, fetchItems, fetchSuppliers } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [item, suppliers] = await Promise.all([
    fetchItemById(id),
    fetchSuppliers(),
  ]);

  if (!item) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Items', href: '/dashboard/production/inventory' },
          {
            label: 'Edit Item',
            href: `/dashboard/production/inventory/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form item={item} suppliers={suppliers} />
    </main>
  );
}