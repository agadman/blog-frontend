import { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, LoginCredentials, AuthResponse, AuthContextType } from '../types/auth.types';

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    const res = await fetch("http://localhost:5001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials)
    });

    if (!res.ok) throw new Error("Inloggning misslyckades");

    const data: AuthResponse = await res.json();
    console.log("LOGIN RESPONSE:", data);

    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Validera token
  const checkToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:5001/auth/validate", {
        method: "GET",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if(res.ok) {
        const data = await res.json();
        setUser(data.user);

      }

    } catch (error: unknown) {
        localStorage.removeItem("token");
        setUser(null);

        if (error instanceof Error) {
          console.error("Token validering misslyckades:", error.message);
        }
    }
  }

  useEffect(() => {
  const validate = async () => {
    await checkToken();
  };
  validate();
}, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth måste användas inom en AuthProvider");
  return context;
};