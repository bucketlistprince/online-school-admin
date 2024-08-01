import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "components/Layout";

export default function Roles() {
  const [roles, setRoles] = useState([
    { id: 1, name: "Admin" },
    { id: 2, name: "Teacher" },
    { id: 3, name: "Student" },
  ]);
  const [newRole, setNewRole] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleAddRole = async () => {
    if (!newRole) {
      setError("Role name cannot be empty");
      return;
    }

    const newRoleData = { id: roles.length + 1, name: newRole };

    // Add the new role to the server (replace with your API call)
    const response = await fetch("/api/roles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRoleData),
    });

    if (response.ok) {
      setRoles([...roles, newRoleData]);
      setNewRole("");
      setError(null);
    } else {
      setError("Failed to add role");
    }
  };

  const handleRoleClick = (id) => {
    router.push(`/admin/roles/${id}`);
  };

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen">
        <div className="bg-gray-300 text-black p-4 sticky top-0 z-10 mb-4 flex justify-between">
          <h1 className="text-2xl text-gray-600 font-bold">Manage Roles</h1>
        </div>
        <div className="bg-white p-4 m-4 rounded shadow border border-gray-300">
          {error && (
            <div className="text-red-600 mb-4">
              <strong>{error}</strong>
            </div>
          )}
          <div className="mb-4 flex">
            <input
              type="text"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              placeholder="New Role"
              className="p-2 border border-gray-300 rounded mr-2 w-full sm:w-80 md:w-96"
            />
            <button
              onClick={handleAddRole}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Add Role
            </button>
          </div>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Role Name</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr
                  key={role.id}
                  onClick={() => handleRoleClick(role.id)}
                  className="cursor-pointer hover:bg-gray-100"
                >
                  <td className="border px-4 py-2">{role.id}</td>
                  <td className="border px-4 py-2">{role.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
