import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: ReactNode;
}

// Komponent för skyddade routes.
// Renderar barnkomponenten om användaren är inloggad.
// Om användaren inte är inloggad: redirect till login-sidan.
// Visar laddningsindikator medan auth-status kontrolleras.
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user, loading } = useAuth();

    // Om auth-status fortfarande laddas, visa laddning
    if (loading) {
        return <p>Laddar...</p>; 
    }

    // Om ingen användare är inloggad, navigera till login-sidan
    if (!user) {
        return <Navigate to="/loggain" replace />;
    }

    // Om användaren är inloggad, rendera barnkomponenten
    return <>{children}</>;
};

export default ProtectedRoute;