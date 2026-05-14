import { useState } from 'react'
import { Link } from 'react-router-dom'
import { forgotPassword } from '../services/authService'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import toast from 'react-hot-toast'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await forgotPassword(email)
      setSent(true)
    } catch (err) {
      const message =
        err.response?.data?.message ?? err.response?.data ?? "Erreur lors de l'envoi"
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800">Email envoyé !</h2>
        <p className="text-gray-600 text-sm">
          Si un compte existe pour <strong>{email}</strong>, vous recevrez un lien de
          réinitialisation dans quelques minutes. Pensez à vérifier vos spams.
        </p>
        <Link to="/login" className="block text-golden-600 text-sm font-medium hover:underline">
          Retour à la connexion
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-5">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Mot de passe oublié</h2>
        <p className="text-sm text-gray-500 mt-1">
          Entrez votre email pour recevoir un lien de réinitialisation
        </p>
      </div>

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="votre@email.com"
        disabled={loading}
        required
      />

      <Button type="submit" fullWidth loading={loading}>
        Envoyer le lien
      </Button>

      <p className="text-center text-sm">
        <Link to="/login" className="text-golden-600 hover:underline">
          Retour à la connexion
        </Link>
      </p>
    </form>
  )
}

export default ForgotPassword
