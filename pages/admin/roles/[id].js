import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "components/Layout";

export default function RoleDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      async function fetchRole() {
        try {
          const response = await fetch(`/api/roles/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch role");
          }
          const data = await response.json();
          setRole(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
      fetchRole();
    }
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
          <div className="text-gray-700 text-lg">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
          <div className="text-red-600 text-lg">Error: {error}</div>
        </div>
      </Layout>
    );
  }

  if (!role) {
    return (
      <Layout>
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
          <div className="text-gray-700 text-lg">Role not found</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen">
        <div className="bg-gray-300 text-black p-4 sticky top-0 z-10 mb-4">
          <h1 className="text-2xl text-gray-600 font-bold">Role Details</h1>
        </div>
        <div className="bg-white p-4 m-4 rounded shadow border border-gray-300">
          <h2 className="text-2xl font-semibold mb-4">{role.name}</h2>
          {/* Add role editing functionality here */}
          <p><strong>ID:</strong> {role.id}</p>
          <p><strong>Role Name:</strong> {role.name}</p>
          {/* You can add more fields or functionality here */}
        </div>
      </div>
    </Layout>
  );
}
