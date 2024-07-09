import { getSession } from 'next-auth/react';
import Layout from '../../components/Layout';

export default function Courses() {
  return (
    <Layout>
      <h1 className="text-3xl mb-6">Course Management</h1>
      {/* Add course management content here */}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
