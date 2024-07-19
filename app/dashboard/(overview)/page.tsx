import { fetchRevenue } from '@/app/lib/data';


export default async function Page() {
  const revenue = await fetchRevenue(); // Fetch data inside the component

    return (
    
    <p>Dashboard Page</p>
    );
  }