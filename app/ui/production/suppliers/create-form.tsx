'use client';

import { useState } from 'react';
import { InboxIcon, PhoneIcon, MapIcon, UserCircleIcon, SunIcon, BeakerIcon, ArchiveBoxIcon, EllipsisHorizontalCircleIcon } from '@heroicons/react/24/outline';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createSupplier, SupplierState } from '@/app/lib/actions';


export default function SupplierForm() {
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
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Supplier Name
          </label>
          <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter supplier name"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="name-error"
            />

          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Supplier Email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Supplier Email
          </label>
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter supplier email"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="email-error"
            />
            <InboxIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email &&
              state.errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Supplier Phone */}
        <div className="mb-4">
          <label htmlFor="phone" className="mb-2 block text-sm font-medium">
            Supplier Phone
          </label>
          <div className="relative">
            <input
              id="phone"
              name="phone"
              type="text"
              placeholder="Enter supplier phone number"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="phone-error"
            />
            <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          <div id="phone-error" aria-live="polite" aria-atomic="true">
            {state.errors?.phone &&
              state.errors.phone.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Supplier Address */}
        <div className="mb-4">
          <label htmlFor="address" className="mb-2 block text-sm font-medium">
            Supplier Address
          </label>
          <div className="relative">
            <input
              id="address"
              name="address"
              type="text"
              placeholder="Enter supplier address"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="address-error"
            />
            <MapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          <div id="address-error" aria-live="polite" aria-atomic="true">
            {state.errors?.address &&
              state.errors.address.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Supplier Type */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">
            Supplier Type
          </label>
          <div className="flex flex-wrap gap-4">
            {[
              { name: 'apples', icon: SunIcon, label: 'Apples' },
              { name: 'additives', icon: BeakerIcon, label: 'Additives' },
              { name: 'packaging', icon: ArchiveBoxIcon, label: 'Packaging' },
              { name: 'other', icon: EllipsisHorizontalCircleIcon, label: 'Other' },
            ].map(({ name, icon: Icon, label }) => (
              <label key={name} className="flex items-center space-x-2 cursor-pointer bg-white rounded-md p-2 border border-gray-200">
                <Icon className="h-6 w-6 text-gray-500" />
                <span className="text-sm">{label}</span>
                <input
                  type="checkbox"
                  name={`type_${name}`}
                  className="form-checkbox h-5 w-5 text-blue-600 ml-2"
                />
              </label>
            ))}
          </div>
          <div id="type-error" aria-live="polite" aria-atomic="true">
            {state.errors?.type &&
              state.errors.type.map((error: string) => (
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