'use client';

import { useState } from 'react';
import { SupplierState } from '@/app/lib/actions';
import { createSupplier } from '@/app/lib/actions'; // Ensure this is the correct path
import Link from 'next/link';
import { Button } from '@/app/ui/button';


export default function SupplierCreateForm() {
  const [state, setState] = useState<SupplierState>({ message: null, errors: {} });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const result = await createSupplier(state, formData);
    if (result?.errors) {
      setState({ ...state, errors: result.errors, message: result.message });
    } else {
      setState({ ...state, message: result?.message });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Supplier Name */}
        <div className="mb-4">
          <label htmlFor="supplierName" className="mb-2 block text-sm font-medium">
            Supplier Name
          </label>
          <div className="relative">
            <input
              id="supplierName"
              name="supplierName"
              type="text"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Enter supplier name"
            />
          </div>
          {state.errors?.supplierName && (
            <p className="mt-2 text-sm text-red-500">
              {state.errors.supplierName}
            </p>
          )}
        </div>

        {/* Supplier Email */}
        <div className="mb-4">
          <label htmlFor="supplierEmail" className="mb-2 block text-sm font-medium">
            Supplier Email
          </label>
          <div className="relative">
            <input
              id="supplierEmail"
              name="supplierEmail"
              type="email"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Enter supplier email"
            />
          </div>
          {state.errors?.supplierEmail && (
            <p className="mt-2 text-sm text-red-500">
              {state.errors.supplierEmail}
            </p>
          )}
        </div>

        {/* Supplier Phone */}
        <div className="mb-4">
          <label htmlFor="supplierPhone" className="mb-2 block text-sm font-medium">
            Supplier Phone
          </label>
          <div className="relative">
            <input
              id="supplierPhone"
              name="supplierPhone"
              type="text"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Enter supplier phone"
            />
          </div>
          {state.errors?.supplierPhone && (
            <p className="mt-2 text-sm text-red-500">
              {state.errors.supplierPhone}
            </p>
          )}
        </div>

        {/* Supplier Address */}
        <div className="mb-4">
          <label htmlFor="supplierAddress" className="mb-2 block text-sm font-medium">
            Supplier Address
          </label>
          <div className="relative">
            <input
              id="supplierAddress"
              name="supplierAddress"
              type="text"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Enter supplier address"
            />
          </div>
          {state.errors?.supplierAddress && (
            <p className="mt-2 text-sm text-red-500">
              {state.errors.supplierAddress}
            </p>
          )}
        </div>

        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="my-2 text-sm text-red-500">{state.message}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/production/suppliers"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Supplier</Button>
      </div>
    </form>
  );
}
