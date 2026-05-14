import { Outlet } from 'react-router-dom'
import Logo from '../common/Logo'

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-100 via-white to-golden-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8 gap-2">
          <Logo size="lg" variant="light" />
          {/* <p className="text-forest-700 text-sm tracking-wide">Plateforme musicale</p> */}
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout