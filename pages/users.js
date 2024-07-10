// /pages/admin/users.js
import { useSession, signIn } from 'next-auth/react';
import Layout from '../../components/Layout';

export default function Users() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    signIn();
    return null;
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      {/* Add users management content here */}
    </Layout>
  );
}
