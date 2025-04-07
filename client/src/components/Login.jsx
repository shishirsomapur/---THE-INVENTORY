import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../components/AuthContext'

const Login = () => {
  const { setUser, setShowLoginModal } = useAuth()

  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={credentialResponse => {
          const token = credentialResponse.credential
          localStorage.setItem("token", token)

          const decoded = jwtDecode(token)
          setUser(decoded)

          alert("✅ Logged in successfully!")
          setShowLoginModal(false)
        }}
        onError={() => {
          alert("❌ Login failed")
        }}
      />
    </div>
  )
}

export default Login
