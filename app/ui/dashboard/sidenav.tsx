import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import OBCLogo from '@/app/ui/obc-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col px-3 py-4 md:px-2">
      <div className="flex items-center justify-between mb-4 md:mb-8">
        <div className="flex items-center justify-between rounded-md bg-blue-600 p-4 w-full">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none md:hidden"
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
          <Link href="/dashboard" className="w-32 text-white md:w-40">
            <OBCLogo />
          </Link>
        </div>
      </div>
      <div className={`flex-grow flex flex-col space-y-2 ${isOpen ? 'block' : 'hidden md:block'}`}>
        <NavLinks setIsOpen={setIsOpen} />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <button
          onClick={handleSignOut}
          className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <PowerIcon className="w-6" />
          <div className="md:block">Sign Out</div>
        </button>
      </div>
    </div>
  );
}