import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, User, Music, Settings,
  LogOut, Bell, Headphones, ChevronLeft, ChevronRight, X,
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import Logo from './Logo'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/profile',   icon: User,            label: 'Profil' },
  { to: '/music',     icon: Music,           label: 'Musique' },
  { to: '/settings',  icon: Settings,        label: 'Paramètres' },
  { to: '/notifications', icon: Bell,        label: 'Notifications' },
]

const Sidebar = ({ isCollapsed, isMobileOpen, onClose, onToggleCollapse }) => {
  const { logoutUser } = useAuth()

  return (
    <aside
      className={`
        bg-forest-900 text-forest-100 flex flex-col shadow-xl z-50
        fixed inset-y-0 left-0 transition-all duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isCollapsed ? 'w-64 md:w-16' : 'w-64'}
      `}
    >
      {/* Logo + boutons de contrôle */}
      <div className={`px-3 py-4 border-b border-forest-800 flex items-center gap-2 ${isCollapsed ? 'md:justify-center' : 'justify-between'}`}>
        <div className={isCollapsed ? 'md:hidden' : ''}>
          <Logo />
        </div>

        {/* Icône seule quand collapsed (desktop) */}
        {isCollapsed && (
          <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-forest-800 ring-2 ring-golden-500/60 shadow-golden-500/20 shadow-lg">
            <Headphones className="w-5 h-5 text-golden-400" />
          </div>
        )}

        {/* Toggle collapse — desktop */}
        <button
          onClick={onToggleCollapse}
          title={isCollapsed ? 'Agrandir' : 'Réduire'}
          className="hidden md:flex items-center justify-center w-7 h-7 rounded-full bg-forest-800 hover:bg-forest-700 text-forest-300 hover:text-golden-400 transition-colors shrink-0"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* Fermer — mobile */}
        <button
          onClick={onClose}
          className="md:hidden flex items-center justify-center w-7 h-7 rounded-full bg-forest-800 hover:bg-forest-700 text-forest-300 shrink-0"
        >
          <X size={14} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            title={isCollapsed ? item.label : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 py-3 mx-2 rounded-lg transition-all
               ${isCollapsed ? 'md:justify-center md:px-0 px-4' : 'px-4'}
               ${isActive
                 ? 'bg-golden-500 text-white shadow-md'
                 : 'hover:bg-forest-800/60 text-forest-200'
               }`
            }
          >
            <item.icon size={20} className="shrink-0" />
            <span className={isCollapsed ? 'md:hidden' : ''}>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Déconnexion */}
      <div className="p-3 border-t border-forest-800">
        <button
          onClick={logoutUser}
          title={isCollapsed ? 'Déconnexion' : undefined}
          className={`flex w-full items-center gap-3 py-2 px-3 rounded-lg hover:bg-forest-800/60 transition-colors
            ${isCollapsed ? 'md:justify-center md:px-0' : ''}`}
        >
          <LogOut size={20} className="shrink-0" />
          <span className={isCollapsed ? 'md:hidden' : ''}>Déconnexion</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
