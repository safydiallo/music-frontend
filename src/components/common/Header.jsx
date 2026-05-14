import { Search, Bell, UserCircle, Menu } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const Header = ({ onMobileMenuOpen }) => {
  const { user } = useAuth()

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 md:px-6 py-3 flex items-center gap-3">
      {/* Hamburger mobile */}
      <button
        onClick={onMobileMenuOpen}
        className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors shrink-0"
      >
        <Menu size={22} />
      </button>

      {/* Barre de recherche */}
      <div className="relative flex-1 max-w-sm hidden sm:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Rechercher artistes, albums..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-golden-400 text-sm"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        {/* Recherche mobile (icône seule) */}
        <button className="sm:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 text-gray-500">
          <Search size={20} />
        </button>

        {/* Notifications */}
        <button className="relative flex items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 transition-colors">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center leading-none">
            3
          </span>
        </button>

        {/* Profil */}
        <div className="flex items-center gap-2">
          <UserCircle size={32} className="text-golden-500" />
          <span className="hidden sm:block text-sm font-medium text-gray-700">
            {user?.fullName || 'Artiste'}
          </span>
        </div>
      </div>
    </header>
  )
}

export default Header
