import { createContext, useContext, useState, useEffect } from 'react'
import {
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
  changePassword as apiChangePassword,
} from '../services/authService'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const stored = localStorage.getItem('user')
    if (token && stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const registerUser = async (data) => {
    try {
      const res = await apiRegister(data)
      toast.success(res.data.message || 'Inscription réussie ! Vérifiez votre email.')
      return true
    } catch (err) {
      const message =
        err.response?.data?.message ?? err.response?.data ?? "Erreur lors de l'inscription"
      toast.error(message)
      return false
    }
  }

  const loginUser = async (email, password) => {
    try {
      const res = await apiLogin({ email, password })
      const { token, ...userInfo } = res.data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userInfo))
      setUser(userInfo)
      toast.success('Connexion réussie')
      return userInfo
    } catch (err) {
      const message =
        err.response?.data?.message ?? err.response?.data ?? 'Email ou mot de passe invalide'
      toast.error(message)
      return false
    }
  }

  const logoutUser = async () => {
    try {
      await apiLogout()
    } catch {
      // Le token local est supprimé même si la requête serveur échoue
    }
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  const changePasswordUser = async (newPassword, confirmPassword) => {
    try {
      const res = await apiChangePassword(newPassword, confirmPassword)
      setUser((prevUser) => {
        if (!prevUser) return prevUser
        const updatedUser = { ...prevUser, mustChangePassword: false }
        localStorage.setItem('user', JSON.stringify(updatedUser))
        return updatedUser
      })
      toast.success(res.data?.message ?? res.data ?? 'Mot de passe modifié avec succès')
      return true
    } catch (err) {
      const message =
        err.response?.data?.message ?? err.response?.data ?? 'Erreur lors du changement de mot de passe'
      toast.error(message)
      return false
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, loginUser, logoutUser, registerUser, changePasswordUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}
