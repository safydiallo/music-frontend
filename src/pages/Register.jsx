import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Input from '../components/common/Input'
import Button from '../components/common/Button'

const INITIAL_FORM = {
  fullName: '',
  nomArtiste: '',
  email: '',
  password: '',
  pays: '',
  genreMusical: '',
}

const Register = () => {
  const [form, setForm] = useState(INITIAL_FORM)
  const [loading, setLoading] = useState(false)
  const { registerUser } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const ok = await registerUser(form)
    setLoading(false)
    if (ok) navigate('/login')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-800">Inscription</h2>

      <Input
        label="Nom complet"
        name="fullName"
        value={form.fullName}
        onChange={handleChange}
        placeholder="Prénom Nom"
        disabled={loading}
        required
      />
      <Input
        label="Nom d'artiste"
        name="nomArtiste"
        value={form.nomArtiste}
        onChange={handleChange}
        placeholder="DJ Chef"
        disabled={loading}
        required
      />
      <Input
        label="Email"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="votre@email.com"
        disabled={loading}
        required
      />
      <div>
        <Input
          label="Mot de passe"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
          disabled={loading}
          required
        />
        <p className="mt-1 text-xs text-gray-500">
          Min. 8 caractères avec une majuscule, un chiffre et un caractère spécial (@#$%!&*)
        </p>
      </div>
      <Input
        label="Pays"
        name="pays"
        value={form.pays}
        onChange={handleChange}
        placeholder="Sénégal"
        disabled={loading}
        required
      />
      <Input
        label="Genre musical"
        name="genreMusical"
        value={form.genreMusical}
        onChange={handleChange}
        placeholder="Afrobeat, Hip-hop..."
        disabled={loading}
        required
      />

      <Button type="submit" fullWidth loading={loading}>
        S'inscrire
      </Button>

      <p className="text-center text-sm text-gray-600">
        Déjà inscrit ?{' '}
        <Link to="/login" className="text-golden-600 font-medium hover:underline">
          Se connecter
        </Link>
      </p>
    </form>
  )
}

export default Register
