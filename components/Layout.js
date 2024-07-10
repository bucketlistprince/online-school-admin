// /components/Layout.js
import { useSession, signIn } from 'next-auth/react';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    signIn();
    return null;
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-2 bg-gray-100">
        {children}
      </main>
    </div>
  );
}
