import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Button from '../components/common/Button'
import Input from '../components/common/Input'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { loginUser } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const result = await loginUser(email, password)
    setLoading(false)
    if (result) {
        if (result.mustChangePassword) {
            navigate('/change-password')
        } else {
            navigate('/dashboard')
        }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-5">
      <h2 className="text-2xl font-bold text-center text-gray-800">Connexion</h2>

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="votre@email.com"
        disabled={loading}
        required
      />
      <Input
        label="Mot de passe"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        disabled={loading}
        required
      />

      <div className="text-right">
        <Link to="/forgot-password" className="text-sm text-golden-600 hover:underline">
          Mot de passe oublié ?
        </Link>
      </div>

      <Button type="submit" fullWidth loading={loading}>
        Se connecter
      </Button>

      <p className="text-center text-sm text-gray-600">
        Pas encore inscrit ?{' '}
        <Link to="/register" className="text-golden-600 font-medium hover:underline">
          Créer un compte
        </Link>
      </p>
    </form>
  )
}

export default Login
