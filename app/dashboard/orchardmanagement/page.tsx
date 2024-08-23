import { lusitana } from '@/app/ui/fonts';
import { Metadata } from 'next';
import OrchardMap from '@/app/ui/orchardmanagement/orchardmap';
import { fetchTrees } from '@/app/lib/data';
import { importTrees, deleteAllTrees } from '@/import';



export const metadata: Metadata = {
  title: 'Orchard Management',
};

export default async function Page() {
  //await deleteAllTrees();
  let trees = await fetchTrees();
  
  if (!trees || trees.length === 2) {
    await importTrees();
    trees = await fetchTrees();
  }

  const satelliteImageUrl = '/aerialImage.png'; // Replace with your actual image path

  if (!trees || trees.length === 0) {
    return <div>Failed to load or import trees data.</div>;
  }

  // Log all trees to the console
  //console.log('All trees:', JSON.stringify(trees, null, 2));



  return (
    <div className="w-full h-screen overflow-hidden">
      <OrchardMap satelliteImageUrl={satelliteImageUrl} trees={trees} />
    </div>
  );
}