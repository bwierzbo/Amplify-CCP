import { DeleteSupplier, UpdateSupplier } from '@/app/ui/suppliers/buttons';
import { fetchFilteredSuppliers } from '@/app/lib/data';
import { formatDateToLocal } from '@/app/lib/utils';

export default async function SuppliersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const suppliers = await fetchFilteredSuppliers(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {suppliers?.map((supplier) => (
              <div
                key={supplier.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{supplier.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{supplier.email}</p>
                    <p className="text-sm text-gray-500">{supplier.phone}</p>
                    <p className="text-sm text-gray-500">{supplier.address}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    <UpdateSupplier id={supplier.id} />
                    <DeleteSupplier id={supplier.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Supplier Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Phone
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Address
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Created At
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {suppliers?.map((supplier) => (
                <tr
                  key={supplier.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {supplier.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {supplier.phone}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {supplier.address}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateSupplier id={supplier.id} />
                      <DeleteSupplier id={supplier.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}