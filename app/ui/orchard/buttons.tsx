// ui/orchard/buttons.tsx
import Link from 'next/link';

export function CreateAppleVariety() {
  return (
    <Link href="/dashboard/orchard/create">
      <a className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Add Apple Variety</a>
    </Link>
  );
}
