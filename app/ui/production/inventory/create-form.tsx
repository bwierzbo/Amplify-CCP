'use client';

import { useState } from 'react';
import { InboxIcon, CurrencyDollarIcon, ScaleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createItem, ItemState } from '@/app/lib/actions';
import { Supplier } from '@/app/lib/definitions';
import { formatCurrency } from '@/app/lib/utils';

const uomOptions = {
    apples: [
      { value: 'bushels', label: 'Bushels' },
      { value: 'bins', label: 'Bins' },
      { value: 'lbs', label: 'Pounds (lbs)' },
    ],
    additives: [
      { value: 'kg', label: 'Kilogram (kg)' },
      { value: 'g', label: 'Gram (g)' },
      { value: 'l', label: 'Liter (l)' },
      { value: 'ml', label: 'Milliliter (ml)' },
    ],
    packaging: [
      { value: 'pcs', label: 'Pieces (pcs)' },
      { value: 'boxes', label: 'Boxes' },
      { value: 'rolls', label: 'Rolls' },
    ],
    other: [
      { value: 'kg', label: 'Kilogram (kg)' },
      { value: 'g', label: 'Gram (g)' },
      { value: 'l', label: 'Liter (l)' },
      { value: 'ml', label: 'Milliliter (ml)' },
      { value: 'pcs', label: 'Pieces (pcs)' },
    ],
  };


export default function ItemForm({ suppliers }: { suppliers: Supplier[] }) {
  const [state, setState] = useState<ItemState>({ message: null, errors: {} });
  const [selectedSupplierType, setSelectedSupplierType] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const result = await createItem(state, formData);
    if (result?.errors) {
      setState({ ...state, errors: result.errors, message: result.message });
    } else {
      setState({ ...state, message: result?.message });
    }
  };

  const handleSupplierTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSupplierType(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Supplier */}
        <div className="mb-4">
          <label htmlFor="supplier_id" className="mb-2 block text-sm font-medium">
            Supplier
          </label>
          <select
            id="supplier_id"
            name="supplier_id"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            defaultValue=""
            aria-describedby="supplier-error"
          >
            <option value="" disabled>Select a supplier</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
          <div id="supplier-error" aria-live="polite" aria-atomic="true">
            {state.errors?.supplier_id &&
              state.errors.supplier_id.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Supplier Type */}
        <div className="mb-4">
          <label htmlFor="supplier_type" className="mb-2 block text-sm font-medium">
            Supplier Type
          </label>
          <select
            id="supplier_type"
            name="supplier_type"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            defaultValue=""
            onChange={handleSupplierTypeChange}
            aria-describedby="supplier-type-error"
          >
            <option value="" disabled>Select supplier type</option>
            <option value="apples">Apples</option>
            <option value="additives">Additives</option>
            <option value="packaging">Packaging</option>
            <option value="other">Other</option>
          </select>
          <div id="supplier-type-error" aria-live="polite" aria-atomic="true">
            {state.errors?.supplier_type &&
              state.errors.supplier_type.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Item Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Item Name
          </label>
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter item name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="name-error"
            />
            <InboxIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="mb-4">
          <label htmlFor="quantity" className="mb-2 block text-sm font-medium">
            Quantity
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="quantity"
                name="quantity"
                type="number"
                step="1"
                placeholder="Enter quantity"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="quantity-error"
              />
              <ScaleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div id="quantity-error" aria-live="polite" aria-atomic="true">
            {state.errors?.quantity &&
              state.errors.quantity.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* UOM */}
        <div className="mb-4">
          <label htmlFor="uom" className="mb-2 block text-sm font-medium">
            Unit of Measurement
          </label>
          <select
            id="uom"
            name="uom"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            defaultValue=""
            aria-describedby="uom-error"
          >
            <option value="" disabled>Select UOM</option>
            {uomOptions[selectedSupplierType as keyof typeof uomOptions]?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div id="uom-error" aria-live="polite" aria-atomic="true">
            {state.errors?.uom &&
              state.errors.uom.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Price */}
        <div className="mb-4">
          <label htmlFor="price" className="mb-2 block text-sm font-medium">
            Price
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                placeholder="Enter price"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="price-error"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>
          <div id="price-error" aria-live="polite" aria-atomic="true">
            {state.errors?.price &&
              state.errors.price.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/production/inventory"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Item</Button>
      </div>
    </form>
  );
}