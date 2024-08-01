// /components/Layout.js
import { useSession, signIn } from 'next-auth/react';
import Sidebar from './Sidebar';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Layout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Wait until session is loaded

    if (!session) {
      signIn(); // Redirect to sign-in page if not authenticated
    } else if (session.user.role === 'student') {
      router.push('/'); // Redirect students to the home page
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session || session.user.role === 'student') {
    return null; // Don't render anything if unauthorized
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gray-100">
        {children}
      </main>
    </div>
  );
}
