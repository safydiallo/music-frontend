import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { verifyEmail } from '../services/authService'

const STATUS = { LOADING: 'loading', SUCCESS: 'success', ERROR: 'error' }

const VerifyEmail = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const [status, setStatus] = useState(STATUS.LOADING)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!token) {
      setStatus(STATUS.ERROR)
      setMessage('Token de vérification manquant.')
      return
    }
    verifyEmail(token)
      .then((res) => {
        setStatus(STATUS.SUCCESS)
        setMessage(res.data || 'Email vérifié avec succès !')
      })
      .catch((err) => {
        setStatus(STATUS.ERROR)
        setMessage(err.response?.data?.message ?? err.response?.data ?? 'Lien invalide ou expiré.')
      })
  }, [token])

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg text-center space-y-4 min-w-80">
      {status === STATUS.LOADING && (
        <>
          <div className="w-12 h-12 border-4 border-forest-200 border-t-golden-500 rounded-full animate-spin mx-auto" />
          <p className="text-gray-600">Vérification en cours...</p>
        </>
      )}

      {status === STATUS.SUCCESS && (
        <>
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
          <h2 className="text-xl font-bold text-gray-800">Email vérifié !</h2>
          <p className="text-gray-600 text-sm">{message}</p>
          <Link to="/login" className="block text-golden-600 font-medium hover:underline">
            Se connecter
          </Link>
        </>
      )}

      {status === STATUS.ERROR && (
        <>
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
          <h2 className="text-xl font-bold text-gray-800">Vérification échouée</h2>
          <p className="text-gray-600 text-sm">{message}</p>
          <Link to="/login" className="block text-golden-600 text-sm hover:underline">
            Retour à la connexion
          </Link>
        </>
      )}
    </div>
  )
}

export default VerifyEmail
