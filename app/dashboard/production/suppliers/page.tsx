import Pagination from '@/app/ui/production/suppliers/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/production/suppliers/table';
import { CreateSupplier } from '@/app/ui/production/suppliers/buttons';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { SuppliersTableSkeleton } from '@/app/ui/skeletons';
import { fetchSuppliersPages, fetchFilteredSuppliers } from '@/app/lib/data';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  try {
    const totalPages = await fetchSuppliersPages(query);
    console.log('Total pages:', totalPages);

    const suppliers = await fetchFilteredSuppliers(query, currentPage);
    console.log('Fetched suppliers:', suppliers);

    if (suppliers.length === 0) {
      console.log('No suppliers found');
    }

    return (
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`${lusitana.className} text-2xl`}>Suppliers</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search Suppliers..." />
          <CreateSupplier />
        </div>
        <Suspense key={query + currentPage} fallback={<SuppliersTableSkeleton />}>
          <Table query={query} currentPage={currentPage} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    notFound();
  }
}