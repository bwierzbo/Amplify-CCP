"use client";

import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import { useRouter } from 'next/navigation';
import outputs from '@/amplify_outputs.json';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(outputs);

export default function Home() {
  const router = useRouter();

  return (
    <Authenticator>
      {({ user }) => {
        if (user) {
          router.push('/dashboard');
          return <main><h1>Redirecting to dashboard...</h1></main>;
        }
        return <main><h1>Please sign in</h1></main>;
      }}
    </Authenticator>
  );
}