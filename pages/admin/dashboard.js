import { useSession, signIn } from 'next-auth/react';

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    signIn();
    return null;
  }

  return (
    <div>
      <h1>Welcome to the Admin Dashboard</h1>
      {/* Add your dashboard content here */}
    </div>
  );
}
