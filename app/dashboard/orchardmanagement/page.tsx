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

  return (
    <div className="w-full h-screen">
      <OrchardMap satelliteImageUrl={satelliteImageUrl} />
    </div>
  );
}