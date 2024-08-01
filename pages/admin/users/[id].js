import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "components/Layout";

export default function UserDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      async function fetchUser() {
        try {
          const response = await fetch(`/api/users/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch user");
          }
          const data = await response.json();
          setUser(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
      fetchUser();
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

  if (!user) {
    return (
      <Layout>
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
          <div className="text-gray-700 text-lg">User not found</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen">
        <div className="bg-gray-300 text-black p-4 sticky top-0 z-10 mb-4 flex justify-between">
          <h1 className="text-2xl text-gray-600 font-bold">User Details</h1>
        </div>
        <div className="bg-white p-4 m-4 rounded shadow border border-gray-300">
          <h2 className="text-2xl font-semibold mb-4">{user.username}</h2>
          <table className="w-full text-left">
            <tbody>
              <tr>
                <td className="border-b border-gray-300 px-4 py-2">
                  <strong>ID:</strong>
                </td>
                <td className="border-b border-gray-300 px-4 py-2">
                  {user.id}
                </td>
              </tr>
              <tr>
                <td className="border-b border-gray-300 px-4 py-2">
                  <strong>Username:</strong>
                </td>
                <td className="border-b border-gray-300 px-4 py-2">
                  {user.username}
                </td>
              </tr>
              <tr>
                <td className="border-b border-gray-300 px-4 py-2">
                  <strong>Email:</strong>
                </td>
                <td className="border-b border-gray-300 px-4 py-2">
                  {user.email}
                </td>
              </tr>
              <tr>
                <td className="border-b border-gray-300 px-4 py-2">
                  <strong>Role:</strong>
                </td>
                <td className="border-b border-gray-300 px-4 py-2">
                  {user.role}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
