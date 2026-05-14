import { useState } from 'react'
import { User, Mail } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Profile = () => {
  const { user } = useAuth()

  const nameParts = user?.fullName?.split(' ') ?? []
  const [formData] = useState({
    firstName: nameParts[0] ?? '',
    lastName: nameParts.slice(1).join(' ') ?? '',
    email: user?.email ?? '',
    role: user?.role ?? '',
  })

  if (!user) return null

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-forest-900 to-golden-500 px-8 py-12 text-white">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-full">
              <User size={48} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.fullName}</h1>
              {user.role && (
                <span className="text-sm bg-white/20 px-2 py-0.5 rounded-full mt-1 inline-block">
                  {user.role}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
              <input
                value={formData.firstName}
                readOnly
                className="w-full border border-gray-200 rounded-lg p-2 bg-gray-50 text-gray-600 cursor-default"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input
                value={formData.lastName}
                readOnly
                className="w-full border border-gray-200 rounded-lg p-2 bg-gray-50 text-gray-600 cursor-default"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-gray-400 shrink-0" />
                <input
                  value={formData.email}
                  readOnly
                  className="flex-1 border border-gray-200 rounded-lg p-2 bg-gray-50 text-gray-600 cursor-default"
                />
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full shrink-0">
                  Vérifié
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-400 border-t pt-4">
            La modification du profil sera disponible prochainement.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Profile
