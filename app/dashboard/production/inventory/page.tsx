import Pagination from '@/app/ui/production/inventory/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/production/inventory/table';
import { CreateItem } from '@/app/ui/production/inventory/buttons';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { ItemsTableSkeleton } from '@/app/ui/skeletons';
import { fetchItemPages, fetchFilteredItems } from '@/app/lib/data';
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
    const totalPages = await fetchItemPages(query);

    const defaultSupplierTypeOrder = ['apples', 'additives', 'packaging', 'other'];
    const items = await fetchFilteredItems(query, currentPage, null, 'asc', defaultSupplierTypeOrder);

    if (items.length === 0) {
      console.log('No items found');
    }

    return (
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`${lusitana.className} text-2xl`}>Inventory</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search Inventory..." />
          <CreateItem />
        </div>
        <Suspense key={query + currentPage} fallback={<ItemsTableSkeleton />}>
          <Table query={query} currentPage={currentPage} />
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching Inventory:', error);
    notFound();
  }
}