// app/dashboard/production/orchard/page.tsx

import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reporting - Financial Reports',
};


export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {


  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Financial Reports</h1>
      </div>
    </div>
  );
}
