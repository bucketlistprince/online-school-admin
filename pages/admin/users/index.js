// pages/admin/users/index.js
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "components/Layout";
import AddUserModal from "./AddUserModal";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const router = useRouter();

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch("/api/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data); // Initialize with all users
      }
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [searchTerm, selectedRole, users]);

  const handleAddUser = async (newUser) => {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });
    if (response.ok) {
      const addedUser = await response.json();
      setUsers([...users, addedUser]);
    } else {
      console.error("Failed to add user");
    }
  };

  const filterUsers = () => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedRole) {
      filtered = filtered.filter((user) => user.role === selectedRole);
    }

    setFilteredUsers(filtered);
  };

  const handleUserClick = (id) => {
    router.push(`/admin/users/${id}`);
  };

  return (
    <Layout>
      <div>
        {/* Sticky Title Bar */}
        <div className="bg-gray-300 text-black p-4 sticky top-0 z-10 mb-4 flex justify-between">
          <h1 className="text-2xl text-gray-600 font-bold">ALL USERS</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white text-sm font-medium p-2 rounded hover:bg-blue-600 rounded-lg"
          >
            ADD USER
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-4 m-4 rounded shadow">
          <div className="flex justify-between mb-4">
            <input
              type="text"
              placeholder="Quick Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border border-gray-300 rounded w-1/3"
            />
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="p-2 border border-gray-300 rounded w-1/5"
            >
              <option value="">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Teacher">Teacher</option>
              <option value="Student">Student</option>
            </select>
          </div>

          {/* User List */}
          <table className="min-w-full mt-4">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Username</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} onClick={() => handleUserClick(user.id)} className="cursor-pointer hover:bg-gray-100">
                  <td className="border px-4 py-2">{user.id}</td>
                  <td className="border px-4 py-2">{user.username}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddUser={handleAddUser}
      />
    </Layout>
  );
}
