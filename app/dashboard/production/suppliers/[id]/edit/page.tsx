import Form from '@/app/ui/suppliers/edit-form';
import Breadcrumbs from '@/app/ui/sales/invoices/breadcrumbs';
import { fetchSupplierById, fetchSuppliers } from '@/app/lib/data';
import { notFound } from 'next/navigation';



 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const supplier = await fetchSupplierById(id);

      if (!supplier) {
        notFound();
      }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Suppliers', href: '/dashboard/production/suppliers' },
          {
            label: 'Edit Supplier',
            href: `/dashboard/production/suppliers/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form supplier={supplier} />
    </main>
  );
}