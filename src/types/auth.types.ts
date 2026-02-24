// Representerar en användare i systemet
export interface User {
  id: string,
  username: string,
  email: string,
  createdAt?: string
}

// Används för att skicka inloggningsuppgifter till backend
export interface LoginCredentials {
    email: string,
    password: string
}

// Representerar svaret från backend efter en lyckad inloggning eller registrering
export interface AuthResponse {
    user: User,
    token: string
}

// Typdefinition för AuthContext, som används i AuthProvider för att hantera autentisering i appen
export interface AuthContextType {
    user: User | null;

    // Funktioner för att hantera inloggning, registrering och utloggning
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: { username: string; email: string; password: string }) => Promise<void>; 
    logout: () => void;
    
    loading: boolean; // Indikerar om en autentiseringsprocess pågår
}