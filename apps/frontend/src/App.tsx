import { Header } from './components/Header'
import { AppRoutes } from './routes/AppRoutes'
import { useLocation } from 'react-router-dom'

export default function App() {
  const location = useLocation()
  const isDetailPage = location.pathname.startsWith('/activities/')
  const isDashboardPage = location.pathname === '/dashboard'

  return (
    <>
      <Header />
      <AppRoutes />
      <footer className={`site-footer${isDetailPage ? ' site-footer-detail' : ''}${isDashboardPage ? ' site-footer-dashboard' : ''}`}>
        <div className="page-shell">Hub Universitário · Projeto de extensão universitária</div>
      </footer>
    </>
  )
}
