import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './routing.tsx'
import { AuthProvider } from './context/AuthContext.tsx';

// Hämtar root-elementet från HTML och renderar React-appen inuti det
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* AuthProvider gör att hela applikationen får tillgång till användarens inloggningsstatus via Context API */}
    <AuthProvider>
      {/* RouterProvider kopplar in routingstrukturen (routing.tsx) och gör att applikationen fungerar som en SPA */}
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
