import { getSession } from 'next-auth/react';
import Layout from '../../components/Layout';

export default function Dashboard() {
  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p>Welcome to the admin dashboard!</p>
      </div>
    </Layout>
  );
}

