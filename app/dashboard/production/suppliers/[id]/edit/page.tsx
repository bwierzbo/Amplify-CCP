import Form from '@/app/ui/suppliers/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchSupplierById, fetchSuppliers } from '@/app/lib/data';
import { notFound } from 'next/navigation';



 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [invoice, customers] = await Promise.all([
        fetchSupplierById(id),
        fetchSuppliers(),
      ]);

      if (!invoice) {
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
      <Form />
    </main>
  );
}