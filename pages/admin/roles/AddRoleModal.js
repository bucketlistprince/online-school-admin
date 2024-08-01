// components/AddRoleModal.js
import { useState } from "react";

export default function AddRoleModal({ isOpen, onClose, onAddRole }) {
  const [roleName, setRoleName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!roleName) {
      setError("Role name is required.");
      return;
    }

    try {
      const response = await fetch("/api/roles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: roleName }),
      });

      if (!response.ok) {
        throw new Error("Failed to add role.");
      }

      const newRole = await response.json();
      onAddRole(newRole);
      setRoleName("");
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg">
          <h2 className="text-xl mb-4">Add New Role</h2>
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Role Name</label>
              <input
                type="text"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                className="p-2 border border-gray-300 rounded w-full"
                placeholder="Enter role name"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Add Role
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
