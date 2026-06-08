import { LogOut, CheckSquare, User } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <CheckSquare className="text-primary-600" size={22} />
        <span className="font-semibold text-gray-900 text-lg">TaskFlow</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
            <User size={15} className="text-primary-600" />
          </div>
          <span className="text-sm font-medium text-gray-700">
            {user?.username}
          </span>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navbar