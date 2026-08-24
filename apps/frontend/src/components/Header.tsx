import { NavLink, useLocation } from 'react-router-dom'
import { Icon } from './Icon'

export function Header() {
  const location = useLocation()
  const isHeroPage = location.pathname === '/activities' || location.pathname === '/'
  const isDetailPage = location.pathname.startsWith('/activities/')
  const isDashboardPage = location.pathname === '/dashboard'

  return (
    <header className={`site-header${isHeroPage || isDetailPage || isDashboardPage ? '' : ' site-header-light'}${isDetailPage || isDashboardPage ? ' site-header-hero' : ''}`}>
      <div className="header-inner">
        <NavLink to="/activities" className="brand" aria-label="Hub Universitário - início">
          <span className="brand-mark"><span>U</span></span>
          <span>Hub Universitário</span>
        </NavLink>
        <nav aria-label="Navegação principal">
          <NavLink to="/activities"><Icon name="calendar" />Atividades</NavLink>
          <NavLink to="/dashboard"><Icon name="users" />Dashboard</NavLink>
        </nav>
      </div>
    </header>
  )
}
