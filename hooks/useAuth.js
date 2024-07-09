import { useSession } from 'next-auth/react';

export function useAuth() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  return {
    session,
    loading,
    isAuthenticated: !!session,
  };
}
