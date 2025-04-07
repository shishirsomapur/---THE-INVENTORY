import { createContext, useContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const decoded = jwtDecode(token)
        setUser(decoded)
      } catch (err) {
        console.error("Invalid token")
        localStorage.removeItem("token")
      }
    }
  }, [])

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, showLoginModal, setShowLoginModal }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
