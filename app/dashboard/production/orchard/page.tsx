// app/dashboard/production/orchard/page.tsx
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import AppleVarietiesTable from '@/app/ui/orchard/table';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { AppleVarietiesTableSkeleton } from '@/app/ui/skeletons'; // Adjust path as necessary
import { fetchFilteredAppleVarieties, fetchAppleVarietiesPages } from '@/app/lib/data';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
  title: 'Orchard Management - Apple Varieties',
};

// Dynamically import the client component to avoid server-side rendering issues
const OrchardPlotManager = dynamic(() => import('@/app/ui/orchard/orchardplotmanager'), { ssr: false });

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

  const totalPages = await fetchAppleVarietiesPages(query);
  const appleVarieties = await fetchFilteredAppleVarieties(query, currentPage);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Orchard Management</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search apple varieties..." />
      </div>

      {/* Orchard Plot Management */}
      <OrchardPlotManager />

      <Suspense key={query + currentPage} fallback={<AppleVarietiesTableSkeleton />}>
        <AppleVarietiesTable appleVarieties={appleVarieties} query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
