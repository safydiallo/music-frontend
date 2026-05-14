import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { resetPassword } from '../services/authService'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import toast from 'react-hot-toast'

const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const [newPassword, setNewPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (newPassword !== confirm) {
      toast.error('Les mots de passe ne correspondent pas')
      return
    }
    setLoading(true)
    try {
      await resetPassword(token, newPassword)
      toast.success('Mot de passe réinitialisé avec succès')
      navigate('/login')
    } catch (err) {
      const message =
        err.response?.data?.message ?? err.response?.data ?? 'Lien invalide ou expiré'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center space-y-4">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800">Lien invalide</h2>
        <p className="text-gray-600 text-sm">Ce lien de réinitialisation est invalide ou expiré.</p>
        <Link
          to="/forgot-password"
          className="block text-golden-600 text-sm font-medium hover:underline"
        >
          Demander un nouveau lien
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-5">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Nouveau mot de passe</h2>
        <p className="text-sm text-gray-500 mt-1">Choisissez un mot de passe sécurisé</p>
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
          Min. 8 caractères avec une majuscule, un chiffre et un caractère spécial (@#$%!&*)
        </p>
      </div>

      <Input
        label="Confirmer le mot de passe"
        type="password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        placeholder="••••••••"
        disabled={loading}
        required
      />

      <Button type="submit" fullWidth loading={loading}>
        Réinitialiser
      </Button>
    </form>
  )
}

export default ResetPassword
