import { lusitana } from '@/app/ui/fonts';
import { Metadata } from 'next';
import OrchardMap from '@/app/ui/orchardmanagement/orchardmap';
import { fetchTrees } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'Orchard Management',
};

export default async function Page() {
  const trees = await fetchTrees();
  const satelliteImageUrl = '/aerialImage.png'; // Replace with your actual image path

  if (!trees || trees.length === 0) {
    return <div>Loading trees data...</div>;
  }

  // Log all trees to the console
  console.log('All trees:', JSON.stringify(trees, null, 2));



  return (
    <div className="w-full h-screen">
      <OrchardMap satelliteImageUrl={satelliteImageUrl} trees={trees} />
    </div>
  );
}