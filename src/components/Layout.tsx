import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
        <Header />
        <main>
            <Outlet />
        </main>
        <footer>Här ska jag lägga in en sidfot</footer>
    </>
  )
}

export default Layout