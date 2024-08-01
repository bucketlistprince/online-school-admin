import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const roles = ["Admin", "Teacher", "Student"]; // Define the roles here

export default function AddUserModal({ isOpen, onClose, onAddUser }) {
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    role: roles[0], // Set default role
    password: "",
  });

  if (!isOpen) return null;

  const handleAddUser = () => {
    onAddUser(newUser);
    setNewUser({ username: "", email: "", role: roles[0], password: "" });
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50"
        onClick={onClose}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          >
            <FaTimes size={24} />
          </button>
          <h2 className="text-2xl font-bold mb-4">Add New User</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="border p-2 rounded w-full"
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleAddUser}
                className="bg-blue-500 text-white text-sm font-medium p-2 rounded hover:bg-blue-600 rounded-lg"
              >
                Add User
              </button>
              <button
                onClick={onClose}
                className="bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400 text-sm rounded-lg font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
