// app/dashboard/orchardmanagement/applevarieties/page.tsx
import Pagination from '@/app/ui/sales/invoices/pagination';
import Search from '@/app/ui/search';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { AppleVarietiesTableSkeleton } from '@/app/ui/skeletons'; // Adjust path as necessary
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: 'Orchard Management - Apple Varieties',
};


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


  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Apple Varieties</h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search apple varieties..." />
      </div>

      <Suspense key={query + currentPage} fallback={<AppleVarietiesTableSkeleton />}>
        {/* <AppleVarietiesTable query={query} currentPage={currentPage} /> */}
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        
      </div>
    </div>
  );
}