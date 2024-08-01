// /pages/admin/forums.js
import Layout from '../../components/Layout';

export default function Forums() {
  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-4">Forums</h1>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold">Discussion Forums</h2>
          {/* Replace with actual forum data */}
          <ul className="list-disc ml-4 mt-4">
            <li>Forum 1: "General Discussion about Math 101"</li>
            <li>Forum 2: "Assignment 1 Q&A"</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
