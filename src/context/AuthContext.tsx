import { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, LoginCredentials, AuthContextType } from '../types/auth.types';

// Skapar ett globalt context för autentisering
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode; // Komponenter som AuthProvider kommer att omsluta
}

// API URL från miljövariabler
const API_URL = import.meta.env.VITE_API_URL;

// Provider-komponent som hanterar autentisering och session och omsluter appen
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null); // Håller reda på den inloggade användaren
  const [loading, setLoading] = useState(true);        // Visar om sessionen fortfarande laddas

  // Logga in användare
  const login = async (credentials: LoginCredentials) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      credentials: "include" // skickar/lagrar JWT-cookie för sessionhantering
    });

    if (!res.ok) throw new Error("Inloggning misslyckades");

    const data = await res.json();
    setUser(data.user); // Spara användaren i state 
  };

  // Registrera ny användare
  const register = async (credentials: { username: string; email: string; password: string }) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      credentials: "include",
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Registreringen misslyckades");
    }

    // auto-login efter registrering
    const data = await res.json();
    setUser(data.user);
  };

  // Logga ut användare
  const logout = async () => {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include" 
    });
    setUser(null);
  };

  // Kontrollerar om användaren redan är inloggad när appen startar
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

  // Körs en gång när appen laddas för att kontrollera sessionen
  useEffect(() => {
    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook för att använda AuthContext i komponenter
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth måste användas inom en AuthProvider");
  return context;
};