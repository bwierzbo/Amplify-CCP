"use client";

import SideNav from '@/app/ui/dashboard/sidenav';
import { Authenticator } from '@aws-amplify/ui-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    // This effect will run on component mount and update
    // It will check if the user is authenticated
    const checkAuth = async () => {
      try {
        // Replace this with your actual authentication check
        const user = await getCurrentUser();
        if (!user) {
          router.push('/');
        }
      } catch (error) {
        console.error('Authentication check failed', error);
        router.push('/');
      }
    };

    checkAuth();
  }, [router]);

  return (
    <Authenticator>
      {({ user }) => (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SideNav />
          </div>
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
            {user ? children : <div>Loading...</div>}
          </div>
        </div>
      )}
    </Authenticator>
  );
}