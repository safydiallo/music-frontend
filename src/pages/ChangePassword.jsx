import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import toast from 'react-hot-toast'

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { user, changePasswordUser } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas')
      return
    }

    setLoading(true)
    const success = await changePasswordUser(newPassword, confirmPassword)
    setLoading(false)

    if (success) {
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-100 via-white to-golden-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-5">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Changer le mot de passe</h2>
            <p className="text-sm text-gray-500 mt-1">
              {user?.email
                ? `Bienvenue ${user.email}, choisissez maintenant votre nouveau mot de passe.`
                : 'Choisissez maintenant votre nouveau mot de passe.'}
            </p>
          </div>

          <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
            Vous utilisez un mot de passe temporaire. Cette étape est obligatoire avant d'accéder à votre espace.
          </div>

          <div>
            <Input
              label="Nouveau mot de passe"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Utilisez un mot de passe fort avec au moins 8 caractères, une majuscule, un chiffre et un caractère spécial.
            </p>
          </div>

          <Input
            label="Confirmer le mot de passe"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            disabled={loading}
            required
          />

          <Button type="submit" fullWidth loading={loading}>
            Enregistrer le nouveau mot de passe
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
