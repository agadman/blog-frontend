import { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, LoginCredentials, AuthContextType } from '../types/auth.types';

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Logga in
  const login = async (credentials: LoginCredentials) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      credentials: "include" 
    });

    if (!res.ok) throw new Error("Inloggning misslyckades");

    const data = await res.json();
    setUser(data.user); 
  };

  // Logga ut
  const logout = async () => {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include" 
    });
    setUser(null);
  };

  // Kolla session vid reload
  const checkSession = async () => {
  try {
    const res = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      credentials: "include"
    });

    if (!res.ok) {
      setUser(null);
    } else {
      const data = await res.json();
      setUser(data.user);
    }
  } catch (err) {
    console.error("Network error while checking session", err);
    setUser(null);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook för att använda AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth måste användas inom en AuthProvider");
  return context;
};