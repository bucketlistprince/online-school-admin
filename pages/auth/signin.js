import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function SignIn() {
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password
    });

    if (!result.error) {
      window.location.href = '/admin/dashboard';
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl mb-4">Admin Sign In</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          name="username"
          type="text"
          placeholder="Username"
          className="block w-full text-black mb-4 p-2 border border-gray-300 rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="block w-full text-black mb-4 p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
