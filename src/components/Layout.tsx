import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import './Layout.css';

// Layout-komponent som omsluter alla sidor i applikationen
// Header och Footer visas alltid
// Outlet används för att rendera den aktuella sidan baserat på routingen
const Layout = () => {
  return (
    <div className="layout">
        <Header />
        <main className="main">
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default Layout