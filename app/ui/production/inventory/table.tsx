'use client';

import { UpdateItem, DeleteItem } from '@/app/ui/production/inventory/buttons';
import { fetchFilteredItems } from '@/app/lib/data';
import { formatCurrency } from '@/app/lib/utils';
import { SunIcon, BeakerIcon, ArchiveBoxIcon, EllipsisHorizontalCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { use } from 'react';

const typeIcons = {
  apples: SunIcon,
  additives: BeakerIcon,
  packaging: ArchiveBoxIcon,
  other: EllipsisHorizontalCircleIcon,
};

const typeNames = {
  apples: 'Apples',
  additives: 'Additives',
  packaging: 'Packaging',
  other: 'Other',
};

export default function ItemsTable({
    query,
    currentPage,
  }: {
    query: string;
    currentPage: number;
  }) {
    const [sortColumn, setSortColumn] = useState<string | null>('supplier_type');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [supplierTypeOrder, setSupplierTypeOrder] = useState<string[]>(['apples', 'additives', 'packaging', 'other']);
  
    const handleSort = (column: string) => {
      if (column === 'supplier_type') {
        setSupplierTypeOrder((prevOrder) => {
          const newOrder = [...prevOrder];
          newOrder.push(newOrder.shift()!);
          return newOrder;
        });
      } else {
        if (sortColumn === column) {
          setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
          setSortColumn(column);
          setSortDirection('asc');
        }
      }
    };
  
    const items = use(fetchFilteredItems(query, currentPage, sortColumn, sortDirection, supplierTypeOrder));

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {items?.map((item) => (
              <div
                key={item.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p className="font-medium">{item.name}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {item.supplier_type && (
                        <div className="relative group">
                          {(() => {
                            const Icon = typeIcons[item.supplier_type as keyof typeof typeIcons] || EllipsisHorizontalCircleIcon;
                            const typeName = typeNames[item.supplier_type as keyof typeof typeNames] || 'Unknown';
                            return (
                              <>
                                <Icon className="h-5 w-5 text-gray-500" />
                                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  {typeName}
                                </span>
                              </>
                            );
                          })()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(item.price)}
                    </p>
                    <p>{item.quantity} {item.uom}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateItem id={item.id} />
                    <DeleteItem id={item.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                {[
                  { key: 'name', label: 'Name' },
                  { key: 'supplier_type', label: 'Supplier Type' },
                  { key: 'quantity', label: 'Quantity' },
                  { key: 'uom', label: 'UOM' },
                  { key: 'price', label: 'Price' },
                ].map(({ key, label }) => (
                  <th
                    key={key}
                    scope="col"
                    className="px-3 py-5 font-medium cursor-pointer"
                    onClick={() => handleSort(key)}
                  >
                    {label}
                    {key === 'supplier_type' ? (
                      <span className="ml-1">
                        {(() => {
                          const IconComponent = typeIcons[supplierTypeOrder[0] as keyof typeof typeIcons];
                          return <IconComponent className="inline h-5 w-5" />;
                        })()}
                      </span>
                    ) : sortColumn === key && (
                      <span className="ml-1">
                        {sortDirection === 'asc' ? '▲' : '▼'}
                      </span>
                    )}
                  </th>
                ))}
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {items?.map((item) => (
                <tr
                  key={item.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{item.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <div className="flex items-center gap-1">
                      {item.supplier_type && (
                        <div className="relative group">
                          {(() => {
                            const Icon = typeIcons[item.supplier_type as keyof typeof typeIcons] || EllipsisHorizontalCircleIcon;
                            const typeName = typeNames[item.supplier_type as keyof typeof typeNames] || 'Unknown';
                            return (
                              <>
                                <Icon className="h-5 w-5 text-gray-500" />
                                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  {typeName}
                                </span>
                              </>
                            );
                          })()}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {item.quantity}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {item.uom}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(item.price)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateItem id={item.id} />
                      <DeleteItem id={item.id} />
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